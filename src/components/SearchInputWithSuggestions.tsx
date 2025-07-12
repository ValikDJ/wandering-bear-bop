import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { searchIndex } from "@/data/searchIndex";
import { glossaryData } from "@/data/glossaryData";

interface SearchInputWithSuggestionsProps {
  initialSearchTerm?: string;
}

const SearchInputWithSuggestions: React.FC<SearchInputWithSuggestionsProps> = ({ initialSearchTerm = "" }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ type: 'term' | 'page'; value: string; path?: string; sectionId?: string; }>>([]); // Added sectionId
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const newSuggestions: Array<{ type: 'term' | 'page'; value: string; path?: string; sectionId?: string; }> = [];

      // Add glossary terms as suggestions
      glossaryData.forEach(term => {
        if (term.term.toLowerCase().includes(lowerCaseSearchTerm)) {
          newSuggestions.push({ type: 'term', value: term.term });
        }
      });

      // Add page titles/keywords as suggestions
      searchIndex.forEach(item => {
        if (
          item.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          item.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseSearchTerm))
        ) {
          // Avoid duplicate suggestions if a term is also a page keyword
          if (!newSuggestions.some(s => s.value.toLowerCase() === item.title.toLowerCase())) {
            newSuggestions.push({ type: 'page', value: item.title, path: item.path, sectionId: item.sectionId }); // Pass sectionId
          }
        }
      });

      // Limit suggestions to a reasonable number
      setSuggestions(newSuggestions.slice(0, 10));
      setOpen(true);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  }, [searchTerm]);

  const handleSelect = (value: string, type: 'term' | 'page', path?: string, sectionId?: string) => { // Added sectionId
    setSearchTerm(value); // Set the input to the selected suggestion
    setOpen(false); // Close the popover
    if (type === 'term') {
      navigate(`/search?query=${encodeURIComponent(value)}`);
    } else if (path) {
      navigate(`${path}${sectionId ? `#${sectionId}` : ''}`); // Navigate with sectionId
    }
    if (inputRef.current) {
      inputRef.current.blur(); // Remove focus from input
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setOpen(false); // Close suggestions on manual submit
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full max-w-xs">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Пошук..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-2 py-1 rounded-md bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/70 focus:bg-primary-foreground/20 focus:outline-none focus:ring-1 focus:ring-primary-foreground/50"
            onFocus={() => searchTerm.length > 1 && setOpen(true)}
          />
          <Search className="absolute left-2 h-4 w-4 text-primary-foreground/70" />
        </form>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandList>
            {suggestions.length === 0 && searchTerm.length > 1 && (
              <CommandEmpty>Нічого не знайдено.</CommandEmpty>
            )}
            <CommandGroup>
              {suggestions.map((suggestion, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handleSelect(suggestion.value, suggestion.type, suggestion.path, suggestion.sectionId)} // Pass sectionId
                  className="cursor-pointer"
                >
                  {suggestion.type === 'term' ? `Термін: ${suggestion.value}` : `Урок: ${suggestion.value}`}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchInputWithSuggestions;