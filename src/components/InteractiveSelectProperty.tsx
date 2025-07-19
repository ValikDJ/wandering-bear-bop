import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface InteractiveSelectPropertyProps {
  id?: string;
  title: string;
  description: string;
  cssProperty: string; // e.g., "textAlign", "fontFamily"
  options: SelectOption[];
  initialValue: string;
  exampleContent: React.ReactNode;
  baseStyle?: React.CSSProperties;
}

const InteractiveSelectProperty: React.FC<InteractiveSelectPropertyProps> = ({
  id,
  title,
  description,
  cssProperty,
  options,
  initialValue,
  exampleContent,
  baseStyle = {},
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const getKebabCase = (camelCaseString: string) => {
    return camelCaseString.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  };

  const cssPropertyKebabCase = getKebabCase(cssProperty);
  const dynamicStyle: React.CSSProperties = { [cssProperty]: selectedValue };

  const codeExample = `/* CSS */
.my-element {
  ${cssPropertyKebabCase}: ${selectedValue};
}`;

  const styledExampleContent = React.isValidElement(exampleContent)
    ? React.cloneElement(exampleContent as React.ReactElement, {
        className: `bg-accent text-accent-foreground border border-border rounded-md p-2`,
        style: { ...baseStyle, ...dynamicStyle, ...(exampleContent.props.style || {}) },
      })
    : (
        <div className={`bg-accent text-accent-foreground border border-border rounded-md p-2`} style={{ ...baseStyle, ...dynamicStyle }}>
          {exampleContent}
        </div>
      );

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    toast.success("Код скопійовано!");
  };

  return (
    <Card id={id} className="mb-6 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground flex items-center gap-2">
          {title}
          <Badge variant="secondary" className="ml-2 bg-blue-500 text-white no-print">Інтерактивно!</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        
        <div className="mb-6 no-print">
          <Label htmlFor={`${id}-select`} className="text-lg font-semibold text-secondary-foreground mb-2 block">
            Вибрати значення:
          </Label>
          <Select value={selectedValue} onValueChange={setSelectedValue}>
            <SelectTrigger id={`${id}-select`} className="w-full">
              <SelectValue placeholder="Виберіть значення" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

export default InteractiveSelectProperty;