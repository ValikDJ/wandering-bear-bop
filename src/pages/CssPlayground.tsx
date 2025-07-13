import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InteractiveCssEditor from "@/components/InteractiveCssEditor";
import ColorPicker from "@/components/ColorPicker";
import LessonNavigation from "@/components/LessonNavigation";

const CssPlayground: React.FC = () => {
  const [bgColor, setBgColor] = useState("#ffffff"); // Initial background color
  const [textColor, setTextColor] = useState("#0c0a09"); // Initial text color

  const handleColorChange = (newBgColor: string, newTextColor: string) => {
    setBgColor(newBgColor);
    setTextColor(newTextColor);
  };

  // The HTML for the preview block in InteractiveCssEditor will be fixed,
  // but its style will be influenced by the CSS code entered by the user.
  // We can pass initial CSS that sets the background/text color of the main element.
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