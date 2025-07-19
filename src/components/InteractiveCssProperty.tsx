import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Badge } from "@/components/ui/badge"; // Import Badge component
import { Button } from "@/components/ui/button"; // Import Button
import { Copy } from "lucide-react"; // Import Copy icon
import { toast } from "sonner"; // Import toast for notifications
import { cn } from "@/lib/utils"; // Import cn

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

  const currentSliderValue = value[0];
  let currentCssValue: string | number = `${currentSliderValue}${unit}`;
  let dynamicStyle: React.CSSProperties = {};

  // Helper to convert camelCase to kebab-case for CSS property names in code example
  const getKebabCase = (camelCaseString: string) => {
    return camelCaseString.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  };

  const cssPropertyKebabCase = getKebabCase(cssProperty);

  // Special handling for specific CSS properties
  if (cssProperty === "opacity") {
    currentCssValue = currentSliderValue / 100; // Convert 0-100 to 0-1 for opacity
    dynamicStyle = { [cssProperty]: currentCssValue };
  } else if (cssProperty === "lineHeight") {
    currentCssValue = currentSliderValue / 100; // Convert 100-250 to 1.0-2.5 for line-height
    dynamicStyle = { [cssProperty]: currentCssValue };
  } else if (cssProperty === "boxShadow") {
    // For box-shadow, we'll control the blur radius
    currentCssValue = `0 0 ${currentSliderValue}px rgba(0,0,0,0.5)`;
    dynamicStyle = { boxShadow: currentCssValue };
  }
  else {
    dynamicStyle = { [cssProperty]: currentCssValue };
  }

  const codeExample = `/* CSS */
.my-element {
  ${cssPropertyKebabCase}: ${currentCssValue}${cssProperty === "opacity" || cssProperty === "lineHeight" || cssProperty === "boxShadow" ? '' : unit};
}`;
  // Adjust code example for opacity and line-height to not show unit if it's a ratio
  // And for box-shadow to show the full value

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

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    toast.success("Код скопійовано!");
  };

  return (
    <Card id={id} className="mb-6 bg-card shadow-md"> {/* Apply ID here */}
      <CardHeader>
        <CardTitle className="text-2xl text-foreground flex items-center gap-2">
          {title.replace(' (Інтерактивно!)', '')} {/* Remove the text from title */}
          <Badge variant="secondary" className="ml-2 bg-blue-500 text-white no-print">Інтерактивно!</Badge> {/* Add the badge */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        
        <div className="mb-6 no-print">
          <Label htmlFor="css-slider" className="text-lg font-semibold text-secondary-foreground mb-2 block">
            Змінити значення {cssPropertyKebabCase}: {cssProperty === "opacity" || cssProperty === "lineHeight" ? currentSliderValue / 100 : currentSliderValue}{unit}
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

        <div className="mb-4 relative"> {/* Added relative for button positioning */}
          <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Приклад коду:</h4>
          <SyntaxHighlighter language="css" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em' }}>
            {codeExample}
          </SyntaxHighlighter>
          <Button
            onClick={handleCopy}
            className="absolute top-4 right-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 no-print"
            size="sm"
          >
            <Copy className="mr-2 h-4 w-4" /> Копіювати
          </Button>
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