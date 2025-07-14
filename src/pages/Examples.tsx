import React from "react";
import { Link } from "react-router-dom";
import LessonCard from "@/components/LessonCard";
import LiveCodeEditor from "@/components/LiveCodeEditor";
import HtmlElementCreator from "@/components/HtmlElementCreator";
import { Button } from "@/components/ui/button";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash"; // Import the new hook
import CssGradientGenerator from "@/components/CssGradientGenerator"; // NEW IMPORT

const Examples: React.FC = () => {
  useScrollToHash(); // Use the hook here

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">Практичні Приклади: Створюємо Разом!</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        Час застосувати свої знання на практиці! Спробуй зрозуміти, як працюють ці приклади, і уяви, як ти можеш їх змінити.
      </p>

      <div className="space-y-8">
        <LiveCodeEditor
          id="example-live-editor" // Added ID
          title="Твій власний редактор коду!"
          description="Спробуй змінити текст, додати нові теги або змінити кольори. Експериментуй!"
          initialHtml={`<h1>Привіт, Веб-Майстер!</h1>
<p>Це твій перший інтерактивний код.</p>
<button>Натисни мене</button>`}
          initialCss={`h1 {
  color: #4CAF50; /* Зелений */
  text-align: center;
}
p {
  font-family: 'Comic Sans MS', cursive;
  font-size: 18px;
}
button {
  background-color: #008CBA; /* Синій */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}`}
        />

        <HtmlElementCreator id="example-html-creator" /> {/* Added ID */}

        <CssGradientGenerator /> {/* NEW COMPONENT */}

        {/* Existing Lesson Cards (kept here as they are general examples) */}
        <LessonCard
          id="example-red-heading" // Added ID
          title="Як зробити заголовок червоним?"
          description="Використаємо тег <h1> та CSS властивість `color`."
          codeExample={`<h1 style="color: red;">Привіт, червоний заголовок!</h1>`}
          language="html"
          result={<h1 style={{ color: 'hsl(var(--destructive))' }}>Привіт, червоний заголовок!</h1>}
        />

        <LessonCard
          id="example-rounded-image" // Added ID
          title="Як додати рамку до картинки та заокруглити її?"
          description="Використаємо тег <img> та CSS властивості `border` і `border-radius`."
          codeExample={`<img src="https://picsum.photos/id/237/100/100" alt="Кругла картинка" style="border: 3px solid blue; border-radius: 50%;">`}
          language="html"
          result={<img src="https://picsum.photos/id/237/100/100" alt="Кругла картинка" style={{ border: '3px solid hsl(var(--brand-primary))', borderRadius: '50%' }} className="shadow-md" />}
        />

        <LessonCard
          id="example-styled-button" // Added ID
          title="Як створити кнопку з яскравим фоном та білим текстом?"
          description="Використаємо тег <button> та CSS властивості `background-color`, `color`, `padding` та `border-radius`."
          codeExample={`<button style="background-color: #FF6347; color: white; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer;">Натисни мене!</button>`}
          language="html"
          result={<button className="bg-brand-primary text-primary-foreground px-4 py-2 rounded-md border-none cursor-pointer hover:bg-brand-primary-hover">Натисни мене!</button>}
        />

        <LessonCard
          id="example-centered-text" // Added ID
          title="Як вирівняти текст по центру та змінити його розмір?"
          description="Використаємо тег <p> та CSS властивості `text-align` і `font-size`."
          codeExample={`<p style="text-align: center; font-size: 20px;">Цей текст буде по центру і великим!</p>`}
          language="html"
          result={<p style={{ textAlign: 'center', fontSize: '20px' }} className="text-foreground">Цей текст буде по центру і великим!</p>}
        />

        <LessonCard
          id="example-bordered-table" // Added ID
          title="Як зробити таблицю з рамками?"
          description="Використаємо теги <table>, <tr>, <td> та CSS властивість `border`."
          codeExample={`<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="border: 1px solid black; padding: 8px;">Рядок 1, Комірка 1</td>
    <td style="border: 1px solid black; padding: 8px;">Рядок 1, Комірка 2</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; padding: 8px;">Рядок 2, Комірка 1</td>
    <td style="border: 1px solid black; padding: 8px;">Рядок 2, Комірка 2</td>
  </tr>
</table>`}
          language="html"
          result={
            <table style={{ borderCollapse: 'collapse', width: '100%' }} className="border border-border">
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2 bg-background text-foreground">Рядок 1, Комірка 1</td>
                  <td className="border border-border px-4 py-2 bg-background text-foreground">Рядок 1, Комірка 2</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 bg-background text-foreground">Рядок 2, Комірка 1</td>
                  <td className="border border-border px-4 py-2 bg-background text-foreground">Рядок 2, Комірка 2</td>
                </tr>
              </tbody>
            </table>
          }
        />
      </div>
      <LessonNavigation />
    </div>
  );
};

export default Examples;