import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Plus, Minus, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ColorStop {
  id: string;
  color: string;
  position: number; // 0-100
}

const generateId = () => Math.random().toString(36).substring(2, 11);

const CssGradientGenerator: React.FC = () => {
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const [colors, setColors] = useState<ColorStop[]>([
    { id: generateId(), color: "#FF0000", position: 0 },
    { id: generateId(), color: "#0000FF", position: 100 },
  ]);
  const [linearAngle, setLinearAngle] = useState<number[]>([90]); // 0-360 degrees
  const [radialShape, setRadialShape] = useState<"circle" | "ellipse">("ellipse");
  const [radialPosition, setRadialPosition] = useState<string>("center"); // e.g., "center", "top left"

  const [generatedCss, setGeneratedCss] = useState("");

  const updateColor = useCallback((id: string, newColor: string) => {
    setColors((prevColors) =>
      prevColors.map((cs) => (cs.id === id ? { ...cs, color: newColor } : cs))
    );
  }, []);

  const updatePosition = useCallback((id: string, newPosition: number) => {
    setColors((prevColors) =>
      prevColors.map((cs) => (cs.id === id ? { ...cs, position: newPosition } : cs))
    );
  }, []);

  const addColorStop = useCallback(() => {
    setColors((prevColors) => {
      const newColors = [...prevColors].sort((a, b) => a.position - b.position);
      const lastColor = newColors[newColors.length - 1];
      const newPosition = Math.min(lastColor.position + 25, 100);
      return [...newColors, { id: generateId(), color: "#FFFFFF", position: newPosition }];
    });
  }, []);

  const removeColorStop = useCallback((id: string) => {
    setColors((prevColors) => prevColors.filter((cs) => cs.id !== id));
  }, []);

  useEffect(() => {
    const sortedColors = [...colors].sort((a, b) => a.position - b.position);
    const colorStopsCss = sortedColors
      .map((cs) => `${cs.color} ${cs.position}%`)
      .join(", ");

    let gradientCss = "";
    if (gradientType === "linear") {
      gradientCss = `linear-gradient(${linearAngle[0]}deg, ${colorStopsCss})`;
    } else {
      gradientCss = `radial-gradient(${radialShape} at ${radialPosition}, ${colorStopsCss})`;
    }
    setGeneratedCss(`background: ${gradientCss};`);
  }, [gradientType, colors, linearAngle, radialShape, radialPosition]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCss);
    toast.success("CSS градієнт скопійовано!");
  };

  return (
    <Card className="mb-6 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground">Генератор CSS Градієнтів</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Створюй власні градієнти! Вибери тип, додай кольори та налаштуй їх положення.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-6">
            {/* Gradient Type */}
            <div>
              <Label htmlFor="gradient-type" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Тип градієнта:
              </Label>
              <Select value={gradientType} onValueChange={(value: "linear" | "radial") => setGradientType(value)}>
                <SelectTrigger id="gradient-type" className="w-full">
                  <SelectValue placeholder="Виберіть тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Лінійний</SelectItem>
                  <SelectItem value="radial">Радіальний</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Linear Gradient Options */}
            {gradientType === "linear" && (
              <div>
                <Label htmlFor="linear-angle" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                  Кут (Linear): {linearAngle[0]}°
                </Label>
                <Slider
                  id="linear-angle"
                  min={0}
                  max={360}
                  step={1}
                  value={linearAngle}
                  onValueChange={setLinearAngle}
                  className="w-full"
                />
              </div>
            )}

            {/* Radial Gradient Options */}
            {gradientType === "radial" && (
              <>
                <div>
                  <Label htmlFor="radial-shape" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                    Форма (Radial):
                  </Label>
                  <Select value={radialShape} onValueChange={(value: "circle" | "ellipse") => setRadialShape(value)}>
                    <SelectTrigger id="radial-shape" className="w-full">
                      <SelectValue placeholder="Виберіть форму" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ellipse">Еліпс</SelectItem>
                      <SelectItem value="circle">Коло</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="radial-position" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                    Позиція (Radial):
                  </Label>
                  <Input
                    id="radial-position"
                    type="text"
                    value={radialPosition}
                    onChange={(e) => setRadialPosition(e.target.value)}
                    placeholder="e.g., center, top left, 50% 50%"
                  />
                </div>
              </>
            )}

            {/* Color Stops */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-secondary-foreground">Кольорові зупинки:</h3>
              {colors.map((cs, index) => (
                <div key={cs.id} className="flex items-center gap-3 p-3 border border-border rounded-md bg-background">
                  <Input
                    type="color"
                    value={cs.color}
                    onChange={(e) => updateColor(cs.id, e.target.value)}
                    className="h-10 w-10 p-0 border-none cursor-pointer"
                  />
                  <div className="flex-1">
                    <Label htmlFor={`color-pos-${cs.id}`} className="sr-only">Позиція кольору</Label>
                    <Slider
                      id={`color-pos-${cs.id}`}
                      min={0}
                      max={100}
                      step={1}
                      value={[cs.position]}
                      onValueChange={(val) => updatePosition(cs.id, val[0])}
                      className="w-full"
                    />
                    <span className="text-sm text-muted-foreground mt-1 block">{cs.position}%</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeColorStop(cs.id)}
                    disabled={colors.length <= 2} // Don't allow less than 2 color stops
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addColorStop} className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
                <Plus className="mr-2 h-4 w-4" /> Додати колір
              </Button>
            </div>
          </div>

          {/* Live Preview and Code */}
          <div className="flex flex-col space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Перегляд:</h4>
              <div
                className="w-full h-64 border border-border rounded-md flex items-center justify-center"
                style={{ background: generatedCss.replace('background: ', '') }}
              >
                <span className="text-white text-lg font-bold text-shadow-sm">Твій Градієнт</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Згенерований CSS:</h4>
              <div className="relative">
                <SyntaxHighlighter language="css" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', maxHeight: '200px', overflowY: 'auto' }}>
                  {generatedCss}
                </SyntaxHighlighter>
                <Button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  size="sm"
                >
                  <Copy className="mr-2 h-4 w-4" /> Копіювати
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CssGradientGenerator;