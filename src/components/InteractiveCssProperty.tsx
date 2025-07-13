import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface InteractiveCssPropertyProps {
  id?: string; // New: Optional ID for direct linking
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
  id, // Destructure id
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

  // Helper to convert camelCase to kebab-case for CSS property names in code example
  const getKebabCase = (camelCaseString: string) => {
    return camelCaseString.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  };

  const cssPropertyKebabCase = getKebabCase(cssProperty);

  const codeExample = `/* CSS */
.my-element {
  ${cssPropertyKebabCase}: ${currentCssValue};
}`;

  // Визначаємо адаптивні стилі для фону та тексту прикладів
  const exampleBgClass = "bg-accent";
  const exampleTextColorClass = "text-accent-foreground";
  const exampleBorderClass = "border-border";

  // Клонуємо exampleContent, щоб застосувати динамічні стилі безпосередньо до нього
  const styledExampleContent = React.isValidElement(exampleContent)
    ? React.cloneElement(exampleContent as React.ReactElement, {
        className: `${exampleBgClass} ${exampleTextColorClass} border ${exampleBorderClass} rounded-md p-2`, // Додаємо класи
        style: { ...baseStyle, ...dynamicStyle, ...(exampleContent.props.style || {}) },
      })
    : (
        <div className={`${exampleBgClass} ${exampleTextColorClass} border ${exampleBorderClass} rounded-md p-2`} style={{ ...baseStyle, ...dynamicStyle }}>
          {exampleContent}
        </div>
      );

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
  };

  return (
    <Card id={id} className="mb-6 bg-card shadow-md"> {/* Apply ID here */}
      <CardHeader>
        <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        
        <div className="mb-6">
          <Label htmlFor="css-slider" className="text-lg font-semibold text-secondary-foreground mb-2 block">
            Змінити значення {cssPropertyKebabCase}: {currentCssValue}
          </Label>
          <Slider
            id="css-slider"
            min={min}
            max={max}
            step={1}
            value={value}
            onValueChange={handleValueChange} // Використовуємо нову функцію
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