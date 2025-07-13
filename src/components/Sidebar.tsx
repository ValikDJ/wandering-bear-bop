import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Search, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, highlightText } from "@/lib/utils";
import { sidebarNavData, SidebarNavItem } from "@/data/sidebarNavData";
import Fuse from 'fuse.js';
import { expandQueryWithSynonyms } from "@/data/synonymMap";

interface SidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isMobile: boolean;
  onCloseMobileSidebar?: () => void;
}

const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'keywords', weight: 0.9 },
    { name: 'description', weight: 0.5 }, // Припускаємо, що опис може бути доданий до SidebarNavItem для пошуку
  ],
  includeScore: true,
  threshold: 0.3, // Налаштовано для ширших збігів
  distance: 100, // Дозволяє збіги на більшій відстані
  ignoreLocation: true,
  minMatchCharLength: 1,
};

// Згладжуємо дані бічної панелі для Fuse.js
const flattenSidebarItems = (items: SidebarNavItem[]): SidebarNavItem[] => {
  let flatList: SidebarNavItem[] = [];
  items.forEach(item => {
    if (item.path) { // Додаємо лише фактичні навігаційні елементи
      flatList.push(item);
    }
    if (item.children) {
      flatList = flatList.concat(flattenSidebarItems(item.children));
    }
  });
  return flatList;
};

const flatSearchableItems = flattenSidebarItems(sidebarNavData);
const fuse = new Fuse(flatSearchableItems, fuseOptions);

const RECENT_SEARCHES_KEY = "sidebar-recent-searches";
const MAX_RECENT_SEARCHES = 3;

const Sidebar: React.FC<SidebarProps> = ({ searchTerm, setSearchTerm, isMobile, onCloseMobileSidebar }) => {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(sidebarNavData.map(item => item.id))); // Відкриваємо всі групи за замовчуванням
  const [filteredNavData, setFilteredNavData] = useState<SidebarNavItem[]>(sidebarNavData);
  const [activeItemIndex, setActiveItemIndex] = useState(-1); // Для навігації клавіатурою
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error("Failed to load recent searches from localStorage:", error);
    }
  }, []);

  const saveSearchTerm = useCallback((term: string) => {
    if (!term.trim()) return;
    setRecentSearches(prevSearches => {
      const newSearches = [term, ...prevSearches.filter(s => s !== term)].slice(0, MAX_RECENT_SEARCHES);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
      } catch (error) {
        console.error("Failed to save recent search to localStorage:", error);
      }
      return newSearches;
    });
  }, []);

  // Фільтруємо навігаційні дані на основі пошукового запиту
  useEffect(() => {
    if (!searchTerm) {
      setFilteredNavData(sidebarNavData);
      setActiveItemIndex(-1); // Скидаємо активний елемент
      setOpenGroups(new Set(sidebarNavData.map(item => item.id))); // Відкриваємо всі групи, коли пошук порожній
      return;
    }

    const expandedQueryArray = expandQueryWithSynonyms(searchTerm);
    const queryForFuse = expandedQueryArray.join(' ');
    const results = fuse.search(queryForFuse);
    const matchedItemIds = new Set(results.map(r => r.item.id));

    const filterAndExpand = (items: SidebarNavItem[]): SidebarNavItem[] => {
      return items.filter(item => {
        const isMatch = matchedItemIds.has(item.id) || item.title.toLowerCase().includes(searchTerm.toLowerCase()) || (item.keywords && item.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase())));
        
        if (item.children) {
          const filteredChildren = filterAndExpand(item.children);
          if (filteredChildren.length > 0) {
            // Якщо дочірні елементи відповідають, переконайтеся, що батьківський елемент включений і розгорнутий
            setOpenGroups(prev => new Set(prev).add(item.id)); // Розгортаємо батьківський елемент
            item.children = filteredChildren;
            return true;
          }
        }
        return isMatch;
      });
    };

    const newFilteredData = filterAndExpand(JSON.parse(JSON.stringify(sidebarNavData))); // Глибока копія, щоб уникнути зміни оригіналу
    setFilteredNavData(newFilteredData);
    setActiveItemIndex(-1); // Скидаємо активний елемент при новому пошуку
  }, [searchTerm]);

  // Автофокус на полі пошуку при натисканні клавіші '/'
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && searchInputRef.current) {
        event.preventDefault();
        searchInputRef.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Навігація клавіатурою для елементів бічної панелі
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const navigableItems = sidebarRef.current?.querySelectorAll('a[data-nav-item]');
      if (!navigableItems || navigableItems.length === 0) return;

      let newIndex = activeItemIndex;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        newIndex = (activeItemIndex + 1) % navigableItems.length;
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        newIndex = (activeItemIndex - 1 + navigableItems.length) % navigableItems.length;
      } else if (event.key === 'Enter' && activeItemIndex !== -1) {
        event.preventDefault();
        (navigableItems[activeItemIndex] as HTMLElement).click();
        if (onCloseMobileSidebar) onCloseMobileSidebar(); // Закриваємо бічну панель на мобільному після вибору
      }

      if (newIndex !== activeItemIndex) {
        setActiveItemIndex(newIndex);
        (navigableItems[newIndex] as HTMLElement).focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, filteredNavData, isMobile, onCloseMobileSidebar]);

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderNavItem = (item: SidebarNavItem, level: number = 0) => {
    const isActive = location.pathname === item.path && (!item.sectionId || location.hash === `#${item.sectionId}`);
    const isGroup = item.children && item.children.length > 0;
    const Icon = item.icon;

    const itemContent = (
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        {highlightText(item.title, searchTerm)}
      </div>
    );

    if (isGroup) {
      return (
        <Collapsible
          key={item.id}
          open={openGroups.has(item.id) || !!searchTerm} // Завжди відкривати, якщо є пошуковий запит
          onOpenChange={() => toggleGroup(item.id)}
          className={cn("w-full", level > 0 && "pl-4")}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between text-left py-2 px-3",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "font-semibold",
                level === 0 ? "text-lg" : "text-base"
              )}
            >
              {itemContent}
              <ChevronDown className={cn("h-4 w-4 transition-transform", openGroups.has(item.id) || !!searchTerm ? "rotate-180" : "rotate-0")} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <div className="flex flex-col">
              {item.children?.map(child => renderNavItem(child, level + 1))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    } else {
      return (
        <Link
          key={item.id}
          to={`${item.path}${item.sectionId ? `#${item.sectionId}` : ''}`}
          onClick={onCloseMobileSidebar}
          className={cn(
            "flex items-center gap-2 w-full justify-start text-left px-3 py-2 rounded-md transition-colors duration-200",
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
            level > 0 && "pl-8", // Відступ для дочірніх елементів
            level > 1 && "pl-12", // Додатковий відступ для вкладених дочірніх елементів
            "focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar-background" // Стиль фокусу
          )}
          data-nav-item // Позначаємо для навігації клавіатурою
        >
          {itemContent}
        </Link>
      );
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    saveSearchTerm(term); // Зберігаємо знову, щоб перемістити вгору
  };

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "flex flex-col bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border",
        "w-64 flex-shrink-0 overflow-y-auto custom-scrollbar p-4",
        "transition-all duration-300 ease-in-out",
        isMobile ? "fixed inset-y-0 left-0 z-40 transform -translate-x-full data-[state=open]:translate-x-0" : "relative"
      )}
    >
      <div className="mb-4 relative">
        <Input
          ref={searchInputRef}
          type="text"
          placeholder="Пошук уроків (натисни '/' )"
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-8 bg-sidebar-accent text-sidebar-accent-foreground placeholder:text-sidebar-foreground/70 focus:ring-sidebar-ring focus:ring-offset-0"
          aria-label="Пошук по уроках"
        />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/70" />
      </div>

      {searchTerm.length === 0 && recentSearches.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">Останні запити:</h4>
          <div className="flex flex-col gap-1">
            {recentSearches.map((term, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleRecentSearchClick(term)}
                className="w-full justify-start text-left px-3 py-1 text-sm text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <History className="h-3 w-3 mr-2 text-muted-foreground" />
                {term}
              </Button>
            ))}
          </div>
        </div>
      )}

      <ScrollArea className="flex-grow">
        <div className="flex flex-col gap-1">
          {filteredNavData.length === 0 && searchTerm.length > 0 ? (
            <p className="text-muted-foreground text-center py-4">Нічого не знайдено.</p>
          ) : (
            filteredNavData.map(item => renderNavItem(item))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;