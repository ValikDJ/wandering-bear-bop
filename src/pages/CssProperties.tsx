import React from "react";
import LessonCard from "@/components/LessonCard";
import InteractiveCssProperty from "@/components/InteractiveCssProperty";
import CssBoxModelVisualizer from "@/components/CssBoxModelVisualizer";
import LessonNavigation from "@/components/LessonNavigation";
import LessonChecklist from "@/components/LessonChecklist"; // NEW IMPORT
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { Separator } from "@/components/ui/separator"; // NEW IMPORT

const CssProperties: React.FC = () => {
  useScrollToHash();

  const initialCssTasks = [
    { id: "open-files", text: "Я відкрив свій HTML-файл та CSS-файл на платформі Logika." },
    { id: "link-css", text: "Я перевірив, чи підключений мій CSS-файл до HTML (рядок `<link rel=\"stylesheet\" href=\"style.css\">` у `<head>`)." },
    { id: "color-text", text: "Я змінив колір тексту для заголовків (`h1`, `h2`) та абзаців (`p`) на своєму сайті." },
    { id: "background-color", text: "Я змінив колір фону для `body` або `main` на своєму сайті." },
    { id: "font-size", text: "Я змінив розмір шрифту для деяких елементів (наприклад, `p` або `h2`)." },
    { id: "margin-padding", text: "Я додав зовнішні (`margin`) та внутрішні (`padding`) відступи до блоків або картинок." },
    { id: "border-radius", text: "Я додав рамки (`border`) та заокруглені кути (`border-radius`) до картинок або секцій." },
    { id: "text-align", text: "Я вирівняв текст по центру (`text-align: center;`) для заголовків." },
    { id: "experiment", text: "Я спробував експериментувати з іншими CSS-властивостями, які мені сподобалися." },
    { id: "check-result", text: "Я перевірив, як виглядає мій сайт після всіх змін." },
    { id: "show-teacher", text: "Я показав свій стилізований сайт вчителю." },
  ];

  const commonCssMistakes = [
    {
      title: "Забув крапку з комою (`;`)",
      content: [
        "Кожна CSS-властивість повинна закінчуватися крапкою з комою. Якщо її немає, наступні стилі можуть не працювати.",
        "Приклад: `color: blue;` (правильно) замість `color: blue` (неправильно)."
      ]
    },
    {
      title: "Неправильна назва властивості або значення",
      content: [
        "CSS дуже чутливий до правильного написання. `font-size` працює, а `fontsize` - ні.",
        "Перевіряй написання властивостей та їх значень (наприклад, `blue`, `center`, `20px`)."
      ]
    },
    {
      title: "Неправильний селектор",
      content: [
        "Якщо ти хочеш стилізувати абзац, використовуй `p { ... }`. Якщо клас, то `.my-class { ... }`.",
        "Переконайся, що селектор точно вказує на той елемент, який ти хочеш змінити."
      ]
    },
    {
      title: "Стилі не застосовуються",
      content: [
        "Перевір, чи підключений твій CSS-файл до HTML (рядок `<link rel=\"stylesheet\" href=\"style.css\">` у `<head>`).",
        "Можливо, інший стиль перекриває твій (пам'ятай про каскадність!)."
      ]
    },
    {
      title: "Забув фігурні дужки (`{ }`)",
      content: [
        "Всі властивості для селектора повинні бути всередині фігурних дужок.",
        "Приклад: `p { color: red; }`."
      ]
    }
  ];

  const cssTips = [
    {
      title: "Експериментуй!",
      content: [
        "Не бійся змінювати значення та дивитися, що виходить. Це найкращий спосіб вчитися!",
        "Спробуй різні кольори, розміри, відступи. Зроби свій сайт унікальним!"
      ]
    },
    {
      title: "Використовуй Словник Термінів",
      content: [
        "Якщо ти забув, що означає якась властивість, завжди можеш заглянути у наш Словник Термінів.",
        "Це як твій особистий довідник по веб-розробці!"
      ]
    },
    {
      title: "Зберігай зміни",
      content: [
        "Після кожної важливої зміни зберігай свій HTML та CSS файли на платформі Logika, щоб не втратити прогрес."
      ]
    }
  ];

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">CSS Властивості: Робимо Сторінку Красивою</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        CSS (Cascading Style Sheets) - це мова, яка допомагає нам стилізувати веб-сторінки. Уяви, що це одяг для твого сайту!
      </p>

      <LessonChecklist
        lessonKey="css-properties-lesson"
        title="Твій Чек-ліст для Уроку CSS"
        description="Познач виконані завдання, щоб відстежувати свій прогрес. Успіхів!"
        initialTasks={initialCssTasks}
        commonMistakes={commonCssMistakes}
        tips={cssTips}
      />

      <Separator className="my-12" />

      <h2 className="text-3xl font-bold text-center mb-8 text-foreground">📚 Основні CSS-властивості</h2>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        Давай крок за кроком вивчимо найважливіші властивості CSS, які допоможуть тобі прикрасити свій сайт.
      </p>

      {/* Крок 1: Кольори та Фони */}
      <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Крок 1: Кольори та Фони 🎨</h3>
      <div className="space-y-8">
        <LessonCard
          id="css-color"
          title="color: Колір Тексту"
          description="Властивість `color` змінює колір тексту елемента. Ти можеш використовувати назви кольорів (red, blue), шістнадцяткові коди (#FF0000) або RGB/HSL значення."
          codeExample={`p {
  color: blue; /* Або #0000FF, або rgb(0,0,255) */
}`}
          language="css"
          result={<p style={{ color: 'hsl(var(--brand-primary))' }}>Цей текст синій.</p>}
        />

        <LessonCard
          id="css-background-color"
          title="background-color: Колір Фону"
          description="Властивість `background-color` встановлює колір фону елемента. Це як фарба для стін твоєї веб-кімнати!"
          codeExample={`div {
  background-color: lightgreen; /* Або #90EE90 */
  padding: 10px;
}`}
          language="css"
          result={<div style={{ backgroundColor: 'hsl(var(--playground-element-bg))', padding: '10px', color: 'hsl(var(--playground-element-text))' }}>Це блок з зеленим фоном.</div>}
        />
      </div>

      <Separator className="my-12" />

      {/* Крок 2: Шрифти та Текст */}
      <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Крок 2: Шрифти та Текст ✍️</h3>
      <div className="space-y-8">
        <InteractiveCssProperty
          id="css-font-size"
          title="font-size: Розмір Шрифту"
          description="Властивість `font-size` встановлює розмір тексту. Перетягни повзунок, щоб побачити, як змінюється розмір! Використовуй `px` (пікселі) для точного розміру."
          cssProperty="fontSize"
          unit="px"
          min={12}
          max={48}
          initialValue={24}
          exampleContent={<p>Цей текст змінює свій розмір.</p>}
          baseStyle={{}}
        />

        <LessonCard
          id="css-font-family"
          title="font-family: Тип Шрифту"
          description="Властивість `font-family` змінює тип шрифту тексту. Можна вказати кілька шрифтів через кому, якщо перший недоступний, браузер спробує наступний."
          codeExample={`p {
  font-family: Arial, sans-serif; /* Якщо Arial немає, буде будь-який без засічок */
}`}
          language="css"
          result={<p style={{ fontFamily: 'Arial, sans-serif' }}>Текст шрифтом Arial.</p>}
        />

        <LessonCard
          id="css-text-align"
          title="text-align: Вирівнювання Тексту"
          description="Властивість `text-align` вирівнює текст всередині елемента: `left` (ліворуч), `right` (праворуч), `center` (по центру), `justify` (по ширині)."
          codeExample={`h2 {
  text-align: center;
}`}
          language="css"
          result={<h2 style={{ textAlign: 'center' }}>Заголовок по центру</h2>}
        />

        <LessonCard
          id="css-text-decoration"
          title="text-decoration: Оформлення Тексту"
          description="Властивість `text-decoration` додає або видаляє лінії під текстом, над текстом або через текст. Наприклад, `none` видаляє підкреслення у посилань, що часто використовується."
          codeExample={`a {
  text-decoration: none; /* Прибирає підкреслення */
  color: green;
}`}
          language="css"
          result={<a href="#" style={{ textDecoration: 'none', color: 'hsl(var(--brand-primary))' }}>Посилання без підкреслення.</a>}
        />
      </div>

      <Separator className="my-12" />

      {/* Крок 3: Відступи та Рамки (Box Model) */}
      <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Крок 3: Відступи та Рамки (Box Model) 📦</h3>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        Кожен HTML-елемент на сторінці - це як коробка! Розуміння "блокової моделі" (Box Model) допоможе тобі правильно розташовувати елементи та контролювати простір навколо них.
      </p>
      <div className="space-y-8">
        <InteractiveCssProperty
          id="css-margin"
          title="margin: Зовнішні Відступи"
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
          title="padding: Внутрішні Відступи"
          description="Властивість `padding` створює простір *між вмістом* елемента та його рамкою. Перетягни повзунок, щоб побачити, як змінюється внутрішній відступ цього блоку. Це як м'яка оббивка всередині коробки!"
          cssProperty="padding"
          unit="px"
          min={0}
          max={50}
          initialValue={15}
          exampleContent={<div style={{ backgroundColor: 'hsl(var(--playground-element-bg))', border: '1px solid hsl(var(--playground-element-border))', color: 'hsl(var(--playground-element-text))' }}>Цей блок має внутрішні відступи.</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', border: '1px solid hsl(var(--playground-element-border))', color: 'hsl(var(--playground-element-text))' }}
        />

        <LessonCard
          id="css-border"
          title="border: Рамка"
          description="Властивість `border` додає рамку навколо елемента. Вказується товщина, стиль (solid - суцільна, dotted - пунктирна, dashed - штрихова) та колір."
          codeExample={`p {
  border: 2px solid red; /* 2px товщина, суцільна, червона */
  padding: 5px;
}`}
          language="css"
          result={<p style={{ border: '2px solid hsl(var(--destructive))', padding: '5px', color: 'hsl(var(--foreground))' }}>Текст з червоною рамкою.</p>}
        />

        <InteractiveCssProperty
          id="css-border-radius"
          title="border-radius: Заокруглення Кутів"
          description="Властивість `border-radius` заокруглює кути елемента. Перетягни повзунок, щоб побачити, як змінюється заокруглення! Значення `50%` зробить квадрат кругом."
          cssProperty="borderRadius"
          unit="px"
          min={0}
          max={50}
          initialValue={15}
          exampleContent={<div style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>Блок</div>}
          baseStyle={{ border: '2px solid hsl(var(--playground-element-border))', backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))' }}
        />

        {/* New Box Model Visualizer */}
        <CssBoxModelVisualizer />
      </div>

      <Separator className="my-12" />

      {/* Крок 4: Розміри та Інші Корисні Властивості */}
      <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Крок 4: Розміри та Інші Корисні Властивості 📏</h3>
      <div className="space-y-8">
        <InteractiveCssProperty
          id="css-width"
          title="width: Ширина"
          description="Властивість `width` встановлює ширину елемента. Перетягни повзунок, щоб змінити ширину! Можна використовувати `px` (пікселі) або `%` (відсотки від батьківського елемента)."
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
          title="height: Висота"
          description="Властивість `height` встановлює висоту елемента. Перетягни повзунок, щоб змінити висоту! Також можна використовувати `px` або `%`."
          cssProperty="height"
          unit="px"
          min={30}
          max={200}
          initialValue={100}
          exampleContent={<div style={{ width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>Блок змінної висоти</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))', border: '1px solid hsl(var(--playground-element-border))' }}
        />

        <InteractiveCssProperty
          id="css-opacity"
          title="opacity: Прозорість"
          description="Властивість `opacity` встановлює рівень прозорості елемента. Значення від 0 (повністю прозорий, невидимий) до 1 (повністю непрозорий, як скло). Перетягни повзунок, щоб побачити ефект!"
          cssProperty="opacity"
          unit=""
          min={0}
          max={100}
          initialValue={100}
          exampleContent={<div style={{ width: '150px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>Прозорий блок</div>}
          baseStyle={{ backgroundColor: 'hsl(var(--playground-element-bg))', color: 'hsl(var(--playground-element-text))', border: '1px solid hsl(var(--playground-element-border))' }}
        />
      </div>

      <LessonNavigation />
    </div>
  );
};

export default CssProperties;