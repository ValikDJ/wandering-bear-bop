import React from "react";
import LessonCard from "@/components/LessonCard";

const CssProperties: React.FC = () => {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">CSS Властивості: Робимо Сторінку Красивою</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        CSS (Cascading Style Sheets) - це мова, яка допомагає нам стилізувати веб-сторінки. Уяви, що це одяг для твого сайту!
      </p>

      <div className="space-y-8">
        <LessonCard
          title="color: Колір Тексту"
          description="Властивість `color` змінює колір тексту елемента."
          codeExample={`p {
  color: blue;
}`}
          language="css"
          result={<p style={{ color: 'blue' }}>Цей текст синій.</p>}
        />

        <LessonCard
          title="font-size: Розмір Шрифту"
          description="Властивість `font-size` встановлює розмір тексту. Можна використовувати пікселі (px), відсотки (%) або інші одиниці."
          codeExample={`h1 {
  font-size: 32px;
}`}
          language="css"
          result={<h1 style={{ fontSize: '32px' }}>Великий заголовок</h1>}
        />

        <LessonCard
          title="font-family: Тип Шрифту"
          description="Властивість `font-family` змінює тип шрифту тексту. Можна вказати кілька шрифтів через кому, якщо перший недоступний."
          codeExample={`p {
  font-family: Arial, sans-serif;
}`}
          language="css"
          result={<p style={{ fontFamily: 'Arial, sans-serif' }}>Текст шрифтом Arial.</p>}
        />

        <LessonCard
          title="background-color: Колір Фону"
          description="Властивість `background-color` встановлює колір фону елемента."
          codeExample={`div {
  background-color: lightgreen;
  padding: 10px;
}`}
          language="css"
          result={<div style={{ backgroundColor: 'lightgreen', padding: '10px' }}>Це блок з зеленим фоном.</div>}
        />

        <LessonCard
          title="text-align: Вирівнювання Тексту"
          description="Властивість `text-align` вирівнює текст всередині елемента: `left` (ліворуч), `right` (праворуч), `center` (по центру), `justify` (по ширині)."
          codeExample={`h2 {
  text-align: center;
}`}
          language="css"
          result={<h2 style={{ textAlign: 'center' }}>Заголовок по центру</h2>}
        />

        <LessonCard
          title="margin: Зовнішні Відступи"
          description="Властивість `margin` створює простір навколо елемента, відштовхуючи його від інших елементів. Можна вказати для всіх сторін або окремо (top, right, bottom, left)."
          codeExample={`img {
  margin: 20px;
}`}
          language="css"
          result={<img src="https://via.placeholder.com/80" alt="Приклад зображення" style={{ margin: '20px', display: 'block' }} className="rounded-md shadow-sm" />}
        />

        <LessonCard
          title="padding: Внутрішні Відступи"
          description="Властивість `padding` створює простір між вмістом елемента та його рамкою (border). Можна вказати для всіх сторін або окремо."
          codeExample={`div {
  padding: 15px;
  border: 1px solid gray;
}`}
          language="css"
          result={<div style={{ padding: '15px', border: '1px solid gray' }}>Це блок з внутрішнім відступом.</div>}
        />

        <LessonCard
          title="border: Рамка"
          description="Властивість `border` додає рамку навколо елемента. Вказується товщина, стиль (solid, dotted, dashed) та колір."
          codeExample={`p {
  border: 2px solid red;
  padding: 5px;
}`}
          language="css"
          result={<p style={{ border: '2px solid red', padding: '5px' }}>Текст з червоною рамкою.</p>}
        />

        <LessonCard
          title="border-radius: Заокруглення Кутів"
          description="Властивість `border-radius` заокруглює кути елемента. Чим більше значення, тим кругліші кути."
          codeExample={`div {
  border: 2px solid purple;
  border-radius: 15px;
  padding: 10px;
}`}
          language="css"
          result={<div style={{ border: '2px solid purple', borderRadius: '15px', padding: '10px' }}>Блок із заокругленими кутами.</div>}
        />

        <LessonCard
          title="text-decoration: Оформлення Тексту"
          description="Властивість `text-decoration` додає або видаляє лінії під текстом, над текстом або через текст. Наприклад, `none` видаляє підкреслення у посилань."
          codeExample={`a {
  text-decoration: none;
  color: green;
}`}
          language="css"
          result={<a href="#" style={{ textDecoration: 'none', color: 'green' }}>Посилання без підкреслення.</a>}
        />
      </div>
    </div>
  );
};

export default CssProperties;