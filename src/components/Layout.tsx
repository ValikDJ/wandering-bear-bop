import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useLocation, Link } from "react-router-dom";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { useLayout } from "@/contexts/LayoutContext";
import BreadcrumbNav from "./BreadcrumbNav";

interface LayoutProps {
  children: React.ReactNode;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  searchTerm,
  setSearchTerm,
}) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const scrollTop = useScrollPosition(mainRef);
  const isScrolled = scrollTop > 50;
  const location = useLocation();
  const { sidebarMode, setSidebarMode } = useLayout();

  const handleOpenSidebar = () => setIsSidebarOpen(true);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  const toggleSidebar = () => {
    if (sidebarMode === 'pinned-full') {
      setSidebarMode('interactive-hover');
    } else if (sidebarMode === 'interactive-hover') {
      setSidebarMode('hidden');
    } else {
      setSidebarMode('pinned-full');
    }
  };

  const getMainMarginClass = () => {
    if (isMobile) {
      return "";
    }
    switch (sidebarMode) {
      case 'pinned-full':
        return "ml-[var(--sidebar-width)]";
      case 'interactive-hover':
        return "ml-[var(--sidebar-collapsed-width)]";
      case 'hidden':
        return "ml-0";
      default:
        return "ml-[var(--sidebar-width)]";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar
        onOpenSidebar={handleOpenSidebar}
        isScrolled={isScrolled}
      />
      <div className="flex flex-1">
        {isMobile || sidebarMode === 'hidden' ? (
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetContent side="left" className="w-64 sm:w-72 h-full p-0 no-print z-50"> {/* Added z-50 */}
              <SheetTitle className="sr-only">Навігація по сайту</SheetTitle>
              <SheetDescription className="sr-only">Перелік уроків та розділів сайту.</SheetDescription>
              <Sidebar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isMobile={isMobile}
                onCloseSidebar={handleCloseSidebar}
              />
            </SheetContent>
          </Sheet>
        ) : (
          <Sidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isMobile={false}
            className="sidebar no-print"
          />
        )}
        <main ref={mainRef} className={cn(
          "flex-grow container mx-auto p-4 bg-background overflow-y-auto",
          getMainMarginClass(),
          isScrolled ? "pt-12" : "pt-16",
          "max-w-screen-lg"
        )}>
          <BreadcrumbNav />
          {children}
        </main>
      </div>
      <Footer />

      {/* Кнопка "На головну" в лівому нижньому куті */}
      {location.pathname !== "/" && (
        <Button
          asChild
          variant="default"
          size="lg"
          className="fixed bottom-4 left-4 z-40 shadow-lg bg-brand-primary text-primary-foreground hover:bg-brand-primary-hover transition-all duration-300 ease-in-out home-button no-print"
        >
          <Link to="/">
            <Home className="h-5 w-5 mr-2" />
            На головну
          </Link>
        </Button>
      )}

      {/* Sidebar Toggle Button (Desktop only, when not hidden) */}
      {!isMobile && sidebarMode !== 'hidden' && (
        <Button
          onClick={toggleSidebar}
          variant="outline"
          size="icon"
          className="fixed top-20 left-4 z-40 shadow-lg bg-card text-card-foreground hover:bg-card/80 no-print"
          aria-label={sidebarMode === 'interactive-hover' ? "Розгорнути бічну панель" : "Згорнути бічну панель"}
        >
          {sidebarMode === 'interactive-hover' ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      )}
    </div>
  );
};

export default Layout;