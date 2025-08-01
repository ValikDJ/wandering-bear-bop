import { SearchItem } from "./searchIndex";

export const lessonSearchItems: SearchItem[] = [
  {
    title: "🚀 Космічна CSS-академія", // Updated title
    description: "Покроковий посібник зі створення та публікації власної веб-сторінки з HTML та CSS.",
    path: "/cosmic-mission",
    keywords: ["космічна місія", "будівництво", "прикрашання", "сайт", "проект", "публікація", "html", "css", "github pages", "місія", "академія", "стилі", "космічний код", "орбітальні завдання", "дослідження галактики стилів"], // Added keywords
    type: "project-template", // Closest type, as it's a guided project
    difficulty: "easy",
  },
  {
    title: "Домашнє завдання: Створи свій перший сайт!",
    description: "Покрокова інструкція для створення власного персонального сайту.",
    path: "/homework",
    keywords: ["домашнє завдання", "сайт", "проект", "створити сайт", "інструкція", "початок"],
    type: "project-template", // Використовуємо project-template як найближчий тип
    difficulty: "easy",
  },
  {
    title: "Конструктор HTML-проекту", // NEW SEARCH ITEM
    description: "Інтерактивний інструмент для створення базової структури HTML-сайту.",
    path: "/homework", // It's part of the homework page
    sectionId: "homework-code-template", // Assuming it's within the HomeworkCodeTemplate card
    keywords: ["html", "конструктор", "будівництво сайту", "структура", "генератор", "проект"],
    type: "example", // It's an interactive example/tool
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Заголовки",
    description: "Теги <h1>, <h2>, <h3> для створення заголовків різного рівня.",
    path: "/html-tags",
    keywords: ["html", "теги", "заголовки", "h1", "h2", "h3"],
    sectionId: "html-h1-h2-h3",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Параграф",
    description: "Тег <p> для звичайного тексту, абзаців.",
    path: "/html-tags",
    keywords: ["html", "теги", "параграф", "p"],
    sectionId: "html-p",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Зображення",
    description: "Тег <img> для додавання картинок, атрибути `src` та `alt`.",
    path: "/html-tags",
    keywords: ["html", "теги", "зображення", "img", "src", "alt", "картинка"],
    sectionId: "html-img",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Посилання",
    description: "Тег <a> для створення посилань, атрибут `href`.",
    path: "/html-tags",
    keywords: ["html", "теги", "посилання", "a", "href"],
    sectionId: "html-a",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Тіло Документа",
    description: "Тег <body> містить весь видимий вміст веб-сторінки.",
    path: "/html-tags",
    keywords: ["html", "теги", "тіло документа", "body"],
    sectionId: "html-body",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Таблиця",
    description: "Тег <table> для створення таблиць, <tr> та <td>.",
    path: "/html-tags",
    keywords: ["html", "теги", "таблиця", "table", "tr", "td"],
    sectionId: "html-table",
    type: "lesson",
    difficulty: "medium",
  },
  {
    title: "HTML Теги: Основний Вміст",
    description: "Тег <main> позначає основний, унікальний вміст документа.",
    path: "/html-tags",
    keywords: ["html", "теги", "основний вміст", "main"],
    sectionId: "html-main",
    type: "lesson",
    difficulty: "medium",
  },
  {
    title: "HTML Теги: Нижній Колонтитул",
    description: "Тег <footer> містить інформацію про автора, авторські права.",
    path: "/html-tags",
    keywords: ["html", "теги", "нижній колонтитул", "footer"],
    sectionId: "html-footer",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Заголовок Розділу",
    description: "Тег <header> представляє вступний вміст, навігаційні посилання.",
    path: "/html-tags",
    keywords: ["html", "теги", "заголовок розділу", "header"],
    sectionId: "html-header",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Метадані Документа",
    description: "Тег <head> містить метадані про HTML-документ.",
    path: "/html-tags",
    keywords: ["html", "теги", "метадані", "head"],
    sectionId: "html-head",
    type: "lesson",
    difficulty: "medium",
  },
  {
    title: "HTML Теги: Розділ",
    description: "Тег <section> для групування пов'язаного вмісту.",
    path: "/html-tags",
    keywords: ["html", "теги", "розділ", "section"],
    sectionId: "html-section",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Універсальний Блок",
    description: "Тег <div> - універсальний контейнер для групування елементів.",
    path: "/html-tags",
    keywords: ["html", "теги", "блок", "div", "контейнер"],
    sectionId: "html-div",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Кнопка",
    description: "Тег <button> створює інтерактивну кнопку.",
    path: "/html-tags",
    keywords: ["html", "теги", "кнопка", "button"],
    sectionId: "html-button",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Списки",
    description: "Теги <ul> (невпорядкований), <ol> (впорядкований) та <li> (елемент списку) для створення списків.",
    path: "/html-tags",
    keywords: ["html", "теги", "списки", "ul", "ol", "li", "маркери", "номери"],
    sectionId: "html-ul-ol-li",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Жирний Текст",
    description: "Тег <strong> для виділення важливого тексту жирним шрифтом.",
    path: "/html-tags",
    keywords: ["html", "теги", "жирний текст", "strong", "b", "виділення"],
    sectionId: "html-strong",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "HTML Теги: Курсивний Текст",
    description: "Тег <em> для виділення тексту курсивом, що має інтонаційне значення.",
    path: "/html-tags",
    keywords: ["html", "теги", "курсивний текст", "em", "i", "акцент"],
    sectionId: "html-em",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "CSS Властивості: Колір Тексту",
    description: "Властивість `color` змінює колір тексту елемента.",
    path: "/css-properties",
    keywords: ["css", "властивості", "колір", "color", "текст"],
    sectionId: "css-color",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "CSS Властивості: Розмір Шрифту",
    description: "Властивість `font-size` встановлює розмір тексту.",
    path: "/css-properties",
    keywords: ["css", "властивості", "розмір шрифту", "font-size", "текст"],
    sectionId: "css-font-size",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "CSS Властивості: Тип Шрифту",
    description: "Властивість `font-family` змінює тип шрифту тексту.",
    path: "/css-properties",
    keywords: ["css", "властивості", "тип шрифту", "font-family", "текст"],
    sectionId: "css-font-family",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "CSS Властивості: Колір Фону",
    description: "Властивість `background-color` встановлює колір фону елемента.",
    path: "/css-properties",
    keywords: ["css", "властивості", "колір фону", "background-color", "фон"],
    sectionId: "css-background-color",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "CSS Властивості: Вирівнювання Тексту",
    description: "Властивість `text-align` вирівнює текст всередині елемента.",
    path: "/css-properties",
    keywords: ["css", "властивості", "вирівнювання тексту", "text-align", "текст"],
    sectionId: "css-text-align",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "CSS Властивості: Зовнішні Відступи",
    description: "Властивість `margin` створює простір навколо елемента.",
    path: "/css-properties",
    keywords: ["css", "властивості", "зовнішні відступи", "margin", "відступ"],
    sectionId: "css-margin",
    type: "lesson",
    difficulty: "medium",
  },
  {
    title: "CSS Властивості: Внутрішні Відступи",
    description: "Властивість `padding` створює простір між вмістом та рамкою елемента.",
    path: "/css-properties",
    keywords: ["css", "властивості", "внутрішні відступи", "padding", "відступ"],
    sectionId: "css-padding",
    type: "lesson",
    difficulty: "medium",
  },
  {
    title: "CSS Властивості: Рамка",
    description: "Властивість `border` додає рамку навколо елемента.",
    path: "/css-properties",
    keywords: ["css", "властивості", "рамка", "border"],
    sectionId: "css-border",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "CSS Властивості: Заокруглення Кутів",
    description: "Властивість `border-radius` заокруглює кути елемента.",
    path: "/css-properties",
    keywords: ["css", "властивості", "заокруглення кутів", "border-radius", "кути"],
    sectionId: "css-border-radius",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "CSS Властивості: Оформлення Тексту",
    description: "Властивість `text-decoration` додає або видаляє лінії під текстом.",
    path: "/css-properties",
    keywords: ["css", "властивості", "оформлення тексту", "text-decoration", "текст"],
    sectionId: "css-text-decoration",
    type: "lesson",
    difficulty: "medium",
  },
  {
    title: "CSS Властивості: Прозорість",
    description: "Властивість `opacity` встановлює рівень прозорості елемента.",
    path: "/css-properties",
    keywords: ["css", "властивості", "прозорість", "opacity"],
    sectionId: "css-opacity",
    type: "lesson",
    difficulty: "medium",
  },
  {
    title: "CSS Властивості: Ширина",
    description: "Властивість `width` встановлює ширину елемента.",
    path: "/css-properties",
    keywords: ["css", "властивості", "ширина", "width", "розмір"],
    sectionId: "css-width",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "CSS Властивості: Висота",
    description: "Властивість `height` встановлює висоту елемента.",
    path: "/css-properties",
    keywords: ["css", "властивості", "висота", "height", "розмір"],
    sectionId: "css-height",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "CSS Селектори: За Тегом",
    description: "Вибирає всі елементи певного HTML-тегу.",
    path: "/css-selectors",
    keywords: ["css", "селектори", "за тегом", "тег"],
    sectionId: "css-selector-tag",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "CSS Селектори: За Класом",
    description: "Вибирає елементи, які мають певний клас.",
    path: "/css-selectors",
    keywords: ["css", "селектори", "за класом", ".class", "клас"],
    sectionId: "css-selector-class",
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "CSS Селектори: Контекстні (Нащадки)",
    description: "Вибирає елементи, які є нащадками іншого елемента.",
    path: "/css-selectors",
    keywords: ["css", "селектори", "контекстні", "нащадки"],
    sectionId: "css-selector-contextual",
    type: "lesson",
    difficulty: "medium",
  },
  {
    title: "CSS Селектори: Каскадність Стилів",
    description: "Правила, за якими браузер вирішує, який стиль застосувати.",
    path: "/css-selectors",
    keywords: ["css", "селектори", "каскадність", "стилі", "правила"],
    sectionId: "css-selector-cascading",
    type: "lesson",
    difficulty: "hard",
  },
  {
    title: "Практичні Приклади: Твій власний редактор коду!",
    description: "Інтерактивний редактор, де можна писати HTML та CSS.",
    path: "/examples",
    keywords: ["приклади", "редактор коду", "live editor", "code editor", "практика"],
    sectionId: "example-live-editor",
    type: "example",
    difficulty: "easy",
  },
  {
    title: "Практичні Приклади: Створи свій HTML-елемент!",
    description: "Інструмент для конструювання HTML-тегів з різними атрибутами.",
    path: "/examples",
    keywords: ["приклади", "html-елементи", "створення елементів", "конструктор"],
    sectionId: "example-html-creator",
    type: "example",
    difficulty: "easy",
  },
  {
    title: "Практичні Приклади: Генератор CSS Градієнтів",
    description: "Інтерактивний інструмент для створення лінійних та радіальних градієнтів.",
    path: "/examples",
    keywords: ["приклади", "градієнт", "css", "linear-gradient", "radial-gradient", "кольори", "інструмент"],
    sectionId: "example-css-gradient-generator",
    type: "example",
    difficulty: "medium",
  },
  {
    title: "Практичні Приклади: Як зробити заголовок червоним?",
    description: "Приклад використання <h1> та `color`.",
    path: "/examples",
    keywords: ["приклади", "заголовок", "колір", "h1", "color", "червоний"],
    sectionId: "example-red-heading",
    type: "example",
    difficulty: "easy",
  },
  {
    title: "Практичні Приклади: Як додати рамку до картинки та заокруглити її?",
    description: "Приклад використання <img>, `border` та `border-radius`.",
    path: "/examples",
    keywords: ["приклади", "картинка", "рамка", "заокруглення", "img", "border", "border-radius"],
    sectionId: "example-rounded-image",
    type: "example",
    difficulty: "easy",
  },
  {
    title: "Практичні Приклади: Як створити кнопку з яскравим фоном та білим текстом?",
    description: "Приклад використання <button>, `background-color`, `color`, `padding`, `border-radius`.",
    path: "/examples",
    keywords: ["приклади", "кнопка", "background-color", "color", "padding", "border-radius", "стиль"],
    sectionId: "example-styled-button",
    type: "example",
    difficulty: "medium",
  },
  {
    title: "Практичні Приклади: Як вирівняти текст по центру та змінити його розмір?",
    description: "Приклад використання <p>, `text-align` та `font-size`.",
    path: "/examples",
    keywords: ["приклади", "текст", "вирівнювання", "розмір шрифту", "p", "text-align", "font-size", "центр"],
    sectionId: "example-centered-text",
    type: "example",
    difficulty: "easy",
  },
  {
    title: "Практичні Приклади: Як зробити таблицю з рамками?",
    description: "Приклад використання <table>, <tr>, <td> та `border`.",
    path: "/examples",
    keywords: ["приклади", "таблиця", "рамка", "table", "border"],
    sectionId: "example-bordered-table",
    type: "example",
    difficulty: "medium",
  },
  {
    title: "Шаблон HTML для Твого Проекту",
    description: "Готовий HTML шаблон для початку власного веб-проекту, пояснення основних тегів та структури.",
    path: "/project-template",
    keywords: ["шаблон", "проект", "html", "структура", "розмітка", "початок проекту"],
    type: "project-template",
    difficulty: "easy",
  },
  {
    title: "Перевір Свої Знання!",
    description: "Тест з основ HTML та CSS для перевірки знань.",
    path: "/quiz",
    keywords: ["тест", "вікторина", "перевірка знань", "html", "css", "питання", "гра"],
    type: "quiz",
    difficulty: "easy",
  },
  {
    title: "CSS Майстерня",
    description: "Інтерактивний редактор для експериментів з CSS та автозаповненням.",
    path: "/css-playground",
    keywords: ["css", "майстерня", "редактор", "автозаповнення", "кольори", "інтерактив"],
    sectionId: "css-playground-editor",
    type: "example",
    difficulty: "easy",
  },
  {
    title: "Орбітальні Завдання: Міжрядковий Інтервал", // NEW SEARCH ITEM
    description: "Зміни відстань між рядками тексту в абзаці (`p`) за допомогою `line-height`.",
    path: "/cosmic-mission",
    sectionId: "challenge-11-line-height",
    keywords: ["css", "line-height", "міжрядковий інтервал", "текст", "читабельність"],
    type: "lesson",
    difficulty: "easy",
  },
  {
    title: "Орбітальні Завдання: Тінь Космічного Модуля",
    description: "Додай сяючу тінь до модуля космічної станції.",
    path: "/cosmic-mission",
    sectionId: "challenge-12-box-shadow",
    keywords: ["css", "box-shadow", "тінь", "ефект"],
    type: "lesson",
    difficulty: "medium",
  },
  {
    title: "Орбітальні Завдання: Сяючий Текст",
    description: "Зроби текст заголовка сяючим, додавши тінь до тексту.",
    path: "/cosmic-mission",
    sectionId: "challenge-13-text-shadow",
    keywords: ["css", "text-shadow", "тінь тексту", "сяйво", "ефект"],
    type: "lesson",
    difficulty: "medium",
  },
];