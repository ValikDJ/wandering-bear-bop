import { SearchItem, searchIndex } from "./searchIndex";
import { BookOpenText, Code, Lightbulb, GraduationCap, FileText, Book, Paintbrush, Home } from "lucide-react"; // Додано Home для домашнього завдання

export interface SidebarNavItem {
  id: string;
  title: string;
  path?: string; // Необов'язково для заголовків груп
  sectionId?: string; // Для прямих посилань всередині сторінки
  icon?: React.ElementType; // Компонент іконки Lucide
  children?: SidebarNavItem[];
  type?: SearchItem['type']; // Для допомоги з фільтрацією/відображенням
  keywords?: string[]; // Для пошуку
}

// Допоміжна функція для відображення SearchItem до SidebarNavItem
const mapSearchItemToSidebarNavItem = (item: SearchItem): SidebarNavItem => ({
  id: item.sectionId || item.title.replace(/[^a-zA-Z0-9А-Яа-яІіЇїЄєҐґ]/g, '-').toLowerCase(), // Очищення ID з підтримкою українських літер
  title: item.title,
  path: item.path,
  sectionId: item.sectionId,
  type: item.type,
  keywords: item.keywords,
});

// Логіка групування
const homeworkAssignment = searchIndex.filter(item => item.path === '/homework');
const htmlLessons = searchIndex.filter(item => item.path === '/html-tags' && item.type === 'lesson');
const cssPropertiesLessons = searchIndex.filter(item => item.path === '/css-properties' && item.type === 'lesson');
const cssSelectorsLessons = searchIndex.filter(item => item.path === '/css-selectors' && item.type === 'lesson');
const examples = searchIndex.filter(item => item.type === 'example');
const projectTemplate = searchIndex.filter(item => item.path === '/project-template');
const quiz = searchIndex.filter(item => item.type === 'quiz');
const glossary = searchIndex.filter(item => item.type === 'glossary');
const cssPlayground = searchIndex.filter(item => item.path === '/css-playground');
const cssGradientGenerator = searchIndex.filter(item => item.path === '/examples' && item.sectionId === 'example-css-gradient-generator');

export const sidebarNavData: SidebarNavItem[] = [
  {
    id: "homework",
    title: "Домашнє Завдання",
    icon: Home, // Використовуємо Home icon
    children: homeworkAssignment.map(item => ({
      ...mapSearchItemToSidebarNavItem(item),
      title: item.title.replace("Домашнє завдання: ", ""),
    })),
  },
  {
    id: "basics",
    title: "Основи HTML та CSS",
    icon: BookOpenText,
    children: [
      {
        id: "html-tags-group",
        title: "HTML Теги",
        path: "/html-tags",
        icon: Code,
        children: htmlLessons.map(item => ({
          ...mapSearchItemToSidebarNavItem(item),
          title: item.title.replace("HTML Теги: ", ""), // Очищення заголовка для відображення
        })),
      },
      {
        id: "css-properties-group",
        title: "CSS Властивості",
        path: "/css-properties",
        icon: Code,
        children: cssPropertiesLessons.map(item => ({
          ...mapSearchItemToSidebarNavItem(item),
          title: item.title.replace("CSS Властивості: ", ""),
        })),
      },
      {
        id: "css-selectors-group",
        title: "CSS Селектори",
        path: "/css-selectors",
        icon: Code,
        children: cssSelectorsLessons.map(item => ({
          ...mapSearchItemToSidebarNavItem(item),
          title: item.title.replace("CSS Селектори: ", ""),
        })),
      },
    ],
  },
  {
    id: "practice",
    title: "Практика та Проекти",
    icon: Lightbulb,
    children: [
      {
        id: "examples-group",
        title: "Практичні Приклади",
        path: "/examples",
        icon: Lightbulb,
        children: examples.map(item => ({
          ...mapSearchItemToSidebarNavItem(item),
          title: item.title.replace("Практичні Приклади: ", ""),
        })),
      },
      {
        id: "project-template-item",
        title: "Шаблон Проекту",
        path: "/project-template",
        icon: FileText,
        type: "project-template",
        keywords: projectTemplate[0]?.keywords,
      },
      {
        id: "css-playground-item",
        title: "CSS Майстерня",
        path: "/css-playground",
        icon: Paintbrush,
        type: "example",
        keywords: cssPlayground[0]?.keywords,
      },
      {
        id: "css-gradient-generator-item",
        title: "Генератор CSS Градієнтів",
        path: "/examples",
        sectionId: "example-css-gradient-generator",
        icon: Paintbrush,
        type: "example",
        keywords: cssGradientGenerator[0]?.keywords,
      },
    ],
  },
  {
    id: "assessment",
    title: "Перевірка Знань",
    icon: GraduationCap,
    children: [
      {
        id: "quiz-item",
        title: "Тест",
        path: "/quiz",
        icon: GraduationCap,
        type: "quiz",
        keywords: quiz[0]?.keywords,
      },
    ],
  },
  {
    id: "reference",
    title: "Довідник",
    icon: Book,
    children: [
      {
        id: "glossary-item",
        title: "Словник Термінів",
        path: "/glossary",
        icon: Book,
        type: "glossary",
        keywords: glossary.flatMap(item => item.keywords),
      },
    ],
  },
];