import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface InteractiveCssPropertyProps {
  title: string;
  description: string;
  cssProperty: string;
  unit: string;
  min: number;
  max: number;
  initialValue: number;
  exampleContent: React.ReactNode; // Змінено з string на React.ReactNode
  baseStyle?: React.CSSProperties; // Базові стилі для елемента прикладу
}

const InteractiveCssProperty: React.FC<InteractiveCssPropertyProps> = ({
  title,
  description,
  cssProperty,
  unit,
  min,
  max,
  initialValue,
  exampleContent,
  baseStyle = {},
}) => {
  const [value, setValue] = useState<number[]>([initialValue]);

  const currentCssValue = `${value[0]}${unit}`;
  const dynamicStyle: React.CSSProperties = {
    [cssProperty]: currentCssValue,
  };

  const codeExample = `/* CSS */
.my-element {
  ${cssProperty}: ${currentCssValue};
}`;

  // Клонуємо exampleContent, щоб застосувати динамічні стилі безпосередньо до нього
  const styledExampleContent = React.isValidElement(exampleContent)
    ? React.cloneElement(exampleContent as React.ReactElement, {
        style: { ...baseStyle, ...dynamicStyle, ...(exampleContent.props.style || {}) },
      })
    : exampleContent; // Запасний варіант, якщо це не дійсний React-елемент

  return (
    <Card className="mb-6 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        
        <div className="mb-6">
          <Label htmlFor="css-slider" className="text-lg font-semibold text-secondary-foreground mb-2 block">
            Змінити значення {cssProperty}: {currentCssValue}
          </Label>
          <Slider
            id="css-slider"
            min={min}
            max={max}
            step={1}
            value={value}
            onValueChange={setValue}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Приклад коду:</h4>
          <SyntaxHighlighter language="css" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em' }}>
            {codeExample}
          </SyntaxHighlighter>
        </div>

        <div className="mt-4 p-4 border border-border rounded-md bg-background">
          <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Результат:</h4>
          {styledExampleContent}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveCssProperty;