import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch"; // NEW: Import Switch

interface InteractiveColorInputPropertyProps {
  id?: string;
  title: string;
  description: string;
  cssProperty: string; // e.g., "color", "backgroundColor"
  initialValue: string; // e.g., "#FF0000", "blue"
  exampleContent: React.ReactNode;
  baseStyle?: React.CSSProperties;
}

const predefinedColors = [
  "#FF6347", // Tomato
  "#4CAF50", // Green
  "#2196F3", // Blue
  "#FFC107", // Amber
  "#9C27B0", // Purple
  "#00BCD4", // Cyan
  "#FF9800", // Orange
  "#E91E63", // Pink
  "#795548", // Brown
  "#607D8B", // Blue Grey
  "#000000", // Black
  "#FFFFFF", // White
];

const InteractiveColorInputProperty: React.FC<InteractiveColorInputPropertyProps> = ({
  id,
  title,
  description,
  cssProperty,
  initialValue,
  exampleContent,
  baseStyle = {},
}) => {
  const [colorValue, setColorValue] = useState(initialValue);
  const [isStyleApplied, setIsStyleApplied] = useState(true); // NEW: State for toggle

  const getKebabCase = (camelCaseString: string) => {
    return camelCaseString.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  };

  const cssPropertyKebabCase = getKebabCase(cssProperty);
  const dynamicStyle: React.CSSProperties = { [cssProperty]: colorValue };

  const codeExample = `/* CSS */
.my-element {
  ${cssPropertyKebabCase}: ${colorValue};
}`;

  const styledExampleContent = React.isValidElement(exampleContent)
    ? React.cloneElement(exampleContent as React.ReactElement, {
        className: `bg-accent text-accent-foreground border border-border rounded-md p-2`,
        style: { ...baseStyle, ...(isStyleApplied ? dynamicStyle : {}), ...(exampleContent.props.style || {}) }, // NEW: Apply dynamicStyle conditionally
      })
    : (
        <div className={`bg-accent text-accent-foreground border border-border rounded-md p-2`} style={{ ...baseStyle, ...(isStyleApplied ? dynamicStyle : {}) }}> {/* NEW: Apply dynamicStyle conditionally */}
          {exampleContent}
        </div>
      );

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    toast.success("Код скопійовано!");
  };

  return (
    <Card id={id} className="mb-6 bg-card shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> {/* NEW: Added flex layout */}
        <CardTitle className="text-2xl text-foreground flex items-center gap-2">
          {title}
          <Badge variant="secondary" className="ml-2 bg-blue-500 text-white no-print">Інтерактивно!</Badge>
        </CardTitle>
        {/* NEW: Toggle for applying style */}
        <div className="flex items-center space-x-2 no-print">
          <Switch
            id={`${id}-toggle-style`}
            checked={isStyleApplied}
            onCheckedChange={setIsStyleApplied}
          />
          <Label htmlFor={`${id}-toggle-style`} className="text-lg font-medium text-muted-foreground">
            Застосувати стиль
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        
        <div className="mb-6 no-print">
          <Label htmlFor={`${id}-color-input`} className="text-lg font-semibold text-secondary-foreground mb-2 block">
            Вибрати колір:
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id={`${id}-color-input`}
              type="color"
              value={colorValue}
              onChange={(e) => setColorValue(e.target.value)}
              className="h-10 w-10 p-0 border-none cursor-pointer"
            />
            <Input
              type="text"
              value={colorValue}
              onChange={(e) => setColorValue(e.target.value)}
              className="flex-1"
              placeholder="Наприклад, #FF0000 або red"
            />
          </div>
          <div className="grid grid-cols-6 gap-2 mt-2">
            {predefinedColors.map((color) => (
              <Button
                key={color}
                style={{ backgroundColor: color }}
                className="h-8 w-8 rounded-full border border-border"
                onClick={() => setColorValue(color)}
                aria-label={`Вибрати колір ${color}`}
              />
            ))}
          </div>
        </div>

        <div className="mb-4 relative">
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

export default InteractiveColorInputProperty;