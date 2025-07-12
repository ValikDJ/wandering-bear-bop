import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-accent-foreground transition-colors">
          Веб-Майстерня для Дітей
        </Link>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
            <Link to="/html-tags">HTML Теги</Link>
          </Button>
          <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
            <Link to="/css-properties">CSS Властивості</Link>
          </Button>
          <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
            <Link to="/css-selectors">CSS Селектори</Link>
          </Button>
          <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
            <Link to="/examples">Приклади</Link>
          </Button>
          {/* <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
            <Link to="/popular-examples">Приклади Сайтів</Link>
          </Button> */} {/* Видалено посилання */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;