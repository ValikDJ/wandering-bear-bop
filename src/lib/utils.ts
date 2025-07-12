import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Виділяє входження searchTerm у тексті.
 * @param text Оригінальний текст.
 * @param searchTerm Термін для пошуку та виділення.
 * @returns React.ReactNode з виділеними частинами.
 */
export function highlightText(text: string, searchTerm: string): React.ReactNode {
  if (!searchTerm || searchTerm.trim() === "") {
    return text;
  }

  const parts: React.ReactNode[] = [];
  const lowerCaseText = text.toLowerCase();
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  let lastIndex = 0;

  let match;
  const regex = new RegExp(lowerCaseSearchTerm, 'gi'); // 'gi' for global and case-insensitive

  while ((match = regex.exec(lowerCaseText)) !== null) {
    const startIndex = match.index;
    const endIndex = regex.lastIndex;

    // Add text before the match
    if (startIndex > lastIndex) {
      parts.push(text.substring(lastIndex, startIndex));
    }

    // Add the highlighted match
    parts.push(
      <span key={startIndex} className="bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100 rounded px-0.5">
        {text.substring(startIndex, endIndex)}
      </span>
    );
    lastIndex = endIndex;
  }

  // Add any remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
}