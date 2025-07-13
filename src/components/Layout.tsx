import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";
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
  const location = useLocation();

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
            <SheetContent side="left" className="w-64 sm:w-72 h-full">
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
        <main className="flex-grow container mx-auto p-4 bg-background overflow-y-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;