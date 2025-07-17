export interface CosmicChallenge {
  id: string;
  title: string;
  description: string;
  initialHtml: string;
  initialCss: string;
  hint?: string;
  lessonLink?: string; // Path to a relevant lesson page
  lessonLinkText?: string; // Text for the lesson link
}

export const cosmicChallenges: CosmicChallenge[] = [
  {
    id: "challenge-1",
    title: "Місія 1: Привітання Космосу!",
    description: "Твоя перша місія: створи заголовок, який привітає всіх у космосі! Використай тег `<h1>` та напиши 'Привіт, Космос!'.",
    initialHtml: ``,
    initialCss: `h1 {
  color: #b3ffff; /* Неоновий синій */
  text-align: center;
}`,
    hint: "Пам'ятай, що теги заголовків починаються з `h` і мають цифру.",
    lessonLink: "/html-tags#html-h1-h2-h3",
    lessonLinkText: "Урок про Заголовки",
  },
  {
    id: "challenge-2",
    title: "Місія 2: Космічний Параграф",
    description: "Додай під заголовком абзац тексту, який розповість про твою космічну подорож. Використай тег `<p>` та напиши 'Я подорожую крізь зірки!'.",
    initialHtml: `<h1>Привіт, Космос!</h1>`,
    initialCss: `h1 {
  color: #b3ffff;
  text-align: center;
}
p {
  color: #e0e0e0;
  font-size: 18px;
  text-align: center;
}`,
    hint: "Тег для абзацу - це `<p>`. Не забудь закрити його!",
    lessonLink: "/html-tags#html-p",
    lessonLinkText: "Урок про Параграфи",
  },
  {
    id: "challenge-3",
    title: "Місія 3: Колір Космічного Корабля",
    description: "Зміни колір фону твого космічного корабля (блоку `div`) на яскравий космічний відтінок, наприклад, `#8a2be2` (фіолетовий).",
    initialHtml: `<div class="spaceship">Мій космічний корабель</div>`,
    initialCss: `.spaceship {
  width: 200px;
  height: 100px;
  border: 2px solid #b3ffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e0e0e0;
  font-weight: bold;
  font-size: 1.2em;
}`,
    hint: "Використай властивість `background-color`.",
    lessonLink: "/css-properties#css-background-color",
    lessonLinkText: "Урок про Колір Фону",
  },
  {
    id: "challenge-4",
    title: "Місія 4: Заокруглені Ілюмінатори",
    description: "Зроби ілюмінатори твого космічного корабля (зображення) круглими. Використай властивість `border-radius` зі значенням `50%`.",
    initialHtml: `<img src="https://picsum.photos/id/66/100/100" alt="Ілюмінатор" class="illuminator">`,
    initialCss: `.illuminator {
  border: 3px solid #ff69b4;
}`,
    hint: "Пам'ятай про `border-radius`.",
    lessonLink: "/css-properties#css-border-radius",
    lessonLinkText: "Урок про Заокруглення Кутів",
  },
  {
    id: "challenge-5",
    title: "Місія 5: Космічна Кнопка",
    description: "Створи кнопку для запуску ракети! Додай тег `<button>` з текстом 'Запустити Ракету!' та зроби її фон яскраво-зеленим (`#4CAF50`) та текст білим.",
    initialHtml: ``,
    initialCss: `button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}`,
    hint: "Використай `background-color` та `color` для кнопки.",
    lessonLink: "/html-tags#html-button",
    lessonLinkText: "Урок про Кнопки",
  },
  {
    id: "challenge-6",
    title: "Місія 6: Вирівнювання Супутника",
    description: "Вирівняй текст 'Мій Супутник' по центру. Використай тег `<h2>` та властивість `text-align`.",
    initialHtml: `<h2>Мій Супутник</h2>`,
    initialCss: `h2 {
  color: #b3ffff;
}`,
    hint: "Яке значення `text-align` вирівнює по центру?",
    lessonLink: "/css-properties#css-text-align",
    lessonLinkText: "Урок про Вирівнювання Тексту",
  },
  {
    id: "challenge-7",
    title: "Місія 7: Відступи для Планет",
    description: "Додай внутрішні відступи (padding) до блоку з інформацією про планету, щоб текст не 'прилипав' до країв. Встанови `padding: 20px;`.",
    initialHtml: `<div class="planet-info">
  <h3>Планета Xylo</h3>
  <p>Ця планета відома своїми кришталевими горами.</p>
</div>`,
    initialCss: `.planet-info {
  border: 1px solid #ff69b4;
  background-color: #2a2a4a;
  color: #e0e0e0;
}`,
    hint: "Пам'ятай, `padding` - це внутрішній відступ.",
    lessonLink: "/css-properties#css-padding",
    lessonLinkText: "Урок про Внутрішні Відступи",
  },
  {
    id: "challenge-8",
    title: "Місія 8: Зовнішні Відступи між Астероїдами",
    description: "Додай зовнішні відступи (margin) між двома блоками 'Астероїд', щоб вони не злипалися. Встанови `margin-bottom: 15px;` для першого астероїда.",
    initialHtml: `<div class="asteroid">Астероїд Альфа</div>
<div class="asteroid">Астероїд Бета</div>`,
    initialCss: `.asteroid {
  border: 1px solid #b3ffff;
  background-color: #1f1f3f;
  color: #e0e0e0;
  padding: 10px;
}`,
    hint: "Яка властивість створює простір *навколо* елемента?",
    lessonLink: "/css-properties#css-margin",
    lessonLinkText: "Урок про Зовнішні Відступи",
  },
  {
    id: "challenge-9",
    title: "Місія 9: Прозорий Щит",
    description: "Зроби захисний щит (блок `div`) напівпрозорим. Використай властивість `opacity` зі значенням `0.7`.",
    initialHtml: `<div class="shield">Захисний Щит</div>`,
    initialCss: `.shield {
  width: 150px;
  height: 80px;
  background-color: #ff69b4;
  border: 2px solid #b3ffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}`,
    hint: "Значення `opacity` від 0 до 1.",
    lessonLink: "/css-properties#css-opacity",
    lessonLinkText: "Урок про Прозорість",
  },
  {
    id: "challenge-10",
    title: "Місія 10: Космічна Галерея",
    description: "Додай три зображення космічних об'єктів. Використай тег `<img>` для кожного. Знайди картинки в інтернеті (наприклад, на Unsplash.com) і встав їх URL в атрибут `src`.",
    initialHtml: ``,
    initialCss: `img {
  width: 150px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
  border: 2px solid #b3ffff;
  border-radius: 8px;
}`,
    hint: "Не забудь про атрибут `alt` для опису зображення!",
    lessonLink: "/html-tags#html-img",
    lessonLinkText: "Урок про Зображення",
  },
];