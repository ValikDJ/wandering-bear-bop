import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface HtmlElementCreatorProps {
  id?: string; // Додано id
  title?: string;
  description?: string;
}

const HtmlElementCreator: React.FC<HtmlElementCreatorProps> = ({
  id,
  title = "Створи свій HTML-елемент!",
  description = "Вибери тег, додай вміст або атрибути, і побач, як він виглядає!",
}) => {
  const [selectedTag, setSelectedTag] = useState<string>("p");
  const [textContent, setTextContent] = useState<string>("Привіт, світ!");
  const [imgSrc, setImgSrc] = useState<string>("https://via.placeholder.com/100");
  const [imgAlt, setImgAlt] = useState<string>("Приклад зображення");
  const [linkHref, setLinkHref] = useState<string>("https://www.google.com");
  const [generatedHtml, setGeneratedHtml] = useState<string>("");
  const [outputSrcDoc, setOutputSrcDoc] = useState("");

  const generateHtml = () => {
    let html = "";
    switch (selectedTag) {
      case "h1":
      case "h2":
      case "h3":
      case "p":
      case "span":
      case "button":
      case "div":
      case "section":
      case "li": // li will also use textContent
        html = `<${selectedTag}>${textContent || `Це ${selectedTag} елемент`}</${selectedTag}>`;
        break;
      case "img":
        html = `<img src="${imgSrc}" alt="${imgAlt}" style="max-width: 100%; height: auto; border-radius: 8px;">`;
        break;
      case "a":
        html = `<a href="${linkHref}" target="_blank" style="color: blue; text-decoration: underline;">${textContent || "Посилання"}</a>`;
        break;
      case "ul":
        html = `<ul>
  <li>${textContent || "Елемент списку 1"}</li>
  <li>Елемент списку 2</li>
</ul>`;
        break;
      case "ol":
        html = `<ol>
  <li>${textContent || "Елемент списку 1"}</li>
  <li>Елемент списку 2</li>
</ol>`;
        break;
      default:
        html = `<p>Виберіть тег</p>`;
    }
    setGeneratedHtml(html);
  };

  useEffect(() => {
    generateHtml();
  }, [selectedTag, textContent, imgSrc, imgAlt, linkHref]);

  useEffect(() => {
    const srcDoc = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 10px; font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100px; }
          img { max-width: 100%; height: auto; border-radius: 8px; }
          a { color: blue; text-decoration: underline; }
          div, section { padding: 15px; border: 1px solid #ccc; background-color: #f9f9f9; border-radius: 8px; }
          ul, ol { margin-left: 20px; }
          li { margin-bottom: 5px; }
        </style>
      </head>
      <body>
        ${generatedHtml}
      </body>
      </html>
    `;
    setOutputSrcDoc(srcDoc);
  }, [generatedHtml]);

  const handleTagChange = (value: string) => {
    setSelectedTag(value);
    // Reset text content for list items to a default if switching to ul/ol/li
    if (['ul', 'ol', 'li'].includes(value)) {
      setTextContent("Елемент списку 1");
    } else if (value === 'div' || value === 'section') {
      setTextContent(`Це ${value} елемент`);
    } else if (value === 'button') {
      setTextContent("Натисни мене!");
    } else if (value === 'p') {
      setTextContent("Привіт, світ!");
    } else if (value.startsWith('h')) {
      setTextContent(`Заголовок ${value.substring(1)} рівня`);
    } else if (value === 'a') {
      setTextContent("Посилання");
    }
  };

  const handleTextContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
  };

  const handleImgSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgSrc(e.target.value);
  };

  const handleLinkHrefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkHref(e.target.value);
  };

  const handleReset = () => {
    setSelectedTag("p");
    setTextContent("Привіт, світ!");
    setImgSrc("https://via.placeholder.com/100");
    setImgAlt("Приклад зображення");
    setLinkHref("https://www.google.com");
  };

  const showTextContentInput = ["h1", "h2", "h3", "p", "span", "button", "a", "div", "section", "li"].includes(selectedTag);
  const showImageInputs = selectedTag === "img";
  const showLinkInputs = selectedTag === "a";

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
              <Label htmlFor="select-tag" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                Вибери HTML-тег:
              </Label>
              <Select value={selectedTag} onValueChange={handleTagChange}>
                <SelectTrigger id="select-tag" className="w-full">
                  <SelectValue placeholder="Виберіть тег" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">h1 (Заголовок 1)</SelectItem>
                  <SelectItem value="h2">h2 (Заголовок 2)</SelectItem>
                  <SelectItem value="h3">h3 (Заголовок 3)</SelectItem>
                  <SelectItem value="p">p (Параграф)</SelectItem>
                  <SelectItem value="span">span (Рядковий елемент)</SelectItem>
                  <SelectItem value="div">div (Блок)</SelectItem>
                  <SelectItem value="section">section (Розділ)</SelectItem> {/* New */}
                  <SelectItem value="button">button (Кнопка)</SelectItem>
                  <SelectItem value="img">img (Зображення)</SelectItem>
                  <SelectItem value="a">a (Посилання)</SelectItem>
                  <SelectItem value="ul">ul (Невпорядкований список)</SelectItem> {/* New */}
                  <SelectItem value="ol">ol (Впорядкований список)</SelectItem> {/* New */}
                  <SelectItem value="li">li (Елемент списку)</SelectItem> {/* New */}
                </SelectContent>
              </Select>
            </div>

            {showTextContentInput && (
              <div>
                <Label htmlFor="text-content" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                  Текст/Вміст:
                </Label>
                <Textarea
                  id="text-content"
                  value={textContent}
                  onChange={handleTextContentChange}
                  className="font-mono text-sm h-24 resize-y"
                  placeholder="Введіть текст або вміст..."
                />
              </div>
            )}

            {showImageInputs && (
              <>
                <div>
                  <Label htmlFor="img-src" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                    URL зображення (src):
                  </Label>
                  <Input
                    id="img-src"
                    type="text"
                    value={imgSrc}
                    onChange={handleImgSrcChange}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="img-alt" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                    Опис зображення (alt):
                  </Label>
                  <Input
                    id="img-alt"
                    type="text"
                    value={imgAlt}
                    onChange={(e) => setImgAlt(e.target.value)}
                    placeholder="Опис для зображення"
                  />
                </div>
              </>
            )}

            {showLinkInputs && (
              <div>
                <Label htmlFor="link-href" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                  Адреса посилання (href):
                </Label>
                <Input
                  id="link-href"
                  type="text"
                  value={linkHref}
                  onChange={handleLinkHrefChange}
                  placeholder="https://..."
                />
              </div>
            )}
            <Button onClick={handleReset} variant="outline" className="mt-4">
              Скинути
            </Button>
          </div>

          <div className="flex flex-col">
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Згенерований HTML:</h4>
            <SyntaxHighlighter language="html" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', flexGrow: 1 }}>
              {generatedHtml}
            </SyntaxHighlighter>

            <h4 className="font-semibold mt-4 mb-2 text-lg text-secondary-foreground">Результат:</h4>
            <iframe
              srcDoc={outputSrcDoc}
              title="HTML Element Output"
              className="w-full h-48 border border-border rounded-md bg-white"
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HtmlElementCreator;