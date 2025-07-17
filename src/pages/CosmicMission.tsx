import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Rocket, Code, Palette, CheckSquare, HelpCircle, Star, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"; // For details/summary like behavior

const htmlTemplate = `<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Твоя Космічна База</title>
    <link rel="stylesheet" href="style.css"> <!-- Підключаємо файл стилів -->
</head>
<body>
    <header>
        <h1>🚀 Назва Твоєї Космічної Місії</h1>
        <nav>
            <a href="#mission-brief">Про Місію</a>
            <a href="#crew-members">Екіпаж</a>
            <a href="#galaxy-map">Карта Галактики</a>
        </nav>
    </header>

    <main>
        <section id="mission-brief">
            <h2>Місія: Будуємо Новий Світ</h2>
            <p>Тут ти розповіси про свою космічну місію. Що ти досліджуєш? Які твої цілі? Додай цікаві факти!</p>
            <img src="https://picsum.photos/id/1080/400/250" alt="Космічний корабель" style="width: 100%; max-width: 400px; height: auto; display: block; margin: 15px auto;">
        </section>

        <section id="crew-members">
            <h2>Наш Відважний Екіпаж</h2>
            <p>Опиши членів свого екіпажу або важливих персонажів. Хто вони? Які їхні ролі?</p>
            <ul>
                <li>Капітан Зоряний Пил</li>
                <li>Інженер Механік</li>
                <li>Навігатор Комета</li>
            </ul>
        </section>

        <section id="galaxy-map">
            <h2>Карта Галактики</h2>
            <p>Покажи найцікавіші місця у твоїй галактиці. Можливо, це таблиця з координатами планет?</p>
            <table>
                <thead>
                    <tr>
                        <th>Планета</th>
                        <th>Система</th>
                        <th>Особливості</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Зелена Оаза</td>
                        <td>Андромеда</td>
                        <td>Багато рослинності</td>
                    </tr>
                    <tr>
                        <td>Крижаний Гігант</td>
                        <td>Оріон</td>
                        <td>Діамантові гори</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Твоя Космічна Корпорація. Всі права на зірки захищені.</p>
    </footer>
</body>
</html>`;

const cssTemplate = `/* style.css - Твої віртуальні пензлі! */

body {
    font-family: 'Arial', sans-serif;
    background-color: #1a1a2e; /* Темний космічний фон */
    color: #e0e0e0; /* Світлий текст для зірок */
    margin: 0;
    padding: 20px;
}

header {
    background-color: #2a2a4a; /* Темніша панель управління */
    color: #b3ffff; /* Неоновий синій для заголовків */
    padding: 15px 20px;
    text-align: center;
    border-bottom: 2px solid #8a2be2; /* Фіолетова лінія горизонту */
}

header h1 {
    margin: 0;
    font-size: 2.5em;
    text-shadow: 0 0 10px #b3ffff; /* Неонове світіння */
}

nav a {
    color: #b3ffff; /* Неонові посилання */
    text-decoration: none;
    margin: 0 15px;
    font-weight: bold;
    transition: color 0.3s ease;
}

nav a:hover {
    color: #ff69b4; /* Рожеве світіння при наведенні */
}

main {
    max-width: 900px;
    margin: 20px auto;
    background-color: #1f1f3f; /* Фон для секцій */
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #8a2be2; /* Фіолетова рамка */
    border-radius: 8px;
    background-color: #252545; /* Трохи світліший фон секції */
}

section h2 {
    color: #ff69b4; /* Неоновий рожевий для підзаголовків */
    border-bottom: 1px dashed #8a2be2;
    padding-bottom: 10px;
    margin-top: 0;
}

p {
    line-height: 1.6;
}

ul {
    list-style-type: disc;
    margin-left: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #8a2be2;
    padding: 10px;
    text-align: left;
}

th {
    background-color: #3a3a5a;
    color: #b3ffff;
}

footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #a0a0a0;
    border-top: 1px solid #3a3a5a;
}
`;

const CosmicMission: React.FC = () => {
  useScrollToHash();

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlTemplate);
    toast.success("HTML-код скопійовано! 📋");
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(cssTemplate);
    toast.success("CSS-код скопійовано! 🎨");
  };

  const handlePublicationInstructions = () => {
    // Placeholder for actual publication instructions link
    toast.info("Інструкції з публікації будуть тут! 🚀");
    // In a real app, you might link to a specific page or external resource:
    // window.open("https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site", "_blank");
  };

  return (
    <div className="py-8">
      <h1 className="text-5xl font-extrabold text-center mb-6 text-foreground">
        🚀 Космічна Місія: Будуємо та Прикрашаємо Твій Сайт!
      </h1>
      <p className="text-xl text-center mb-10 max-w-3xl mx-auto text-muted-foreground">
        Вітаю, юний Космічний Архітекторе! Сьогодні твоя місія — створити власну веб-сторінку, яка стане твоєю особистою космічною базою в Інтернеті. Ми пройдемо три важливі етапи: будівництво каркасу (HTML), прикрашання (CSS) та запуск у космос (публікація)!
      </p>

      {/* Етап 1: Структура HTML */}
      <Card className="mb-12 bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Code className="h-8 w-8 text-primary" />
            Етап 1: Будуємо Каркас (HTML)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Уяви, що HTML — це креслення твоєї космічної бази. Він визначає, де будуть стіни, двері, вікна. Без нього твоя база буде просто купою розкиданих матеріалів! Ми використаємо спеціальні "будівельні блоки" — теги, щоб створити міцний скелет.
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
            <li><code>&lt;header&gt;</code>: Це командний місток твоєї бази — тут буде назва та навігація.</li>
            <li><code>&lt;main&gt;</code>: Основний відсік, де зберігається найважливіша інформація про твою місію.</li>
            <li><code>&lt;section&gt;</code>: Окремі кімнати або зони всередині основного відсіку (наприклад, "Ангар", "Лабораторія").</li>
            <li><code>&lt;h2&gt;</code>: Заголовки для кожної кімнати, щоб було зрозуміло, що там знаходиться.</li>
            <li><code>&lt;footer&gt;</code>: Підвал бази — тут можна вказати інформацію про розробника або авторські права.</li>
          </ul>

          <div className="relative mb-6">
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Твій HTML-креслення:</h4>
            <SyntaxHighlighter language="html" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', maxHeight: '500px', overflowY: 'auto' }}>
              {htmlTemplate}
            </SyntaxHighlighter>
            <Button
              onClick={handleCopyHtml}
              className="absolute top-4 right-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 no-print"
              size="sm"
            >
              <Copy className="mr-2 h-4 w-4" /> Копіювати HTML
            </Button>
          </div>

          <Collapsible className="mt-6">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between text-lg font-semibold text-secondary-foreground hover:bg-secondary/80 no-print">
                🤔 Навіщо так складно? (Натисни, щоб дізнатися)
                <ChevronDown className="h-5 w-5 transition-transform data-[state=open]:rotate-180 chevron-icon" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden collapsible-content">
              <div className="p-4 border border-border rounded-b-md bg-muted mt-2 text-muted-foreground">
                <p className="mb-2">
                  Використання тегів на кшталт `&lt;header&gt;`, `&lt;main&gt;`, `&lt;footer&gt;` та `&lt;section&gt;` робить твій код не просто набором символів, а осмисленою структурою! Це називається **семантичною розміткою**.
                </p>
                <ul className="list-disc list-inside">
                  <li>**Для людей:** Твій код легше читати та розуміти іншим розробникам (і тобі самому через місяць!).</li>
                  <li>**Для пошукових систем:** Google та інші пошуковики краще розуміють, про що твій сайт, і можуть показувати його вище в результатах пошуку.</li>
                  <li>**Для доступності:** Програми для людей з обмеженими можливостями (наприклад, для читання екрану) краще орієнтуються на сайті, якщо він має чітку структуру.</li>
                </ul>
                <p className="mt-2">
                  Тож, це не просто "складно", це "розумно" і "професійно"!
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Етап 2: Дизайн з CSS */}
      <Card className="mb-12 bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Palette className="h-8 w-8 text-primary" />
            Етап 2: Прикрашаємо Базу (CSS)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Тепер, коли каркас твоєї космічної бази готовий, час додати кольори, світло та текстури! CSS — це твої віртуальні пензлі та інструменти дизайнера. Він дозволяє змінити вигляд будь-якого елемента на сторінці.
          </p>
          <p className="mb-4 text-muted-foreground">
            Щоб твій сайт побачив ці стилі, потрібно підключити CSS-файл до HTML. Додай цей рядок у розділ `&lt;head&gt;` твого HTML-файлу (він вже є у шаблоні):
          </p>
          <SyntaxHighlighter language="html" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', marginBottom: '20px' }}>
            {`<link rel="stylesheet" href="style.css">`}
          </SyntaxHighlighter>
          <p className="mb-4 text-muted-foreground">
            А ось базові стилі, які ти можеш скопіювати у файл `style.css` (створи його поруч з `index.html`):
          </p>
          <div className="relative mb-6">
            <h4 className="font-semibold mb-2 text-lg text-secondary-foreground">Твої CSS-пензлі:</h4>
            <SyntaxHighlighter language="css" style={atomDark} customStyle={{ borderRadius: '8px', padding: '16px', fontSize: '0.9em', maxHeight: '500px', overflowY: 'auto' }}>
              {cssTemplate}
            </SyntaxHighlighter>
            <Button
              onClick={handleCopyCss}
              className="absolute top-4 right-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 no-print"
              size="sm"
            >
              <Copy className="mr-2 h-4 w-4" /> Копіювати CSS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Етап 3: Публікація */}
      <Card className="mb-12 bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Rocket className="h-8 w-8 text-primary" />
            Етап 3: Запускаємо в Космос! (Публікація)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Твоя космічна база готова до запуску! Щоб її побачив весь світ, ми використаємо технологію GitHub Pages. Це як твій особистий космодром, звідки твій сайт полетить у безмежний Інтернет!
          </p>
          <p className="mb-6 text-muted-foreground">
            Для цього тобі потрібно буде завантажити файли `index.html` та `style.css` на GitHub.
          </p>
          <div className="text-center mb-6">
            <Button
              onClick={handlePublicationInstructions}
              className="bg-brand-primary text-primary-foreground hover:bg-brand-primary-hover text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 no-print"
            >
              ➡️ ІНСТРУКЦІЯ З ПУБЛІКАЦІЇ ⬅️
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Чек-ліст */}
      <Card className="mb-12 bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
            <CheckSquare className="h-8 w-8 text-primary" />
            Чек-ліст Космічного Архітектора
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Перевір, чи все готово до запуску! Познач виконані завдання:
          </p>
          <ul className="list-none space-y-3 text-muted-foreground">
            <li>[ ] Я створив файл `index.html` та скопіював туди HTML-креслення.</li>
            <li>[ ] Я замінив "Назва Твоєї Космічної Місії" на свою назву.</li>
            <li>[ ] Я замінив посилання в навігації (`&lt;nav&gt;`) на свої розділи.</li>
            <li>[ ] Я замінив заголовки (`&lt;h2&gt;`) та текст (`&lt;p&gt;`) у кожній `&lt;section&gt;` на свою інформацію.</li>
            <li>[ ] Я додав хоча б одну картинку (`&lt;img&gt;`) з атрибутами `src` та `alt`.</li>
            <li>[ ] Я створив файл `style.css` поруч з `index.html` та скопіював туди CSS-пензлі.</li>
            <li>[ ] Я змінив кольори або інші стилі в `style.css` на свій смак.</li>
            <li>[ ] Я перевірив, чи всі посилання та картинки працюють.</li>
            <li>[ ] Я завантажив `index.html` та `style.css` на GitHub Pages.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Секція допомоги */}
      <Card className="mb-12 bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-destructive" />
            Застряг у Космосі?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Не хвилюйся, навіть досвідчені космонавти іноді потребують допомоги! Якщо щось пішло не так:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>**Перевір свій код:** Уважно переглянь HTML та CSS на наявність помилок (забуті `&lt;/div&gt;`, неправильні назви властивостей).</li>
            <li>**Запитай сусіда:** Можливо, твій товариш по місії вже стикався з такою проблемою.</li>
            <li>**Поклич вчителя:** Твій командир завжди готовий допомогти тобі повернутися на правильний курс!</li>
            <li>**Використай Словник Термінів:** <Link to="/glossary" className="text-brand-primary hover:underline">Швидко знайди значення незрозумілих слів</Link>.</li>
            <li>**Переглянь Приклади:** <Link to="/examples" className="text-brand-primary hover:underline">Подивись, як працюють інші приклади</Link>.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Що далі? */}
      <Card className="mb-12 bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Star className="h-8 w-8 text-yellow-500" />
            Що Далі? Нові Галактики Чекають!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Вітаю, ти успішно завершив свою першу космічну місію! Твій сайт тепер у космосі!
          </p>
          <p className="text-lg font-semibold text-brand-primary">
            Наступного разу ми навчимося робити твою космічну базу ще більш інтерактивною та динамічною за допомогою JavaScript — мови, яка оживляє веб-сторінки! Готуйся до нових пригод!
          </p>
        </CardContent>
      </Card>

      <LessonNavigation />
    </div>
  );
};

export default CosmicMission;