interface QuizItem {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const quizData: QuizItem[] = [
  {
    question: "Який HTML-тег використовується для створення заголовка першого рівня?",
    options: ["<head>", "<h1>", "<title>", "<p>"],
    correctAnswer: "<h1>",
  },
  {
    question: "Яка CSS-властивість змінює колір тексту?",
    options: ["background-color", "font-size", "color", "text-align"],
    correctAnswer: "color",
  },
  {
    question: "Який атрибут тегу <img> вказує шлях до зображення?",
    options: ["alt", "href", "src", "title"],
    correctAnswer: "src",
  },
  {
    question: "Який CSS-селектор використовується для вибору елементів за класом?",
    options: ["#id", ".class", "element", "*"],
    correctAnswer: ".class",
  },
  {
    question: "Що означає властивість `padding` у CSS Box Model?",
    options: [
      "Зовнішній відступ між елементами",
      "Внутрішній відступ між вмістом та рамкою елемента",
      "Товщина рамки елемента",
      "Ширина вмісту елемента",
    ],
    correctAnswer: "Внутрішній відступ між вмістом та рамкою елемента",
  },
  {
    question: "Який HTML-тег використовується для створення невпорядкованого списку (маркованого)?",
    options: ["<ol>", "<li>", "<ul>", "<dl>"],
    correctAnswer: "<ul>",
  },
  {
    question: "Який HTML-тег використовується для створення поля введення тексту (наприклад, для імені)?",
    options: ["<textarea>", "<button>", "<input>", "<select>"],
    correctAnswer: "<input>",
  },
  {
    question: "Яке значення властивості `display` робить елемент блоковим, займаючи всю доступну ширину?",
    options: ["inline", "flex", "block", "none"],
    correctAnswer: "block",
  },
  {
    question: "Яка властивість CSS Flexbox використовується для вирівнювання елементів по горизонталі в контейнері?",
    options: ["align-items", "flex-direction", "justify-content", "flex-wrap"],
    correctAnswer: "justify-content",
  },
  {
    question: "Яке значення властивості `box-sizing` включає `padding` та `border` у загальну ширину/висоту елемента?",
    options: ["content-box", "padding-box", "border-box", "margin-box"],
    correctAnswer: "border-box",
  },
  {
    question: "Який HTML5 тег використовується для основного, унікального вмісту сторінки?",
    options: ["<header>", "<footer>", "<main>", "<section>"],
    correctAnswer: "<main>",
  },
  {
    question: "Яке значення властивості `position` дозволяє елементу залишатися на місці при прокручуванні сторінки?",
    options: ["relative", "absolute", "fixed", "static"],
    correctAnswer: "fixed",
  },
];