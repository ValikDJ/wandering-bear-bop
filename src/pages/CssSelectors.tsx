import React from "react";
import LessonCard from "@/components/LessonCard";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash"; // Import the new hook

const CssSelectors: React.FC = () => {
  useScrollToHash(); // Use the hook here

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">CSS Селектори: Вибираємо Елементи</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        CSS селектори - це як адреси, за якими ми знаходимо потрібні елементи на веб-сторінці, щоб їх стилізувати.
      </p>

      <div className="space-y-8">
        <LessonCard
          id="css-selector-tag" // Added ID
          title="Селектор за Тегом"
          description="Вибирає всі елементи певного HTML-тегу. Наприклад, `p` вибере всі абзаци."
          codeExample={`p {
  color: purple;
}`}
          language="css"
          result={
            <>
              <p style={{ color: 'purple' }}>Цей абзац стане фіолетовим.</p>
              <p style={{ color: 'purple' }}>І цей теж!</p>
            </>
          }
        />

        <LessonCard
          id="css-selector-class" // Added ID
          title="Селектор за Класом"
          description="Вибирає елементи, які мають певний клас. Клас починається з крапки (`.`). Один елемент може мати багато класів."
          codeExample={`.highlight {
  background-color: yellow;
  padding: 5px;
}

<p class="highlight">Цей текст буде виділено.</p>
<span>А цей ні.</span>`}
          language="css"
          result={
            <>
              <p className="bg-yellow-200 p-1 rounded-sm">Цей текст буде виділено.</p>
              <span>А цей ні.</span>
            </>
          }
        />

        <LessonCard
          id="css-selector-contextual" // Added ID
          title="Контекстні Селектори (Нащадки)"
          description="Вибирає елементи, які є нащадками іншого елемента. Наприклад, `div p` вибере всі абзаци, які знаходяться всередині тегу `div`."
          codeExample={`div p {
  border: 1px solid blue;
  padding: 5px;
}

<div>
  <p>Цей абзац матиме рамку.</p>
</div>
<p>А цей абзац - ні.</p>`}
          language="css"
          result={
            <>
              <div className="border border-blue-300 p-2 rounded-md">
                <p className="border border-blue-500 p-1">Цей абзац матиме рамку.</p>
              </div>
              <p>А цей абзац - ні.</p>
            </>
          }
        />

        <LessonCard
          id="css-selector-cascading" // Added ID
          title="Каскадність Стилів"
          description="Каскадність означає, що якщо до одного елемента застосовуються різні стилі, то браузер вирішує, який з них застосувати, за певними правилами: важливість, специфічність, порядок. Стилі, які йдуть пізніше, зазвичай перекривають попередні."
          codeExample={`/* style.css */
p {
  color: red;
}

/* later in style.css or another file */
p {
  color: green; /* Цей стиль переможе */
}

<p>Якого кольору буде цей текст?</p>`}
          language="css"
          result={
            <p style={{ color: 'green' }}>Якого кольору буде цей текст? (Зеленого!)</p>
          }
        />
      </div>
      <LessonNavigation />
    </div>
  );
};

export default CssSelectors;