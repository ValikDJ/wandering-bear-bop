"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, History } from "lucide-react";
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
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Fuse from 'fuse.js';
import { expandQueryWithSynonyms } from "@/data/synonymMap";

const RECENT_SEARCHES_KEY = "recent-searches";
const MAX_RECENT_SEARCHES = 5;

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

const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'description', weight: 0.5 },
    { name: 'keywords', weight: 0.9 },
  ],
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

const fuse = new Fuse(searchIndex, fuseOptions);

const SearchInputWithSuggestions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error("Failed to load recent searches from localStorage:", error);
    }
  }, []);

  const saveSearchTerm = useCallback((term: string) => {
    if (!term.trim()) return;
    setRecentSearches(prevSearches => {
      const newSearches = [term, ...prevSearches.filter(s => s !== term)].slice(0, MAX_RECENT_SEARCHES);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
      } catch (error) {
        console.error("Failed to save recent search to localStorage:", error);
      }
      return newSearches;
    });
  }, []);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (searchTerm.trim().length > 1) {
      debounceTimeoutRef.current = setTimeout(() => {
        const expandedQueryArray = expandQueryWithSynonyms(searchTerm); // Передаємо масив
        const results = fuse.search(expandedQueryArray); // Fuse.js обробляє масив краще
        const mappedResults = results.map(result => result.item).slice(0, 7);
        setSuggestions(mappedResults);
        setOpen(true);
      }, 300);
    } else if (searchTerm.trim().length === 0) {
      setSuggestions([]);
      setOpen(false);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  const handleSelectSuggestion = (item: SearchItem) => {
    saveSearchTerm(searchTerm);
    setSearchTerm("");
    setOpen(false);
    navigate(`${item.path}${item.sectionId ? `#${item.sectionId}` : ''}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      saveSearchTerm(searchTerm);
      setOpen(false);
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    setOpen(false);
    navigate(`/search?query=${encodeURIComponent(term)}`);
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
            {searchTerm.trim().length > 1 ? (
              suggestions.length === 0 ? (
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
              )
            ) : (
              recentSearches.length > 0 && (
                <>
                  <CommandGroup heading="Останні запити">
                    {recentSearches.map((term, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => handleRecentSearchClick(term)}
                        className="cursor-pointer flex items-center gap-2"
                      >
                        <History className="h-4 w-4 text-muted-foreground" />
                        <span>{term}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchInputWithSuggestions;