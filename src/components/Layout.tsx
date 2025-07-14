import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { cn } from "@/lib/utils";
import { SidebarMode } from "@/App"; // Імпортуємо SidebarMode з App.tsx

interface LayoutProps {
  children: React.ReactNode;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sidebarMode: SidebarMode; // Новий пропс
  setSidebarMode: (mode: SidebarMode) => void; // Новий пропс
}

const Layout: React.FC<LayoutProps> = ({
  children,
  searchTerm,
  setSearchTerm,
  sidebarMode,
  setSidebarMode,
}) => {
  const isMobile = useIsMobile();
  // isSidebarOpen тепер керує видимістю сайдбару в 'hidden' режимі (як на десктопі, так і на мобільному)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const scrollTop = useScrollPosition(mainRef);
  const isScrolled = scrollTop > 50;

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  // Визначаємо клас для відступу основного контенту
  const getMainMarginClass = () => {
    if (isMobile) {
      return ""; // На мобільному відступ не потрібен, сайдбар у Sheet
    }
    switch (sidebarMode) {
      case 'pinned-full':
        return "ml-[var(--sidebar-width)]";
      case 'interactive-hover':
        return "ml-[var(--sidebar-collapsed-width)]";
      case 'hidden':
        return "ml-0"; // Немає відступу, якщо сайдбар прихований
      default:
        return "ml-[var(--sidebar-width)]";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar
        onOpenSidebar={handleOpenSidebar} // Змінено назву пропсу
        isScrolled={isScrolled}
        sidebarMode={sidebarMode} // Передаємо режим сайдбару
        setSidebarMode={setSidebarMode} // Передаємо функцію для зміни режиму
      />
      <div className="flex flex-1">
        {isMobile || sidebarMode === 'hidden' ? ( // Використовуємо Sheet для мобільного або для 'hidden' режиму на десктопі
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetContent side="left" className="w-64 sm:w-72 h-full p-0">
              <SheetTitle className="sr-only">Навігація по сайту</SheetTitle>
              <SheetDescription className="sr-only">Перелік уроків та розділів сайту.</SheetDescription>
              <Sidebar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isMobile={isMobile} // Залишаємо isMobile для адаптації всередині Sidebar
                sidebarMode={sidebarMode} // Передаємо режим сайдбару
                onCloseSidebar={handleCloseSidebar} // Змінено назву пропсу
              />
            </SheetContent>
          </Sheet>
        ) : (
          // Стаціонарний сайдбар для десктопу в режимах 'pinned-full' та 'interactive-hover'
          <Sidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isMobile={false}
            sidebarMode={sidebarMode} // Передаємо режим сайдбару
          />
        )}
        <main ref={mainRef} className={cn(
          "flex-grow container mx-auto p-4 bg-background overflow-y-auto",
          getMainMarginClass(), // Динамічний відступ
          isScrolled ? "pt-12" : "pt-16" // Коригування відступу залежно від висоти Navbar
        )}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;