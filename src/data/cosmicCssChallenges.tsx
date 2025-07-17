import React from "react";

export interface CosmicCssChallengeData {
  id: string;
  title: string;
  description: string;
  initialCss: string;
  previewContent: React.ReactNode;
  hint: string;
  lessonLink?: string;
  lessonLinkText?: string;
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
      <p style={{ fontSize: '18px', color: '#b3ffff', padding: '10px', border: '1px dashed #4ecdc4', borderRadius: '5px' }}>
        Це приклад тексту бортового журналу. Він стане трохи більшим і світло-блакитним.
      </p>
    ),
    hint: "Використай селектор `p` та властивості `font-size` і `color`.",
    lessonLink: "/css-properties#css-font-size",
    lessonLinkText: "Урок про Розмір Шрифту",
  },
  {
    id: "challenge-img-style",
    title: "Рамки для Космічних Знімків",
    description: "Додай рамку (`border`) товщиною `3px`, стилем `solid` та кольором `#ff69b4` (рожевий) до всіх зображень (`img`). Заокругли кути на `15px`.",
    initialCss: `img {
  border: 3px solid #ff69b4; /* Рожева рамка */
  border-radius: 15px; /* Заокруглені кути */
}`,
    previewContent: (
      <div className="flex justify-center items-center p-4">
        <img
          src="https://picsum.photos/id/66/150/150"
          alt="Приклад зображення"
          style={{ border: '3px solid #ff69b4', borderRadius: '15px', maxWidth: '100%', height: 'auto' }}
          className="shadow-sm"
        />
      </div>
    ),
    hint: "Використай селектор `img` та властивості `border` і `border-radius`.",
    lessonLink: "/css-properties#css-border-radius",
    lessonLinkText: "Урок про Рамки та Заокруглення",
  },
  {
    id: "challenge-a-style",
    title: "Навігаційні Промені",
    description: "Прибери підкреслення (`text-decoration: none;`) та зміни колір для всіх посилань (`a`) на `#4ecdc4` (бірюзовий).",
    initialCss: `a {
  text-decoration: none; /* Прибирає підкреслення */
  color: #4ecdc4; /* Бірюзовий колір */
}`,
    previewContent: (
      <a href="#" style={{ textDecoration: 'none', color: '#4ecdc4', padding: '5px', border: '1px dotted #4ecdc4', borderRadius: '3px' }}>
        Посилання без підкреслення
      </a>
    ),
    hint: "Використай селектор `a` та властивості `text-decoration` і `color`.",
    lessonLink: "/css-properties#css-text-decoration",
    lessonLinkText: "Урок про Оформлення Тексту",
  },
  {
    id: "challenge-button-style",
    title: "Кнопка Запуску",
    description: "Зроби кнопки (`button`) яскравими та заокругленими. Встанови `background-color: #00ff88;` (неоновий зелений), `color: white;`, `padding: 10px 20px;` та `border-radius: 8px;`.",
    initialCss: `button {
  background-color: #00ff88; /* Неоновий зелений фон */
  color: white; /* Білий текст */
  padding: 10px 20px; /* Внутрішні відступи */
  border-radius: 8px; /* Заокруглені кути */
  border: none;
  cursor: pointer;
}`,
    previewContent: (
      <button style={{ backgroundColor: '#00ff88', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
        Запустити!
      </button>
    ),
    hint: "Використай селектор `button` та властивості `background-color`, `color`, `padding`, `border-radius`.",
    lessonLink: "/html-tags#html-button",
    lessonLinkText: "Урок про Кнопки",
  },
  {
    id: "challenge-div-section-style",
    title: "Модулі Космічної Бази",
    description: "Додай фон, рамку та внутрішні відступи до блоків (`div`, `section`). Спробуй `padding: 20px;`, `background-color: #1a1a3a;` та `border: 1px solid #4ecdc4;`.",
    initialCss: `div, section {
  padding: 20px; /* Внутрішній відступ */
  background-color: #1a1a3a; /* Темно-синій фон */
  border: 1px solid #4ecdc4; /* Бірюзова рамка */
  border-radius: 10px; /* Заокруглені кути */
}`,
    previewContent: (
      <div style={{ padding: '20px', backgroundColor: '#1a1a3a', border: '1px solid #4ecdc4', borderRadius: '10px', color: '#e0e0e0' }}>
        <p>Це модуль космічної бази. Він має темний фон та бірюзову рамку.</p>
      </div>
    ),
    hint: "Використай селектори `div, section` та властивості `padding`, `background-color`, `border`, `border-radius`.",
    lessonLink: "/html-tags#html-div",
    lessonLinkText: "Урок про Блоки",
  },
  {
    id: "challenge-header-footer-style",
    title: "Командний Місток та Техвідсік",
    description: "Додай фон та відступи для шапки (`header`) та підвалу (`footer`) сайту. Спробуй `background-color: #0a0a23;` та `padding: 15px;`.",
    initialCss: `header, footer {
  background-color: #0a0a23; /* Темний космічний фон */
  padding: 15px;
  text-align: center;
  color: #e0e0e0;
}`,
    previewContent: (
      <div style={{ backgroundColor: '#0a0a23', padding: '15px', textAlign: 'center', color: '#e0e0e0', borderRadius: '8px' }}>
        <p>Це командний місток або техвідсік твого сайту.</p>
      </div>
    ),
    hint: "Використай селектори `header, footer` та властивості `background-color`, `padding`, `text-align`, `color`.",
    lessonLink: "/html-tags#html-header",
    lessonLinkText: "Урок про Шапку та Підвал",
  },
];