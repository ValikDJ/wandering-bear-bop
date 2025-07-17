import React, { useState, useEffect, useLayoutEffect } from "react"; // Added useLayoutEffect
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BookOpen, Cat, Lightbulb, ChevronDown, Star, PanelLeftOpen, PanelLeftClose } from "lucide-react"; // Added PanelLeftOpen, PanelLeftClose
import CountdownTimer from "@/components/CountdownTimer";
import HomeworkPlanningSection from "@/components/HomeworkPlanningSection";
import HomeworkCodeTemplate from "@/components/HomeworkCodeTemplate";
import HomeworkChecklist from "@/components/HomeworkChecklist";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";
import { useLayout } from "@/contexts/LayoutContext"; // NEW IMPORT
import { useIsMobile } from "@/hooks/use-mobile"; // NEW IMPORT

// HTML для прикладу сайту про кота
const catWebsiteExampleHtml = `<!DOCTYPE html>
<html lang="uk">
<head>
    <title>Мій Кіт Мурчик</title>
</head>
<body>
    <header>
        <h1>Сайт про мого кота</h1>
        <a href="#about">Мій кіт</a>
        <a href="#care">Догляд</a>
        <a href="#games">Ігри</a>
    </header>
    <main>
        <h2 id="about">Мій кіт Мурчик</h2>
        <p>Мого кота звати Мурчик. Він дуже грайливий і любить спати на сонечку. Йому 2 роки, і він дуже пухнастий!</p>
        <img src="https://picsum.photos/id/219/300/200" alt="Мурчик спить" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;" />
        
        <h2 id="care">Як доглядати за Мурчиком</h2>
        <p>Мурчик любить, коли його годують двічі на день спеціальним кормом. Також важливо регулярно розчісувати його шерсть, щоб вона не заплутувалась.</p>
        <img src="https://picsum.photos/id/237/300/200" alt="Мурчик їсть" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;" />

        <h2 id="games">Улюблені ігри Мурчика</h2>
        <p>Мурчик обожнює гратися з лазерною указкою та м'ячиками. Він може годинами ганятися за ними по всій квартирі!</p>
        <img src="https://picsum.photos/id/200/300/200" alt="Мурчик грається" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;" />
    </main>
    <footer>
        <p>Проект виконав: Юний Веб-Майстер</p>
    </footer>
</body>
</html>`;

const HomeworkAssignment: React.FC = () => {
  useScrollToHash();
  const { sidebarMode, setSidebarMode } = useLayout(); // NEW: Consume context
  const isMobile = useIsMobile(); // NEW: Check if mobile

  // Removed useLayoutEffect that set temporary sidebar mode.
  // The LayoutContext now handles the initial state based on the route.

  const toggleSidebar = () => {
    if (sidebarMode === 'interactive-hover') {
      setSidebarMode('pinned-full'); // Expand
    } else {
      setSidebarMode('interactive-hover'); // Collapse
    }
  };

  // Визначення дедлайну (наприклад, найближча п'ятниця о 18:00)
  const getNextFridayDeadline = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
    let daysUntilFriday = 5 - dayOfWeek;
    if (daysUntilFriday < 0) { // If it's Saturday or Sunday, target next Friday
      daysUntilFriday += 7;
    }
    // If it's Friday but past 18:00, target next Friday
    if (dayOfWeek === 5 && now.getHours() >= 18) {
      daysUntilFriday += 7;
    }

    const deadline = new Date(now);
    deadline.setDate(now.getDate() + daysUntilFriday);
    deadline.setHours(18, 0, 0, 0); // 18:00:00
    return deadline;
  };

  const deadline = getNextFridayDeadline();

  // State for individual step completion (from localStorage)
  const [step1Completed, setStep1Completed] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("homework-step1-completed");
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.error("Failed to load step 1 completion:", error);
      return false;
    }
  });
  const [step2Completed, setStep2Completed] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("homework-step2-completed");
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.error("Failed to load step 2 completion:", error);
      return false;
    }
  });
  const [step3Completed, setStep3Completed] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("homework-step3-completed");
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.error("Failed to load step 3 completion:", error);
      return false;
    }
  });
  const [step4Completed, setStep4Completed] = useState<boolean>(false); // No specific checkbox for step 4, it's a viewing step
  const [step5Completed, setStep5Completed] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("homework-step5-completed");
      return stored ? JSON.parse(stored) : false;
    } catch (error) {
      console.error("Failed to load step 5 completion:", error);
      return false;
    }
  });

  // Update localStorage when step completion changes
  useEffect(() => {
    try {
      localStorage.setItem("homework-step1-completed", JSON.stringify(step1Completed));
    } catch (error) {
      console.error("Failed to save step 1 completion:", error);
    }
  }, [step1Completed]);

  useEffect(() => {
    try {
      localStorage.setItem("homework-step2-completed", JSON.stringify(step2Completed));
    } catch (error) {
      console.error("Failed to save step 2 completion:", error);
    }
  }, [step2Completed]);

  useEffect(() => {
    try {
      localStorage.setItem("homework-step3-completed", JSON.stringify(step3Completed));
    }
    catch (error) {
      console.error("Failed to save step 3 completion:", error);
    }
  }, [step3Completed]);

  useEffect(() => {
    try {
      localStorage.setItem("homework-step5-completed", JSON.stringify(step5Completed));
    } catch (error) {
      console.error("Failed to save step 5 completion:", error);
    }
  }, [step5Completed]);

  // Calculate progress
  const completedStepsCount = [step1Completed, step2Completed, step3Completed, step4Completed, step5Completed].filter(Boolean).length;
  const totalSteps = 5;
  const progress = (completedStepsCount / totalSteps) * 100;

  return (
    <div className="py-8">
      <h1 className="text-5xl font-extrabold text-center mb-4 text-foreground">
        Домашнє завдання: Створюємо свій перший сайт!
      </h1>
      <p className="text-xl text-center mb-10 max-w-3xl mx-auto text-muted-foreground">
        Це покроковий посібник для твого першого веб-проекту. <strong>Пам'ятай:</strong> ти будеш створювати HTML-код на платформі Logika, у вікні редактора HTML в модулі <strong>"Керуй стилями" (Урок 5, пункт 9 "Підготовка проєкту. Початок")</strong>. Цей сайт лише допомагає тобі зрозуміти, що і як робити, а також відстежувати прогрес. Не забудь уважно читати умови завдання на платформі Logika, позначати виконані пункти та надсилати роботу викладачу на перевірку (також після <strong>пункту 10 "Підготовка проєкту. Підсумок"</strong>, де теж є завдання, які потрібно позначати, якщо виконав їх)!
      </p>

      <div className="mb-10 no-print">
        <CountdownTimer deadline={deadline} />
      </div>

      <div className="mb-10 no-print">
        <h3 className="text-2xl font-bold text-foreground mb-4">Твій прогрес:</h3>
        <Progress value={progress} className="w-full h-4 bg-muted bg-brand-primary" />
        <p className="text-right text-sm text-muted-foreground mt-2">{Math.round(progress)}% виконано</p>
      </div>

      <div className="space-y-12">
        <HomeworkPlanningSection />

        <HomeworkCodeTemplate />

        <Card className="bg-card shadow-md animate-fade-in-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Крок 3: Заміни на свою інформацію
            </CardTitle>
            <div className="flex items-center space-x-2 no-print">
              <Checkbox
                id="step3-completed"
                checked={step3Completed}
                onCheckedChange={(checked: boolean) => setStep3Completed(checked)}
                className="h-6 w-6"
              />
              <Label htmlFor="step3-completed" className="text-lg font-medium text-muted-foreground">
                Виконано
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Тепер найцікавіше! Відкрий вікно редактора HTML на платформі Logika або у текстовому редакторі (наприклад, Блокнот, VS Code) і заміни шаблонний текст на свою інформацію.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted text-muted-foreground">
                    <th className="border border-border p-3 font-semibold">Що замінити</th>
                    <th className="border border-border p-3 font-semibold">На що замінити</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 text-foreground">"Назва" (у тегу `&lt;title&gt;`)</td>
                    <td className="border border-border p-3 text-foreground">Назва твоєї вкладки в браузері (наприклад, "Мій сайт про кота")</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-foreground">"Назва сайту" (у тегу `&lt;h1&gt;` в `&lt;header&gt;`)</td>
                    <td className="border border-border p-3 text-foreground">Назва твого сайту (наприклад, "Світ Мурчика")</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-foreground">"Розділ 1", "Розділ 2", "Розділ 3" (у тегах `&lt;a&gt;`)</td>
                    <td className="border border-border p-3 text-foreground">Назви твоїх розділів з Кроку 1 (наприклад, "Про Мурчика", "Догляд", "Ігри")</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-foreground">"Заголовок 1", "Заголовок 2", "Заголовок 3" (у тегах `&lt;h2&gt;`)</td>
                    <td className="border border-border p-3 text-foreground">Твої заголовки для кожного розділу</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-foreground">"Тут твій текст про тему" (у тегах `&lt;p&gt;`)</td>
                    <td className="border border-border p-3 text-foreground">Напиши 2-3 речення (або більше, якщо потрібно) тексту для кожного розділу</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-foreground">`src=""` та `alt="Опис картинки"` (у тегах `&lt;img&gt;`)</td>
                    <td className="border border-border p-3 text-foreground">
                      Встав шлях до своїх картинок (наприклад, `cat.jpg`) або <strong>скопіюй посилання на картинку з інтернету</strong> та напиши, що на них зображено.
                      <Collapsible className="mt-2">
                        <CollapsibleTrigger asChild>
                          <Button variant="link" className="p-0 h-auto text-brand-primary hover:underline no-print">
                            Де взяти картинки? <ChevronDown className="h-4 w-4 ml-1 transition-transform data-[state=open]:rotate-180 chevron-icon" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
                          <div className="p-2 border border-border rounded-md bg-muted mt-1 text-muted-foreground text-sm">
                            <p>Ти можеш використовувати свої фотографії або знайти безкоштовні картинки на сайтах типу <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Unsplash</a> або <a href="https://www.pexels.com/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Pexels</a>. Збережи їх у тій самій папці, що й `index.html`, або у підпапці `images/`.</p>
                            <p className="mt-2">Щоб скопіювати посилання на картинку з інтернету: клацни правою кнопкою миші на картинці і вибери "Копіювати адресу зображення" (або схожий пункт).</p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-foreground">"ТВОЄ ІМ'Я" (у тегу `&lt;p&gt;` в `&lt;footer&gt;`)</td>
                    <td className="border border-border p-3 text-foreground">Напиши своє ім'я та прізвище</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-foreground">Додавання таблиць</td>
                    <td className="border border-border p-3 text-foreground">
                      Ти також можеш додати таблиці, використовуючи теги `&lt;table&gt;`, `&lt;tr&gt;` та `&lt;td&gt;`.
                      <Collapsible className="mt-2">
                        <CollapsibleTrigger asChild>
                          <Button variant="link" className="p-0 h-auto text-brand-primary hover:underline no-print">
                            Приклад таблиці <ChevronDown className="h-4 w-4 ml-1 transition-transform data-[state=open]:rotate-180 chevron-icon" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
                          <div className="p-2 border border-border rounded-md bg-muted mt-1 text-muted-foreground text-sm">
                            <SyntaxHighlighter language="html" style={atomDark} customStyle={{ borderRadius: '8px', padding: '10px', fontSize: '0.8em' }}>
                              {`<table>
  <tr>
    <td>Заголовок 1</td>
    <td>Заголовок 2</td>
  </tr>
  <tr>
    <td>Дані 1</td>
    <td>Дані 2</td>
  </tr>
</table>`}
                            </SyntaxHighlighter>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Collapsible className="mt-6">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
                  Поради щодо написання тексту
                  <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
                <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Будь коротким:</strong> Пиши 2-3 речення (або більше, якщо потрібно) для кожного абзацу.</li>
                    <li><strong>Будь цікавим:</strong> Розкажи щось, що тобі дійсно подобається у твоїй темі.</li>
                    <li><strong>Перевіряй помилки:</strong> Попроси дорослих перевірити текст на помилки.</li>
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md animate-fade-in-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Cat className="h-6 w-6 text-primary" />
              Крок 4: Подивись, як має виглядати
            </CardTitle>
            <div className="flex items-center space-x-2 no-print">
              <Checkbox
                id="step4-completed"
                checked={step4Completed}
                onCheckedChange={(checked: boolean) => setStep4Completed(checked)}
                className="h-6 w-6"
              />
              <Label htmlFor="step4-completed" className="text-lg font-medium text-muted-foreground">
                Переглянуто
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Ось приклад, як може виглядати готовий сайт про кота. <strong>Це лише приклад!</strong> Твій сайт може виглядати інакше, головне, щоб він містив твою інформацію та був структурований за допомогою HTML.
            </p>
            <div className="relative mb-4">
              <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Приклад HTML коду:</h4>
              <SyntaxHighlighter language="html" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', maxHeight: '400px', overflowY: 'auto' }}>
                {catWebsiteExampleHtml}
              </SyntaxHighlighter>
            </div>
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Як це виглядає:</h4>
            <iframe
              srcDoc={catWebsiteExampleHtml}
              title="Cat Website Example"
              className="w-full h-[400px] border border-border rounded-md bg-white shadow-inner"
              sandbox="allow-scripts"
            ></iframe>
          </CardContent>
        </Card>

        <HomeworkChecklist />

        {/* NEW: Завдання із зірочкою */}
        <Card className="bg-card shadow-md animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Завдання із зірочкою: Почни стилізувати свій сайт!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Якщо ти вже впорався з основною структурою сайту, спробуй зробити його красивішим за допомогою CSS!
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>Зміни колір фону для `&lt;body&gt;` або `&lt;main&gt;`.</li>
              <li>Зміни колір тексту для заголовків (`&lt;h1&gt;`, `&lt;h2&gt;`) та абзаців (`&lt;p&gt;`).</li>
              <li>Зміни розмір шрифту для різних елементів.</li>
              <li>Додай рамки (`border`) або заокруглені кути (`border-radius`) до картинок або блоків.</li>
              <li>Вирівняй текст по центру (`text-align: center;`) для заголовків.</li>
            </ul>
            <p className="text-muted-foreground">
              Ти можеш використовувати <Link to="/css-playground" className="text-brand-primary hover:underline">CSS Майстерню</Link> або <Link to="/css-properties" className="text-brand-primary hover:underline">Урок з CSS Властивостей</Link> для підказок!
            </p>
          </CardContent>
        </Card>

        {/* NEW: Натхнення: Приклади сайтів інших учнів */}
        <Card className="bg-card shadow-md animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Натхнення: Приклади сайтів інших учнів
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Подивись, які круті сайти вже створили інші учні! Вони вже мають готову структуру та стилі. Можливо, це надихне тебе на власні ідеї!
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <a href="https://staver1.github.io/M2Y5/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Сайт 1: Приклад сайту про хобі</a>
              </li>
              <li>
                <a href="https://logika-web-frontend.github.io/students-web/m2/spiderman/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Сайт 2: Приклад сайту про героя</a>
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              Пам'ятай, що ці сайти вже стилізовані за допомогою CSS. Твоє завдання - спочатку створити HTML-структуру, а потім, якщо хочеш, почати додавати стилі!
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card shadow-md animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Що буде далі?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Вітаю! Ти створив свій перший сайт! На наступних уроках ми продовжимо вдосконалювати твої навички, щоб ти міг створити справжній шедевр. А вже на **відкритому уроці** ти матимеш чудову нагоду **продемонструвати свої проекти батькам** та показати їм, чого ти навчився! Вони будуть вражені твоїми результатами!
            </p>
            <p className="text-lg font-semibold text-brand-primary">
              Продовжуй творити та експериментувати! Ти - справжній веб-майстер!
            </p>
          </CardContent>
        </Card>
      </div>
      <LessonNavigation />

      {/* Sidebar Toggle Button (Desktop only, when not hidden) */}
      {!isMobile && (
        <Button
          onClick={toggleSidebar}
          variant="outline"
          size="icon"
          className="fixed top-20 left-4 z-40 shadow-lg bg-card text-card-foreground hover:bg-card/80 no-print"
          aria-label={sidebarMode === 'interactive-hover' ? "Розгорнути бічну панель" : "Згорнути бічну панель"}
        >
          {sidebarMode === 'interactive-hover' ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      )}
    </div>
  );
};

export default HomeworkAssignment;