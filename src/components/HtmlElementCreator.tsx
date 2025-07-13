import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAssistantMessage } from "@/context/AssistantMessageContext"; // Імпорт хука

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
  const { sendMessage } = useAssistantMessage(); // Використання хука

  const generateHtml = () => {
    let html = "";
    switch (selectedTag) {
      case "h1":
      case "h2":
      case "h3":
      case "p":
      case "span":
      case "button":
        html = `<${selectedTag}>${textContent}</${selectedTag}>`;
        break;
      case "img":
        html = `<img src="${imgSrc}" alt="${imgAlt}" style="max-width: 100%; height: auto; border-radius: 8px;">`;
        break;
      case "a":
        html = `<a href="${linkHref}" target="_blank" style="color: blue; text-decoration: underline;">${textContent || "Посилання"}</a>`;
        break;
      case "div":
        html = `<div style="padding: 15px; border: 1px solid #ccc; background-color: #f9f9f9; border-radius: 8px;">${textContent || "Це блок div"}</div>`;
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
          div { padding: 15px; border: 1px solid #ccc; background-color: #f9f9f9; border-radius: 8px; }
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
    sendMessage(`Ти обрав тег <${value}>! Спробуй змінити його вміст.`);
  };

  const handleTextContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
    sendMessage(`Ти пишеш текст для тегу <${selectedTag}>!`);
  };

  const handleImgSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgSrc(e.target.value);
    sendMessage(`Змінюємо зображення!`);
  };

  const handleLinkHrefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkHref(e.target.value);
    sendMessage(`Створюємо посилання!`);
  };

  const handleReset = () => {
    setSelectedTag("p");
    setTextContent("Привіт, світ!");
    setImgSrc("https://via.placeholder.com/100");
    setImgAlt("Приклад зображення");
    setLinkHref("https://www.google.com");
    sendMessage("Налаштування скинуто! Почни спочатку.");
  };

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
              <Select value={selectedTag} onValueChange={handleTagChange}> {/* Використовуємо нову функцію */}
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
                  <SelectItem value="button">button (Кнопка)</SelectItem>
                  <SelectItem value="img">img (Зображення)</SelectItem>
                  <SelectItem value="a">a (Посилання)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(selectedTag === "h1" || selectedTag === "h2" || selectedTag === "h3" || selectedTag === "p" || selectedTag === "span" || selectedTag === "button" || selectedTag === "a" || selectedTag === "div") && (
              <div>
                <Label htmlFor="text-content" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                  Текст/Вміст:
                </Label>
                <Textarea
                  id="text-content"
                  value={textContent}
                  onChange={handleTextContentChange} // Використовуємо нову функцію
                  className="font-mono text-sm h-24 resize-y"
                  placeholder="Введіть текст або вміст..."
                />
              </div>
            )}

            {selectedTag === "img" && (
              <>
                <div>
                  <Label htmlFor="img-src" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                    URL зображення (src):
                  </Label>
                  <Input
                    id="img-src"
                    type="text"
                    value={imgSrc}
                    onChange={handleImgSrcChange} // Використовуємо нову функцію
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

            {selectedTag === "a" && (
              <div>
                <Label htmlFor="link-href" className="text-lg font-semibold text-secondary-foreground mb-2 block">
                  Адреса посилання (href):
                </Label>
                <Input
                  id="link-href"
                  type="text"
                  value={linkHref}
                  onChange={handleLinkHrefChange} // Використовуємо нову функцію
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