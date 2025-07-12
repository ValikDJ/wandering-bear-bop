import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Menu, Search } from "lucide-react"; // Removed BookOpenText icon, added Search
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input"; // Import Input component

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // Clear search term after navigating
    }
  };

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
      {/* Removed Glossary Link */}
      {/* <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20 w-full justify-start">
        <Link to="/glossary">
          <BookOpenText className="mr-2 h-4 w-4" /> Словник
        </Link>
      </Button> */}
    </>
  );

  return (
    <nav className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-accent-foreground transition-colors">
          Веб-Майстерня для Дітей
        </Link>
        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Input
              type="text"
              placeholder="Пошук..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-2 py-1 rounded-md bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/70 focus:bg-primary-foreground/20 focus:outline-none focus:ring-1 focus:ring-primary-foreground/50"
            />
            <Search className="absolute left-2 h-4 w-4 text-primary-foreground/70" />
          </form>

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