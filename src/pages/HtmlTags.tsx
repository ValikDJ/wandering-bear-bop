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
            <a href="https://www.google.com" target="_blank" className="text-brand-primary hover:underline">Перейти до Google</a>
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
            <p className="text-sm text-muted-foreground">Весь видимий контент знаходиться всередині тегу &lt;body&gt;.</p>
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
            <table className="border-collapse border border-border">
              <thead>
                <tr>
                  <th className="border border-border px-4 py-2 bg-muted text-muted-foreground">Ім'я</th>
                  <th className="border border-border px-4 py-2 bg-muted text-muted-foreground">Вік</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2 bg-background text-foreground">Олег</td>
                  <td className="border border-border px-4 py-2 bg-background text-foreground">11</td>
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
            <p className="text-sm text-muted-foreground">Тег &lt;main&gt; допомагає браузерам та пошуковим системам зрозуміти, де знаходиться найважливіший контент.</p>
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
            <p className="text-sm text-muted-foreground">&copy; 2024 Моя Веб-Сторінка</p>
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
            <div className="bg-accent p-4 rounded-md">
              <h1 className="text-xl font-bold text-accent-foreground">Мій Блог</h1>
              <nav className="mt-2 space-x-4">
                <a href="#" className="text-brand-primary hover:underline">Головна</a>
                <a href="#" className="text-brand-primary hover:underline">Про нас</a>
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
            <p className="text-sm text-muted-foreground">Вміст тегу &lt;head&gt; не відображається на сторінці, але дуже важливий для її роботи.</p>
          }
        />

        {/* NEW TAGS */}
        <LessonCard
          id="html-section"
          title="<section>: Розділ"
          description="Тег <section> використовується для групування пов'язаного вмісту. Це як окремий розділ у книзі."
          codeExample={`<section>
  <h2>Про нас</h2>
  <p>Ми створюємо чудові веб-сайти.</p>
</section>`}
          language="html"
          result={
            <section className="border border-border p-4 rounded-md bg-background text-foreground">
              <h2 className="text-xl font-semibold mb-2">Про нас</h2>
              <p>Ми створюємо чудові веб-сайти.</p>
            </section>
          }
        />

        <LessonCard
          id="html-div"
          title="<div>: Універсальний Блок"
          description="Тег <div> - це універсальний контейнер для групування інших HTML-елементів. Він не має власного семантичного значення, але дуже корисний для стилізації та розміщення елементів за допомогою CSS."
          codeExample={`<div style="background-color: #e0f7fa; padding: 15px; border-radius: 5px;">
  <p>Це вміст всередині div.</p>
  <button>Кнопка</button>
</div>`}
          language="html"
          result={
            <div style={{ backgroundColor: 'hsl(var(--playground-element-bg))', padding: '15px', borderRadius: '5px', color: 'hsl(var(--playground-element-text))' }}>
              <p>Це вміст всередині div.</p>
              <button className="bg-brand-primary text-primary-foreground px-3 py-1 rounded-md mt-2 hover:bg-brand-primary-hover">Кнопка</button>
            </div>
          }
        />

        <LessonCard
          id="html-button"
          title="<button>: Кнопка"
          description="Тег <button> створює інтерактивну кнопку, на яку користувач може натиснути для виконання дії."
          codeExample={`<button>Натисни мене!</button>`}
          language="html"
          result={
            <button className="bg-brand-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-brand-primary-hover transition-colors">Натисни мене!</button>
          }
        />

        <LessonCard
          id="html-ul-ol-li"
          title="<ul>, <ol>, <li>: Списки"
          description="Теги <ul> (невпорядкований, з маркерами), <ol> (впорядкований, з номерами) та <li> (елемент списку) використовуються для створення списків."
          codeExample={`<h3>Мої улюблені фрукти (невпорядкований):</h3>
<ul>
  <li>Яблука</li>
  <li>Банани</li>
  <li>Апельсини</li>
</ul>

<h3>Кроки приготування (впорядкований):</h3>
<ol>
  <li>Нагрій воду</li>
  <li>Додай макарони</li>
  <li>Приготуй соус</li>
</ol>`}
          language="html"
          result={
            <>
              <h3 className="text-lg font-semibold mb-2">Мої улюблені фрукти (невпорядкований):</h3>
              <ul className="list-disc list-inside mb-4 text-foreground">
                <li>Яблука</li>
                <li>Банани</li>
                <li>Апельсини</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">Кроки приготування (впорядкований):</h3>
              <ol className="list-decimal list-inside text-foreground">
                <li>Нагрій воду</li>
                <li>Додай макарони</li>
                <li>Приготуй соус</li>
              </ol>
            </>
          }
        />

        <LessonCard
          id="html-strong"
          title="<strong>: Жирний Текст (Важливий)"
          description="Тег <strong> використовується для виділення тексту, який є важливим або має велике значення. Зазвичай відображається жирним шрифтом."
          codeExample={`<p>Це <strong>дуже важлива</strong> інформація.</p>`}
          language="html"
          result={
            <p className="text-foreground">Це <strong>дуже важлива</strong> інформація.</p>
          }
        />

        <LessonCard
          id="html-em"
          title="<em>: Курсивний Текст (Акцент)"
          description="Тег <em> використовується для виділення тексту, на який потрібно зробити акцент або який має інтонаційне значення. Зазвичай відображається курсивом."
          codeExample={`<p>Я <em>дійсно</em> люблю програмувати.</p>`}
          language="html"
          result={
            <p className="text-foreground">Я <em>дійсно</em> люблю програмувати.</p>
          }
        />

      </div>
      <LessonNavigation />
    </div>
  );
};

export default HtmlTags;