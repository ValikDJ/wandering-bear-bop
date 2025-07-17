import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Code, ChevronDown, Rocket } from "lucide-react"; // Changed Plane to Rocket
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CosmicMissionStage1HtmlProps {
  completed: boolean;
  onCompletionChange: (completed: boolean) => void;
}

const LOCAL_STORAGE_KEY = "cosmic-mission-stage1-completed";

const CosmicMissionStage1Html: React.FC<CosmicMissionStage1HtmlProps> = ({ completed, onCompletionChange }) => {
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        onCompletionChange(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load cosmic mission stage 1 completion:", error);
    }
  }, [onCompletionChange]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(completed));
    } catch (error) {
      console.error("Failed to save stage 1 completion:", error);
    }
  }, [completed]);

  return (
    <Card className="mb-12 bg-card shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Rocket className="h-8 w-8 text-primary" />
          Етап 1: Твій Орбітальний Каркас (HTML)
        </CardTitle>
        <div className="flex items-center space-x-2 no-print">
          <Checkbox
            id="stage1-completed"
            checked={completed}
            onCheckedChange={(checked: boolean) => onCompletionChange(checked)}
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
  );
};

export default CosmicMissionStage1Html;