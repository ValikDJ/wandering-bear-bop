import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Palette, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import LiveCodeEditor from "@/components/LiveCodeEditor";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface CosmicMissionStage2CssProps {
  completed: boolean;
  onCompletionChange: (completed: boolean) => void;
}

const LOCAL_STORAGE_KEY = "cosmic-mission-stage2-completed";

const cssTemplateUncommented = `body {
    font-family: 'Arial', sans-serif;
    background-color: #1a1a2e;
    color: #e0e0e0;
    margin: 0;
    padding: 20px;
}

header {
    background-color: #2a2a4a;
    color: #b3ffff;
    padding: 15px 20px;
    text-align: center;
    border-bottom: 2px solid #8a2be2;
}

header h1 {
    margin: 0;
    font-size: 2.5em;
}

nav a {
    color: #b3ffff;
    text-decoration: none;
    margin: 0 15px;
}

nav a:hover {
    color: #ff69b4;
}

main {
    max-width: 900px;
    margin: 20px auto;
    background-color: #1f1f3f;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #8a2be2;
    border-radius: 8px;
    background-color: #252545;
}

section h2 {
    color: #ff69b4;
    border-bottom: 1px dashed #8a2be2;
    padding-bottom: 10px;
    margin-top: 0;
}

ul {
    margin-left: 20px;
}

table {
    width: 100%;
    margin-top: 20px;
}

th, td {
    border: 1px solid #8a2be2;
    padding: 10px;
    text-align: left;
}

th {
    background-color: #3a3a5a;
    color: #b3ffff;
}

footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #a0a0a0;
    border-top: 1px solid #3a3a5a;
}
`;

const cssTemplateCommented = `/* style.css - Твої віртуальні пензлі! */

body {
    font-family: 'Arial', sans-serif; /* Встановлює шрифт для всього тексту на сторінці */
    background-color: #1a1a2e; /* Темний космічний фон для всієї сторінки */
    color: #e0e0e0; /* Світлий колір тексту для зірок */
    margin: 0; /* Прибирає зовнішні відступи за замовчуванням */
    padding: 20px; /* Додає внутрішні відступи навколо вмісту сторінки */
}

header {
    background-color: #2a2a4a; /* Темніший фон для шапки сайту */
    color: #b3ffff; /* Неоновий синій колір тексту в шапці */
    padding: 15px 20px; /* Внутрішні відступи для шапки */
    text-align: center; /* Вирівнює текст по центру */
    border-bottom: 2px solid #8a2be2; /* Фіолетова лінія під шапкою */
}

header h1 {
    margin: 0; /* Прибирає зовнішні відступи для заголовка h1 */
    font-size: 2.5em; /* Збільшує розмір шрифту заголовка */
}

nav a {
    color: #b3ffff; /* Колір посилань в навігації */
    text-decoration: none; /* Прибирає підкреслення посилань */
    margin: 0 15px; /* Зовнішні відступи між посиланнями */
}

nav a:hover {
    color: #ff69b4; /* Змінює колір посилань при наведенні курсору */
}

main {
    max-width: 900px; /* Максимальна ширина основного вмісту */
    margin: 20px auto; /* Центрує основний вміст по горизонталі та додає зовнішні відступи */
    background-color: #1f1f3f; /* Фон для основного вмісту */
    padding: 30px; /* Внутрішні відступи для основного вмісту */
    border-radius: 10px; /* Заокруглює кути основного вмісту */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Додає тінь */
}

section {
    margin-bottom: 40px; /* Зовнішній відступ між секціями */
    padding: 20px; /* Внутрішні відступи для секцій */
    border: 1px solid #8a2be2; /* Фіолетова рамка для секцій */
    border-radius: 8px; /* Заокруглює кути секцій */
    background-color: #252545; /* Фон для секцій */
}

section h2 {
    color: #ff69b4; /* Колір заголовків секцій */
    border-bottom: 1px dashed #8a2be2; /* Пунктирна лінія під заголовком секції */
    padding-bottom: 10px; /* Внутрішній відступ знизу для заголовка */
    margin-top: 0; /* Прибирає верхній зовнішній відступ */
}

ul {
    margin-left: 20px; /* Відступ для невпорядкованих списків */
}

table {
    width: 100%; /* Таблиця займає всю доступну ширину */
    margin-top: 20px; /* Верхній зовнішній відступ для таблиці */
}

th, td {
    border: 1px solid #8a2be2; /* Рамка для комірок таблиці */
    padding: 10px; /* Внутрішні відступи для комірок */
    text-align: left; /* Вирівнювання тексту в комірках по лівому краю */
}

th {
    background-color: #3a3a5a; /* Фон для заголовків таблиці */
    color: #b3ffff; /* Колір тексту заголовків таблиці */
}

footer {
    text-align: center; /* Вирівнює текст в підвалі по центру */
    margin-top: 40px; /* Верхній зовнішній відступ для підвалу */
    padding: 20px; /* Внутрішні відступи для підвалу */
    color: #a0a0a0; /* Колір тексту в підвалі */
    border-top: 1px solid #3a3a5a; /* Лінія над підвалом */
}
`;

const demoHtmlForCssEditor = `<!DOCTYPE html>
<html>
<head>
  <title>Демо-сайт</title>
</head>
<body>
  <header>
    <h1>Мій Космічний Проект</h1>
    <nav>
      <a href="#">Головна</a>
      <a href="#">Про нас</a>
    </nav>
  </header>
  <main>
    <section>
      <h2>Ласкаво просимо!</h2>
      <p>Це приклад тексту на моїй космічній сторінці.</p>
      <img src="https://picsum.photos/id/200/150/100" alt="Космічний пейзаж" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;" />
    </section>
    <section>
      <h2>Наші Планети</h2>
      <ul>
        <li>Марс</li>
        <li>Юпітер</li>
        <li>Сатурн</li>
      </ul>
    </section>
  </main>
  <footer>
    <p>&copy; 2024 Космічний Дослідник</p>
  </footer>
</body>
</html>`;

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
          А ось базові стилі, які ти можеш скопіювати у вкладку **CSS** на платформі Logika. Потім експериментуй з кольорами та іншими властивостями, щоб прикрасити *свій власний* сайт!
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

        <h3 className="text-2xl font-bold text-foreground mb-4">Спробуй сам: Інтерактивний редактор!</h3>
        <p className="mb-4 text-muted-foreground">
          Встав скопійований CSS-код у редактор нижче і спробуй змінити деякі значення (наприклад, `background-color` або `color`) та побач, як змінюється вигляд!
        </p>
        <LiveCodeEditor
          id="cosmic-mission-css-editor"
          initialHtml={demoHtmlForCssEditor}
          initialCss={cssTemplateUncommented}
          title="Твій Космічний Дизайн-Стенд"
          description="Змінюй CSS-код і дивись, як твій сайт оживає!"
        />

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
      </CardContent>
    </Card>
  );
};

export default CosmicMissionStage2Css;