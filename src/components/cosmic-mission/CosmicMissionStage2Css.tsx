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
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface CosmicMissionStage2CssProps {
  completed: boolean;
  onCompletionChange: (completed: boolean) => void;
}

const LOCAL_STORAGE_KEY = "cosmic-mission-stage2-completed";

const cssTemplateUncommented = `/* style.css - Твої віртуальні пензлі! */

/* Загальні стилі для всієї сторінки */
body {
  background-color: #1a1a2e;
  color: #e0e0e0;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 20px;
}

/* Стилі для заголовків */
h1 {
  color: #b3ffff;
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  color: #ff69b4;
  border-bottom: 1px dashed #8a2be2;
  padding-bottom: 10px;
  margin-top: 0;
}

/* Стилі для абзаців тексту */
p {
  color: #e0e0e0;
  font-size: 18px;
  line-height: 1.6;
}

/* Стилі для посилань */
a {
  color: #b3ffff;
  text-decoration: none;
}

a:hover {
  color: #ff69b4;
}

/* Стилі для зображень */
img {
  width: 100%;
  height: auto;
  border: 2px solid #8a2be2;
  border-radius: 8px;
  opacity: 0.8;
  display: block;
  margin: 10px auto;
}

/* Стилі для кнопок */
button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

/* Стилі для універсальних блоків (div) або секцій */
div, section {
  background-color: #252545;
  border: 1px solid #8a2be2;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}

/* Стилі для списків */
ul, ol {
  margin-left: 20px;
  color: #e0e0e0;
}

li {
  margin-bottom: 5px;
}

/* Стилі для таблиць */
table {
  width: 100%;
  border-collapse: collapse;
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

/* Стилі для підвалу сайту */
footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: #a0a0a0;
  border-top: 1px solid #3a3a5a;
}
`;

const cssTemplateCommented = `/* style.css - Твої віртуальні пензлі! */

/* Загальні стилі для всієї сторінки */
body {
  background-color: #1a1a2e; /* Колір фону для всієї сторінки (наприклад, темний космос) */
  color: #e0e0e0; /* Колір тексту для всієї сторінки (наприклад, світлі зірки) */
  font-family: 'Arial', sans-serif; /* Тип шрифту для всього тексту */
  margin: 0; /* Прибирає зовнішні відступи за замовчуванням */
  padding: 20px; /* Додає внутрішні відступи навколо вмісту сторінки */
}

/* Стилі для заголовків */
h1 {
  color: #b3ffff; /* Колір головного заголовка */
  font-size: 2.5em; /* Розмір шрифту головного заголовка */
  text-align: center; /* Вирівнювання тексту по центру */
  margin-bottom: 20px; /* Відступ знизу */
}

h2 {
  color: #ff69b4; /* Колір підзаголовків */
  border-bottom: 1px dashed #8a2be2; /* Лінія під підзаголовком */
  padding-bottom: 10px; /* Відступ під лінією */
  margin-top: 0; /* Прибирає верхній зовнішній відступ */
}

/* Стилі для абзаців тексту */
p {
  color: #e0e0e0; /* Колір тексту абзаців */
  font-size: 18px; /* Розмір шрифту абзаців */
  line-height: 1.6; /* Висота рядка для кращої читабельності */
}

/* Стилі для посилань */
a {
  color: #b3ffff; /* Колір посилань */
  text-decoration: none; /* Прибирає підкреслення */
  /* text-decoration: underline;  Додає підкреслення */
}

a:hover {
  color: #ff69b4; /* Колір посилання при наведенні курсору */
}

/* Стилі для зображень */
img {
  width: 100%; /* Ширина зображення (100% від батьківського елемента) */
  height: auto; /* Автоматична висота для збереження пропорцій */
  border: 2px solid #8a2be2; /* Рамка навколо зображення */
  border-radius: 8px; /* Заокруглення кутів зображення */
  opacity: 0.8; /* Напівпрозорість */
  display: block; /* Робить зображення блоковим елементом */
  margin: 10px auto; /* Центрує зображення по горизонталі */
}

/* Стилі для кнопок */
button {
  background-color: #4CAF50; /* Колір фону кнопки */
  color: white; /* Колір тексту кнопки */
  padding: 10px 20px; /* Внутрішні відступи кнопки */
  border: none; /* Прибирає рамку */
  border-radius: 5px; /* Заокруглення кутів кнопки */
  cursor: pointer; /* Змінює курсор на вказівник */
  font-weight: bold; /* Жирний шрифт */
}

/* Стилі для універсальних блоків (div) або секцій */
div, section {
  background-color: #252545; /* Колір фону для блоків/секцій */
  border: 1px solid #8a2be2; /* Рамка для блоків/секцій */
  border-radius: 10px; /* Заокруглення кутів */
  padding: 20px; /* Внутрішні відступи */
  margin-bottom: 20px; /* Зовнішній відступ знизу */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Тінь */
  /* width: 80%;  Ширина блоку */
  /* height: 150px;  Висота блоку */
  opacity: 0.9; /* Прозорість */
  box-sizing: border-box; /* Включає padding та border у загальну ширину/висоту */
}

/* Стилі для списків */
ul, ol {
  margin-left: 20px; /* Відступ зліва для списків */
  color: #e0e0e0; /* Колір тексту списків */
}

li {
  margin-bottom: 5px; /* Відступ між елементами списку */
}

/* Стилі для таблиць */
table {
  width: 100%; /* Таблиця займає всю доступну ширину */
  border-collapse: collapse; /* Прибирає подвійні рамки між комірками */
  margin-top: 20px; /* Верхній зовнішній відступ */
}

th, td {
  border: 1px solid #8a2be2; /* Рамка для комірок таблиці */
  padding: 10px; /* Внутрішні відступи для комірок */
  text-align: left; /* Вирівнювання тексту в комірках */
}

th {
  background-color: #3a3a5a; /* Фон для заголовків таблиці */
  color: #b3ffff; /* Колір тексту заголовків таблиці */
}

/* Стилі для підвалу сайту */
footer {
  text-align: center; /* Вирівнює текст в підвалі по центру */
  margin-top: 40px; /* Верхній зовнішній відступ */
  padding: 20px; /* Внутрішні відступи */
  color: #a0a0a0; /* Колір тексту в підвалі */
  border-top: 1px solid #3a3a5a; /* Лінія над підвалом */
}
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
                <li>**Вибрати елемент:** Використовуй **CSS-селектори** (наприклад, назву тегу `body`, `h1`, `p`, `img`, `section` або `footer`) щоб вказати, до якого елемента застосувати стиль.</li>
                <li>**Вибрати властивість:** Обери, що саме ти хочеш змінити (колір, розмір, фон тощо).</li>
                <li>**Встановити значення:** Признач цій властивості бажане значення (наприклад, `color: blue;` або `font-size: 20px;`).</li>
              </ul>
              <p className="mb-2">
                **Куди застосувати стилі?**
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>**`body`**: Зміни фон (`background-color`) або загальний колір тексту (`color`) для всієї сторінки.</li>
                <li>**`h1`, `h2`, `p`**: Зміни колір тексту (`color`), розмір шрифту (`font-size`), тип шрифту (`font-family`) або вирівнювання тексту (`text-align`).</li>
                <li>**`img`**: Додай рамку (`border`), заокругли кути (`border-radius`), зміни ширину (`width`) або висоту (`height`), зроби напівпрозорою (`opacity`).</li>
                <li>**`a` (посилання)**: Зміни колір (`color`), прибери підкреслення (`text-decoration: none;`).</li>
                <li>**`button`**: Зміни фон (`background-color`), колір тексту (`color`), внутрішні відступи (`padding`), заокругли кути (`border-radius`).</li>
                <li>**`div`, `section`**: Зміни фон (`background-color`), додай рамку (`border`), внутрішні (`padding`) та зовнішні (`margin`) відступи, тінь (`box-shadow`).</li>
                <li>**`ul`, `ol`, `li` (списки)**: Зміни відступи (`margin-left`), колір тексту.</li>
                <li>**`table`, `th`, `td` (таблиці)**: Додай рамки (`border`), зміни фон (`background-color`) для заголовків (`th`).</li>
                <li>**`header`, `footer`**: Зміни фон (`background-color`), колір тексту (`color`), відступи (`padding`).</li>
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