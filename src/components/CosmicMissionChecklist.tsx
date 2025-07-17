import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckSquare, HelpCircle, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface CosmicMissionChecklistProps {
  onCompletionChange?: (completed: boolean) => void; // NEW: Callback for parent component
}

const LOCAL_STORAGE_KEY = "cosmic-mission-checklist-progress";

const initialChecklist: Omit<ChecklistItem, 'completed'>[] = [
  { id: "html-ready", text: "Я маю свій HTML-файл з домашнього завдання." },
  { id: "html-title", text: "Я перевірив назву свого сайту в HTML." },
  { id: "html-nav", text: "Я перевірив посилання в навігації (`<nav>`) свого сайту." },
  { id: "html-headings-text", text: "Я перевірив заголовки (`<h2>`) та текст (`<p>`) у своєму HTML." },
  { id: "html-images", text: "Я перевірив картинки (`<img>`) у своєму HTML." },
  { id: "css-copied", text: "Я скопіював базові CSS-стилі у вкладку CSS на платформі Logika." },
  { id: "css-applied", text: "Я застосував вивчені CSS-властивості (наприклад, `color`, `background-color`, `font-size`, `margin`, `padding`, `border`, `border-radius`, `text-align`) до елементів свого сайту." },
  { id: "links-images-work", text: "Я перевірив, чи всі посилання та картинки працюють після стилізації." },
  { id: "show-teacher", text: "Я показав свій стилізований сайт вчителю." },
];

const CosmicMissionChecklist: React.FC<CosmicMissionChecklistProps> = ({ onCompletionChange }) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Failed to load cosmic mission checklist from localStorage:", error);
    }
    return initialChecklist.map(item => ({ ...item, completed: false }));
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checklist));
    } catch (error) {
      console.error("Failed to save cosmic mission checklist to localStorage:", error);
    }
    const allItemsCompleted = checklist.every(item => item.completed);
    if (onCompletionChange) {
      onCompletionChange(allItemsCompleted);
    }
  }, [checklist, onCompletionChange]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: checked } : item))
    );
  };

  const allItemsCompleted = checklist.every(item => item.completed);

  return (
    <Card className="mb-12 bg-card shadow-md animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
          <CheckSquare className="h-8 w-8 text-primary" />
          Чек-ліст Космічного Архітектора
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Перевір, чи все готово до запуску! Познач виконані завдання:
        </p>
        <ul className="list-none space-y-3 mb-6">
          {checklist.map((item) => (
            <li key={item.id} className="flex items-center space-x-3">
              <Checkbox
                id={`cosmic-checklist-${item.id}`}
                checked={item.completed}
                onCheckedChange={(checked: boolean) => handleCheckboxChange(item.id, checked)}
                className="h-5 w-5 no-print"
              />
              <Label
                htmlFor={`cosmic-checklist-${item.id}`}
                className={cn(
                  "text-lg text-muted-foreground",
                  item.completed && "line-through text-muted-foreground/70"
                )}
              >
                {item.text}
              </Label>
            </li>
          ))}
        </ul>

        {allItemsCompleted && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md text-center font-semibold">
            🎉 Чудово! Всі завдання виконано! Ти готовий до запуску! 🎉
          </div>
        )}

        <Collapsible className="mt-6">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
              <HelpCircle className="h-5 w-5 mr-2 text-destructive" />
              Застряг у Космосі?
              <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
            <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
              <p className="mb-4">
                Не хвилюйся, навіть досвідчені космонавти іноді потребують допомоги! Якщо щось пішло не так:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>**Перевір свій код:** Уважно переглянь HTML та CSS на наявність помилок (забуті `&lt;/div&gt;`, неправильні назви властивостей).</li>
                <li>**Запитай сусіда:** Можливо, твій товариш по місії вже стикався з такою проблемою.</li>
                <li>**Поклич вчителя:** Твій командир завжди готовий допомогти тобі повернутися на правильний курс!</li>
                <li>**Використай Словник Термінів:** <Link to="/glossary" className="text-brand-primary hover:underline">Швидко знайди значення незрозумілих слів</Link>.</li>
                <li>**Переглянь Приклади:** <Link to="/examples" className="text-brand-primary hover:underline">Подивись, як працюють інші приклади</Link>.</li>
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default CosmicMissionChecklist;