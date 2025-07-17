import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button"; // Import Button
import { Copy } from "lucide-react"; // Import Copy icon
import { toast } from "sonner"; // Import toast for notifications

interface LessonCardProps {
  id?: string; // New: Optional ID for direct linking
  title: string;
  description: string;
  codeExample: string;
  language: "html" | "css";
  result?: React.ReactNode; // Optional: for displaying the actual rendered result
}

const LessonCard: React.FC<LessonCardProps> = ({ id, title, description, codeExample, language, result }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    toast.success("Код скопійовано!");
  };

  return (
    <Card id={id} className="mb-6 bg-card shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"> {/* Apply ID here */}
      <CardHeader>
        <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <div className="mb-4 relative"> {/* Added relative for button positioning */}
          <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Приклад коду:</h4>
          <SyntaxHighlighter language={language} style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em' }}>
            {codeExample}
          </SyntaxHighlighter>
          <Button
            onClick={handleCopy}
            className="absolute top-4 right-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 no-print"
            size="sm"
          >
            <Copy className="mr-2 h-4 w-4" /> Копіювати
          </Button>
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