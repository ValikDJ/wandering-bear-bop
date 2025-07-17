import React from "react";
import LessonCard from "@/components/LessonCard";
import InteractiveCssProperty from "@/components/InteractiveCssProperty";
import CssBoxModelVisualizer from "@/components/CssBoxModelVisualizer";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash"; // Import the new hook

const CssProperties: React.FC = () => {
  useScrollToHash(); // Use the hook here

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">CSS Властивості: Робимо Сторінку Красивою</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        CSS (Cascading Style Sheets) - це мова, яка допомагає нам стилізувати веб-сторінки. Уяви, що це одяг для твого сайту!
      </p>

      <div className="space-y-8">
        <LessonCard
          id="css-color" // Added ID
          title="color: Колір Тексту"
          description="Властивість `color` змінює колір тексту елемента."
          codeExample={`p {
  color: blue;
}`}
          language="css"
          result={<p style={{ color: 'hsl(var(--brand-primary))' }}>Цей текст синій.</p>}
        />

        <InteractiveCssProperty
          id="css-font-size" // Added ID
          title="font-size: Розмір Шрифту (Інтерактивно!)"
          description="Властивість `font-size` встановлює розмір тексту. Перетягни повзунок, щоб побачити, як змінюється розмір!"
          cssProperty="fontSize"
          unit="px"
          min={12}
          max={48}
          initialValue={24}
          exampleContent={<p>Цей текст змінює свій розмір.</p>}
          baseStyle={{}}
        />

        <LessonCard
          id="css-font-family" // Added ID
          title="font-family: Тип Шрифту"
          description="Властивість `font-family` змінює тип шрифту тексту. Можна вказати кілька шрифтів через кому, якщо перший недоступний."
          codeExample={`p {
  font-family: Arial, sans-serif;
}`}
          language="css"
          result={<p style={{ fontFamily: 'Arial, sans-serif' }}>Текст шрифтом Arial.</p>}
        />

        <LessonCard
          id="css-background-color" // Added ID
          title="background-color: Колір Фону"
          description="Властивість `background-color` встановлює колір фону елемента."
          codeExample={`div {
  background-color: lightgreen;
  padding: 10px;
}`}
          language="css"
          result={<div style={{ backgroundColor: 'hsl(var(--playground-element-bg))', padding: '10px', color: 'hsl(var(--playground-element-text))' }}>Це блок з зеленим фоном.</div>}
        />

        <LessonCard
          id="css-text-align" // Added ID
          title="text-align: Вирівнювання Тексту"
          description="Властивість `text-align` вирівнює текст всередині елемента: `left` (ліворуч), `right` (праворуч), `center` (по центру), `justify` (по ширині)."
          codeExample={`h2 {
  text-align: center;
}`}
          language="css"
          result={<h2 style={{ textAlign: 'center' }}>Заголовок по центру</h2>}
        />

        <InteractiveCssProperty
          id="css-margin" // Added ID
          title="margin: Зовнішні Відступи (Інтерактивно!)"
          description="Властивість `margin` створює простір *навколо* елемента, відштовхуючи його від інших елементів. Перетягни повзунок, щоб побачити, як змінюється зовнішній відступ цього блоку."
          cssProperty="margin"
          unit="px"
          min={0}
          max={50}
          initialValue={20}
          exampleContent={<div style={{ backgroundColor: 'hsl(var(--playground-element-bg))', border: '1px solid hsl(var(--playground-element-border))', color: 'hsl(var(--playground-element-text))' }}>Цей блок має зовнішні відступи.</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', border: '1px solid hsl(var(--playground-element-border))', color: 'hsl(var(--playground-element-text))' }}
        />

        <InteractiveCssProperty
          id="css-padding" // Added ID
          title="padding: Внутрішні Відступи (Інтерактивно!)"
          description="Властивість `padding` створює простір *між вмістом* елемента та його рамкою. Перетягни повзунок, щоб побачити, як змінюється внутрішній відступ цього блоку."
          cssProperty="padding"
          unit="px"
          min={0}
          max={50}
          initialValue={15}
          exampleContent={<div style={{ backgroundColor: 'hsl(var(--playground-element-bg))', border: '1px solid hsl(var(--playground-element-border))', color: 'hsl(var(--playground-element-text))' }}>Цей блок має внутрішні відступи.</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', border: '1px solid hsl(var(--playground-element-border))', color: 'hsl(var(--playground-element-text))' }}
        />

        {/* New Box Model Visualizer */}
        <CssBoxModelVisualizer />

        <LessonCard
          id="css-border" // Added ID
          title="border: Рамка"
          description="Властивість `border` додає рамку навколо елемента. Вказується товщина, стиль (solid, dotted, dashed) та колір."
          codeExample={`p {
  border: 2px solid red;
  padding: 5px;
}`}
          language="css"
          result={<p style={{ border: '2px solid hsl(var(--destructive))', padding: '5px', color: 'hsl(var(--foreground))' }}>Текст з червоною рамкою.</p>}
        />

        <InteractiveCssProperty
          id="css-border-radius" // Added ID
          title="border-radius: Заокруглення Кутів (Інтерактивно!)"
          description="Властивість `border-radius` заокруглює кути елемента. Перетягни повзунок, щоб побачити, як змінюється заокруглення!"
          cssProperty="borderRadius"
          unit="px"
          min={0}
          max={50}
          initialValue={15}
          exampleContent={<div style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>Блок</div>}
          baseStyle={{ border: '2px solid hsl(var(--playground-element-border))', backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))' }}
        />

        <LessonCard
          id="css-text-decoration" // Added ID
          title="text-decoration: Оформлення Тексту"
          description="Властивість `text-decoration` додає або видаляє лінії під текстом, над текстом або через текст. Наприклад, `none` видаляє підкреслення у посилань."
          codeExample={`a {
  text-decoration: none;
  color: green;
}`}
          language="css"
          result={<a href="#" style={{ textDecoration: 'none', color: 'hsl(var(--brand-primary))' }}>Посилання без підкреслення.</a>}
        />

        {/* New Interactive CSS Properties */}
        <InteractiveCssProperty
          id="css-opacity" // Added ID
          title="opacity: Прозорість (Інтерактивно!)"
          description="Властивість `opacity` встановлює рівень прозорості елемента. Значення від 0 (повністю прозорий) до 1 (повністю непрозорий)."
          cssProperty="opacity"
          unit=""
          min={0}
          max={100}
          initialValue={100}
          exampleContent={<div style={{ width: '150px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>Прозорий блок</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))', border: '1px solid hsl(var(--playground-element-border))' }}
        />

        <InteractiveCssProperty
          id="css-width" // Added ID
          title="width: Ширина (Інтерактивно!)"
          description="Властивість `width` встановлює ширину елемента. Перетягни повзунок, щоб змінити ширину!"
          cssProperty="width"
          unit="px"
          min={50}
          max={300}
          initialValue={150}
          exampleContent={<div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>Блок змінної ширини</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))', border: '1px solid hsl(var(--playground-element-border))' }}
        />

        <InteractiveCssProperty
          id="css-height" // Added ID
          title="height: Висота (Інтерактивно!)"
          description="Властивість `height` встановлює висоту елемента. Перетягни повзунок, щоб змінити висоту!"
          cssProperty="height"
          unit="px"
          min={30}
          max={200}
          initialValue={100}
          exampleContent={<div style={{ width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>Блок змінної висоти</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))', border: '1px solid hsl(var(--playground-element-border))' }}
        />
      </div>
      <LessonNavigation />
    </div>
  );
};

export default CssProperties;