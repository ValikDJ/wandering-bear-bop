"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchIndex, SearchItem } from "@/data/searchIndex";
import { useNavigate } from "react-router-dom";
import { highlightText } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const getEmojiForType = (type: SearchItem['type']) => {
  switch (type) {
    case 'lesson': return '📚';
    case 'example': return '💡';
    case 'quiz': return '🎮';
    case 'project-template': return '🚀';
    case 'glossary': return '📖';
    default: return '';
  }
};

const SearchInputWithSuggestions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (searchTerm.trim().length > 1) {
      debounceTimeoutRef.current = setTimeout(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = searchIndex.filter(item =>
          item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          item.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseSearchTerm))
        ).slice(0, 7); // Limit suggestions to 7
        setSuggestions(filtered);
        setOpen(true);
      }, 300); // Debounce for 300ms
    } else {
      setSuggestions([]);
      setOpen(false);
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  const handleSelectSuggestion = (item: SearchItem) => {
    setSearchTerm(""); // Clear search term after selection
    setOpen(false);
    navigate(`${item.path}${item.sectionId ? `#${item.sectionId}` : ''}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setOpen(false);
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full max-w-xs">
          <Input
            placeholder="Пошук..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-8 py-1 rounded-md bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/70 focus:bg-primary-foreground/20 focus:outline-none focus:ring-1 focus:ring-primary-foreground/50"
            aria-label="Поле пошуку"
          />
          <Search className="absolute left-2 h-4 w-4 text-primary-foreground/70" />
        </form>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-50">
        <Command>
          <CommandInput
            value={searchTerm}
            onValueChange={setSearchTerm}
            placeholder="Шукати..."
            className="h-9"
            aria-label="Поле пошуку в підказках"
          />
          <CommandList>
            {suggestions.length === 0 && searchTerm.trim().length > 1 ? (
              <CommandEmpty>Нічого не знайдено.</CommandEmpty>
            ) : (
              <CommandGroup heading="Підказки">
                {suggestions.map((item) => (
                  <CommandItem
                    key={`${item.path}-${item.sectionId || item.title}`}
                    onSelect={() => handleSelectSuggestion(item)}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <span className="text-lg">{getEmojiForType(item.type)}</span>
                    <div>
                      <div className="font-medium">{highlightText(item.title, searchTerm)}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {highlightText(item.description, searchTerm)}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchInputWithSuggestions;