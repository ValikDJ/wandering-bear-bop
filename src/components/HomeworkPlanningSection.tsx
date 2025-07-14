import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, LayoutDashboard } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  name: string;
}

const LOCAL_STORAGE_KEY = "homework-planner-sections";
const LOCAL_STORAGE_CHECKBOX_KEY = "homework-step1-completed";

const HomeworkPlanningSection: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [newSectionName, setNewSectionName] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedSections = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedSections) {
        setSections(JSON.parse(storedSections));
      }
      const storedCompletion = localStorage.getItem(LOCAL_STORAGE_CHECKBOX_KEY);
      if (storedCompletion) {
        setIsCompleted(JSON.parse(storedCompletion));
      }
    } catch (error) {
      console.error("Failed to load planning data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sections));
    } catch (error) {
      console.error("Failed to save planning data to localStorage:", error);
    }
  }, [sections]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CHECKBOX_KEY, JSON.stringify(isCompleted));
    } catch (error) {
      console.error("Failed to save step 1 completion to localStorage:", error);
    }
  }, [isCompleted]);

  const addSection = () => {
    if (newSectionName.trim()) {
      setSections([...sections, { id: Date.now().toString(), name: newSectionName.trim() }]);
      setNewSectionName("");
    }
  };

  const removeSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleSectionNameChange = (id: string, newName: string) => {
    setSections(sections.map(section => section.id === id ? { ...section, name: newName } : section));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsCompleted(checked);
  };

  return (
    <Card className="bg-card shadow-md animate-fade-in-up">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          Крок 1: Обери тему і придумай розділи
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="step1-completed"
            checked={isCompleted}
            onCheckedChange={handleCheckboxChange}
            className="h-6 w-6"
          />
          <Label htmlFor="step1-completed" className="text-lg font-medium text-muted-foreground">
            Виконано
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Спочатку оберемо тему для твого сайту. Це може бути що завгодно: твій улюблений герой, хобі, домашній улюбленець або навіть твоя сім'я! Цей розділ допоможе тобі спланувати структуру сайту, який ти будеш створювати на своїй навчальній платформі.
        </p>
        <p className="mb-4 text-muted-foreground font-semibold">Популярні теми:</p>
        <ul className="list-disc list-inside mb-6 text-muted-foreground">
          <li>Моя сім'я</li>
          <li>Мій улюбленець</li>
          <li>Моє хобі (малювання, спорт, ігри)</li>
          <li>Мій улюблений фільм/мультфільм/книга</li>
          <li>Моя улюблена гра</li>
        </ul>

        <h4 className="text-xl font-semibold mb-3 text-secondary-foreground">Мій план сайту:</h4>
        <p className="mb-4 text-muted-foreground">
          Придумай, які розділи будуть на твоєму сайті. Наприклад, для сайту про кота це можуть бути "Мій кіт", "Догляд", "Ігри".
        </p>

        <div className="space-y-3 mb-6">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-center gap-2">
              <Label className="text-muted-foreground w-6 text-right">{index + 1}.</Label>
              <Input
                type="text"
                value={section.name}
                onChange={(e) => handleSectionNameChange(section.id, e.target.value)}
                placeholder={`Назва розділу ${index + 1}`}
                className="flex-1 bg-input text-foreground"
              />
              <Button variant="ghost" size="icon" onClick={() => removeSection(section.id)} className="text-destructive hover:bg-destructive/10">
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <Input
            type="text"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSection()}
            placeholder="Додати новий розділ..."
            className="flex-1 bg-input text-foreground"
          />
          <Button onClick={addSection} className="bg-primary text-primary-foreground hover:bg-primary/80">
            <Plus className="mr-2 h-5 w-5" /> Додати
          </Button>
        </div>

        <Collapsible className="mt-6">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80">
              Підказка: Як придумати розділи?
              <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
            <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
              <p className="mb-2">Подумай про свою тему. Що найважливіше ти хочеш про неї розповісти?</p>
              <ul className="list-disc list-inside">
                <li><strong>Вступ:</strong> Хто/що це? Чому це важливо для тебе?</li>
                <li><strong>Деталі:</strong> Опиши особливості, цікаві факти.</li>
                <li><strong>Історія:</strong> Як це з'явилося?</li>
                <li><strong>Галерея:</strong> Якщо є багато картинок.</li>
                <li><strong>Контакти/Посилання:</strong> Якщо це про щось, де можна дізнатися більше.</li>
              </ul>
              <p className="mt-2">Не бійся починати з малого, потім завжди можна додати більше!</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default HomeworkPlanningSection;