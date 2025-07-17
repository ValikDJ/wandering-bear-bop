import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, ChevronDown, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CssExampleCardProps {
  title: string;
  description: string;
  cssCode: string;
  previewContent: React.ReactNode;
  copyText?: string; // Optional text to copy, defaults to cssCode
}

const CssExampleCard: React.FC<CssExampleCardProps> = ({
  title,
  description,
  cssCode,
  previewContent,
  copyText,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(copyText || cssCode);
    toast.success("CSS-код скопійовано!");
  };

  return (
    <Collapsible className="mb-6">
      <Card className="bg-card shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer no-print">
        <CollapsibleTrigger asChild>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 w-full p-6">
            <CardTitle className="text-2xl text-foreground flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              {title}
            </CardTitle>
            <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              {description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Як це виглядає:</h4>
                {previewContent}
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">CSS-код:</h4>
                <SyntaxHighlighter language="css" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', maxHeight: '150px', overflowY: 'auto' }}>
                  {cssCode}
                </SyntaxHighlighter>
                <p className="mt-2 text-sm text-muted-foreground">
                  Встав цей код у свій `style.css` файл.
                </p>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default CssExampleCard;