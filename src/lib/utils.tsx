import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react"; // React is needed for JSX

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Екранує спеціальні символи регулярних виразів у рядку.
 * Це необхідно для безпечного використання вводу користувача в RegExp конструкторі.
 * @param string Вхідний рядок.
 * @returns Екранований рядок.
 */
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& означає знайдений підрядок
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
  // Екрануємо searchTerm перед створенням RegExp
  const lowerCaseSearchTermEscaped = escapeRegExp(searchTerm.toLowerCase());
  let lastIndex = 0;

  let match;
  const regex = new RegExp(lowerCaseSearchTermEscaped, 'gi'); // 'gi' for global and case-insensitive

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