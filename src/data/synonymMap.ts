export const synonymMap: { [key: string]: string[] } = {
  "блок": ["div", "block"],
  "колір": ["color", "background-color"],
  "картинка": ["img", "зображення"],
  "посилання": ["a", "link", "href"],
  "текст": ["p", "span", "font"],
  "розмір": ["font-size", "width", "height"],
  "відступ": ["margin", "padding"],
  "рамка": ["border"],
  "заголовок": ["h1", "h2", "h3", "header"],
  "таблиця": ["table"],
  "список": ["ul", "ol", "li"],
  "кнопка": ["button"],
  "прозорість": ["opacity"],
  "вирівнювання": ["text-align"],
  "команди": ["тег", "властивість"], // Додано для покращення пошуку
};

/**
 * Розширює пошуковий запит синонімами.
 * @param query Оригінальний пошуковий запит.
 * @returns Масив слів, включаючи оригінальні та їх синоніми.
 */
export const expandQueryWithSynonyms = (query: string): string[] => {
  const words = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  const expandedWords = new Set<string>();

  words.forEach(word => {
    expandedWords.add(word); // Додаємо оригінальне слово
    if (synonymMap[word]) {
      synonymMap[word].forEach(synonym => expandedWords.add(synonym)); // Додаємо синоніми
    }
    // Також перевіряємо, чи є слово синонімом для іншого терміна
    for (const term in synonymMap) {
      if (synonymMap[term].includes(word)) {
        expandedWords.add(term);
      }
    }
  });

  return Array.from(expandedWords);
};