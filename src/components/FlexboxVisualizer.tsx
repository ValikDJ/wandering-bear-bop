import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

const FlexboxVisualizer: React.FC = () => {
  const [flexDirection, setFlexDirection] = useState<string>("row");
  const [justifyContent, setJustifyContent] = useState<string>("flex-start");
  const [alignItems, setAlignItems] = useState<string>("stretch");
  const [flexWrap, setFlexWrap] = useState<string>("nowrap");
  const [gap, setGap] = useState<number[]>([10]);

  const currentGap = gap[0];

  const flexContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: flexDirection as "row" | "row-reverse" | "column" | "column-reverse",
    justifyContent: justifyContent as "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly",
    alignItems: alignItems as "stretch" | "flex-start" | "flex-end" | "center" | "baseline",
    flexWrap: flexWrap as "nowrap" | "wrap" | "wrap-reverse",
    gap: `${currentGap}px`,
    minHeight: "200px", // Ensure container has height for alignItems to be visible
    border: "2px dashed #ccc",
    borderRadius: "8px",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    display: "flex", // Redundant but good for clarity
  };

  const flexItemClasses = "w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-md shadow-md text-lg font-bold";

  const cssCode = `/* CSS для контейнера */
.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${currentGap}px;
  /* Додаткові стилі для візуалізації */
  min-height: 200px;
  border: 2px dashed #ccc;
  background-color: #f0f0f0;
  padding: 10px;
}

/* CSS для елементів */
.flex-item {
  width: 64px; /* 4rem */
  height: 64px; /* 4rem */
  background-color: #3b82f6; /* blue-500 */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); /* shadow-md */
  font-weight: bold;
  font-size: 1.125rem; /* text-lg */
}`;

  return (
    <Card className="mb-6 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Інтерактивний Flexbox Visualizer</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Flexbox - це потужний інструмент CSS для розташування елементів на сторінці. Спробуй змінити властивості нижче і побач, як елементи рухаються!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-6">
            <div>
              <Label htmlFor="flex-direction" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                flex-direction:
              </Label>
              <Select value={flexDirection} onValueChange={setFlexDirection}>
                <SelectTrigger id="flex-direction" className="w-full">
                  <SelectValue placeholder="Виберіть напрямок" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="row">row (за замовчуванням)</SelectItem>
                  <SelectItem value="row-reverse">row-reverse</SelectItem>
                  <SelectItem value="column">column</SelectItem>
                  <SelectItem value="column-reverse">column-reverse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="justify-content" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                justify-content:
              </Label>
              <Select value={justifyContent} onValueChange={setJustifyContent}>
                <SelectTrigger id="justify-content" className="w-full">
                  <SelectValue placeholder="Виберіть вирівнювання по головній осі" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flex-start">flex-start</SelectItem>
                  <SelectItem value="flex-end">flex-end</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="space-between">space-between</SelectItem>
                  <SelectItem value="space-around">space-around</SelectItem>
                  <SelectItem value="space-evenly">space-evenly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="align-items" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                align-items:
              </Label>
              <Select value={alignItems} onValueChange={setAlignItems}>
                <SelectTrigger id="align-items" className="w-full">
                  <SelectValue placeholder="Виберіть вирівнювання по поперечній осі" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stretch">stretch</SelectItem>
                  <SelectItem value="flex-start">flex-start</SelectItem>
                  <SelectItem value="flex-end">flex-end</SelectItem>
                  <SelectItem value="center">center</SelectItem>
                  <SelectItem value="baseline">baseline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="flex-wrap" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                flex-wrap:
              </Label>
              <Select value={flexWrap} onValueChange={setFlexWrap}>
                <SelectTrigger id="flex-wrap" className="w-full">
                  <SelectValue placeholder="Виберіть перенос елементів" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nowrap">nowrap (за замовчуванням)</SelectItem>
                  <SelectItem value="wrap">wrap</SelectItem>
                  <SelectItem value="wrap-reverse">wrap-reverse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="gap-slider" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                gap: {currentGap}px
              </Label>
              <Slider
                id="gap-slider"
                min={0}
                max={50}
                step={1}
                value={gap}
                onValueChange={setGap}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Результат:</h4>
            <div style={flexContainerStyle} className="flex-grow">
              <div className={flexItemClasses}>1</div>
              <div className={flexItemClasses}>2</div>
              <div className={flexItemClasses}>3</div>
              <div className={flexItemClasses}>4</div>
              <div className={flexItemClasses}>5</div>
            </div>
          </div>
        </div>

        <div className="mb-4 mt-6">
          <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Приклад коду CSS:</h4>
          <SyntaxHighlighter language="css" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em' }}>
            {cssCode}
          </SyntaxHighlighter>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlexboxVisualizer;