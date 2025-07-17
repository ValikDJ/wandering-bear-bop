import React from "react";

export interface CosmicCssChallengeData {
  id: string;
  title: string;
  description: string;
  initialCss: string;
  previewContent: React.ReactNode;
  hint: string;
  lessonLink?: string; // Path to a relevant lesson page
  lessonLinkText?: string; // Text for the lesson link
}

export const cssChallenges: CosmicCssChallengeData[] = [
  {
    id: "challenge-body-style",
    title: "Космічний Фон Бази",
    description: "Зміни колір фону та тексту для всієї сторінки, щоб вона виглядала як космічний простір. Спробуй `background-color: #0a0a23;` та `color: #e0e0e0;`.",
    initialCss: `body {
  background-color: #0a0a23; /* Темний космічний фон */
  color: #e0e0e0; /* Світлий текст */
}`,
    previewContent: (
      <div
        style={{
          backgroundColor: '#0a0a23',
          color: '#e0e0e0',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
        className="min-h-[100px] flex items-center justify-center"
      >
        <p>Тут буде твій сайт з космічним фоном та світлим текстом.</p>
      </div>
    ),
    hint: "Використай селектор `body` та властивості `background-color` і `color`.",
    lessonLink: "/css-properties#css-background-color",
    lessonLinkText: "Урок про Колір Фону",
  },
  {
    id: "challenge-nav-style",
    title: "Навігаційні Зв'язки",
    description: "Зроби посилання в навігації (`header a`) схожими на кнопки космічного корабля: додай фон `#007bff` (синій), білий текст, внутрішні відступи `8px 15px`, заокруглені кути `5px` та прибери підкреслення.",
    initialCss: `header a {
  display: inline-block; /* Щоб можна було застосувати padding */
  background-color: #007bff; /* Синій фон */
  color: white; /* Білий текст */
  padding: 8px 15px; /* Внутрішні відступи */
  border-radius: 5px; /* Заокруглені кути */
  text-decoration: none; /* Прибрати підкреслення */
  margin: 0 5px; /* Невеликий зовнішній відступ між посиланнями */
}`,
    previewContent: (
      <div style={{ backgroundColor: '#0a0a23', padding: '10px', textAlign: 'center', borderRadius: '8px' }}>
        <a href="#" style={{ display: 'inline-block', backgroundColor: '#007bff', color: 'white', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', margin: '0 5px' }}>Головна</a>
        <a href="#" style={{ display: 'inline-block', backgroundColor: '#0a0a23', color: 'white', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', margin: '0 5px' }}>Про нас</a>
      </div>
    ),
    hint: "Використай селектор `header a` та властивості `background-color`, `color`, `padding`, `border-radius`, `text-decoration`.",
    lessonLink: "/html-tags#html-a",
    lessonLinkText: "Урок про Посилання",
  },
  {
    id: "challenge-h1-style",
    title: "Головний Заголовок Місії",
    description: "Зроби головний заголовок (`h1`) по центру та зміни його колір на яскравий, наприклад, `#00ff88` (неоновий зелений).",
    initialCss: `h1 {
  text-align: center; /* Вирівнювання по центру */
  color: #00ff88; /* Неоновий зелений колір */
}`,
    previewContent: (
      <h1 style={{ textAlign: 'center', color: '#00ff88', fontSize: '2em' }} className="p-2">
        Мій Космічний Заголовок
      </h1>
    ),
    hint: "Використай селектор `h1` та властивості `text-align` і `color`.",
    lessonLink: "/css-properties#css-text-align",
    lessonLinkText: "Урок про Вирівнювання Тексту",
  },
  {
    id: "challenge-p-style",
    title: "Текст Бортового Журналу",
    description: "Зміни розмір шрифту для всіх абзаців (`p`) на `18px` та колір на `#b3ffff` (світло-блакитний).",
    initialCss: `p {
  font-size: 18px; /* Розмір шрифту */
  color: #b3ffff; /* Світло-блакитний колір */
}`,
    previewContent: (
      <p style={{
        fontSize: '18px',
        color: '#b3ffff',
        padding: '10px',
        borderWidth: '1px',
        borderStyle: 'dashed',
        borderColor: '#4ecdc4',
        borderRadius: '5px'
      }}>
        Це приклад тексту бортового журналу. Він стане трохи більшим і світло-блакитним.
      </p>
    ),
    hint: "Використай селектор `p` та властивості `font-size` і `color`.",
    lessonLink: "/css-properties#css-font-size",
    lessonLinkText: "Урок про Розмір Шрифту",
  },
  {
    id: "challenge-4",
    title: "Місія 4: Заокруглені Ілюмінатори",
    description: "Зроби ілюмінатори твого космічного корабля (зображення) круглими. Використай властивість `border-radius` зі значенням `50%`.",
    previewContent: (
      <img
        src="https://picsum.photos/id/66/100/100"
        alt="Ілюмінатор"
        style={{ borderWidth: '3px', borderStyle: 'solid', borderColor: '#ff69b4', borderRadius: '50%' }}
      />
    ),
    initialCss: `img {
  border: 3px solid #ff69b4;
  border-radius: 50%; /* Зробити круглим */
}`,
    hint: "Пам'ятай про `border-radius`.",
    lessonLink: "/css-properties#css-border-radius",
    lessonLinkText: "Урок про Заокруглення Кутів",
  },
  {
    id: "challenge-5",
    title: "Місія 5: Космічна Кнопка",
    description: "Створи кнопку для запуску ракети! Додай тег `<button>` з текстом 'Запустити Ракету!' та зроби її фон яскраво-зеленим (`#4CAF50`) та текст білим.",
    previewContent: (
      <button style={{ backgroundColor: '#00ff88', color: 'white', padding: '10px 20px', borderRadius: '8px', borderWidth: '0', borderStyle: 'none', cursor: 'pointer' }}>
        Запустити!
      </button>
    ),
    initialCss: `button {
  background-color: #4CAF50; /* Яскраво-зелений фон */
  color: white; /* Білий текст */
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
    previewContent: (
      <h2 style={{ textAlign: 'center', color: '#b3ffff', fontSize: '1.5em' }}>
        Мій Супутник
      </h2>
    ),
    initialCss: `h2 {
  text-align: center; /* Вирівнювання по центру */
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
    previewContent: (
      <div style={{ padding: '20px', backgroundColor: '#1a1a3a', borderWidth: '1px', borderStyle: 'solid', borderColor: '#4ecdc4', borderRadius: '10px', color: '#e0e0e0' }}>
        <p>Це модуль космічної бази. Він має темний фон та бірюзову рамку.</p>
      </div>
    ),
    initialCss: `.planet-info {
  padding: 20px; /* Внутрішній відступ */
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
    previewContent: (
      <>
        <div style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#b3ffff', backgroundColor: '#1f1f3f', color: '#e0e0e0', padding: '10px', marginBottom: '15px', borderRadius: '8px' }}>Астероїд Альфа</div>
        <div style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: '#b3ffff', backgroundColor: '#1f1f3f', color: '#e0e0e0', padding: '10px', borderRadius: '8px' }}>Астероїд Бета</div>
      </>
    ),
    initialCss: `.asteroid {
  margin-bottom: 15px; /* Зовнішній відступ знизу */
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
    previewContent: (
      <div style={{ width: '150px', height: '80px', backgroundColor: '#ff69b4', borderWidth: '2px', borderStyle: 'solid', borderColor: '#b3ffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', opacity: 0.7, borderRadius: '8px' }}>
        Захисний Щит
      </div>
    ),
    initialCss: `.shield {
  opacity: 0.7; /* Напівпрозорий */
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
    previewContent: (
      <div className="flex justify-center items-center p-4">
        <img
          src="https://picsum.photos/id/200/150/100"
          alt="Космічний об'єкт 1"
          style={{ width: '150px', height: '100px', objectFit: 'cover', margin: '5px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#b3ffff', borderRadius: '8px' }}
        />
        <img
          src="https://picsum.photos/id/201/150/100"
          alt="Космічний об'єкт 2"
          style={{ width: '150px', height: '100px', objectFit: 'cover', margin: '5px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#b3ffff', borderRadius: '8px' }}
        />
        <img
          src="https://picsum.photos/id/202/150/100"
          alt="Космічний об'єкт 3"
          style={{ width: '150px', height: '100px', objectFit: 'cover', margin: '5px', borderWidth: '2px', borderStyle: 'solid', borderColor: '#b3ffff', borderRadius: '8px' }}
        />
      </div>
    ),
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
  {
    id: "challenge-11-flexbox",
    title: "Місія 11: Космічний Флекс-Ряд",
    description: "Вирівняй три космічні об'єкти в один ряд по центру контейнера. Використай властивості Flexbox: `display: flex; justify-content: center; align-items: center;` для батьківського елемента.",
    initialCss: `.flex-container {
  display: flex; /* Увімкнути Flexbox */
  justify-content: center; /* Вирівняти по горизонталі по центру */
  align-items: center; /* Вирівняти по вертикалі по центру */
  gap: 10px; /* Відступ між елементами */
  border: 2px dashed #4ecdc4;
  padding: 15px;
  min-height: 120px;
  background-color: #1a1a3a;
}`,
    previewContent: (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', border: '2px dashed #4ecdc4', padding: '15px', minHeight: '120px', backgroundColor: '#1a1a3a', borderRadius: '8px' }}>
        <div style={{ width: '30px', height: '30px', backgroundColor: '#ff69b4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8em' }}>1</div>
        <div style={{ width: '30px', height: '30px', backgroundColor: '#b3ffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontSize: '0.8em' }}>2</div>
        <div style={{ width: '30px', height: '30px', backgroundColor: '#00ff88', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontSize: '0.8em' }}>3</div>
      </div>
    ),
    hint: "Застосуй `display: flex;` до батьківського елемента, а потім `justify-content` та `align-items`.",
    lessonLink: "/css-properties", // Можливо, створити окремий урок про Flexbox
    lessonLinkText: "Урок про CSS Властивості (Flexbox)",
  },
  {
    id: "challenge-12-box-shadow",
    title: "Місія 12: Тінь Космічного Модуля",
    description: "Додай сяючу тінь до модуля космічної станції (`.module`). Використай `box-shadow: 0 0 15px rgba(0, 255, 136, 0.7);` для неонового зеленого світіння.",
    initialCss: `.module {
  width: 180px;
  height: 100px;
  background-color: #2a2a4a;
  border: 1px solid #b3ffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e0e0e0;
  font-weight: bold;
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.7); /* Неонова зелена тінь */
}`,
    previewContent: (
      <div style={{ width: '180px', height: '100px', backgroundColor: '#2a2a4a', border: '1px solid #b3ffff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e0e0e0', fontWeight: 'bold', boxShadow: '0 0 15px rgba(0, 255, 136, 0.7)' }}>
        Модуль Станції
      </div>
    ),
    hint: "Властивість `box-shadow` приймає значення: зміщення по X, зміщення по Y, розмиття, розтягнення, колір.",
    lessonLink: "/css-properties",
    lessonLinkText: "Урок про CSS Властивості",
  },
  {
    id: "challenge-13-text-shadow",
    title: "Місія 13: Сяючий Текст",
    description: "Зроби текст заголовка (`.glowing-text`) сяючим, додавши тінь до тексту. Спробуй `text-shadow: 0 0 8px #b3ffff, 0 0 15px #b3ffff;` для неонового синього світіння.",
    initialCss: `.glowing-text {
  font-size: 2.5em;
  font-weight: bold;
  color: #b3ffff; /* Основний колір тексту */
  text-shadow: 0 0 8px #b3ffff, 0 0 15px #b3ffff; /* Сяюча тінь */
}`,
    previewContent: (
      <h2 style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#b3ffff', textShadow: '0 0 8px #b3ffff, 0 0 15px #b3ffff', textAlign: 'center' }}>
        Сяючий Заголовок
      </h2>
    ),
    hint: "Властивість `text-shadow` схожа на `box-shadow`, але для тексту.",
    lessonLink: "/css-properties",
    lessonLinkText: "Урок про CSS Властивості",
  },
];