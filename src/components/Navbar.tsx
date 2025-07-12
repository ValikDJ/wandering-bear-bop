import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Menu, BookOpenText } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import SearchInputWithSuggestions from "./SearchInputWithSuggestions";
import ThemeToggle from "./ThemeToggle"; // Імпортуємо ThemeToggle

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();

  const navLinks = (
    <>
      <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20 w-full justify-start">
        <Link to="/html-tags">HTML Теги</Link>
      </Button>
      <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20 w-full justify-start">
        <Link to="/css-properties">CSS Властивості</Link>
      </Button>
      <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20 w-full justify-start">
        <Link to="/css-selectors">CSS Селектори</Link>
      </Button>
      <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20 w-full justify-start">
        <Link to="/examples">Приклади</Link>
      </Button>
      <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20 w-full justify-start">
        <Link to="/project-template">
          <FileText className="mr-2 h-4 w-4" /> Шаблон Проекту
        </Link>
      </Button>
      <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20 w-full justify-start">
        <Link to="/quiz">Тест</Link>
      </Button>
      <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20 w-full justify-start">
        <Link to="/glossary">
          <BookOpenText className="mr-2 h-4 w-4" /> Словник
        </Link>
      </Button>
    </>
  );

  return (
    <nav className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-accent-foreground transition-colors">
          Веб-Майстерня для Дітей
        </Link>
        <div className="flex items-center gap-2">
          <SearchInputWithSuggestions />
          <ThemeToggle /> {/* Додаємо перемикач теми */}

          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Відкрити меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-primary text-primary-foreground p-4">
                <div className="flex flex-col gap-2 pt-8">
                  <SheetClose asChild>{navLinks}</SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              {navLinks}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;