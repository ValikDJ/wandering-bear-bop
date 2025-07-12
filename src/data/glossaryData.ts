export interface GlossaryTerm {
  term: string;
  definition: string;
  codeExample?: string; // Optional: code example for the term
  language?: "html" | "css"; // Optional: language of the code example
}

export const glossaryData: GlossaryTerm[] = [
  {
    term: "HTML",
    definition: "HyperText Markup Language – мова розмітки, яка використовується для створення структури веб-сторінок. Це як кістяк твого сайту.",
  },
  {
    term: "CSS",
    definition: "Cascading Style Sheets – мова стилів, яка використовується для оформлення зовнішнього вигляду веб-сторінок. Це як одяг для твого сайту.",
  },
  {
    term: "Тег",
    definition: "Основний будівельний блок HTML. Теги позначають різні типи вмісту, наприклад, `<p>` для параграфа або `<img>` для зображення.",
  },
  {
    term: "Атрибут",
    definition: "Додаткова інформація, що надається HTML-тегу. Наприклад, `src` в тегу `<img>` вказує шлях до зображення.",
  },
  {
    term: "Селектор CSS",
    definition: "Шаблон, який використовується для вибору HTML-елементів, до яких застосовуватимуться стилі CSS. Наприклад, `p` вибере всі параграфи, `.my-class` вибере елементи з класом 'my-class'.",
  },
  {
    term: "Властивість CSS",
    definition: "Параметр стилю, який можна застосувати до HTML-елемента. Наприклад, `color` для кольору тексту, `font-size` для розміру шрифту.",
  },
  {
    term: "Значення CSS",
    definition: "Конкретне налаштування для властивості CSS. Наприклад, у `color: blue;` 'blue' є значенням.",
  },
  {
    term: "Box Model (Блокова Модель)",
    definition: "Концепція в CSS, яка описує, як кожен HTML-елемент розглядається як прямокутна коробка, що складається з вмісту (content), внутрішніх відступів (padding), рамки (border) та зовнішніх відступів (margin).",
  },
  {
    term: "Margin (Зовнішній відступ)",
    definition: "Простір *навколо* елемента, який відштовхує його від інших елементів.",
    codeExample: `div {
  margin: 20px;
}`,
    language: "css",
  },
  {
    term: "Padding (Внутрішній відступ)",
    definition: "Простір *між вмістом* елемента та його рамкою.",
    codeExample: `div {
  padding: 15px;
}`,
    language: "css",
  },
  {
    term: "Border (Рамка)",
    definition: "Лінія, що оточує padding та content елемента.",
    codeExample: `p {
  border: 2px solid red;
}`,
    language: "css",
  },
  {
    term: "Content (Вміст)",
    definition: "Фактичний вміст елемента, наприклад, текст або зображення.",
  },
  {
    term: "Responsive Design (Адаптивний Дизайн)",
    definition: "Підхід до веб-дизайну, який дозволяє веб-сторінкам виглядати добре на різних пристроях (комп'ютери, планшети, смартфони) шляхом автоматичного пристосування макету.",
  },
  {
    term: "URL",
    definition: "Uniform Resource Locator – адреса веб-сторінки або іншого ресурсу в Інтернеті.",
  },
  {
    term: "SEO",
    definition: "Search Engine Optimization – оптимізація для пошукових систем. Це набір методів, які допомагають веб-сайту займати вищі позиції в результатах пошуку.",
  },
  {
    term: "Front-end",
    definition: "Частина веб-розробки, яка відповідає за те, що користувач бачить і з чим взаємодіє у браузері (інтерфейс).",
  },
  {
    term: "Back-end",
    definition: "Частина веб-розробки, яка відповідає за логіку на сервері, базу даних та взаємодію з ними (те, що користувач не бачить).",
  },
  {
    term: "JavaScript",
    definition: "Мова програмування, яка робить веб-сторінки інтерактивними та динамічними.",
  },
  {
    term: "Framework (Фреймворк)",
    definition: "Набір готових інструментів, бібліотек та правил, які спрощують та прискорюють розробку програмного забезпечення.",
  },
  {
    term: "Library (Бібліотека)",
    definition: "Набір готового коду, який можна використовувати для виконання певних завдань у програмі.",
  },
  {
    term: "color",
    definition: "Властивість CSS, яка встановлює колір тексту елемента.",
    codeExample: `p {
  color: blue;
}`,
    language: "css",
  },
  {
    term: "font-size",
    definition: "Властивість CSS, яка встановлює розмір шрифту тексту.",
    codeExample: `p {
  font-size: 18px;
}`,
    language: "css",
  },
  {
    term: "background-color",
    definition: "Властивість CSS, яка встановлює колір фону елемента.",
    codeExample: `div {
  background-color: lightgreen;
}`,
    language: "css",
  },
  {
    term: "text-align",
    definition: "Властивість CSS, яка вирівнює текст всередині елемента (наприклад, `left`, `right`, `center`, `justify`).",
    codeExample: `h2 {
  text-align: center;
}`,
    language: "css",
  },
  {
    term: "border-radius",
    definition: "Властивість CSS, яка заокруглює кути елемента.",
    codeExample: `img {
  border-radius: 50%;
}`,
    language: "css",
  },
  {
    term: "opacity",
    definition: "Властивість CSS, яка встановлює рівень прозорості елемента (від 0 до 1).",
    codeExample: `div {
  opacity: 0.5;
}`,
    language: "css",
  },
  {
    term: "width",
    definition: "Властивість CSS, яка встановлює ширину елемента.",
    codeExample: `div {
  width: 200px;
}`,
    language: "css",
  },
  {
    term: "height",
    definition: "Властивість CSS, яка встановлює висоту елемента.",
    codeExample: `div {
  height: 100px;
}`,
    language: "css",
  },
  {
    term: "src",
    definition: "Атрибут HTML-тегу `<img>`, який вказує шлях до файлу зображення.",
    codeExample: `<img src="path/to/image.jpg" alt="Опис">`,
    language: "html",
  },
  {
    term: "href",
    definition: "Атрибут HTML-тегу `<a>`, який вказує URL-адресу, на яку посилається гіперпосилання.",
    codeExample: `<a href="https://example.com">Посилання</a>`,
    language: "html",
  },
  {
    term: "alt",
    definition: "Атрибут HTML-тегу `<img>`, який надає альтернативний текст для зображення, якщо воно не може бути відображене.",
    codeExample: `<img src="image.jpg" alt="Опис зображення">`,
    language: "html",
  },
  {
    term: "<h1>",
    definition: "HTML-тег для заголовка першого рівня, найважливішого заголовка на сторінці.",
    codeExample: `<h1>Мій Головний Заголовок</h1>`,
    language: "html",
  },
  {
    term: "<p>",
    definition: "HTML-тег для створення абзацу тексту.",
    codeExample: `<p>Це звичайний абзац тексту.</p>`,
    language: "html",
  },
  {
    term: "<img>",
    definition: "HTML-тег для вбудовування зображень у веб-сторінку.",
    codeExample: `<img src="photo.png" alt="Моя фотографія">`,
    language: "html",
  },
  {
    term: "<a>",
    definition: "HTML-тег для створення гіперпосилань.",
    codeExample: `<a href="https://dyad.sh">Відвідай Dyad</a>`,
    language: "html",
  },
  {
    term: "<body>",
    definition: "HTML-тег, який містить весь видимий вміст веб-сторінки.",
    codeExample: `<body>
  <h1>Привіт!</h1>
  <p>Це тіло сторінки.</p>
</body>`,
    language: "html",
  },
  {
    term: "<table>",
    definition: "HTML-тег для створення таблиць.",
    codeExample: `<table>
  <tr><td>Дані</td></tr>
</table>`,
    language: "html",
  },
  {
    term: "<main>",
    definition: "HTML5-тег, який позначає основний, унікальний вміст документа.",
    codeExample: `<main>
  <p>Основний вміст тут.</p>
</main>`,
    language: "html",
  },
  {
    term: "<footer>",
    definition: "HTML5-тег, який представляє нижній колонтитул (підвал) сайту.",
    codeExample: `<footer>
  <p>&copy; 2024</p>
</footer>`,
    language: "html",
  },
  {
    term: "<header>",
    definition: "HTML5-тег, який представляє вступний вміст або групу навігаційних посилань.",
    codeExample: `<header>
  <h1>Мій Сайт</h1>
</header>`,
    language: "html",
  },
  {
    term: "<head>",
    definition: "HTML-тег, який містить метадані про HTML-документ (не відображається на сторінці).",
    codeExample: `<head>
  <title>Назва</title>
</head>`,
    language: "html",
  },
];