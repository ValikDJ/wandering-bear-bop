import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, ChevronDown, Lightbulb, CheckSquare, Rocket } from "lucide-react";
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
}) => {
  const [showSolutionCollapsible, setShowSolutionCollapsible] = useState(false); // State to control solution collapsible visibility

  const handleCopy = () => {
    navigator.clipboard.writeText(initialCss);
    toast.success("CSS-код скопійовано!");
  };

  const handleHintOpenChange = (open: boolean) => {
    if (open) {
      // If hint is opened, allow showing the solution collapsible
      setShowSolutionCollapsible(true);
    }
  };

  return (
    <Card className={cn(
      "mb-6 bg-card shadow-md transition-all duration-300",
      completed ? "border-2 border-green-500" : "hover:shadow-lg"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl text-foreground flex items-center gap-2">
          <Rocket className={cn("h-6 w-6", completed ? "text-green-500" : "text-primary")} />
          Завдання {challengeNumber}: {challengeTitle}
        </CardTitle>
        <div className="flex items-center space-x-2 no-print">
          <Checkbox
            id={`challenge-${challengeNumber}-completed`}
            checked={completed}
            onCheckedChange={(checked: boolean) => onCompletionChange(checked)}
            className="h-6 w-6"
          />
          <Label htmlFor={`challenge-${challengeNumber}-completed`} className="text-lg font-medium text-muted-foreground">
            Виконано
          </Label>
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
                <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  Підказка
                  <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
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
              <Collapsible className="mt-4">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
                    <CheckSquare className="h-5 w-5 mr-2 text-green-500" />
                    Рішення
                    <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
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