import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface InteractiveCssPropertyProps {
  title: string;
  description: string;
  cssProperty: string; // e.g., "font-size", "border-radius"
  initialValue: number;
  min: number;
  max: number;
  step: number;
  unit: string; // e.g., "px", "%"
  exampleText?: string;
  exampleHtml?: string;
}

const InteractiveCssProperty: React.FC<InteractiveCssPropertyProps> = ({
  title,
  description,
  cssProperty,
  initialValue,
  min,
  max,
  step,
  unit,
  exampleText = "Приклад тексту",
  exampleHtml,
}) => {
  const [value, setValue] = useState<number[]>([initialValue]);

  const style: React.CSSProperties = {
    [cssProperty]: `${value[0]}${unit}`,
    transition: 'all 0.1s ease-out',
  };

  return (
    <Card className="mb-6 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 border border-border rounded-md bg-background min-h-[150px]">
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Результат:</h4>
            {exampleHtml ? (
              <div dangerouslySetInnerHTML={{ __html: exampleHtml }} style={style} />
            ) : (
              <p style={style} className="text-center">
                {exampleText}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 p-4">
            <Label htmlFor={cssProperty} className="text-lg font-semibold mb-2 block text-secondary-foreground">
              {cssProperty}: {value[0]}{unit}
            </Label>
            <Slider
              id={cssProperty}
              min={min}
              max={max}
              step={step}
              value={value}
              onValueChange={setValue}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Перетягніть повзунок, щоб змінити значення властивості `{cssProperty}`.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveCssProperty;