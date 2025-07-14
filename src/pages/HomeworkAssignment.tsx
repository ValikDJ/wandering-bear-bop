import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BookOpen, Cat, Lightbulb } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import HomeworkPlanningSection from "@/components/HomeworkPlanningSection";
import HomeworkCodeTemplate from "@/components/HomeworkCodeTemplate";
import HomeworkChecklist from "@/components/HomeworkChecklist";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { cn } from "@/lib/utils";

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
        <img src="https://picsum.photos/id/219/300/200" alt="Мурчик спить" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;">
        
        <h2 id="care">Як доглядати за Мурчиком</h2>
        <p>Мурчик любить, коли його годують двічі на день спеціальним кормом. Також важливо регулярно розчісувати його шерсть, щоб вона не заплутувалась.</p>
        <img src="https://picsum.photos/id/237/300/200" alt="Мурчик їсть" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;">

        <h2 id="games">Улюблені ігри Мурчика</h2>
        <p>Мурчик обожнює гратися з лазерною указкою та м'ячиками. Він може годинами ганятися за ними по всій квартирі!</p>
        <img src="https://picsum.photos/id/200/300/200" alt="Мурчик грається" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;">
    </main>
    <footer>
        <p>Проект виконав: Юний Веб-Майстер</p>
    </footer>
</body>
</html>`;

const HomeworkAssignment: React.FC = () => {
  useScrollToHash();

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
    } catch (error) {
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
        Крок за кроком до твого власного сайту
      </p>

      <div className="mb-10">
        <CountdownTimer deadline={deadline} />
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-bold text-foreground mb-4">Твій прогрес:</h3>
        <Progress value={progress} className="w-full h-4 bg-muted" indicatorClassName="bg-brand-primary" />
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
            <div className="flex items-center space-x-2">
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
              Тепер найцікавіше! Відкрий свій файл `index.html` у текстовому редакторі (наприклад, Блокнот, VS Code) і заміни шаблонний текст на свою інформацію.
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
                    <td className="border border-border p-3 text-foreground">Напиши 2-3 речення тексту для кожного розділу</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-foreground">`src=""` та `alt="Опис картинки"` (у тегах `&lt;img&gt;`)</td>
                    <td className="border border-border p-3 text-foreground">
                      Встав шлях до своїх картинок (наприклад, `cat.jpg`) та напиши, що на них зображено.
                      <Collapsible className="mt-2">
                        <CollapsibleTrigger asChild>
                          <Button variant="link" className="p-0 h-auto text-brand-primary hover:underline">
                            Де взяти картинки? <ChevronDown className="h-4 w-4 ml-1 transition-transform data-[state=open]:rotate-180" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                          <div className="p-2 border border-border rounded-md bg-muted mt-1 text-muted-foreground text-sm">
                            <p>Ти можеш використовувати свої фотографії або знайти безкоштовні картинки на сайтах типу <a href="https://unsplash.com/" target="_blank" className="text-brand-primary hover:underline">Unsplash</a> або <a href="https://www.pexels.com/" target="_blank" className="text-brand-primary hover:underline">Pexels</a>. Збережи їх у тій самій папці, що й `index.html`, або у підпапці `images/`.</p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 text-foreground">"ТВОЄ ІМ'Я" (у тегу `&lt;p&gt;` в `&lt;footer&gt;`)</td>
                    <td className="border border-border p-3 text-foreground">Напиши своє ім'я та прізвище</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Collapsible className="mt-6">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80">
                  Поради щодо написання тексту
                  <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2">
                    <li>**Будь коротким:** Пиши 2-3 речення для кожного абзацу.</li>
                    <li>**Будь цікавим:** Розкажи щось, що тобі дійсно подобається у твоїй темі.</li>
                    <li>**Перевіряй помилки:** Попроси дорослих перевірити текст на помилки.</li>
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
            <div className="flex items-center space-x-2">
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
              Ось приклад, як може виглядати готовий сайт про кота. Зверни увагу, як текст та картинки замінені на реальний вміст.
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

        <Card className="bg-card shadow-md animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Що буде далі?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Вітаю! Ти створив свій перший сайт! На наступному уроці ми навчимося робити його ще красивішим за допомогою CSS. Ти дізнаєшся, як змінювати кольори, шрифти, розміри та багато іншого!
            </p>
            <p className="text-lg font-semibold text-brand-primary">
              Продовжуй творити та експериментувати! Ти - справжній веб-майстер!
            </p>
          </CardContent>
        </Card>
      </div>
      <LessonNavigation />
    </div>
  );
};

export default HomeworkAssignment;