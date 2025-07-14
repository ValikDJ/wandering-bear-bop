import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Copy, Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

const htmlTemplate = `<!DOCTYPE html>
<html lang="uk">
<head>
    <title>Назва</title>
</head>
<body>
    <header>
        <h1>Назва сайту</h1>
        <a href="#home">Розділ 1</a>
        <a href="#title2">Розділ 2</a>
        <a href="#title3">Розділ 3</a>
    </header>
    <main>
        <h2 id="home">Заголовок 1</h2>
        <p>Тут твій текст про тему</p>
        
        <h2 id="title2">Заголовок 2</h2>
        <p>Тут твій текст про тему</p>
        
        <h2 id="title3">Заголовок 3</h2>
        <p>Тут твій текст про тему</p>
        <img src="" alt="Опис картинки">
        <img src="" alt="Опис картинки">
    </main>
    <footer>
        <p>Проект виконав: ТВОЄ ІМ'Я</p>
    </footer>
</body>
</html>`;

const HomeworkCodeTemplate: React.FC = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText(htmlTemplate);
    toast.success("HTML шаблон скопійовано!");
  };

  return (
    <Card className="bg-card shadow-md animate-fade-in-up">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          Крок 2: Скопіюй базовий код
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Ось базовий шаблон HTML, який ти можеш використовувати для свого сайту. Скопіюй його і встав у вікно редактора HTML на платформі Logika або в текстовому редакторі!
        </p>
        <div className="relative mb-4">
          <SyntaxHighlighter language="html" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', maxHeight: '400px', overflowY: 'auto' }}>
            {htmlTemplate}
          </SyntaxHighlighter>
          <Button
            onClick={handleCopy}
            className="absolute top-4 right-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 no-print"
            size="sm"
          >
            <Copy className="mr-2 h-4 w-4" /> Копіювати
          </Button>
        </div>

        <Collapsible className="mt-6">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
              Підказка: Що означають ці теги?
              <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
            <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2">
                <li><code>&lt;!DOCTYPE html&gt;</code>: Каже браузеру, що це HTML5 сторінка.</li>
                <li><code>&lt;html lang="uk"&gt;</code>: Головний тег, що охоплює всю сторінку. `lang="uk"` означає, що мова українська.</li>
                <li><code>&lt;head&gt;</code>: Тут зберігається інформація про сторінку, яку ти не бачиш (назва вкладки, наприклад).</li>
                <li><code>&lt;title&gt;</code>: Назва, яка відображається у вкладці браузера.</li>
                <li><code>&lt;body&gt;</code>: Тут знаходиться весь видимий вміст твого сайту!</li>
                <li><code>&lt;header&gt;</code>: "Шапка" сайту, де зазвичай логотип і навігація.</li>
                <li><code>&lt;h1&gt;</code>: Головний заголовок сторінки.</li>
                <li><code>&lt;a href="..."&gt;</code>: Посилання на інші розділи або сторінки.</li>
                <li><code>&lt;main&gt;</code>: Основний вміст твоєї сторінки.</li>
                <li><code>&lt;h2&gt;</code>: Заголовок розділу.</li>
                <li><code>&lt;p&gt;</code>: Звичайний абзац тексту.</li>
                <li><code>&lt;img src="..." alt="..."&gt;</code>: Картинка. `src` - шлях до картинки, `alt` - її опис.</li>
                <li><code>&lt;footer&gt;</code>: "Підвал" сайту, де зазвичай інформація про автора.</li>
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default HomeworkCodeTemplate;