import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ListChecks, Bug } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

const LOCAL_STORAGE_KEY = "homework-checklist-progress";
const LOCAL_STORAGE_CHECKBOX_KEY = "homework-step5-completed";

const initialChecklist: Omit<ChecklistItem, 'completed'>[] = [
  { id: "1", text: "Я обрав тему для свого сайту." },
  { id: "2", text: "Я придумав 3-5 розділів для свого сайту." },
  { id: "3", text: "Я скопіював базовий HTML шаблон." },
  { id: "4", text: "Я замінив 'Назва сайту' на свою назву." },
  { id: "5", text: "Я замінив 'Розділ 1, 2, 3' на назви своїх розділів." },
  { id: "6", text: "Я замінив 'Заголовок 1, 2, 3' на свої заголовки." },
  { id: "7", text: "Я написав 2-3 речення тексту для кожного розділу." },
  { id: "8", text: "Я додав хоча б 2 картинки і вказав для них 'src' та 'alt'." },
  { id: "9", text: "Я замінив 'ТВОЄ ІМ'Я' на своє ім'я у підвалі сайту." },
  { id: "10", text: "Я перевірив, чи всі посилання працюють (натиснув на них)." },
  { id: "11", text: "Я перевірив, чи всі картинки відображаються." },
  { id: "12", text: "Мій сайт виглядає охайно і зрозуміло." },
];

const HomeworkChecklist: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Failed to load checklist from localStorage:", error);
    }
    return initialChecklist.map(item => ({ ...item, completed: false }));
  });
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checklist));
    } catch (error) {
      console.error("Failed to save checklist to localStorage:", error);
    }
    const allChecked = checklist.every(item => item.completed);
    setIsCompleted(allChecked);
  }, [checklist]);

  useEffect(() => {
    try {
      const storedCompletion = localStorage.getItem(LOCAL_STORAGE_CHECKBOX_KEY);
      if (storedCompletion) {
        setIsCompleted(JSON.parse(storedCompletion));
      }
    } catch (error) {
      console.error("Failed to load step 5 completion to localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CHECKBOX_KEY, JSON.stringify(isCompleted));
    } catch (error) {
      console.error("Failed to save step 5 completion to localStorage:", error);
    }
  }, [isCompleted]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: checked } : item))
    );
  };

  const handleStepCompletionChange = (checked: boolean) => {
    setIsCompleted(checked);
    setChecklist(prev => prev.map(item => ({ ...item, completed: checked })));
  };

  return (
    <Card className="bg-card shadow-md animate-fade-in-up">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
          <ListChecks className="h-6 w-6 text-primary" />
          Крок 5: Перевір та здай!
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="step5-completed"
            checked={isCompleted}
            onCheckedChange={handleStepCompletionChange}
            className="h-6 w-6"
          />
          <Label htmlFor="step5-completed" className="text-lg font-medium text-muted-foreground">
            Виконано
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Перед тим, як здати завдання, перевір себе за цим чеклистом. Це допоможе тобі знайти можливі помилки!
        </p>

        <div className="space-y-3 mb-6">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <Checkbox
                id={`checklist-${item.id}`}
                checked={item.completed}
                onCheckedChange={(checked: boolean) => handleCheckboxChange(item.id, checked)}
                className="h-5 w-5"
              />
              <Label
                htmlFor={`checklist-${item.id}`}
                className={cn(
                  "text-lg text-muted-foreground",
                  item.completed && "line-through text-muted-foreground/70"
                )}
              >
                {item.text}
              </Label>
            </div>
          ))}
        </div>

        <Collapsible className="mt-6">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80">
              <Bug className="h-5 w-5 mr-2" />
              Поширені помилки та як їх уникнути
              <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
            <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2">
                <li>**Забув закрити тег:** Кожен відкритий тег (наприклад, `<h1>`) повинен мати закриваючий (`</h1>`).</li>
                <li>**Неправильний шлях до картинки:** Перевір, чи правильно вказано `src` в тегу `<img>`. Картинка має бути в тій самій папці або в підпапці.</li>
                <li>**Помилка в `href` посилання:** Перевір, чи правильно вказано адресу в `href` для тегу `<a>`.</li>
                <li>**Немає `alt` для картинки:** Завжди додавай `alt` атрибут до `<img>` - це важливо для доступності!</li>
                <li>**Сайт виглядає дивно:** Можливо, ти забув якийсь тег або атрибут. Уважно переглянь свій код.</li>
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="mt-8 text-center">
          <h4 className="text-xl font-semibold mb-4 text-secondary-foreground">Як здати завдання:</h4>
          <p className="text-muted-foreground mb-4">
            Коли ти впевнений, що твій сайт готовий, збережи файл `index.html` і надішли його своєму вчителю або завантаж на платформу, як він вказав.
          </p>
          <Button onClick={() => window.print()} className="bg-brand-primary text-primary-foreground hover:bg-brand-primary-hover text-lg px-6 py-3">
            Роздрукувати інструкцію
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomeworkChecklist;