"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"; // Змінено на Input

const SearchInputWithSuggestions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative flex items-center w-full max-w-xs">
      <Input // Змінено на Input
        placeholder="Пошук..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-8 pr-8 py-1 rounded-md bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/70 focus:bg-primary-foreground/20 focus:outline-none focus:ring-1 focus:ring-primary-foreground/50"
      />
      <Search className="absolute left-2 h-4 w-4 text-primary-foreground/70" />
    </div>
  );
};

export default SearchInputWithSuggestions;