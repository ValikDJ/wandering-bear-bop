import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const htmlTemplate = `<!DOCTYPE html>
<html lang="uk">

<head>
    <title>Назва</title>
    <!-- Тут можна додати посилання на CSS файл -->
    <!-- <link rel="stylesheet" href="style.css"> -->
</head>

<body>
    <header>
        <!-- Шапка: назва сайту, логотип, посилання -->
        <h1>Назва сайту
            <img src="" alt="logo">
        </h1>
        <a href="#home"></a>
        <a href="#title2"></a>
        <a href="#title3"></a>
    </header>
    <main>
        <!-- Основна інформація -->
        <h2 id="home">Заголовок</h2>
        <table>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
        <h2 id="title2">Заголовок 2</h2>
        <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, ut.</p>


        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, numquam?</p>
        <h2 id="title3">Заголовок 3</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, quae.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, neque!</p>
        <img src="" alt="">
        <img src="" alt="">
        <img src="" alt="">
        <h3>Ще один заголовок поменше</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, quas culp</p>
    </main>
    <footer>
        <!-- Підвал з додатковою інформацією та підписом автора -->
        <p>Проект виконав:</p>
        <a href="https://logikaschool.com/" target="_blank">&copy; Logika School</a>
    </footer>
</body>

</html>`;

const ProjectTemplate: React.FC = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText(htmlTemplate);
    toast.success("HTML шаблон скопійовано!");
  };

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Шаблон HTML для Твого Проекту</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        Цей шаблон допоможе тобі швидко почати створювати власний сайт для відкритого уроку. Просто скопіюй код, встав його у свій файл `index.html` (або інший HTML-файл) і зміни текст та картинки під свою тему!
      </p>

      <Card className="mb-6 bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">HTML Шаблон</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <SyntaxHighlighter language="html" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', maxHeight: '600px', overflowY: 'auto' }}>
              {htmlTemplate}
            </SyntaxHighlighter>
            <Button
              onClick={handleCopy}
              className="absolute top-4 right-4 bg-secondary text-secondary-foreground hover:bg-secondary/80"
              size="sm"
            >
              <Copy className="mr-2 h-4 w-4" /> Копіювати
            </Button>
          </div>

          <h2 className="text-3xl font-bold mt-8 mb-4 text-primary">Пояснення до HTML Шаблону</h2>
          <p className="mb-4 text-muted-foreground">
            Давай розберемо, що означає кожен важливий тег у цьому шаблоні:
          </p>
          <ul className="list-disc list-inside space-y-3 text-muted-foreground">
            <li>
              <code>&lt;!DOCTYPE html&gt;</code>: Це оголошення типу документа. Воно завжди стоїть на початку HTML-файлу і повідомляє браузеру, що це HTML5 документ.
            </li>
            <li>
              <code>&lt;html lang="uk"&gt;</code>: Це кореневий елемент HTML-сторінки. Атрибут <code>lang="uk"</code> вказує, що мова вмісту сторінки - українська.
            </li>
            <li>
              <code>&lt;head&gt;</code>: Цей розділ містить метадані про сторінку, які не відображаються безпосередньо у браузері. Тут може бути заголовок сторінки, посилання на CSS-файли, налаштування для мобільних пристроїв тощо.
              <ul className="list-circle list-inside ml-4 mt-1">
                <li>
                  <code>&lt;title&gt;Назва&lt;/title&gt;</code>: Текст всередині цього тегу відображається у вкладці браузера або у вікні.
                </li>
                <li>
                  <code>&lt;link rel="stylesheet" href="style.css"&gt;</code>: Це приклад того, як можна підключити зовнішній CSS-файл (наприклад, `style.css`), щоб стилізувати твій сайт.
                </li>
              </ul>
            </li>
            <li>
              <code>&lt;body&gt;</code>: Це найважливіший тег, адже він містить ВЕСЬ видимий вміст твоєї веб-сторінки: текст, зображення, посилання, кнопки, таблиці тощо.
            </li>
            <li>
              <code>&lt;header&gt;</code>: Цей тег представляє "шапку" сайту. Зазвичай тут розміщують назву сайту, логотип, навігаційні посилання.
              <ul className="list-circle list-inside ml-4 mt-1">
                <li>
                  <code>&lt;h1&gt;Назва сайту&lt;/h1&gt;</code>: Це головний заголовок сторінки.
                </li>
                <li>
                  <code>&lt;img src="" alt="logo"&gt;</code>: Тег для вставки зображень. <code>src</code> - це шлях до картинки, <code>alt</code> - опис для неї (важливо для доступності).
                </li>
                <li>
                  <code>&lt;a href="#home"&gt;&lt;/a&gt;</code>: Тег для створення посилань. <code>href</code> вказує, куди веде посилання. Якщо починається з `#`, то це посилання на розділ всередині поточної сторінки (за ідентифікатором `id`).
                </li>
              </ul>
            </li>
            <li>
              <code>&lt;main&gt;</code>: Цей тег позначає основний, унікальний вміст документа. На сторінці має бути лише один тег <code>&lt;main&gt;</code>.
              <ul className="list-circle list-inside ml-4 mt-1">
                <li>
                  <code>&lt;h2 id="home"&gt;Заголовок&lt;/h2&gt;</code>: Заголовки другого рівня. Атрибут <code>id="home"</code> дозволяє створити "якір", на який можна перейти за посиланням (наприклад, з навігації).
                </li>
                <li>
                  <code>&lt;p&gt;...&lt;/p&gt;</code>: Тег для звичайних абзаців тексту.
                </li>
                <li>
                  <code>&lt;table&gt;</code>: Використовується для створення таблиць.
                  <ul className="list-circle list-inside ml-4 mt-1">
                    <li>
                      <code>&lt;tr&gt;</code>: Рядок таблиці (Table Row).
                    </li>
                    <li>
                      <code>&lt;td&gt;</code>: Комірка даних таблиці (Table Data).
                    </li>
                  </ul>
                </li>
                <li>
                  <code>&lt;h3&gt;...&lt;/h3&gt;</code>: Заголовки третього рівня.
                </li>
              </ul>
            </li>
            <li>
              <code>&lt;footer&gt;</code>: Цей тег представляє "підвал" сайту. Зазвичай тут розміщують інформацію про автора, авторські права, контактні дані.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectTemplate;