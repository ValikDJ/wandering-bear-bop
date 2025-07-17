/**
 * @file ThemeToggle.tsx
 * @description Компонент кнопки для перемикання між світлою, темною та системною темами.
 * Використовує shadcn/ui DropdownMenu та іконки Lucide React.
 */

import React from "react";
import { Sun, Moon, Laptop, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";
import { ThemeMode } from "@/lib/ThemeManager";
import { cn } from "@/lib/utils"; // NEW: Імпортуємо cn

const ThemeToggle: React.FC = () => {
  const { mode, actualTheme, setTheme } = useTheme();

  // Визначаємо поточну іконку та лейбл
  let CurrentIconComponent: React.ElementType;
  let currentLabelText: string;

  if (actualTheme === ThemeMode.Dark) {
    CurrentIconComponent = Moon;
    currentLabelText = "Темна";
  } else if (actualTheme === ThemeMode.Cosmic) {
    CurrentIconComponent = Rocket;
    currentLabelText = "Космічна";
  } else {
    CurrentIconComponent = Sun;
    currentLabelText = "Світла";
  }

  const handleThemeChange = (newMode: ThemeMode) => {
    setTheme(newMode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary-foreground/20"
          aria-label={`Поточна тема: ${currentLabelText}. Натисніть, щоб змінити.`}
        >
          {/* Icons for Light, Dark, and Cosmic */}
          <Sun className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all", "dark:-rotate-90 dark:scale-0", "cosmic:scale-0")} />
          <Moon className={cn("absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all", "dark:rotate-0 dark:scale-100", "cosmic:scale-0")} />
          <Rocket className={cn("absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all", "cosmic:rotate-0 cosmic:scale-100")} />
          <span className="sr-only">Перемкнути тему</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover text-popover-foreground">
        <DropdownMenuItem
          onClick={() => handleThemeChange(ThemeMode.Light)}
          className="cursor-pointer flex items-center gap-2"
          aria-label="Встановити світлу тему"
        >
          <Sun className="h-4 w-4" /> Світла
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange(ThemeMode.Dark)}
          className="cursor-pointer flex items-center gap-2"
          aria-label="Встановити темну тему"
        >
          <Moon className="h-4 w-4" /> Темна
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange(ThemeMode.Cosmic)}
          className="cursor-pointer flex items-center gap-2"
          aria-label="Встановити космічну тему"
        >
          <Rocket className="h-4 w-4" /> Космічна
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange(ThemeMode.System)}
          className="cursor-pointer flex items-center gap-2"
          aria-label="Встановити системну тему"
        >
          <Laptop className="h-4 w-4" /> Системна
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;