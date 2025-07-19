import React from "react";
import LessonCard from "@/components/LessonCard";
import InteractiveCssProperty from "@/components/InteractiveCssProperty";
import CssBoxModelVisualizer from "@/components/CssBoxModelVisualizer";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import InteractiveColorInputProperty from "@/components/InteractiveColorInputProperty"; // NEW IMPORT
import InteractiveSelectProperty from "@/components/InteractiveSelectProperty"; // NEW IMPORT

const CssProperties: React.FC = () => {
  useScrollToHash();

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">CSS Властивості: Робимо Сторінку Красивою</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        CSS (Cascading Style Sheets) - це мова, яка допомагає нам стилізувати веб-сторінки. Уяви, що це одяг для твого сайту!
      </p>

      <div className="space-y-8">
        <InteractiveColorInputProperty
          id="css-color"
          title="color: Колір Тексту (Інтерактивно!)"
          description="Властивість `color` змінює колір тексту елемента. Ти можеш використовувати назви кольорів (red, blue), HEX-коди (#FF0000) або RGB-значення."
          cssProperty="color"
          initialValue="#2196F3" // Blue
          exampleContent={<p>Цей текст змінює свій колір.</p>}
          baseStyle={{ fontSize: '20px' }}
        />

        <InteractiveCssProperty
          id="css-font-size"
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

        <InteractiveSelectProperty
          id="css-font-family"
          title="font-family: Тип Шрифту (Інтерактивно!)"
          description="Властивість `font-family` змінює тип шрифту тексту. Можна вказати кілька шрифтів через кому, якщо перший недоступний."
          cssProperty="fontFamily"
          initialValue="Arial, sans-serif"
          options={[
            { value: "Arial, sans-serif", label: "Arial" },
            { value: "'Times New Roman', serif", label: "Times New Roman" },
            { value: "'Courier New', monospace", label: "Courier New" },
            { value: "Verdana, sans-serif", label: "Verdana" },
            { value: "Georgia, serif", label: "Georgia" },
          ]}
          exampleContent={<p>Цей текст змінює свій тип шрифту.</p>}
          baseStyle={{ fontSize: '20px' }}
        />

        <InteractiveColorInputProperty
          id="css-background-color"
          title="background-color: Колір Фону (Інтерактивно!)"
          description="Властивість `background-color` встановлює колір фону елемента. Ти можеш використовувати назви кольорів, HEX-коди або RGB-значення."
          cssProperty="backgroundColor"
          initialValue="#4CAF50" // Green
          exampleContent={<div style={{ padding: '20px', textAlign: 'center' }}>Це блок з фоном, що змінюється.</div>}
          baseStyle={{}}
        />

        <InteractiveSelectProperty
          id="css-text-align"
          title="text-align: Вирівнювання Тексту (Інтерактивно!)"
          description="Властивість `text-align` вирівнює текст всередині елемента: `left` (ліворуч), `right` (праворуч), `center` (по центру), `justify` (по ширині)."
          cssProperty="textAlign"
          initialValue="center"
          options={[
            { value: "left", label: "Ліворуч" },
            { value: "center", label: "По центру" },
            { value: "right", label: "Праворуч" },
            { value: "justify", label: "По ширині" },
          ]}
          exampleContent={<p>Цей текст змінює своє вирівнювання.</p>}
          baseStyle={{ width: '100%', border: '1px dashed hsl(var(--border))' }}
        />

        <InteractiveCssProperty
          id="css-margin"
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
          id="css-padding"
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

        <CssBoxModelVisualizer />

        {/* Interactive Border Properties */}
        <InteractiveCssProperty
          id="css-border-width"
          title="border-width: Товщина Рамки (Інтерактивно!)"
          description="Властивість `border-width` встановлює товщину рамки елемента."
          cssProperty="borderWidth"
          unit="px"
          min={0}
          max={10}
          initialValue={2}
          exampleContent={<div style={{ width: '150px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', borderStyle: 'solid', borderColor: 'red' }}>Рамка</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))' }}
        />
        <InteractiveSelectProperty
          id="css-border-style"
          title="border-style: Стиль Рамки (Інтерактивно!)"
          description="Властивість `border-style` встановлює стиль лінії рамки: `solid` (суцільна), `dotted` (пунктирна), `dashed` (штрихова) та інші."
          cssProperty="borderStyle"
          initialValue="solid"
          options={[
            { value: "solid", label: "Solid (Суцільна)" },
            { value: "dotted", label: "Dotted (Пунктирна)" },
            { value: "dashed", label: "Dashed (Штрихова)" },
            { value: "double", label: "Double (Подвійна)" },
            { value: "groove", label: "Groove" },
            { value: "ridge", label: "Ridge" },
            { value: "inset", label: "Inset" },
            { value: "outset", label: "Outset" },
            { value: "none", label: "None (Без рамки)" },
          ]}
          exampleContent={<div style={{ width: '150px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', borderWidth: '3px', borderColor: 'blue' }}>Стиль рамки</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))' }}
        />
        <InteractiveColorInputProperty
          id="css-border-color"
          title="border-color: Колір Рамки (Інтерактивно!)"
          description="Властивість `border-color` встановлює колір рамки елемента."
          cssProperty="borderColor"
          initialValue="#FF0000" // Red
          exampleContent={<div style={{ width: '150px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', borderWidth: '3px', borderStyle: 'solid' }}>Колір рамки</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))' }}
        />

        <InteractiveCssProperty
          id="css-border-radius"
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

        <InteractiveSelectProperty
          id="css-text-decoration"
          title="text-decoration: Оформлення Тексту (Інтерактивно!)"
          description="Властивість `text-decoration` додає або видаляє лінії під текстом, над текстом або через текст. Наприклад, `none` видаляє підкреслення у посилань."
          cssProperty="textDecoration"
          initialValue="none"
          options={[
            { value: "none", label: "None (Без ліній)" },
            { value: "underline", label: "Underline (Підкреслення)" },
            { value: "overline", label: "Overline (Надкреслення)" },
            { value: "line-through", label: "Line-through (Закреслення)" },
          ]}
          exampleContent={<a href="#" style={{ fontSize: '20px', color: 'hsl(var(--brand-primary))' }}>Посилання з оформленням.</a>}
          baseStyle={{}}
        />

        <InteractiveCssProperty
          id="css-opacity"
          title="opacity: Прозорість (Інтерактивно!)"
          description="Властивість `opacity` встановлює рівень прозорості елемента. Значення від 0 (повністю прозорий) до 1 (повністю непрозорий). Перетягни повзунок, щоб змінити прозорість!"
          cssProperty="opacity"
          unit=""
          min={0}
          max={100}
          initialValue={100}
          exampleContent={<div style={{ width: '150px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>Прозорий блок</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))', border: '1px solid hsl(var(--playground-element-border))' }}
        />

        <InteractiveCssProperty
          id="css-width"
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
          id="css-height"
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

        <InteractiveCssProperty
          id="css-line-height"
          title="line-height: Міжрядковий Інтервал (Інтерактивно!)"
          description="Властивість `line-height` встановлює висоту кожного рядка тексту. Це впливає на читабельність. Значення без одиниць (наприклад, 1.5) є відносним до розміру шрифту."
          cssProperty="lineHeight"
          unit=""
          min={100} // Represents 1.0
          max={250} // Represents 2.5
          initialValue={150} // Represents 1.5
          exampleContent={<p>Цей текст має змінений міжрядковий інтервал. Це робить його легшим для читання, особливо для довгих абзаців. Спробуй різні значення, щоб побачити різницю.</p>}
          baseStyle={{ fontSize: '16px', backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))', padding: '10px', borderRadius: '8px' }}
        />

        <InteractiveCssProperty
          id="css-letter-spacing"
          title="letter-spacing: Інтервал Між Літерами (Інтерактивно!)"
          description="Властивість `letter-spacing` встановлює додатковий простір між символами (літерами) у тексті. Може бути позитивним або негативним."
          cssProperty="letterSpacing"
          unit="px"
          min={-2}
          max={10}
          initialValue={0}
          exampleContent={<p style={{ fontWeight: 'bold', fontSize: '20px' }}>ПРИВІТ, СВІТ!</p>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))', padding: '10px', borderRadius: '8px', textAlign: 'center' }}
        />

        <InteractiveCssProperty
          id="css-box-shadow"
          title="box-shadow: Тінь Елемента (Інтерактивно!)"
          description="Властивість `box-shadow` додає тінь до елемента. Ти можеш налаштувати зміщення, розмиття та колір тіні. Тут ми змінюємо лише розмиття."
          cssProperty="boxShadow"
          unit="px"
          min={0}
          max={30}
          initialValue={10}
          exampleContent={<div style={{ width: '150px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>Блок з тінню</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))', border: '1px solid hsl(var(--playground-element-border))', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
        />
      </div>
      <LessonNavigation />
    </div>
  );
};

export default CssProperties;