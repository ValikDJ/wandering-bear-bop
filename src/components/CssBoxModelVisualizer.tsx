import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CssBoxModelVisualizer: React.FC = () => {
  const [margin, setMargin] = useState<number[]>([20]);
  const [borderWidth, setBorderWidth] = useState<number[]>([5]);
  const [padding, setPadding] = useState<number[]>([20]);
  const [contentWidth, setContentWidth] = useState<number[]>([150]);
  const [contentHeight, setContentHeight] = useState<number[]>([80]);

  const currentMargin = margin[0];
  const currentBorderWidth = borderWidth[0];
  const currentPadding = padding[0];
  const currentContentWidth = contentWidth[0];
  const currentContentHeight = contentHeight[0];

  const cssCode = `/* CSS */
.box-element {
  width: ${currentContentWidth}px;
  height: ${currentContentHeight}px;
  padding: ${currentPadding}px;
  border: ${currentBorderWidth}px solid #3498db; /* Синя рамка */
  margin: ${currentMargin}px;
  background-color: #2ecc71; /* Зелений фон вмісту */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  box-sizing: content-box; /* Важливо для розуміння моделі */
}`;

  return (
    <Card className="mb-6 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Інтерактивна Блокова Модель CSS</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Кожен елемент на веб-сторінці - це як коробка! Ця "коробка" має вміст, внутрішні відступи (padding), рамку (border) та зовнішні відступи (margin). Змінюй значення нижче, щоб побачити, як це працює!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-6">
            <div>
              <Label htmlFor="margin-slider" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Margin (Зовнішній відступ): {currentMargin}px
              </Label>
              <Slider
                id="margin-slider"
                min={0}
                max={100}
                step={1}
                value={margin}
                onValueChange={setMargin}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="border-slider" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Border (Рамка): {currentBorderWidth}px
              </Label>
              <Slider
                id="border-slider"
                min={0}
                max={20}
                step={1}
                value={borderWidth}
                onValueChange={setBorderWidth}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="padding-slider" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Padding (Внутрішній відступ): {currentPadding}px
              </Label>
              <Slider
                id="padding-slider"
                min={0}
                max={100}
                step={1}
                value={padding}
                onValueChange={setPadding}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="content-width-slider" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Ширина Вмісту: {currentContentWidth}px
              </Label>
              <Slider
                id="content-width-slider"
                min={50}
                max={300}
                step={1}
                value={contentWidth}
                onValueChange={setContentWidth}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="content-height-slider" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Висота Вмісту: {currentContentHeight}px
              </Label>
              <Slider
                id="content-height-slider"
                min={30}
                max={200}
                step={1}
                value={contentHeight}
                onValueChange={setContentHeight}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Результат:</h4>
            <div className="p-4 border border-border rounded-md bg-background flex justify-center items-center min-h-[250px]">
              <div
                style={{
                  margin: `${currentMargin}px`,
                  border: `${currentBorderWidth}px solid #3498db`, // Blue border
                  padding: `${currentPadding}px`,
                  backgroundColor: '#f1c40f', // Yellow for padding area
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'content-box',
                }}
                className="relative"
              >
                <div
                  style={{
                    width: `${currentContentWidth}px`,
                    height: `${currentContentHeight}px`,
                    backgroundColor: '#2ecc71', // Green for content area
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '16px',
                  }}
                >
                  Вміст
                </div>
                {/* Labels for visual clarity */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600">Margin</div>
                <div className="absolute top-1/2 -left-10 -translate-y-1/2 text-xs text-gray-600">Margin</div>
                <div className="absolute top-1/2 -right-10 -translate-y-1/2 text-xs text-gray-600">Margin</div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-600">Margin</div>

                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <span className="absolute top-1 left-1 text-[10px] text-gray-800">Padding</span>
                    <span className="absolute bottom-1 right-1 text-[10px] text-gray-800">Padding</span>
                </div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <span className="absolute top-1 left-1 text-[10px] text-gray-800">Border</span>
                    <span className="absolute bottom-1 right-1 text-[10px] text-gray-800">Border</span>
                </div>
              </div>
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

export default CssBoxModelVisualizer;