import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ListChecks, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface LessonChecklistProps {
  lessonKey: string; // Унікальний ключ для уроку (наприклад, 'css-properties')
  title: string;
  description: string;
  initialTasks: Omit<ChecklistItem, 'completed'>[];
  commonMistakes?: { title: string; content: string[] }[];
  tips?: { title: string; content: string[] }[];
}

const LessonChecklist: React.FC<LessonChecklistProps> = ({
  lessonKey,
  title,
  description,
  initialTasks,
  commonMistakes,
  tips,
}) => {
  const LOCAL_STORAGE_KEY = `lesson-checklist-${lessonKey}`;

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge stored state with initial tasks to handle new tasks or removed tasks
        const mergedChecklist = initialTasks.map(initialTask => {
          const storedTask = parsed.find((t: ChecklistItem) => t.id === initialTask.id);
          return { ...initialTask, completed: storedTask ? storedTask.completed : false };
        });
        return mergedChecklist;
      }
    } catch (error) {
      console.error(`Failed to load checklist for ${lessonKey} from localStorage:`, error);
    }
    return initialTasks.map(item => ({ ...item, completed: false }));
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checklist));
    } catch (error) {
      console.error(`Failed to save checklist for ${lessonKey} to localStorage:`, error);
    }
  }, [checklist, lessonKey]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: checked } : item))
    );
  };

  const allTasksCompleted = checklist.every(item => item.completed);

  return (
    <Card className="mb-12 bg-card shadow-md animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
          <ListChecks className="h-8 w-8 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>

        <ul className="list-none space-y-3 mb-6">
          {checklist.map((item) => (
            <li key={item.id} className="flex items-center space-x-3">
              <Checkbox
                id={`checklist-${lessonKey}-${item.id}`}
                checked={item.completed}
                onCheckedChange={(checked: boolean) => handleCheckboxChange(item.id, checked)}
                className="h-5 w-5 no-print"
              />
              <Label
                htmlFor={`checklist-${lessonKey}-${item.id}`}
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

        {allTasksCompleted && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md text-center font-semibold">
            🎉 Чудово! Всі завдання виконано! Ти справжній майстер CSS! 🎉
          </div>
        )}

        {tips && tips.length > 0 && (
          <Collapsible className="mt-6">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                Корисні поради
                <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
              <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
                {tips.map((tip, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h4 className="font-semibold text-base mb-1">{tip.title}</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {tip.content.map((line, lineIndex) => (
                        <li key={lineIndex}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {commonMistakes && commonMistakes.length > 0 && (
          <Collapsible className="mt-6">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
                <Lightbulb className="h-5 w-5 mr-2 text-destructive" />
                Поширені помилки та як їх уникнути
                <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
              <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
                {commonMistakes.map((mistake, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h4 className="font-semibold text-base mb-1">{mistake.title}</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {mistake.content.map((line, lineIndex) => (
                        <li key={lineIndex}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonChecklist;