import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cssCompletionData } from "@/data/cssCompletionData";
import { cn } from "@/lib/utils";

interface InteractiveCssEditorProps {
  id?: string;
  title?: string;
  description?: string;
  initialHtml?: string;
  initialCss?: string;
}

const InteractiveCssEditor: React.FC<InteractiveCssEditorProps> = ({
  id,
  title = "Інтерактивний CSS Редактор",
  description = "Пиши CSS код і дивись, як змінюється блок в реальному часі! Спробуй автозаповнення (наприклад, 'co' для 'color').",
  initialHtml = `<div class="my-element">Привіт, світ!</div>`,
  initialCss = `.my-element {
  background-color: lightblue;
  padding: 20px;
  border: 2px solid blue;
  text-align: center;
  font-size: 18px;
}`,
}) => {
  const [cssCode, setCssCode] = useState(initialCss);
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [outputSrcDoc, setOutputSrcDoc] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Function to get the current word being typed for autocompletion
  const getCurrentWord = (text: string, cursorPosition: number): string => {
    const textBeforeCursor = text.substring(0, cursorPosition);
    // Find the last character that typically separates CSS properties/values
    const lastSeparatorIndex = Math.max(
      textBeforeCursor.lastIndexOf(' '),
      textBeforeCursor.lastIndexOf(';'),
      textBeforeCursor.lastIndexOf('{'),
      textBeforeCursor.lastIndexOf('}'),
      textBeforeCursor.lastIndexOf(':')
    );
    return textBeforeCursor.substring(lastSeparatorIndex + 1).trim();
  };

  // Function to insert the selected suggestion into the textarea
  const insertSuggestion = (suggestionText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const textAfterCursor = textarea.value.substring(cursorPosition);

    const currentWord = getCurrentWord(textarea.value, cursorPosition);
    const startIndex = textBeforeCursor.lastIndexOf(currentWord);

    const newText =
      textBeforeCursor.substring(0, startIndex) +
      suggestionText +
      textAfterCursor;

    setCssCode(newText);

    // Position cursor after inserted suggestion
    const newCursorPosition = startIndex + suggestionText.length;
    setTimeout(() => {
      textarea.selectionStart = newCursorPosition;
      textarea.selectionEnd = newCursorPosition;
      textarea.focus(); // Keep focus on textarea
    }, 0);

    setShowSuggestions(false);
    setSuggestions([]);
    setActiveSuggestionIndex(0);
  };

  const handleCssChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCss = e.target.value;
    setCssCode(newCss);

    const cursorPosition = e.target.selectionStart;
    const currentWord = getCurrentWord(newCss, cursorPosition);

    if (currentWord.length > 0) {
      const filtered = cssCompletionData.filter(item =>
        item.label.startsWith(currentWord.toLowerCase())
      ).slice(0, 10); // Limit suggestions to 10

      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestionIndex(0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showSuggestions) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          (prevIndex + 1) % suggestions.length
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          (prevIndex - 1 + suggestions.length) % suggestions.length
        );
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        if (suggestions.length > 0) {
          insertSuggestion(suggestions[activeSuggestionIndex].insertText || suggestions[activeSuggestionIndex].label);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setShowSuggestions(false);
        setSuggestions([]);
      }
    }
  };

  // Update initial CSS when parent component's colors change
  useEffect(() => {
    setCssCode(initialCss);
  }, [initialCss]);

  useEffect(() => {
    const generateSrcDoc = () => {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 0; padding: 10px; font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100%; box-sizing: border-box; }
            .my-element {
              /* Ensure basic styling for the preview block using CSS variables */
              min-width: 100px;
              min-height: 50px;
              background-color: hsl(var(--playground-element-bg));
              border: 1px solid hsl(var(--playground-element-border));
              color: hsl(var(--playground-element-text));
              padding: 10px;
              box-sizing: border-box;
            }
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
  }, [htmlCode, cssCode]);

  return (
    <Card id={id} className="mb-6 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4 relative no-print">
            <div>
              <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Твій CSS Код:</h4>
              <Textarea
                ref={textareaRef}
                value={cssCode}
                onChange={handleCssChange}
                onKeyDown={handleKeyDown}
                className="font-mono text-sm h-64 resize-y"
                placeholder="Введіть ваш CSS код тут..."
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-10 bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-y-auto mt-1 w-full"
                  style={{ top: 'calc(100% + 8px)' }} // Position below textarea
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion.label}
                      className={cn(
                        "px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground",
                        index === activeSuggestionIndex && "bg-accent text-accent-foreground"
                      )}
                      onClick={() => insertSuggestion(suggestion.insertText || suggestion.label)}
                    >
                      <span className="font-semibold">{suggestion.label}</span>
                      <span className="text-muted-foreground text-sm ml-2">{suggestion.detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Перегляд Результату:</h4>
            <iframe
              srcDoc={outputSrcDoc}
              title="Live CSS Output"
              className="w-full h-64 border border-border rounded-md bg-white"
              sandbox="allow-scripts"
            ></iframe>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveCssEditor;