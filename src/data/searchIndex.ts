import { glossaryData } from "./glossaryData";
import { lessonSearchItems } from "./lessonSearchItems";

export interface SearchItem {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  sectionId?: string; // Optional ID for specific section within the page
}

// Combine lesson-specific search items and glossary terms
export const searchIndex: SearchItem[] = [
  ...lessonSearchItems,
  ...glossaryData.map(term => ({
    title: `Словник Термінів: ${term.term}`,
    description: term.definition,
    path: "/glossary",
    keywords: [term.term.toLowerCase(), ...term.definition.toLowerCase().split(' ').filter(word => word.length > 2)], // Basic keyword extraction from definition
  })),
];