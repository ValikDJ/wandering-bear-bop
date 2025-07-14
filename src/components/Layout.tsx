import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"; // Import SheetTitle, SheetDescription
import { useLocation } from "react-router-dom";

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
  // State for chat window removed

  const handleOpenMobileSidebar = () => setIsMobileSidebarOpen(true);
  const handleCloseMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar
        onOpenMobileSidebar={handleOpenMobileSidebar}
      />
      <div className="flex flex-1">
        {isMobile ? (
          <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
            <SheetContent side="left" className="w-64 sm:w-72 h-full p-0">
              <SheetTitle className="sr-only">Навігація по сайту</SheetTitle> {/* Visually hidden title */}
              <SheetDescription className="sr-only">Перелік уроків та розділів сайту.</SheetDescription> {/* Visually hidden description */}
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
        <main className="flex-grow container mx-auto p-4 bg-background overflow-y-auto lg:ml-[var(--sidebar-width)]">
          {children}
        </main>
      </div>
      <Footer />

      {/* Chat Bubble and Chat Window removed */}
    </div>
  );
};

export default Layout;