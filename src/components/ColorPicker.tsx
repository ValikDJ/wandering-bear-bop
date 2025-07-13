import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  initialBgColor: string;
  initialTextColor: string;
  onColorChange: (bgColor: string, textColor: string) => void;
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
];

const ColorPicker: React.FC<ColorPickerProps> = ({ initialBgColor, initialTextColor, onColorChange }) => {
  const [bgColor, setBgColor] = useState(initialBgColor);
  const [textColor, setTextColor] = useState(initialTextColor);

  useEffect(() => {
    onColorChange(bgColor, textColor);
  }, [bgColor, textColor, onColorChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Вибрати Кольори
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-popover text-popover-foreground">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-lg">Колір Фону</h4>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-10 p-0 border-none cursor-pointer"
              />
              <Input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {predefinedColors.map((color) => (
                <Button
                  key={color}
                  style={{ backgroundColor: color }}
                  className="h-8 w-8 rounded-full border border-border"
                  onClick={() => setBgColor(color)}
                  aria-label={`Вибрати колір фону ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <h4 className="font-medium leading-none text-lg">Колір Тексту</h4>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="h-10 w-10 p-0 border-none cursor-pointer"
              />
              <Input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {predefinedColors.map((color) => (
                <Button
                  key={color}
                  style={{ backgroundColor: color }}
                  className="h-8 w-8 rounded-full border border-border"
                  onClick={() => setTextColor(color)}
                  aria-label={`Вибрати колір тексту ${color}`}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;