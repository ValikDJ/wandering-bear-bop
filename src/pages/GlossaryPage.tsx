import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { glossaryData } from "@/data/glossaryData";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import LessonNavigation from "@/components/LessonNavigation"; // Assuming you might want navigation here too

const GlossaryPage: React.FC = () => {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Словник Термінів</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        Тут ти знайдеш пояснення всіх важливих слів та понять, які використовуються у веб-розробці.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {glossaryData.map((item, index) => (
          <Card key={index} className="bg-card shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-primary">{item.term}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{item.definition}</p>
              {item.codeExample && item.language && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Приклад коду:</h4>
                  <SyntaxHighlighter language={item.language} style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em' }}>
                    {item.codeExample}
                  </SyntaxHighlighter>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <LessonNavigation />
    </div>
  );
};

export default GlossaryPage;