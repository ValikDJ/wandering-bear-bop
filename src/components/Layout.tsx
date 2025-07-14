import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { cn } from "@/lib/utils"; // Import cn

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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const scrollTop = useScrollPosition(mainRef);
  const isScrolled = scrollTop > 50;

  const handleOpenMobileSidebar = () => setIsMobileSidebarOpen(true);
  const handleCloseMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar
        onOpenMobileSidebar={handleOpenMobileSidebar}
        isScrolled={isScrolled}
      />
      <div className="flex flex-1">
        {isMobile ? (
          <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
            <SheetContent side="left" className="w-64 sm:w-72 h-full p-0">
              <SheetTitle className="sr-only">Навігація по сайту</SheetTitle>
              <SheetDescription className="sr-only">Перелік уроків та розділів сайту.</SheetDescription>
              <Sidebar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isMobile={true}
                onCloseMobileSidebar={handleCloseMobileSidebar}
              />
            </SheetContent>
          </Sheet>
        ) : (
          <Sidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isMobile={false}
          />
        )}
        <main ref={mainRef} className={cn(
          "flex-grow container mx-auto p-4 bg-background overflow-y-auto lg:ml-[var(--sidebar-width)]",
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