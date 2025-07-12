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
    keywords: [
      term.term.toLowerCase(),
      term.term, // Додаємо оригінальний термін
      ...term.definition.toLowerCase().split(/\s+/).filter(word => word.length > 2), // Basic keyword extraction from definition
      ...(term.codeExample ? term.codeExample.toLowerCase().split(/\s+|[<>/{}();:]+/).filter(word => word.length > 0) : []), // Додаємо слова з прикладу коду
    ],
    path: "/glossary",
    type: "glossary" as const, // Assign type 'glossary' with const assertion
  })),
];