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
    <title>Назва Мого Сайту</title>
    <!-- Тут можна додати посилання на CSS файл -->
    <!-- <link rel="stylesheet" href="style.css"> -->
</head>

<body>
    <header>
        <!-- Шапка сайту: назва, логотип, навігація -->
        <h1>Назва Мого Сайту
            <img src="https://via.placeholder.com/50" alt="Логотип сайту" style="vertical-align: middle; margin-left: 10px;">
        </h1>
        <nav>
            <a href="#home" style="margin-right: 15px;">Головна</a>
            <a href="#title2" style="margin-right: 15px;">Розділ 2</a>
            <a href="#title3">Розділ 3</a>
        </nav>
    </header>
    <main>
        <!-- Основний вміст сторінки -->
        <h2 id="home">Мій Проект: Заголовок Головної Сторінки</h2>
        <p>Привіт, батьки! Це мій перший веб-сайт, який я створив у Веб-Майстерні!</p>
        
        <h3>Моя Улюблена Таблиця</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">Що я вивчив</th>
                    <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">Як це працює</th>
                    <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">Приклад</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 8px;">HTML Теги</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">Будують структуру</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">&lt;h1&gt;, &lt;p&gt;, &lt;img&gt;</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 8px;">CSS Властивості</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">Роблять сторінку красивою</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">color, font-size, background-color</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ccc; padding: 8px;">CSS Селектори</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">Вибирають елементи для стилізації</td>
                    <td style="border: 1px solid #ccc; padding: 8px;">p, .клас, #ідентифікатор</td>
                </tr>
            </tbody>
        </table>

        <h2 id="title2">Розділ 2: Мої Хобі</h2>
        <p>Я люблю програмувати, грати в ігри та малювати. Веб-розробка - це дуже цікаво!</p>
        <p>Ось кілька моїх улюблених речей:</p>
        <ul>
            <li>Створення ігор на Scratch</li>
            <li>Читання книг про космос</li>
            <li>Гра на гітарі</li>
        </ul>

        <h2 id="title3">Розділ 3: Галерея Моїх Робіт</h2>
        <p>Подивіться на мої перші спроби у веб-дизайні:</p>
        <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 20px;">
            <img src="https://via.placeholder.com/200x150?text=Проект+1" alt="Проект 1" style="border: 2px solid #ddd; border-radius: 8px;">
            <img src="https://via.placeholder.com/200x150?text=Проект+2" alt="Проект 2" style="border: 2px solid #ddd; border-radius: 8px;">
            <img src="https://via.placeholder.com/200x150?text=Проект+3" alt="Проект 3" style="border: 2px solid #ddd; border-radius: 8px;">
        </div>
        <h3>Ще трохи про мої досягнення</h3>
        <p>Я дуже пишаюся тим, що навчився створювати власні веб-сторінки. Це відкриває багато можливостей!</p>
    </main>
    <footer>
        <!-- Підвал сайту: інформація про автора, копірайт -->
        <p>Проект виконав: [Твоє Ім'я]</p>
        <a href="https://logikaschool.com/" target="_blank" style="color: #007bff; text-decoration: none;">&copy; 2024 Веб-Майстерня для Дітей та Logika School</a>
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
                  <code>&lt;title&gt;Назва Мого Сайту&lt;/title&gt;</code>: Текст всередині цього тегу відображається у вкладці браузера або у вікні.
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
                  <code>&lt;h1&gt;Назва Мого Сайту&lt;/h1&gt;</code>: Це головний заголовок сторінки.
                </li>
                <li>
                  <code>&lt;img src="..." alt="..."&gt;</code>: Тег для вставки зображень. <code>src</code> - це шлях до картинки, <code>alt</code> - опис для неї (важливо для доступності).
                </li>
                <li>
                  <code>&lt;nav&gt;</code>: Використовується для навігаційних посилань.
                </li>
                <li>
                  <code>&lt;a href="#home"&gt;Головна&lt;/a&gt;</code>: Тег для створення посилань. <code>href</code> вказує, куди веде посилання. Якщо починається з `#`, то це посилання на розділ всередині поточної сторінки (за ідентифікатором `id`).
                </li>
              </ul>
            </li>
            <li>
              <code>&lt;main&gt;</code>: Цей тег позначає основний, унікальний вміст документа. На сторінці має бути лише один тег <code>&lt;main&gt;</code>.
              <ul className="list-circle list-inside ml-4 mt-1">
                <li>
                  <code>&lt;h2 id="home"&gt;...&lt;/h2&gt;</code>: Заголовки другого рівня. Атрибут <code>id="home"</code> дозволяє створити "якір", на який можна перейти за посиланням (наприклад, з навігації).
                </li>
                <li>
                  <code>&lt;p&gt;...&lt;/p&gt;</code>: Тег для звичайних абзаців тексту.
                </li>
                <li>
                  <code>&lt;table&gt;</code>: Використовується для створення таблиць.
                  <ul className="list-circle list-inside ml-4 mt-1">
                    <li>
                      <code>&lt;thead&gt;</code>: Групує заголовки стовпців таблиці.
                    </li>
                    <li>
                      <code>&lt;tbody&gt;</code>: Групує основний вміст таблиці.
                    </li>
                    <li>
                      <code>&lt;tr&gt;</code>: Рядок таблиці (Table Row).
                    </li>
                    <li>
                      <code>&lt;th&gt;</code>: Заголовок комірки таблиці (Table Header).
                    </li>
                    <li>
                      <code>&lt;td&gt;</code>: Комірка даних таблиці (Table Data).
                    </li>
                  </ul>
                </li>
                <li>
                  <code>&lt;ul&gt;</code> та <code>&lt;li&gt;</code>: Теги для створення невпорядкованих списків (Unordered List) та елементів списку (List Item).
                </li>
                <li>
                  <code>&lt;div&gt;</code>: Це універсальний тег-контейнер, який використовується для групування інших елементів. Він не має власного візуального значення, але дуже корисний для застосування стилів CSS до групи елементів.
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