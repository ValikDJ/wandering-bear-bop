"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { searchIndex } from "@/data/searchIndex";
import { glossaryData } from "@/data/glossaryData";
import { Button } from "@/components/ui/button";
import { highlightText } from "@/lib/utils";

interface SearchSuggestion {
  type: 'term' | 'page';
  value: string; // The main text to display (term or page title)
  description: string; // Short description/preview
  path?: string;
  sectionId?: string;
}

const SearchInputWithSuggestions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  // Removed popoverContentRef as it was used with the problematic useEffect

  // Function to filter and prepare suggestions
  const getSuggestions = useCallback((query: string): SearchSuggestion[] => {
    if (query.length < 2) return [];

    const lowerCaseQuery = query.toLowerCase();
    const newSuggestions: SearchSuggestion[] = [];

    // Add glossary terms as suggestions
    glossaryData.forEach(term => {
      if (term.term.toLowerCase().includes(lowerCaseQuery) || term.definition.toLowerCase().includes(lowerCaseQuery)) {
        newSuggestions.push({
          type: 'term',
          value: term.term,
          description: term.definition,
          path: '/glossary', // Link to glossary page for terms
        });
      }
    });

    // Add page titles/keywords as suggestions
    searchIndex.forEach(item => {
      const isMatch =
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery));

      if (isMatch) {
        // Avoid duplicate suggestions if a term is also a page keyword
        if (!newSuggestions.some(s => s.value.toLowerCase() === item.title.toLowerCase())) {
          newSuggestions.push({
            type: 'page',
            value: item.title,
            description: item.description,
            path: item.path,
            sectionId: item.sectionId,
          });
        }
      }
    });

    // Sort suggestions: exact term matches first, then page titles, then others
    newSuggestions.sort((a, b) => {
      const aMatchesTerm = a.value.toLowerCase() === lowerCaseQuery;
      const bMatchesTerm = b.value.toLowerCase() === lowerCaseQuery;

      if (aMatchesTerm && !bMatchesTerm) return -1;
      if (!aMatchesTerm && bMatchesTerm) return 1;

      return a.value.localeCompare(b.value); // Alphabetical sort otherwise
    });

    return newSuggestions.slice(0, 10); // Limit to 10 suggestions
  }, []);

  useEffect(() => {
    const newSuggestions = getSuggestions(searchTerm);
    setSuggestions(newSuggestions);
    // Only open if there are suggestions AND the search term is long enough
    setOpen(newSuggestions.length > 0 && searchTerm.length > 1);
  }, [searchTerm, getSuggestions]);

  const handleSelect = (suggestion: SearchSuggestion) => {
    setSearchTerm(suggestion.value); // Set input value to selected suggestion
    setOpen(false); // Close popover
    if (inputRef.current) {
      inputRef.current.blur(); // Blur input to remove focus
    }

    // Navigate based on suggestion type
    if (suggestion.type === 'term') {
      navigate(`/search?query=${encodeURIComponent(suggestion.value)}`);
    } else if (suggestion.path) {
      navigate(`${suggestion.path}${suggestion.sectionId ? `#${suggestion.sectionId}` : ''}`);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setOpen(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setOpen(false);
    if (inputRef.current) {
      inputRef.current.focus(); // Keep focus on input after clearing
    }
  };

  // Removed the problematic useEffect for focus management
  // Removed the handleDocumentClick and its useEffect for closing popover

  return (
    <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full max-w-xs">
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger asChild>
          <div className="relative flex items-center w-full">
            <CommandInput
              ref={inputRef}
              placeholder="Пошук..."
              value={searchTerm}
              onValueChange={(value) => {
                setSearchTerm(value);
                // The useEffect above will handle setting 'open' based on suggestions
              }}
              className="pl-8 pr-8 py-1 rounded-md bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/70 focus:bg-primary-foreground/20 focus:outline-none focus:ring-1 focus:ring-primary-foreground/50"
              // Removed onKeyDown as CommandInput should handle arrow keys internally
            />
            <Search className="absolute left-2 h-4 w-4 text-primary-foreground/70" />
            {searchTerm && (
              <Button
                type="button"
                onClick={handleClearSearch}
                variant="ghost"
                size="icon"
                className="absolute right-1 h-6 w-6 text-primary-foreground/70 hover:bg-primary-foreground/30"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Очистити пошук</span>
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-50">
          <Command>
            <CommandList>
              {suggestions.length === 0 && searchTerm.length > 1 ? (
                <CommandEmpty className="py-2 px-4 text-sm text-muted-foreground">Нічого не знайдено.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {suggestions.map((suggestion, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => handleSelect(suggestion)}
                      className="cursor-pointer flex flex-col items-start p-2 hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="font-semibold text-primary-foreground">
                        {suggestion.type === 'term' ? `Термін: ` : `Урок: `}
                        {highlightText(suggestion.value, searchTerm)}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {highlightText(suggestion.description, searchTerm)}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </form>
  );
};

export default SearchInputWithSuggestions;