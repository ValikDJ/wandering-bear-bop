import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Search, History } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, highlightText, escapeRegExp } from "@/lib/utils";
import { sidebarNavData, SidebarNavItem } from "@/data/sidebarNavData";
import Fuse from 'fuse.js';
import type { FuseResult } from 'fuse.js';
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
    { name: 'description', weight: 0.5 },
  ],
  includeScore: true,
  threshold: 0.3,
  distance: 100,
  ignoreLocation: true,
  minMatchCharLength: 1,
};

const flattenSidebarItems = (items: SidebarNavItem[]): SidebarNavItem[] => {
  let flatList: SidebarNavItem[] = [];
  items.forEach(item => {
    if (item.path || item.children) {
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
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(sidebarNavData.map(item => item.id)));
  const [filteredNavData, setFilteredNavData] = useState<SidebarNavItem[]>(sidebarNavData);
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeSectionTitle, setActiveSectionTitle] = useState<string>("Навігація");

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

  const buildFilteredSidebarData = useCallback((
    originalData: SidebarNavItem[],
    matchedIds: Set<string>,
    currentSearchTerm: string
  ): SidebarNavItem[] => {
    const newOpenGroups = new Set<string>();
    const lowerCaseSearchTerm = currentSearchTerm.toLowerCase();

    const filterAndMap = (items: SidebarNavItem[]): SidebarNavItem[] => {
      const filtered: SidebarNavItem[] = [];
      for (const item of items) {
        const itemMatches = matchedIds.has(item.id) ||
                            item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                            (item.keywords && item.keywords.some(kw => kw.toLowerCase().includes(lowerCaseSearchTerm)));

        if (item.children) {
          const filteredChildren = filterAndMap(item.children);
          if (filteredChildren.length > 0) {
            newOpenGroups.add(item.id);
            filtered.push({ ...item, children: filteredChildren });
          } else if (itemMatches) {
            filtered.push({ ...item, children: [] });
          }
        } else if (itemMatches) {
          filtered.push(item);
        }
      }
      return filtered;
    };

    const result = filterAndMap(originalData);
    setOpenGroups(newOpenGroups);
    return result;
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredNavData(sidebarNavData);
      setFocusedItemId(null);
      setOpenGroups(new Set(sidebarNavData.map(item => item.id)));
      return;
    }

    const expandedQueryArray = expandQueryWithSynonyms(searchTerm);
    const queryForFuse = expandedQueryArray.join(' ').trim();

    let results: FuseResult<SidebarNavItem>[] = [];
    if (queryForFuse) {
      try {
        results = fuse.search(queryForFuse);
      } catch (error) {
        console.error("Помилка під час пошуку Fuse.js у Sidebar:", error);
      }
    }

    const matchedItemIds = new Set(results.map(r => r.item.id));

    const newFilteredData = buildFilteredSidebarData(sidebarNavData, matchedItemIds, searchTerm);
    setFilteredNavData(newFilteredData);
    setFocusedItemId(null);
  }, [searchTerm, buildFilteredSidebarData]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the active element is an input or textarea
      const activeElement = document.activeElement;
      const isTypingInInput = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA'
      );

      // If typing in an input/textarea, do not intercept '/' or '.'
      if (isTypingInInput && (event.key === '/' || event.key === '.')) {
        return;
      }

      const navigableElements = Array.from(sidebarRef.current?.querySelectorAll('[data-nav-item]') || []) as HTMLElement[];
      if (navigableElements.length === 0) return;

      let currentFocusedIndex = focusedItemId ? navigableElements.findIndex(el => el.dataset.itemId === focusedItemId) : -1;
      let newIndex = currentFocusedIndex;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        newIndex = (currentFocusedIndex + 1) % navigableElements.length;
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        newIndex = (currentFocusedIndex - 1 + navigableElements.length) % navigableElements.length;
      } else if (event.key === 'Enter' && newIndex !== -1) {
        event.preventDefault();
        const targetElement = navigableElements[newIndex];
        targetElement.click();
        if (onCloseMobileSidebar && targetElement.tagName === 'A') {
          onCloseMobileSidebar();
        }
        return;
      } else if (event.key === '/' || event.key === '.') {
        event.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
        return;
      } else if (event.key === 'Escape') {
        if (document.activeElement === searchInputRef.current) {
          searchInputRef.current.blur();
          setSearchTerm("");
        }
        setFocusedItemId(null);
        return;
      }

      if (newIndex !== currentFocusedIndex) {
        setFocusedItemId(navigableElements[newIndex].dataset.itemId || null);
        navigableElements[newIndex].focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedItemId, filteredNavData, isMobile, onCloseMobileSidebar, searchTerm, setSearchTerm]);

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

  useEffect(() => {
    const currentPath = location.pathname;
    const foundGroup = sidebarNavData.find(group =>
      group.children?.some(item => item.path === currentPath) || group.path === currentPath
    );
    if (foundGroup) {
      setActiveSectionTitle(foundGroup.title);
    } else {
      setActiveSectionTitle("Навігація");
    }
  }, [location.pathname]);

  useEffect(() => {
    const scrollAreaElement = scrollAreaRef.current;
    if (!scrollAreaElement) return;

    const handleScroll = () => {
      let currentActiveTitle = "Навігація";
      let closestTop = Infinity;

      sidebarNavData.forEach(group => {
        const groupElement = document.getElementById(`sidebar-group-${group.id}`);
        if (groupElement) {
          const rect = groupElement.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < closestTop && rect.bottom > 0) {
            closestTop = rect.top;
            currentActiveTitle = group.title;
          }
        }
      });
      setActiveSectionTitle(currentActiveTitle);
    };

    scrollAreaElement.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      scrollAreaElement.removeEventListener('scroll', handleScroll);
    };
  }, [filteredNavData]);


  const renderNavItem = (item: SidebarNavItem, level: number = 0) => {
    const isActive = location.pathname === item.path && (!item.sectionId || location.hash === `#${item.sectionId}`);
    const isGroup = item.children && item.children.length > 0;
    const Icon = item.icon;
    const isCurrentlyFocused = focusedItemId === item.id;

    const itemContent: React.ReactNode = (
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4" />}
        {highlightText(item.title, searchTerm)}
      </div>
    );

    if (isGroup) {
      return (
        <Collapsible
          key={item.id}
          open={openGroups.has(item.id) || !!searchTerm}
          onOpenChange={() => toggleGroup(item.id)}
          className={cn("w-full", level > 0 && "pl-4")}
          id={`sidebar-group-${item.id}`}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between text-left py-2 px-3",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "font-semibold",
                level === 0 ? "text-lg" : "text-base",
                isCurrentlyFocused && "bg-sidebar-accent ring-2 ring-sidebar-ring ring-offset-2 ring-offset-sidebar-background"
              )}
              data-nav-item
              data-item-id={item.id}
              onFocus={() => setFocusedItemId(item.id)}
              onBlur={() => setFocusedItemId(null)}
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
            level > 0 && "pl-8",
            level > 1 && "pl-12",
            "focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar-background",
            isCurrentlyFocused && "bg-sidebar-accent ring-2 ring-sidebar-ring ring-offset-2 ring-offset-sidebar-background"
          )}
          data-nav-item
          data-item-id={item.id}
          onFocus={() => setFocusedItemId(item.id)}
          onBlur={() => setFocusedItemId(null)}
        >
          {itemContent}
        </Link>
      );
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setFocusedItemId(null);
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    saveSearchTerm(term);
  };

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "flex flex-col bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border",
        "w-[var(--sidebar-width)] flex-shrink-0 overflow-hidden",
        "transition-all duration-300 ease-in-out",
        isMobile ? "fixed inset-y-0 left-0 z-40 transform -translate-x-full data-[state=open]:translate-x-0" : "fixed inset-y-0 left-0 z-20",
        "min-h-0" // Додано для коректної роботи прокрутки
      )}
      style={{ top: '4rem' }}
    >
      <div className="p-4 border-b border-sidebar-border bg-sidebar-background sticky top-0 z-10">
        <h3 className="text-xl font-bold text-foreground mb-4">{activeSectionTitle}</h3>
        <div className="relative">
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Пошук уроків (натисни '/' або '.')"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-8 bg-sidebar-accent text-sidebar-accent-foreground placeholder:text-sidebar-foreground/70 focus:ring-sidebar-ring focus:ring-offset-0"
            aria-label="Пошук по уроках"
            tabIndex={0}
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-sidebar-foreground/70" />
        </div>
      </div>

      {searchTerm.length === 0 && recentSearches.length > 0 && (
        <div className="p-4 border-b border-sidebar-border">
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

      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        <div className="flex flex-col gap-1 p-4">
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