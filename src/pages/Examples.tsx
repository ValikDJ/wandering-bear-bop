import React from "react";
import LessonCard from "@/components/LessonCard";

const Examples: React.FC = () => {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Практичні Приклади: Створюємо Разом!</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        Час застосувати свої знання на практиці! Спробуй зрозуміти, як працюють ці приклади, і уяви, як ти можеш їх змінити.
      </p>

      <div className="space-y-8">
        <LessonCard
          title="Як зробити заголовок червоним?"
          description="Використаємо тег <h1> та CSS властивість `color`."
          codeExample={`<h1 style="color: red;">Привіт, червоний заголовок!</h1>`}
          language="html"
          result={<h1 style={{ color: 'red' }}>Привіт, червоний заголовок!</h1>}
        />

        <LessonCard
          title="Як додати рамку до картинки та заокруглити її?"
          description="Використаємо тег <img> та CSS властивості `border` і `border-radius`."
          codeExample={`<img src="https://via.placeholder.com/100" alt="Кругла картинка" style="border: 3px solid blue; border-radius: 50%;">`}
          language="html"
          result={<img src="https://via.placeholder.com/100" alt="Кругла картинка" style={{ border: '3px solid blue', borderRadius: '50%' }} className="shadow-md" />}
        />

        <LessonCard
          title="Як створити кнопку з яскравим фоном та білим текстом?"
          description="Використаємо тег <button> та CSS властивості `background-color`, `color`, `padding` та `border-radius`."
          codeExample={`<button style="background-color: #FF6347; color: white; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer;">Натисни мене!</button>`}
          language="html"
          result={<button style={{ backgroundColor: '#FF6347', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Натисни мене!</button>}
        />

        <LessonCard
          title="Як вирівняти текст по центру та змінити його розмір?"
          description="Використаємо тег <p> та CSS властивості `text-align` і `font-size`."
          codeExample={`<p style="text-align: center; font-size: 20px;">Цей текст буде по центру і великим!</p>`}
          language="html"
          result={<p style={{ textAlign: 'center', fontSize: '20px' }}>Цей текст буде по центру і великим!</p>}
        />

        <LessonCard
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
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid black', padding: '8px' }}>Рядок 1, Комірка 1</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>Рядок 1, Комірка 2</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid black', padding: '8px' }}>Рядок 2, Комірка 1</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>Рядок 2, Комірка 2</td>
                </tr>
              </tbody>
            </table>
          }
        />
      </div>
    </div>
  );
};

export default Examples;