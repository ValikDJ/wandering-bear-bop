import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, PanelLeftOpen, PanelLeftClose, PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./ThemeToggle";
import { sidebarNavData, SidebarNavItem } from "@/data/sidebarNavData";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Keep Select for now, might be removed later
import { useLayout } from "@/contexts/LayoutContext";
import type { SidebarMode } from "@/contexts/LayoutContext";

interface NavbarProps {
  onOpenSidebar: () => void;
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenSidebar, isScrolled }) => {
  const isMobile = useIsMobile();
  const { sidebarMode, setSidebarMode } = useLayout(); // Consume context

  const renderMobileNavLinks = (items: SidebarNavItem[], level: number = 0) => {
    return items.map(item => {
      const isGroup = item.children && item.children.length > 0;
      const Icon = item.icon;
      const indentClass = level === 1 ? "pl-8" : level === 2 ? "pl-12" : "pl-4";

      if (isGroup) {
        return (
          <React.Fragment key={item.id}>
            <h4 className={cn("py-2 text-primary-foreground/80 font-semibold", indentClass, level === 0 ? "mt-2 text-base" : "text-sm")}>
              {Icon && React.createElement(Icon, { className: "mr-2 h-4 w-4 inline-block" })}
              {item.title}
            </h4>
            {item.children && renderMobileNavLinks(item.children, level + 1)}
          </React.Fragment>
        );
      } else {
        return (
          <SheetClose key={item.id} asChild>
            <Link
              to={`${item.path}${item.sectionId ? `#${item.sectionId}` : ''}`}
              className={cn(
                "block py-2 text-primary-foreground hover:bg-primary-foreground/20",
                indentClass,
                level === 0 ? "font-medium" : "text-sm"
              )}
            >
              {Icon && React.createElement(Icon, { className: "mr-2 h-4 w-4 inline-block" })}
              {item.title}
            </Link>
          </SheetClose>
        );
      }
    });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-30 flex items-center transition-all duration-300 ease-in-out navbar no-print",
        isScrolled
          ? "bg-background/80 backdrop-blur-sm shadow-lg h-12 px-2"
          : "bg-primary text-primary-foreground shadow-md h-16 px-4"
      )}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center h-full">
        <Link
          to="/"
          className={cn(
            "text-2xl font-bold transition-opacity duration-300 ease-in-out",
            isScrolled ? "opacity-0 pointer-events-none" : "opacity-100 hover:text-accent-foreground"
          )}
        >
          Веб-Майстерня
        </Link>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Desktop Navigation Links - visible only on desktop, disappear on scroll */}
          {!isMobile && (
            <div
              className={cn(
                "flex flex-wrap gap-2 mt-2 sm:mt-0 transition-opacity duration-300 ease-in-out",
                isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            >
              <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/html-tags">HTML</Link>
              </Button>
              <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/css-properties">CSS</Link>
              </Button>
              <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/examples">Приклади</Link>
              </Button>
              <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/quiz">Тест</Link>
              </Button>
              <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/glossary">Словник</Link>
              </Button>
            </div>
          )}

          {/* Menu Button - only visible if sidebar is not otherwise visible (mobile or hidden mode) */}
          {(isMobile || sidebarMode === 'hidden') && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300 ease-in-out",
                isScrolled && "rounded-full bg-accent text-accent-foreground shadow-md",
                !isScrolled && "rounded-md"
              )}
              onClick={onOpenSidebar}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Відкрити меню</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;