import { glossaryData, GlossaryTerm } from "./glossaryData";
import { lessonSearchItems } from "./lessonSearchItems"; // Імпортуємо lessonSearchItems з його власного файлу

export interface SearchItem {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  sectionId?: string; // Optional ID for specific section within the page
  type: 'lesson' | 'example' | 'quiz' | 'project-template' | 'glossary'; // New: Type of content
  difficulty?: 'easy' | 'medium' | 'hard'; // New: Optional difficulty
}

// Combine lesson-specific search items and glossary terms
export const searchIndex: SearchItem[] = [
  ...lessonSearchItems, // Використовуємо імпортований масив
  ...glossaryData.map(term => ({
    title: `Словник Термінів: ${term.term}`,
    description: term.definition,
    path: "/glossary",
    keywords: [term.term.toLowerCase(), ...term.definition.toLowerCase().split(' ').filter(word => word.length > 2)], // Basic keyword extraction from definition
    type: "glossary", // Assign type 'glossary'
  })),
];