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
}

const Navbar: React.FC<NavbarProps> = ({ onOpenMobileSidebar }) => {
  const isMobile = useIsMobile();

  // Допоміжна функція для рендерингу посилань для мобільного меню
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
    <nav className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-accent-foreground transition-colors">
          Веб-Майстерня для Дітей
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20" onClick={onOpenMobileSidebar}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Відкрити меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-primary text-primary-foreground p-4">
                <div className="flex flex-col gap-2 pt-8">
                  {renderMobileNavLinks(sidebarNavData)}
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;