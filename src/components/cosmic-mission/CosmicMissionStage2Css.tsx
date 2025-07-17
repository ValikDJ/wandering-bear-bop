import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Palette, ChevronDown, Lightbulb, Planet } from "lucide-react"; // Додано Planet
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import CssExampleCard from "./CssExampleCard"; // NEW IMPORT

interface CosmicMissionStage2CssProps {
  completed: boolean;
  onCompletionChange: (completed: boolean) => void;
}

const LOCAL_STORAGE_KEY = "cosmic-mission-stage2-completed";

const cssTemplateUncommented = `/* style.css - Твої віртуальні пензлі! */

/* Властивості для тексту */
color: #b3ffff;
font-size: 1.2em;
font-family: 'Arial', sans-serif;
text-align: center;
line-height: 1.6;
text-decoration: none;
font-weight: bold;

/* Властивості для фону */
background-color: #2a2a4a;

/* Властивості для рамок та кутів */
border: 2px solid #8a2be2;
border-radius: 8px;

/* Властивості для відступів */
margin: 20px;
padding: 15px;

/* Властивості для розмірів */
width: 100%;
height: auto;

/* Інші корисні властивості */
opacity: 0.8;
display: block;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
box-sizing: border-box;
cursor: pointer;
`;

const cssTemplateCommented = `/* style.css - Твої віртуальні пензлі! */

/* Властивості для тексту */
color: #b3ffff; /* Встановлює колір тексту */
font-size: 1.2em; /* Встановлює розмір шрифту */
font-family: 'Arial', sans-serif; /* Встановлює тип шрифту */
text-align: center; /* Вирівнює текст всередині елемента (left, right, center, justify) */
line-height: 1.6; /* Встановлює висоту рядка тексту */
text-decoration: none; /* Додає або видаляє лінії під текстом (none, underline, line-through) */
font-weight: bold; /* Встановлює жирність шрифту (bold, normal, lighter) */

/* Властивості для фону */
background-color: #2a2a4a; /* Встановлює колір фону елемента */

/* Властивості для рамок та кутів */
border: 2px solid #8a2be2; /* Додає рамку навколо елемента (товщина, стиль, колір) */
border-radius: 8px; /* Заокруглює кути елемента (наприклад, 50% для створення кола) */

/* Властивості для відступів */
margin: 20px; /* Створює зовнішній відступ навколо елемента, відштовхуючи його від інших елементів */
padding: 15px; /* Створює внутрішній відступ між вмістом елемента та його рамкою */

/* Властивості для розмірів */
width: 100%; /* Встановлює ширину елемента (наприклад, 100% від батьківського елемента, або 200px, 50%) */
height: auto; /* Встановлює висоту елемента (наприклад, auto для автоматичної висоти, або 150px) */

/* Інші корисні властивості */
opacity: 0.8; /* Встановлює рівень прозорості елемента (від 0 - повністю прозорий, до 1 - повністю непрозорий) */
display: block; /* Визначає, як елемент відображається (block, inline, inline-block, flex) */
box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Додає тінь до елемента */
box-sizing: border-box; /* Визначає, як розраховується загальна ширина та висота елемента (content-box, border-box) */
cursor: pointer; /* Визначає тип курсору миші при наведенні на елемент */
`;

const CosmicMissionStage2Css: React.FC<CosmicMissionStage2CssProps> = ({ completed, onCompletionChange }) => {
  const [displayCommentedCss, setDisplayCommentedCss] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        onCompletionChange(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load cosmic mission stage 2 completion:", error);
    }
  }, [onCompletionChange]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(completed));
    } catch (error) {
      console.error("Failed to save stage 2 completion:", error);
    }
  }, [completed]);

  const handleCopyCss = (version: 'uncommented' | 'commented') => {
    const textToCopy = version === 'commented' ? cssTemplateCommented : cssTemplateUncommented;
    navigator.clipboard.writeText(textToCopy);
    toast.success(`CSS-код (${version === 'commented' ? 'з коментарями' : 'без коментарів'}) скопійовано! 🎨`);
  };

  return (
    <Card className="mb-12 bg-card shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Planet className="h-8 w-8 text-primary" />
          Етап 2: Дослідження Галактики Стилів (CSS)
        </CardTitle>
        <div className="flex items-center space-x-2 no-print">
          <Checkbox
            id="stage2-completed"
            checked={completed}
            onCheckedChange={(checked: boolean) => onCompletionChange(checked)}
            className="h-6 w-6"
          />
          <Label htmlFor="stage2-completed" className="text-lg font-medium text-muted-foreground">
            Виконано
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Тепер, коли каркас твоєї космічної бази готовий, час додати кольори, світло та текстури! CSS — це твої віртуальні пензлі та інструменти дизайнера. Він дозволяє змінити вигляд будь-якого елемента на сторінці.
        </p>
        <p className="mb-4 text-muted-foreground">
          Щоб твій сайт побачив ці стилі, потрібно підключити CSS-файл до HTML. Додай цей рядок у розділ `&lt;head&gt;` твого HTML-файлу (він вже є у шаблоні, який ти використовував):
        </p>
        <SyntaxHighlighter language="html" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', marginBottom: '20px' }}>
          {`<link rel="stylesheet" href="style.css">`}
        </SyntaxHighlighter>
        <p className="mb-4 text-muted-foreground text-sm">
          А ось список CSS-властивостей, які ти можеш використовувати. Скопіюй їх у вкладку **CSS** на платформі Logika і змінюй значення, щоб прикрасити *свій власний* сайт!
        </p>
        
        <div className="relative mb-6">
          <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Твої Космічні Пензлі:</h4>
          <div className="flex justify-end items-center gap-4 mb-2 no-print">
            <div className="flex items-center space-x-2">
              <Switch
                id="toggle-css-comments"
                checked={displayCommentedCss}
                onCheckedChange={setDisplayCommentedCss}
              />
              <Label htmlFor="toggle-css-comments" className="text-sm text-muted-foreground">
                {displayCommentedCss ? "Коментарі УВІМКНЕНО" : "Коментарі ВИМКНЕНО"}
              </Label>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  size="sm"
                >
                  <Copy className="mr-2 h-4 w-4" /> Копіювати CSS
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover text-popover-foreground">
                <DropdownMenuItem onClick={() => handleCopyCss('uncommented')} className="cursor-pointer">
                  Без коментарів
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCopyCss('commented')} className="cursor-pointer">
                  З коментарями
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <SyntaxHighlighter language="css" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', maxHeight: '500px', overflowY: 'auto' }}>
            {displayCommentedCss ? cssTemplateCommented : cssTemplateUncommented}
          </SyntaxHighlighter>
        </div>

        <Collapsible className="mt-6">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
              🎨 Ідеї для стилізації та допомога (Натисни, щоб дізнатися)
              <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
            <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
              <p className="mb-2">
                Щоб застосувати стилі до елементів твого сайту, тобі потрібно:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>**Вибрати елемент:** Використовуй **CSS-селектори** (наприклад, назву тегу `body`, `h1`, `p`, `img`, `section` або `footer`) щоб вказати, до якого елемента застосувати стиль. Якщо ти забув, як працюють селектори, переглянь <Link to="/css-selectors" className="text-brand-primary hover:underline">Урок: CSS Селектори</Link>.</li>
                <li>**Вибрати властивість:** Обери, що саме ти хочеш змінити (колір, розмір, фон тощо). Якщо ти забув, які властивості існують, переглянь <Link to="/css-properties" className="text-brand-primary hover:underline">Урок: CSS Властивості</Link>.</li>
                <li>**Встановити значення:** Признач цій властивості бажане значення (наприклад, `color: blue;` або `font-size: 20px;`).</li>
              </ul>
              <p className="mb-2">
                Ось деякі властивості, які ти можеш спробувати змінити:
              </p>
              <ul className="list-disc list-inside">
                <li><code>color</code>: Колір тексту.</li>
                <li><code>background-color</code>: Колір фону.</li>
                <li><code>font-size</code>: Розмір шрифту.</li>
                <li><code>font-family</code>: Тип шрифту.</li>
                <li><code>text-align</code>: Вирівнювання тексту (`center`, `left`, `right`).</li>
                <li><code>margin</code>: Зовнішні відступи (простір навколо елемента).</li>
                <li><code>padding</code>: Внутрішні відступи (простір між вмістом та рамкою).</li>
                <li><code>border</code>: Рамка навколо елемента.</li>
                <li><code>border-radius</code>: Заокруглення кутів.</li>
                <li><code>text-decoration</code>: Оформлення тексту (наприклад, прибрати підкреслення у посилань).</li>
                <li><code>opacity</code>: Прозорість елемента.</li>
                <li><code>width</code> / <code>height</code>: Ширина та висота елемента.</li>
                <li><code>box-shadow</code>: Тінь для елемента.</li>
                <li><code>box-sizing</code>: Як розраховується загальна ширина та висота елемента.</li>
              </ul>
              <p className="mt-2">
                Експериментуй! Ти можеш використовувати <Link to="/css-playground" className="text-brand-primary hover:underline">CSS Майстерню</Link> для інтерактивної практики, а також <Link to="/examples" className="text-brand-primary hover:underline">Практичні Приклади</Link>, щоб побачити, як інші стилізовані елементи виглядають у дії.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Прості ідеї для стилізації твого сайту - Зовнішній Collapsible */}
        <Collapsible className="mt-12">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                Прості ідеї для стилізації твого сайту
              </div>
              <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
            <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
              <p className="mb-8 text-center max-w-2xl mx-auto text-muted-foreground">
                Ось кілька легких прикладів, які ти можеш спробувати додати до свого файлу `style.css`. Просто скопіюй код і встав його, а потім змінюй значення!
              </p>

              <CssExampleCard
                title="Стиль для всього сайту (`body`)"
                description="Зміни колір фону та тексту для всієї сторінки."
                cssCode={`body {
  background-color: #f0f8ff; /* Світло-блакитний фон */
  color: #333; /* Темно-сірий текст */
}`}
                previewContent={
                  <div
                    style={{
                      backgroundColor: '#f0f8ff', // AliceBlue
                      color: '#333', // Dark gray text
                      padding: '20px',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                    className="min-h-[100px] flex items-center justify-center"
                  >
                    <p>Тут буде твій сайт зі світлим фоном та темним текстом.</p>
                  </div>
                }
              />

              <CssExampleCard
                title="Стиль для головного заголовка (`h1`)"
                description="Зроби головний заголовок по центру та зміни його колір."
                cssCode={`h1 {
  text-align: center; /* Вирівнювання по центру */
  color: #007bff; /* Синій колір */
}`}
                previewContent={
                  <h1 style={{ textAlign: 'center', color: '#007bff', fontSize: '2em' }} className="p-2">
                    Мій Крутий Заголовок
                  </h1>
                }
              />

              <CssExampleCard
                title="Стиль для абзаців (`p`)"
                description="Зміни розмір шрифту та колір для всіх абзаців."
                cssCode={`p {
  font-size: 16px; /* Розмір шрифту */
  color: #555; /* Темно-сірий колір */
}`}
                previewContent={
                  <p style={{ fontSize: '16px', color: '#555', padding: '10px', border: '1px dashed #ccc', borderRadius: '5px' }}>
                    Це приклад тексту в абзаці. Він стане трохи більшим і сірим.
                  </p>
                }
              />

              <CssExampleCard
                title="Стиль для зображень (`img`)"
                description="Додай рамку та заокругли кути для всіх картинок."
                cssCode={`img {
  border: 2px solid green; /* Зелена рамка */
  border-radius: 10px; /* Заокруглені кути */
}`}
                previewContent={
                  <div className="flex justify-center items-center p-4">
                    <img
                      src="https://picsum.photos/id/237/150/150"
                      alt="Приклад зображення"
                      style={{ border: '2px solid green', borderRadius: '10px', maxWidth: '100%', height: 'auto' }}
                      className="shadow-sm"
                    />
                  </div>
                }
              />

              <CssExampleCard
                title="Стиль для посилань (`a`)"
                description="Прибери підкреслення та зміни колір для всіх посилань."
                cssCode={`a {
  text-decoration: none; /* Прибирає підкреслення */
  color: purple; /* Фіолетовий колір */
}`}
                previewContent={
                  <a href="#" style={{ textDecoration: 'none', color: 'purple', padding: '5px', border: '1px dotted purple', borderRadius: '3px' }}>
                    Посилання без підкреслення
                  </a>
                }
              />

              <CssExampleCard
                title="Стиль для кнопок (`button`)"
                description="Зроби кнопки яскравими та заокругленими."
                cssCode={`button {
  background-color: #28a745; /* Зелений фон */
  color: white; /* Білий текст */
  padding: 8px 15px; /* Внутрішні відступи */
  border-radius: 5px; /* Заокруглені кути */
}`}
                previewContent={
                  <button style={{ backgroundColor: '#28a745', color: 'white', padding: '8px 15px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                    Натисни мене!
                  </button>
                }
              />

              <CssExampleCard
                title="Стиль для блоків (`div`, `section`)"
                description="Додай фон, рамку та внутрішні відступи до блоків."
                cssCode={`div, section {
  padding: 15px; /* Внутрішній відступ */
  background-color: #e9ecef; /* Світло-сірий фон */
  border: 1px solid #ccc; /* Сіра рамка */
  border-radius: 8px; /* Заокруглені кути */
}`}
                previewContent={
                  <div style={{ padding: '15px', backgroundColor: '#e9ecef', border: '1px solid #ccc', borderRadius: '8px', color: '#333' }}>
                    <p>Це блок з інформацією. Він має світлий фон та рамку.</p>
                  </div>
                }
              />

              <CssExampleCard
                title="Стиль для списків (`ul`, `ol`, `li`)"
                description="Додай відступ зліва для списків та зміни колір елементів."
                cssCode={`ul, ol {
  margin-left: 25px; /* Відступ зліва */
}

li {
  color: #444; /* Колір тексту елементів списку */
}`}
                previewContent={
                  <ul style={{ marginLeft: '25px', color: '#444' }}>
                    <li>Елемент списку 1</li>
                    <li>Елемент списку 2</li>
                  </ul>
                }
              />

              <CssExampleCard
                title="Стиль для таблиць (`table`, `th`, `td`)"
                description="Додай рамки до таблиці та її комірок."
                cssCode={`table, th, td {
  border: 1px solid #ccc; /* Сіра рамка */
  border-collapse: collapse; /* Прибирає подвійні рамки */
}

th {
  background-color: #f8f9fa; /* Світлий фон для заголовків */
  color: #333; /* Темний текст для заголовків */
}`}
                previewContent={
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f8f9fa', color: '#333' }}>Заголовок 1</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f8f9fa', color: '#333' }}>Заголовок 2</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: '1px solid #ccc', padding: '8px', color: '#555' }}>Дані 1</td>
                        <td style={{ border: '1px solid #ccc', padding: '8px', color: '#555' }}>Дані 2</td>
                      </tr>
                    </tbody>
                  </table>
                }
              />

              <CssExampleCard
                title="Стиль для шапки та підвалу (`header`, `footer`)"
                description="Додай фон та відступи для шапки та підвалу сайту."
                cssCode={`header, footer {
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
  color: #333;
}`}
                previewContent={
                  <div style={{ backgroundColor: '#f8f9fa', padding: '10px', textAlign: 'center', color: '#333', borderRadius: '8px' }}>
                    <p>Це шапка або підвал твого сайту.</p>
                  </div>
                }
              />

              <CssExampleCard
                title="Стиль для навігації (`nav`, `a`)"
                description="Зроби навігаційні посилання красивими та інтерактивними."
                cssCode={`nav {
  background-color: #333;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 5px;
  background-color: #007bff;
  transition: background-color 0.3s ease;
}

nav a:hover {
  background-color: #0056b3;
}`}
                previewContent={
                  <nav style={{
                    backgroundColor: '#333',
                    padding: '10px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <a href="#" style={{
                      color: 'white',
                      textDecoration: 'none',
                      padding: '8px 15px',
                      borderRadius: '5px',
                      backgroundColor: '#007bff',
                      transition: 'background-color 0.3s ease',
                      whiteSpace: 'nowrap'
                    }}>Головна</a>
                    <a href="#" style={{
                      color: 'white',
                      textDecoration: 'none',
                      padding: '8px 15px',
                      borderRadius: '5px',
                      backgroundColor: '#007bff',
                      transition: 'background-color 0.3s ease',
                      whiteSpace: 'nowrap'
                    }}>Про нас</a>
                    <a href="#" style={{
                      color: 'white',
                      textDecoration: 'none',
                      padding: '8px 15px',
                      borderRadius: '5px',
                      backgroundColor: '#007bff',
                      transition: 'background-color 0.3s ease',
                      whiteSpace: 'nowrap'
                    }}>Контакти</a>
                  </nav>
                }
                copyText={`nav {
  background-color: #333;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 5px;
  background-color: #007bff;
  transition: background-color 0.3s ease;
}

nav a:hover {
  background-color: #0056b3;
}`}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default CosmicMissionStage2Css;