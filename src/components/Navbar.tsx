import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "./ThemeToggle";
import { sidebarNavData, SidebarNavItem } from "@/data/sidebarNavData";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenMobileSidebar: () => void;
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenMobileSidebar, isScrolled }) => {
  const isMobile = useIsMobile();

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
        "fixed top-0 left-0 w-full z-30 flex items-center transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-sm shadow-lg h-12 px-2" // Зменшена висота та відступи при прокручуванні
          : "bg-primary text-primary-foreground shadow-md h-16 px-4" // Стандартна висота та відступи
      )}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center h-full">
        {/* Logo - завжди присутній, але зникає при прокручуванні */}
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
          {/* Theme Toggle - завжди видимий */}
          <ThemeToggle />

          {/* Desktop Navigation Links - видимі лише на десктопі, зникають при прокручуванні */}
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

          {/* Menu Button - завжди рендериться, але його видимість та стиль змінюються */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300 ease-in-out",
              // Приховати на десктопі, коли не прокручено
              !isMobile && !isScrolled && "opacity-0 pointer-events-none",
              // Застосувати компактний стиль при прокручуванні (як на мобільному, так і на десктопі)
              isScrolled && "rounded-full bg-accent text-accent-foreground shadow-md",
              // На мобільному, завжди видимий, але його стиль залежить від прокручування
              isMobile && !isScrolled && "rounded-md" // Стандартний мобільний стиль, коли не прокручено
            )}
            onClick={onOpenMobileSidebar}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Відкрити меню</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;