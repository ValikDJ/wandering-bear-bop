import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Palette, ChevronDown, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

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
          <Palette className="h-8 w-8 text-primary" />
          Етап 2: Прикрашаємо Базу (CSS)
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
          <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Твої CSS-пензлі:</h4>
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

        {/* Приклад простого дизайну: "Космічна Посилка" */}
        <Card className="mt-12 bg-card shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              Приклад простого дизайну: "Космічна Посилка"
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Ось приклад, як можна стилізувати звичайний блок (`&lt;div&gt;`) за допомогою кількох CSS-властивостей. Спробуй повторити цей дизайн на своєму сайті!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Як це виглядає:</h4>
                <div
                  style={{
                    backgroundColor: '#4a2a4a', // Dark purple
                    color: '#b3ffff', // Neon cyan
                    padding: '20px',
                    border: '2px solid #ff69b4', // Pink border
                    borderRadius: '15px',
                    textAlign: 'center',
                    boxShadow: '0 0 15px rgba(179, 255, 255, 0.5)', // Glowing effect
                    fontSize: '1.2em',
                    fontWeight: 'bold',
                  }}
                  className="flex items-center justify-center min-h-[120px] rounded-md"
                >
                  Космічна Посилка Прибула!
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">CSS-код для цього:</h4>
                <SyntaxHighlighter language="css" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', maxHeight: '250px', overflowY: 'auto' }}>
                  {`.cosmic-package {
  background-color: #4a2a4a; /* Темно-фіолетовий фон */
  color: #b3ffff; /* Неоновий синій текст */
  padding: 20px; /* Внутрішній відступ */
  border: 2px solid #ff69b4; /* Рожева рамка */
  border-radius: 15px; /* Заокруглені кути */
  text-align: center; /* Текст по центру */
  box-shadow: 0 0 15px rgba(179, 255, 255, 0.5); /* Світіння */
  font-size: 1.2em; /* Розмір шрифту */
  font-weight: bold; /* Жирний шрифт */
}`}
                </SyntaxHighlighter>
                <p className="mt-2 text-sm text-muted-foreground">
                  Щоб використати цей стиль, додай `class="cosmic-package"` до свого `&lt;div&gt;` або іншого тегу в HTML.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NEW: Приклад простого дизайну: "Космічний Портрет" */}
        <Card className="mt-12 bg-card shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              Приклад простого дизайну: "Космічний Портрет"
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Ось як можна стилізувати зображення (`&lt;img&gt;`), щоб воно виглядало як космічний портрет!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center items-center p-4">
                <img
                  src="https://picsum.photos/id/1080/200/200"
                  alt="Космічний портрет"
                  style={{
                    border: '5px solid #ff69b4', // Pink border
                    borderRadius: '50%', // Circular shape
                    boxShadow: '0 0 20px rgba(255, 105, 180, 0.7)', // Pink glow
                    transition: 'transform 0.3s ease-in-out', // Smooth hover effect
                  }}
                  className="max-w-full h-auto block"
                />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">CSS-код для цього:</h4>
                <SyntaxHighlighter language="css" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', maxHeight: '250px', overflowY: 'auto' }}>
                  {`.cosmic-portrait {
  border: 5px solid #ff69b4; /* Рожева рамка */
  border-radius: 50%; /* Кругла форма */
  box-shadow: 0 0 20px rgba(255, 105, 180, 0.7); /* Рожеве світіння */
  transition: transform 0.3s ease-in-out; /* Плавний перехід при наведенні */
}

.cosmic-portrait:hover {
  transform: scale(1.05); /* Збільшення при наведенні */
}`}
                </SyntaxHighlighter>
                <p className="mt-2 text-sm text-muted-foreground">
                  Щоб використати цей стиль, додай `class="cosmic-portrait"` до свого `&lt;img&gt;` тегу в HTML.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default CosmicMissionStage2Css;