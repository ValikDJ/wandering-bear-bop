import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InteractiveCssEditor from "@/components/InteractiveCssEditor";
import ColorPicker from "@/components/ColorPicker";
import LessonNavigation from "@/components/LessonNavigation";
import { useTheme } from "@/hooks/use-theme"; // Import useTheme hook
import { ThemeMode } from "@/lib/ThemeManager"; // Import ThemeMode enum

const CssPlayground: React.FC = () => {
  const { actualTheme } = useTheme();

  // Initialize colors based on the current theme
  const getInitialBgColor = (theme: "light" | "dark" | "cyberpunk") => {
    if (theme === ThemeMode.Dark) return "#1a1a1a";
    if (theme === ThemeMode.Cyberpunk) return "#14141f"; // Темний фон для кіберпанку
    return "#ffffff";
  };
  const getInitialTextColor = (theme: "light" | "dark" | "cyberpunk") => {
    if (theme === ThemeMode.Dark) return "#e9ecef";
    if (theme === ThemeMode.Cyberpunk) return "#b3ffff"; // Неоновий текст для кіберпанку
    return "#0c0a09";
  };

  const [bgColor, setBgColor] = useState<string>(() => getInitialBgColor(actualTheme));
  const [textColor, setTextColor] = useState<string>(() => getInitialTextColor(actualTheme));

  // Effect to update colors when theme changes
  useEffect(() => {
    setBgColor(getInitialBgColor(actualTheme));
    setTextColor(getInitialTextColor(actualTheme));
  }, [actualTheme]);

  const handleColorChange = (newBgColor: string, newTextColor: string) => {
    setBgColor(newBgColor);
    setTextColor(newTextColor);
  };

  const initialCssForEditor = `.my-element {
  background-color: ${bgColor};
  color: ${textColor};
  padding: 20px;
  border: 2px solid #333;
  text-align: center;
  font-size: 24px;
  border-radius: 8px;
}`;

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">Твоя CSS Майстерня!</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        Експериментуй з кольорами та CSS кодом у реальному часі! Вибери колір, а потім спробуй змінити властивості в редакторі.
      </p>

      <div className="flex justify-center mb-8">
        <ColorPicker
          initialBgColor={bgColor}
          initialTextColor={textColor}
          onColorChange={handleColorChange}
        />
      </div>

      <InteractiveCssEditor
        id="css-playground-editor"
        initialCss={initialCssForEditor}
        initialHtml={`<div class="my-element">Привіт, я блок, який ти стилізуєш!</div>`}
        title="Інтерактивний CSS Редактор"
        description="Змінюй CSS код нижче, щоб побачити, як змінюється блок. Спробуй автозаповнення для властивостей!"
      />

      <LessonNavigation />
    </div>
  );
};

export default CssPlayground;