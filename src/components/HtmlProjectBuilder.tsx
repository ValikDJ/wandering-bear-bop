import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Copy, Code, ChevronDown } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom"; // Import Link for internal navigation

interface SectionContent {
  id: string;
  tag: string;
  content: string;
  attributes?: { [key: string]: string };
}

const generateUniqueId = () => Math.random().toString(36).substring(2, 9);

const HtmlProjectBuilder: React.FC = () => {
  const [pageTitle, setPageTitle] = useState("Мій Перший Сайт");
  const [siteTitle, setSiteTitle] = useState("Назва Мого Сайту");
  const [sections, setSections] = useState<SectionContent[]>([
    { id: generateUniqueId(), tag: "section", content: "Це мій перший розділ.", attributes: { id: "section1" } },
  ]);
  const [footerText, setFooterText] = useState("Проект виконав: ТВОЄ ІМ'Я");

  const addSection = () => {
    setSections(prev => [
      ...prev,
      { id: generateUniqueId(), tag: "section", content: `Новий розділ ${prev.length + 1}.`, attributes: { id: `section${prev.length + 1}` } },
    ]);
  };

  const removeSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const updateSectionContent = (id: string, newContent: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, content: newContent } : s));
  };

  const updateSectionAttribute = (id: string, key: string, value: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, attributes: { ...s.attributes, [key]: value } } : s));
  };

  const generateHtml = useCallback(() => {
    const headerNavLinks = sections.map((s, index) => {
      const sectionId = s.attributes?.id || `section${index + 1}`;
      // Use the first sentence or default text for the link title
      const linkTitle = s.content.split('.')[0].trim() || `Розділ ${index + 1}`;
      return `<a href="#${sectionId}">${linkTitle}</a>`;
    }).join('\n            ');

    const mainSections = sections.map((s, index) => {
      const sectionId = s.attributes?.id || `section${index + 1}`;
      // Use the first sentence or default text for the H2 title
      const h2Title = s.content.split('.')[0].trim() || `Заголовок ${index + 1}`;
      return `        <section id="${sectionId}">
            <h2>${h2Title}</h2>
            <p>${s.content}</p>
        </section>`;
    }).join('\n\n');

    return `<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <link rel="stylesheet" href="style.css"> <!-- Підключаємо файл стилів -->
</head>
<body>
    <header>
        <h1>${siteTitle}</h1>
        <nav>
            ${headerNavLinks}
        </nav>
    </header>

    <main>
${mainSections}
    </main>

    <footer>
        <p>${footerText}</p>
    </footer>
</body>
</html>`;
  }, [pageTitle, siteTitle, sections, footerText]);

  const [generatedHtml, setGeneratedHtml] = useState(generateHtml());

  useEffect(() => {
    setGeneratedHtml(generateHtml());
  }, [pageTitle, siteTitle, sections, footerText, generateHtml]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    toast.success("HTML-код скопійовано!");
  };

  return (
    <Card className="mb-6 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          Конструктор HTML-проекту
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Створи базову структуру свого сайту, вибираючи та налаштовуючи основні розділи.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-4 no-print">
            {/* Global Settings */}
            <h3 className="text-lg font-semibold text-secondary-foreground">Загальні налаштування:</h3>
            <div>
              <Label htmlFor="page-title" className="mb-1 block text-muted-foreground">Назва вкладки (Title):</Label>
              <Input id="page-title" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="site-title" className="mb-1 block text-muted-foreground">Назва сайту (Header H1):</Label>
              <Input id="site-title" value={siteTitle} onChange={(e) => setSiteTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="footer-text" className="mb-1 block text-muted-foreground">Текст у підвалі (Footer):</Label>
              <Input id="footer-text" value={footerText} onChange={(e) => setFooterText(e.target.value)} />
            </div>

            <h3 className="text-lg font-semibold text-secondary-foreground mt-6">Розділи сайту (Sections):</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Додай або видали розділи. Кожен розділ матиме заголовок (H2) та абзац (P).
            </p>
            {sections.map((section, index) => (
              <div key={section.id} className="flex items-center gap-2 p-3 border border-border rounded-md bg-background">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`section-content-${section.id}`} className="sr-only">Вміст розділу</Label>
                  <Input
                    id={`section-content-${section.id}`}
                    value={section.content}
                    onChange={(e) => updateSectionContent(section.id, e.target.value)}
                    placeholder={`Вміст розділу ${index + 1}`}
                  />
                  <Label htmlFor={`section-id-${section.id}`} className="sr-only">ID розділу</Label>
                  <Input
                    id={`section-id-${section.id}`}
                    value={section.attributes?.id || ''}
                    onChange={(e) => updateSectionAttribute(section.id, 'id', e.target.value)}
                    placeholder={`ID розділу (наприклад, section${index + 1})`}
                    className="text-xs text-muted-foreground"
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeSection(section.id)} className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
            <Button onClick={addSection} className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
              <Plus className="mr-2 h-4 w-4" /> Додати розділ
            </Button>
          </div>

          {/* Generated HTML */}
          <div className="flex flex-col">
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Згенерований HTML:</h4>
            <div className="relative flex-grow">
              <SyntaxHighlighter language="html" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', maxHeight: '600px', overflowY: 'auto', flexGrow: 1 }}>
                {generatedHtml}
              </SyntaxHighlighter>
              <Button
                onClick={handleCopy}
                className="absolute top-4 right-4 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                size="sm"
              >
                <Copy className="mr-2 h-4 w-4" /> Копіювати
              </Button>
            </div>
            <Collapsible className="mt-6">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
                  💡 Поради щодо використання
                  <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
                <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
                  <p className="mb-2">
                    Після копіювання коду, встав його у вкладку HTML на платформі Logika.
                    Ти можеш:
                  </p>
                  <ul className="list-disc list-inside">
                    <li>Додати більше тексту в абзаци (`&lt;p&gt;`).</li>
                    <li>Вставити картинки (`&lt;img&gt;`) у розділи.</li>
                    <li>Додати таблиці (`&lt;table&gt;`) або списки (`&lt;ul&gt;`, `&lt;ol&gt;`).</li>
                    <li>Змінити текст посилань у навігації (`&lt;nav&gt;`).</li>
                    <li>Використовувати <Link to="/html-tags" className="text-brand-primary hover:underline">Урок з HTML Тегів</Link> для додаткових тегів.</li>
                    <li>Використовувати <Link to="/examples#example-html-creator" className="text-brand-primary hover:underline">Створи свій HTML-елемент!</Link> для експериментів з окремими тегами.</li>
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HtmlProjectBuilder;