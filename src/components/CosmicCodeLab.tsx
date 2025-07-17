import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Lightbulb, Copy, ExternalLink, Rocket, ChevronDown } from "lucide-react"; // ВИПРАВЛЕНО: Додано Rocket та ChevronDown
import { cosmicChallenges, CosmicChallenge } from "@/data/cosmicChallenges";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const CosmicCodeLab: React.FC = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [outputSrcDoc, setOutputSrcDoc] = useState("");
  const [showHint, setShowHint] = useState(false);
  const { actualTheme } = useTheme();

  const currentChallenge = cosmicChallenges[currentChallengeIndex];

  // Load challenge data when index changes
  useEffect(() => {
    if (currentChallenge) {
      setHtmlCode(currentChallenge.initialHtml);
      setCssCode(currentChallenge.initialCss);
      setShowHint(false); // Reset hint visibility
    }
  }, [currentChallengeIndex, currentChallenge]);

  // Generate iframe srcDoc based on current code and theme
  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const themeVars = [
      '--background', '--foreground', '--card', '--card-foreground',
      '--popover', '--popover-foreground', '--primary', '--primary-foreground',
      '--secondary', '--secondary-foreground', '--muted', '--muted-foreground',
      '--accent', '--accent-foreground', '--destructive', '--destructive-foreground',
      '--border', '--input', '--ring', '--radius',
      '--brand-primary', '--brand-primary-hover',
      '--playground-element-bg', '--playground-element-border', '--playground-element-text',
      '--box-model-margin-bg', '--box-model-margin-text',
      '--box-model-border-bg', '--box-model-border-text',
      '--box-model-padding-bg', '--box-model-padding-text',
      '--box-model-content-bg', '--box-model-content-text',
    ].map(v => `${v}: ${rootStyles.getPropertyValue(v)};`).join('\n');

    const generateSrcDoc = () => {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            :root {
              ${themeVars}
            }
            body {
              margin: 0;
              padding: 10px;
              font-family: sans-serif;
              background-color: hsl(var(--background));
              color: hsl(var(--foreground));
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: center;
              min-height: 100%;
              box-sizing: border-box;
            }
            /* Default styles for common elements to ensure readability */
            h1, h2, h3, h4, h5, h6 { color: hsl(var(--foreground)); margin-bottom: 0.5em; }
            p { color: hsl(var(--foreground)); margin-bottom: 1em; }
            a { color: hsl(var(--brand-primary)); text-decoration: underline; }
            button {
              background-color: hsl(var(--brand-primary));
              color: hsl(var(--primary-foreground));
              padding: 8px 16px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              margin-top: 10px;
            }
            img { max-width: 100%; height: auto; display: block; margin: 10px 0; }
            div { box-sizing: border-box; } /* Ensure consistent box-sizing */
            /* User's CSS will override these */
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
        </body>
        </html>
      `;
    };
    setOutputSrcDoc(generateSrcDoc());
  }, [htmlCode, cssCode, actualTheme]);

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlCode(e.target.value);
  };

  const handleCssChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCssCode(e.target.value);
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < cosmicChallenges.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      toast.success("Вітаю! Ти пройшов усі космічні місії!");
    }
  };

  const handlePreviousChallenge = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex((prev) => prev - 1);
    }
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlCode);
    toast.success("HTML-код скопійовано!");
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(cssCode);
    toast.success("CSS-код скопійовано!");
  };

  if (!currentChallenge) {
    return <p className="text-center text-muted-foreground">Завантаження місій...</p>;
  }

  return (
    <Card className="mb-6 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground flex items-center gap-2">
          <Rocket className="h-6 w-6 text-primary" />
          Космічна Лабораторія Коду
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Виконуй завдання, змінюючи HTML та CSS код, і дивись на результат у реальному часі!
        </p>

        <div className="mb-6 p-4 border border-border rounded-md bg-muted">
          <h3 className="text-xl font-semibold mb-2 text-secondary-foreground">{currentChallenge.title}</h3>
          <p className="text-muted-foreground">{currentChallenge.description}</p>
          {currentChallenge.hint && (
            <Collapsible className="mt-4">
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 text-primary hover:bg-primary/10">
                  <Lightbulb className="h-4 w-4" />
                  Підказка
                  <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                <div className="p-3 mt-2 border border-border rounded-md bg-background text-muted-foreground text-sm">
                  {currentChallenge.hint}
                  {currentChallenge.lessonLink && (
                    <p className="mt-2">
                      <Link to={currentChallenge.lessonLink} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline flex items-center gap-1">
                        Дізнатися більше: {currentChallenge.lessonLinkText || "Урок"} <ExternalLink className="h-3 w-3" />
                      </Link>
                    </p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4 no-print">
            <div>
              <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">HTML Код:</h4>
              <div className="relative">
                <Textarea
                  value={htmlCode}
                  onChange={handleHtmlChange}
                  className="font-mono text-sm h-48 resize-y"
                  placeholder="Введіть ваш HTML код тут..."
                />
                <Button
                  onClick={handleCopyHtml}
                  className="absolute top-2 right-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  size="sm"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">CSS Код:</h4>
              <div className="relative">
                <Textarea
                  value={cssCode}
                  onChange={handleCssChange}
                  className="font-mono text-sm h-48 resize-y"
                  placeholder="Введіть ваш CSS код тут..."
                />
                <Button
                  onClick={handleCopyCss}
                  className="absolute top-2 right-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  size="sm"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Результат:</h4>
            <iframe
              srcDoc={outputSrcDoc}
              title="Cosmic Code Lab Output"
              className="w-full h-96 border border-border rounded-md bg-white"
              sandbox="allow-scripts"
            ></iframe>
          </div>
        </div>

        <div className="flex justify-between mt-6 no-print">
          <Button
            onClick={handlePreviousChallenge}
            disabled={currentChallengeIndex === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Попередня Місія
          </Button>
          <Button
            onClick={handleNextChallenge}
            className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/80"
          >
            Наступна Місія <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CosmicCodeLab;