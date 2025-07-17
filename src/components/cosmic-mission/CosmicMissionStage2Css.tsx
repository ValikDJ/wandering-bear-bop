import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Palette, ChevronDown, Lightbulb, Plane } from "lucide-react";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import CosmicCssChallengeCard from "./CosmicCssChallengeCard";
import { cssChallenges, CosmicCssChallengeData } from "@/data/cosmicCssChallenges"; // NEW: Import from data file

interface CosmicMissionStage2CssProps {
  completed: boolean;
  onCompletionChange: (completed: boolean) => void;
  cosmicEnergy: number;
  decreaseCosmicEnergy: (amount: number, actionType: 'hint' | 'solution') => void;
  challengeCompletion: { [key: string]: boolean }; // NEW: Receive challenge completion state
  onChallengeCompletionChange: (id: string, isChecked: boolean) => void; // NEW: Receive handler
}

const LOCAL_STORAGE_KEY_STAGE2 = "cosmic-mission-stage2-completed";
// const LOCAL_STORAGE_KEY_CHALLENGES = "cosmic-css-challenges-progress"; // This key is now managed by parent

const cssTemplateUncommented = `/* style.css - Твої віртуальні пензлі! */

/* Властивості для тексту */
color: #b3ffff;
font-size: 1.2em;
font-family: 'Arial', sans-serif;
text-align: center;
text-decoration: none;

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
`;

const cssTemplateCommented = `/* style.css - Твої віртуальні пензлі! */

/* Властивості для тексту */
color: #b3ffff; /* Встановлює колір тексту */
font-size: 1.2em; /* Встановлює розмір шрифту */
font-family: 'Arial', sans-serif; /* Встановлює тип шрифту */
text-align: center; /* Вирівнює текст всередині елемента (left, right, center, justify) */
text-decoration: none; /* Додає або видаляє лінії під текстом (none, underline, line-through) */

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
`;

const CosmicMissionStage2Css: React.FC<CosmicMissionStage2CssProps> = ({
  completed,
  onCompletionChange,
  cosmicEnergy,
  decreaseCosmicEnergy,
  challengeCompletion, // NEW
  onChallengeCompletionChange, // NEW
}) => {
  const [displayCommentedCss, setDisplayCommentedCss] = useState(false);
  // challengeCompletion state is now managed by parent and passed as prop

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY_STAGE2);
      if (stored) {
        onCompletionChange(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load cosmic mission stage 2 completion:", error);
    }
  }, [onCompletionChange]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_STAGE2, JSON.stringify(completed));
    } catch (error) {
      console.error("Failed to save stage 2 completion:", error);
    }
  }, [completed]);

  // No longer saving challengeCompletion here, it's handled by parent
  // useEffect(() => {
  //   try {
  //     localStorage.setItem(LOCAL_STORAGE_KEY_CHALLENGES, JSON.stringify(challengeCompletion));
  //   } catch (error) {
  //     console.error("Failed to save cosmic CSS challenges progress:", error);
  //   }
  //   const allChallengesCompleted = cssChallenges.every(challenge => challengeCompletion[challenge.id]);
  //   onCompletionChange(allChallengesCompleted);
  // }, [challengeCompletion, onCompletionChange]);

  // handleChallengeCompletionChange is now passed as prop

  const handleCopyCss = (version: 'uncommented' | 'commented') => {
    const textToCopy = version === 'commented' ? cssTemplateCommented : cssTemplateUncommented;
    navigator.clipboard.writeText(textToCopy);
    toast.success(`CSS-код (${version === 'commented' ? 'з коментарями' : 'без коментарів'}) скопійовано! 🎨`);
  };

  return (
    <Card className="mb-12 bg-card shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Plane className="h-8 w-8 text-primary" />
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
          А ось список CSS-властивостей, які ти можеш використовувати. Скопіюй їх у вкладку <strong>CSS</strong> на платформі Logika і змінюй значення, щоб прикрасити *свій власний* сайт!
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
                <li><strong>Вибрати елемент:</strong> Використовуй <strong>CSS-селектори</strong> (наприклад, назву тегу `body`, `h1`, `p`, `img`, `section` або `footer`) щоб вказати, до якого елемента застосувати стиль. Якщо ти забув, як працюють селектори, переглянь <Link to="/css-selectors" className="text-brand-primary hover:underline">Урок: CSS Селектори</Link>.</li>
                <li><strong>Вибрати властивість:</strong> Обери, що саме ти хочеш змінити (колір, розмір, фон тощо). Якщо ти забув, які властивості існують, переглянь <Link to="/css-properties" className="text-brand-primary hover:underline">Урок: CSS Властивості</Link>.</li>
                <li><strong>Встановити значення:</strong> Признач цій властивості бажане значення (наприклад, `color: blue;` або `font-size: 20px;`).</li>
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
              </ul>
              <p className="mt-2">
                Експериментуй! Ти можеш використовувати <Link to="/css-playground" className="text-brand-primary hover:underline">CSS Майстерню</Link> для інтерактивної практики, а також <Link to="/examples" className="text-brand-primary hover:underline">Практичні Приклади</Link>, щоб побачити, як інші стилізовані елементи виглядають у дії.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Орбітальні Завдання */}
        <Collapsible className="mt-12" defaultOpen={true}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                Орбітальні Завдання: Стилізуй Свою Базу!
              </div>
              <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
            <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
              <p className="mb-8 text-center max-w-2xl mx-auto text-muted-foreground">
                Виконай ці міні-завдання, щоб навчитися застосовувати CSS-стилі до своєї космічної бази. Кожне завдання допоможе тобі краще зрозуміти, як працюють властивості CSS!
              </p>

              {cssChallenges.map((challenge, index) => (
                <CosmicCssChallengeCard
                  key={challenge.id}
                  challengeNumber={index + 1}
                  challengeTitle={challenge.title}
                  challengeDescription={challenge.description}
                  initialCss={challenge.initialCss}
                  previewContent={challenge.previewContent}
                  hint={challenge.hint}
                  lessonLink={challenge.lessonLink}
                  lessonLinkText={challenge.lessonLinkText}
                  completed={!!challengeCompletion[challenge.id]}
                  onCompletionChange={(isChecked) => onChallengeCompletionChange(challenge.id, isChecked)}
                  cosmicEnergy={cosmicEnergy}
                  decreaseCosmicEnergy={decreaseCosmicEnergy}
                />
              ))}

              {completed && (
                <div className="mt-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md text-center font-semibold">
                  🎉 Всі Орбітальні Завдання виконано! Ти справжній майстер стилів! 🎉
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default CosmicMissionStage2Css;