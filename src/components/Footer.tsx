import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground p-4 text-center mt-8 shadow-inner">
      <div className="container mx-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} Веб-Майстерня для Дітей. Всі права захищені.</p>
      </div>
    </footer>
  );
};

export default Footer;