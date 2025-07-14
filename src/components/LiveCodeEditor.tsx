import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/hooks/use-theme"; // Import useTheme
import { cn } from "@/lib/utils"; // Import cn

interface LiveCodeEditorProps {
  id?: string; // Додано id
  initialHtml?: string;
  initialCss?: string;
  title?: string;
  description?: string;
}

const LiveCodeEditor: React.FC<LiveCodeEditorProps> = ({
  id,
  initialHtml = "<h1>Привіт!</h1>\n<p>Зміни мене!</p>",
  initialCss = "h1 {\n  color: blue;\n}\np {\n  font-family: sans-serif;\n}",
  title = "Спробуй сам!",
  description = "Зміни код HTML та CSS нижче і побач результат одразу!",
}) => {
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [outputSrcDoc, setOutputSrcDoc] = useState("");
  const { actualTheme } = useTheme(); // Get current theme

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const themeVars = [
      '--background', '--foreground', '--card', '--card-foreground',
      '--popover', '--popover-foreground', '--primary', '--primary-foreground',
      '--secondary', '--secondary-foreground', '--muted', '--muted-foreground',
      '--accent', '--accent-foreground', '--destructive', '--destructive-foreground',
      '--border', '--input', '--ring', '--radius',
      '--brand-primary', '--brand-primary-hover',
      '--playground-element-bg', '--playground-element-border', '--playground-element-text'
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
              justify-content: center;
              align-items: center;
              min-height: 100%;
              box-sizing: border-box;
            }
            /* Default styles for common elements to ensure readability */
            h1, h2, h3, h4, h5, h6 { color: hsl(var(--foreground)); }
            p { color: hsl(var(--foreground)); }
            a { color: hsl(var(--brand-primary)); text-decoration: underline; }
            button {
              background-color: hsl(var(--brand-primary));
              color: hsl(var(--primary-foreground));
              padding: 8px 16px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
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
  }, [htmlCode, cssCode, actualTheme]); // Add actualTheme to dependencies

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlCode(e.target.value);
  };

  const handleCssChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCssCode(e.target.value);
  };

  return (
    <Card id={id} className="mb-6 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4 no-print">
            <div>
              <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">HTML Код:</h4>
              <Textarea
                value={htmlCode}
                onChange={handleHtmlChange}
                className="font-mono text-sm h-48 resize-y"
                placeholder="Введіть ваш HTML код тут..."
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">CSS Код:</h4>
              <Textarea
                value={cssCode}
                onChange={handleCssChange}
                className="font-mono text-sm h-48 resize-y"
                placeholder="Введіть ваш CSS код тут..."
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Результат:</h4>
            <iframe
              srcDoc={outputSrcDoc}
              title="Live Code Output"
              className="w-full h-96 border border-border rounded-md bg-white"
              sandbox="allow-scripts"
            ></iframe>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveCodeEditor;