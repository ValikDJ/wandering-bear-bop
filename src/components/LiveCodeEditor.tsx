import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

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

  useEffect(() => {
    const generateSrcDoc = () => {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${cssCode}</style>
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
          <div className="flex flex-col space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">HTML Код:</h4>
              <Textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="font-mono text-sm h-48 resize-y"
                placeholder="Введіть ваш HTML код тут..."
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">CSS Код:</h4>
              <Textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
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
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveCodeEditor;