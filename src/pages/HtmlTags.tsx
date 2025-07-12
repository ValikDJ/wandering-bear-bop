import React from "react";
import LessonCard from "@/components/LessonCard";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash"; // Import the new hook

const HtmlTags: React.FC = () => {
  useScrollToHash(); // Use the hook here

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">HTML Теги: Будуємо Веб-Сторінку</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        HTML (HyperText Markup Language) - це мова, яка допомагає нам створювати структуру веб-сторінок. Уяви, що це кістяк твого сайту! Кожен елемент на сторінці - це тег.
      </p>

      <div className="space-y-8">
        <LessonCard
          id="html-h1-h2-h3" // Added ID
          title="<h1>, <h2>, <h3>: Заголовки"
          description="Ці теги використовуються для створення заголовків різного рівня. <h1> - найважливіший заголовок, <h3> - менш важливий."
          codeExample={`<h1>Мій Перший Заголовок</h1>
<h2>Підзаголовок</h2>
<h3>Ще менший заголовок</h3>`}
          language="html"
          result={
            <>
              <h1 className="text-3xl font-bold">Мій Перший Заголовок</h1>
              <h2 className="text-2xl font-semibold">Підзаголовок</h2>
              <h3 className="text-xl font-medium">Ще менший заголовок</h3>
            </>
          }
        />

        <LessonCard
          id="html-p" // Added ID
          title="<p>: Параграф"
          description="Тег <p> використовується для звичайного тексту, абзаців."
          codeExample={`<p>Це мій перший абзац тексту на веб-сторінці. Тут я розповідаю про щось цікаве.</p>
<p>А це другий абзац. Кожен абзац починається з нового рядка.</p>`}
          language="html"
          result={
            <>
              <p>Це мій перший абзац тексту на веб-сторінці. Тут я розповідаю про щось цікаве.</p>
              <p>А це другий абзац. Кожен абзац починається з нового рядка.</p>
            </>
          }
        />

        <LessonCard
          id="html-img" // Added ID
          title="<img>: Зображення"
          description="Тег <img> дозволяє додати картинку на твою сторінку. Атрибут 'src' вказує шлях до картинки, а 'alt' - опис для неї (важливо для доступності!)."
          codeExample={`<img src="https://via.placeholder.com/150" alt="Приклад зображення" width="150" height="150">`}
          language="html"
          result={
            <img src="https://via.placeholder.com/150" alt="Приклад зображення" width="150" height="150" className="rounded-md shadow-sm" />
          }
        />

        <LessonCard
          id="html-a" // Added ID
          title="<a>: Посилання"
          description="Тег <a> створює посилання, яке веде на іншу сторінку або сайт. Атрибут 'href' вказує адресу посилання."
          codeExample={`<a href="https://www.google.com" target="_blank">Перейти до Google</a>`}
          language="html"
          result={
            <a href="https://www.google.com" target="_blank" className="text-blue-600 hover:underline">Перейти до Google</a>
          }
        />

        <LessonCard
          id="html-body" // Added ID
          title="<body>: Тіло Документа"
          description="Тег <body> містить весь видимий вміст твоєї веб-сторінки: текст, зображення, посилання, тощо."
          codeExample={`<!DOCTYPE html>
<html>
<head>
  <title>Моя Сторінка</title>
</head>
<body>
  <h1>Привіт, Світ!</h1>
  <p>Це вміст моєї сторінки.</p>
</body>
</html>`}
          language="html"
          result={
            <p className="text-sm text-gray-500">Весь видимий контент знаходиться всередині тегу &lt;body&gt;.</p>
          }
        />

        <LessonCard
          id="html-table" // Added ID
          title="<table>: Таблиця"
          description="Тег <table> використовується для створення таблиць. Всередині нього є <tr> (рядки таблиці) та <td> (комірки даних)."
          codeExample={`<table>
  <tr>
    <td>Ім'я</td>
    <td>Вік</td>
  </tr>
  <tr>
    <td>Олег</td>
    <td>11</td>
  </tr>
</table>`}
          language="html"
          result={
            <table className="border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">Ім'я</th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">Вік</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Олег</td>
                  <td className="border border-gray-300 px-4 py-2">11</td>
                </tr>
              </tbody>
            </table>
          }
        />

        <LessonCard
          id="html-main" // Added ID
          title="<main>: Основний Вміст"
          description="Тег <main> позначає основний, унікальний вміст документа. На сторінці має бути лише один тег <main>."
          codeExample={`<main>
  <h1>Головна стаття</h1>
  <p>Тут знаходиться основний текст статті.</p>
</main>`}
          language="html"
          result={
            <p className="text-sm text-gray-500">Тег &lt;main&gt; допомагає браузерам та пошуковим системам зрозуміти, де знаходиться найважливіший контент.</p>
          }
        />

        <LessonCard
          id="html-footer" // Added ID
          title="<footer>: Нижній Колонтитул"
          description="Тег <footer> містить інформацію про автора, авторські права, посилання на пов'язані документи тощо."
          codeExample={`<footer>
  <p>&copy; 2024 Моя Веб-Сторінка</p>
</footer>`}
          language="html"
          result={
            <p className="text-sm text-gray-500">&copy; 2024 Моя Веб-Сторінка</p>
          }
        />

        <LessonCard
          id="html-header" // Added ID
          title="<header>: Заголовок Розділу"
          description="Тег <header> представляє вступний вміст, зазвичай містить групу навігаційних посилань, заголовки, логотипи."
          codeExample={`<header>
  <h1>Мій Блог</h1>
  <nav>
    <a href="#">Головна</a>
    <a href="#">Про нас</a>
  </nav>
</header>`}
          language="html"
          result={
            <div className="bg-blue-50 p-4 rounded-md">
              <h1 className="text-xl font-bold">Мій Блог</h1>
              <nav className="mt-2 space-x-4">
                <a href="#" className="text-blue-600 hover:underline">Головна</a>
                <a href="#" className="text-blue-600 hover:underline">Про нас</a>
              </nav>
            </div>
          }
        />

        <LessonCard
          id="html-head" // Added ID
          title="<head>: Метадані Документа"
          description="Тег <head> містить метадані про HTML-документ, які не відображаються безпосередньо на сторінці (наприклад, заголовок сторінки, посилання на CSS-файли)."
          codeExample={`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Назва Моєї Сторінки</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Вміст сторінки -->
</body>
</html>`}
          language="html"
          result={
            <p className="text-sm text-gray-500">Вміст тегу &lt;head&gt; не відображається на сторінці, але дуже важливий для її роботи.</p>
          }
        />
      </div>
      <LessonNavigation />
    </div>
  );
};

export default HtmlTags;