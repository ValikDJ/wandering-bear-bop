import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, ChevronDown, Lightbulb, CheckSquare, Rocket, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CosmicCssChallengeCardProps {
  challengeNumber: number;
  challengeTitle: string;
  challengeDescription: string;
  initialCss: string;
  previewContent: React.ReactNode;
  hint: string;
  lessonLink?: string;
  lessonLinkText?: string;
  completed: boolean;
  onCompletionChange: (completed: boolean) => void;
  cosmicEnergy: number;
  decreaseCosmicEnergy: (amount: number, actionType: 'hint' | 'solution') => void;
}

const CosmicCssChallengeCard: React.FC<CosmicCssChallengeCardProps> = ({
  challengeNumber,
  challengeTitle,
  challengeDescription,
  initialCss,
  previewContent,
  hint,
  lessonLink,
  lessonLinkText,
  completed,
  onCompletionChange,
  cosmicEnergy,
  decreaseCosmicEnergy,
}) => {
  const [showSolutionCollapsible, setShowSolutionCollapsible] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [solutionUsed, setSolutionUsed] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  const HINT_COST = 10;
  const SOLUTION_COST = 25;

  // NEW EFFECT for sparkle animation
  useEffect(() => {
    if (completed) {
      setShowSparkle(true);
      const timer = setTimeout(() => {
        setShowSparkle(false);
      }, 600); // Show sparkle for 0.6 seconds
      return () => clearTimeout(timer);
    }
  }, [completed]);

  const handleCopy = () => {
    navigator.clipboard.writeText(initialCss);
    toast.success("CSS-код скопійовано!");
  };

  const handleHintOpenChange = (open: boolean) => {
    if (open && !hintUsed && cosmicEnergy >= HINT_COST) {
      decreaseCosmicEnergy(HINT_COST, 'hint');
      setHintUsed(true);
    } else if (open && !hintUsed && cosmicEnergy < HINT_COST) {
      toast.error("Недостатньо Космічної Енергії для підказки!");
      return; // Prevent opening if not enough energy
    }
    // Always allow showing solution collapsible if hint is opened, regardless of energy
    if (open) {
      setShowSolutionCollapsible(true);
    }
  };

  const handleSolutionOpenChange = (open: boolean) => {
    if (open && !solutionUsed && cosmicEnergy >= SOLUTION_COST) {
      decreaseCosmicEnergy(SOLUTION_COST, 'solution');
      setSolutionUsed(true);
    } else if (open && !solutionUsed && cosmicEnergy < SOLUTION_COST) {
      toast.error("Недостатньо Космічної Енергії для рішення!");
      return; // Prevent opening if not enough energy
    }
  };

  return (
    <Card className={
      completed
        ? "mb-6 bg-card shadow-md transition-all duration-300 border-2 border-green-500"
        : "mb-6 bg-card shadow-md transition-all duration-300 hover:shadow-lg"
    }>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl text-foreground flex items-center gap-2">
          <Rocket className={cn("h-6 w-6", completed ? "text-green-500" : "text-primary")} />
          Завдання {challengeNumber}: {challengeTitle}
        </CardTitle>
        <div className="flex items-center space-x-2 no-print relative">
          <Checkbox
            id={`challenge-${challengeNumber}-completed`}
            checked={completed}
            onCheckedChange={(checked: boolean) => onCompletionChange(checked)}
            className="h-6 w-6"
          />
          <Label htmlFor={`challenge-${challengeNumber}-completed`} className="text-lg font-medium text-muted-foreground">
            Виконано
          </Label>
          {/* Only show if completed and sparkle is active */}
          {showSparkle && completed && (
            <Sparkles className="absolute h-8 w-8 text-yellow-400 animate-sparkle-pop -right-8" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          {challengeDescription}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Як це виглядає:</h4>
            <div className="p-4 border border-border rounded-md bg-background min-h-[100px] flex items-center justify-center">
              {previewContent}
            </div>
          </div>
          <div className="flex flex-col">
            <Collapsible className="mt-4" onOpenChange={handleHintOpenChange}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  size="sm" {/* Changed size to sm */}
                  className="w-full justify-between font-semibold text-secondary-foreground hover:bg-secondary/80 no-print" // Removed text-lg
                  disabled={cosmicEnergy < HINT_COST && !hintUsed}
                >
                  <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" /> {/* Adjusted icon size */}
                  Підказка {hintUsed ? "(Використано)" : `(-${HINT_COST} Енергії)`}
                  <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180 chevron-icon" /> {/* Adjusted icon size */}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
                <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
                  <p className="mb-2">{hint}</p>
                  {lessonLink && lessonLinkText && (
                    <p className="mt-2">
                      Детальніше тут: <Link to={lessonLink} className="text-brand-primary hover:underline">{lessonLinkText}</Link>
                    </p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Solution section, initially hidden, appears after hint is opened */}
            {showSolutionCollapsible && (
              <Collapsible className="mt-4" onOpenChange={handleSolutionOpenChange}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm" {/* Changed size to sm */}
                    className="w-full justify-between font-semibold text-secondary-foreground hover:bg-secondary/80 no-print" // Removed text-lg
                    disabled={cosmicEnergy < SOLUTION_COST && !solutionUsed}
                  >
                    <CheckSquare className="h-4 w-4 mr-2 text-green-500" /> {/* Adjusted icon size */}
                    Рішення {solutionUsed ? "(Використано)" : `(-${SOLUTION_COST} Енергії)`}
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180 chevron-icon" /> {/* Adjusted icon size */}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
                  <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
                    <p className="mb-2 font-semibold text-red-500">
                      Спробуй спочатку самостійно! Рішення - це останній крок, коли ти вже все перепробував.
                    </p>
                    <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">CSS-код:</h4>
                    <div className="relative">
                      <SyntaxHighlighter language="css" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', maxHeight: '150px', overflowY: 'auto' }}>
                        {initialCss}
                      </SyntaxHighlighter>
                      <Button
                        onClick={handleCopy}
                        className="absolute top-4 right-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 no-print"
                        size="sm"
                      >
                        <Copy className="mr-2 h-4 w-4" /> Копіювати
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Встав цей код у свій `style.css` файл.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CosmicCssChallengeCard;