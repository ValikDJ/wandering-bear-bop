import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface LessonCardProps {
  id?: string; // New: Optional ID for direct linking
  title: string;
  description: string;
  codeExample: string;
  language: "html" | "css";
  result?: React.ReactNode; // Optional: for displaying the actual rendered result
}

const LessonCard: React.FC<LessonCardProps> = ({ id, title, description, codeExample, language, result }) => {
  return (
    <Card id={id} className="mb-6 bg-card shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"> {/* Apply ID here */}
      <CardHeader>
        <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Приклад коду:</h4>
          <SyntaxHighlighter language={language} style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em' }}>
            {codeExample}
          </SyntaxHighlighter>
        </div>
        {result && (
          <div className="mt-4 p-4 border border-border rounded-md bg-background">
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Результат:</h4>
            {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonCard;