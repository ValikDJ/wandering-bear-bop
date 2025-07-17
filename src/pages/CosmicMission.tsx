import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Rocket, Code, Palette, Star, ChevronDown, CheckSquare, MessageSquareText } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CosmicMissionChecklist from "@/components/CosmicMissionChecklist";
import { useTheme } from "@/hooks/use-theme";
import { ThemeMode } from "@/lib/ThemeManager";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import LiveCodeEditor from "@/components/LiveCodeEditor";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

// Simple HTML for the embedded editor to demonstrate CSS
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

const CosmicMission: React.FC = () => {
  useScrollToHash();
  const { setTheme, getMode, getPreviousUserMode } = useTheme();
  const initialThemeRef = useRef<ThemeMode | null>(null);

  // State for main stage completion
  const [stage1Completed, setStage1Completed] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("cosmic-mission-stage1-completed");
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.error("Failed to load cosmic mission stage 1 completion:", error);
      return false;
    }
  });
  const [stage2Completed, setStage2Completed] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("cosmic-mission-stage2-completed");
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.error("Failed to load cosmic mission stage 2 completion:", error);
      return false;
    }
  });
  // Assuming CosmicMissionChecklist handles its own completion state, we'll just read it
  const [checklistCompleted, setChecklistCompleted] = useState<boolean>(false);
  const [displayCommentedCss, setDisplayCommentedCss] = useState(false); // NEW state for toggling comments

  useEffect(() => {
    initialThemeRef.current = getMode();
    setTheme(ThemeMode.Cosmic, true);

    return () => {
      const previousMode = getPreviousUserMode();
      if (previousMode) {
        setTheme(previousMode, false);
      } else {
        setTheme(ThemeMode.System, false);
      }
    };
  }, [setTheme, getMode, getPreviousUserMode]);

  // Save stage completion to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cosmic-mission-stage1-completed", JSON.stringify(stage1Completed));
    } catch (error) {
      console.error("Failed to save stage 1 completion:", error);
    }
  }, [stage1Completed]);

  useEffect(() => {
    try {
      localStorage.setItem("cosmic-mission-stage2-completed", JSON.stringify(stage2Completed));
    } catch (error) {
      console.error("Failed to save stage 2 completion:", error);
    }
  }, [stage2Completed]);

  // Callback from CosmicMissionChecklist to update its completion status
  const handleChecklistCompletionChange = (completed: boolean) => {
    setChecklistCompleted(completed);
  };

  // Calculate overall progress
  const completedStagesCount = [stage1Completed, stage2Completed, checklistCompleted].filter(Boolean).length;
  const totalStages = 3; // HTML Ready, CSS Applied, Checklist Completed
  const progress = (completedStagesCount / totalStages) * 100;

  const handleCopyCss = (version: 'uncommented' | 'commented') => {
    const textToCopy = version === 'commented' ? cssTemplateCommented : cssTemplateUncommented;
    navigator.clipboard.writeText(textToCopy);
    toast.success(`CSS-код (${version === 'commented' ? 'з коментарями' : 'без коментарів'}) скопійовано! 🎨`);
  };

  const handleSubmitInstructions = () => {
    toast.info("Збережи файли на платформі Logika та покажи вчителю! 🧑‍🏫");
  };

  return (
    <div className="py-8">
      <h1 className="text-5xl font-extrabold text-center mb-6 text-foreground">
        🚀 Космічна Місія: Прикрашаємо Твій Сайт!
      </h1>
      <p className="text-xl text-center mb-10 max-w-3xl mx-auto text-muted-foreground">
        Вітаю, юний Космічний Архітекторе! Ти вже створив каркас своєї веб-сторінки вдома. Сьогодні твоя місія — прикрасити її за допомогою CSS, щоб вона стала справжньою космічною базою в Інтернеті! Ми пройдемо два важливі етапи: прикрашання (CSS) та запуск у космос (перегляд та здача)!
      </p>

      {/* Прогрес-бар місії */}
      <div className="mb-10 no-print">
        <h3 className="text-2xl font-bold text-foreground mb-4">Прогрес Місії:</h3>
        <Progress value={progress} className="w-full h-4 bg-muted bg-brand-primary" />
        <p className="text-right text-sm text-muted-foreground mt-2">{Math.round(progress)}% виконано</p>
      </div>

      {/* Етап 1: Твій Готовий Каркас (HTML) */}
      <Card className="mb-12 bg-card shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Code className="h-8 w-8 text-primary" />
            Етап 1: Твій Готовий Каркас (HTML)
          </CardTitle>
          <div className="flex items-center space-x-2 no-print">
            <Checkbox
              id="stage1-completed"
              checked={stage1Completed}
              onCheckedChange={(checked: boolean) => setStage1Completed(checked)}
              className="h-6 w-6"
            />
            <Label htmlFor="stage1-completed" className="text-lg font-medium text-muted-foreground">
              Виконано
            </Label>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Ти вже виконав домашнє завдання і маєш свій HTML-код! Це креслення твоєї космічної бази, яке визначає, де будуть стіни, двері, вікна.
          </p>
          <p className="mb-4 text-muted-foreground font-semibold">
            **Відкрий свій HTML-файл на платформі Logika.** Переконайся, що він містить:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
            <li><code>&lt;header&gt;</code>: Командний місток з назвою та навігацією.</li>
            <li><code>&lt;main&gt;</code>: Основний відсік з важливою інформацією.</li>
            <li>Кілька <code>&lt;section&gt;</code>: Окремі кімнати або зони.</li>
            <li><code>&lt;h2&gt;</code>: Заголовки для кожної кімнати.</li>
            <li><code>&lt;p&gt;</code>: Текст у абзацах.</li>
            <li>Хоча б одну <code>&lt;img&gt;</code>: Зображення з атрибутами `src` та `alt`.</li>
            <li><code>&lt;footer&gt;</code>: Підвал бази з інформацією про тебе.</li>
          </ul>

          <Collapsible className="mt-6">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
                🤔 Навіщо так складно? (Натисни, щоб дізнатися)
                <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
              <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
                <p className="mb-2">
                  Використання тегів на кшталт `&lt;header&gt;`, `&lt;main&gt;`, `&lt;footer&gt;` та `&lt;section&gt;` робить твій код не просто набором символів, а осмисленою структурою! Це називається **семантичною розміткою**.
                </p>
                <ul className="list-disc list-inside">
                  <li>**Для людей:** Твій код легше читати та розуміти іншим розробникам (і тобі самому через місяць!).</li>
                  <li>**Для пошукових систем:** Google та інші пошуковики краще розуміють, про що твій сайт, і можуть показувати його вище в результатах пошуку.</li>
                  <li>**Для доступності:** Програми для людей з обмеженими можливостями (наприклад, для читання екрану) краще орієнтуються на сайті, якщо він має чітку структуру.</li>
                </ul>
                <p className="mt-2">
                  Тож, це не просто "складно", це "розумно" і "професійно"!
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <p className="mt-6 text-muted-foreground">
            Якщо ти хочеш переглянути або вдосконалити свій HTML-код, відвідай:
            <ul className="list-disc list-inside ml-4 mt-2">
              <li><Link to="/html-tags" className="text-brand-primary hover:underline">Урок: HTML Теги</Link></li>
              <li><Link to="/examples#example-html-creator" className="text-brand-primary hover:underline">Практика: Створи свій HTML-елемент!</Link></li>
            </ul>
          </p>
        </CardContent>
      </Card>

      {/* Етап 2: Дизайн з CSS */}
      <Card className="mb-12 bg-card shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Palette className="h-8 w-8 text-primary" />
            Етап 2: Прикрашаємо Базу (CSS)
          </CardTitle>
          <div className="flex items-center space-x-2 no-print">
            <Checkbox
              id="stage2-completed"
              checked={stage2Completed}
              onCheckedChange={(checked: boolean) => setStage2Completed(checked)}
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
            initialCss={cssTemplateUncommented} // Live editor always starts with uncommented
            title="Твій Космічний Дизайн-Стенд"
            description="Змінюй CSS-код і дивись, як твій сайт оживає!"
          />

          <Collapsible className="mt-6">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
                🎨 Ідеї для стилізації (Натисни, щоб дізнатися)
                <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
              <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
                <p className="mb-2">Використовуй властивості, які ти вже вивчив в уроці <Link to="/css-properties" className="text-brand-primary hover:underline">"CSS Властивості"</Link>! Спробуй змінити ці властивості, щоб твоя база виглядала унікально:</p>
                <ul className="list-disc list-inside">
                  <li><code>color</code>: Зміни колір тексту для заголовків (`h1`, `h2`) та абзаців (`p`).</li>
                  <li><code>background-color</code>: Зміни колір фону для `body`, `header`, `main` або `section`.</li>
                  <li><code>font-size</code>: Збільш або зменш розмір шрифту для різних елементів.</li>
                  <li><code>font-family</code>: Зміни тип шрифту.</li>
                  <li><code>text-align</code>: Вирівняй текст по центру (`center`), ліворуч (`left`) або праворуч (`right`).</li>
                  <li><code>margin</code>: Додай зовнішні відступи, щоб елементи не "злипалися".</li>
                  <li><code>padding</code>: Додай внутрішні відступи, щоб текст не "прилипав" до країв елементів.</li>
                  <li><code>border</code>: Додай рамки до `section`, `img` або `table`.</li>
                  <li><code>border-radius</code>: Заокругли кути елементів, наприклад, для картинок або секцій.</li>
                  <li><code>text-decoration</code>: Прибери підкреслення у посилань (<code>a &lbrace; text-decoration: none; &rbrace;</code>).</li>
                  <li><code>opacity</code>: Зроби елементи напівпрозорими.</li>
                  <li><code>width</code> / <code>height</code>: Зміни ширину або висоту елементів (наприклад, картинок).</li>
                  <li><code>box-shadow</code>: Додай тінь до елементів.</li>
                  <li><code>box-sizing</code>: Визнач, як розраховується загальна ширина та висота елемента.</li>
                </ul>
                <p className="mt-2">
                  Експериментуй! Ти можеш використовувати <Link to="/css-playground" className="text-brand-primary hover:underline">CSS Майстерню</Link> для інтерактивної практики!
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Етап 3: Запускаємо в Космос! (Перегляд та Здача) */}
      <Card className="mb-12 bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Rocket className="h-8 w-8 text-primary" />
            Етап 3: Запускаємо в Космос! (Перегляд та Здача)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Твоя космічна база готова до запуску! Після того, як ти вставив HTML та CSS код у відповідні вкладки на платформі Logika, ти зможеш одразу побачити результат!
          </p>
          <p className="mb-6 text-muted-foreground">
            Коли ти впевнений, що твій сайт виглядає чудово, настав час показати його своєму вчителю!
          </p>
          <div className="text-center mb-6">
            <Button
              onClick={handleSubmitInstructions}
              className="bg-brand-primary text-primary-foreground hover:bg-brand-primary-hover text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 no-print"
            >
              ➡️ Як здати роботу вчителю ⬅️
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Чек-ліст Космічного Архітектора */}
      <CosmicMissionChecklist onCompletionChange={handleChecklistCompletionChange} />

      {/* Що далі? */}
      <Card className="mb-12 bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Star className="h-8 w-8 text-yellow-500" />
            Що Далі? Нові Галактики Чекають!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Вітаю, ти успішно завершив свою першу космічну місію! Твій сайт тепер у космосі!
          </p>
          <p className="text-lg font-semibold text-brand-primary">
            Наступного разу ми навчимося робити твою космічну базу ще більш інтерактивною та динамічною за допомогою JavaScript — мови, яка оживляє веб-сторінки! Готуйся до нових пригод!
          </p>
        </CardContent>
      </Card>

      <LessonNavigation />
    </div>
  );
};

export default CosmicMission;