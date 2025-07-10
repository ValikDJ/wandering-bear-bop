import React from "react";
import LessonCard from "@/components/LessonCard";
import LiveCodeEditor from "@/components/LiveCodeEditor"; // Import the new component

const Examples: React.FC = () => {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Практичні Приклади: Створюємо Разом!</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        Час застосувати свої знання на практиці! Спробуй зрозуміти, як працюють ці приклади, і уяви, як ти можеш їх змінити.
      </p>

      <div className="space-y-8">
        {/* New Live Code Editor Section */}
        <LiveCodeEditor
          title="Твій власний редактор коду!"
          description="Спробуй змінити текст, додати нові теги або змінити кольори. Експериментуй!"
          initialHtml={`<h1>Привіт, Веб-Майстер!</h1>
<p>Це твій перший інтерактивний код.</p>
<button>Натисни мене</button>`}
          initialCss={`h1 {
  color: #4CAF50; /* Зелений */
  text-align: center;
}
p {
  font-family: 'Comic Sans MS', cursive;
  font-size: 18px;
}
button {
  background-color: #008CBA; /* Синій */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}`}
        />

        <h2 className="text-3xl font-bold text-center mt-12 mb-8 text-primary">Приклади Стилів Популярних Сайтів</h2>
        <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
          Подивись, як виглядають типові елементи на відомих сайтах, і спробуй відтворити їх!
        </p>

        <LessonCard
          title="Проста Навігаційна Панель (як на блозі)"
          description="Типова навігаційна панель з посиланнями, яка часто зустрічається на блогах або новинних сайтах."
          codeExample={`<nav class="blog-nav">
  <a href="#" class="nav-link">Головна</a>
  <a href="#" class="nav-link">Статті</a>
  <a href="#" class="nav-link">Контакти</a>
</nav>

/* CSS */
.blog-nav {
  background-color: #f8f8f8;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 20px;
  justify-content: center;
}
.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 0;
  transition: color 0.3s ease;
}
.nav-link:hover {
  color: #007bff;
}`}
          language="html"
          result={
            <nav className="bg-gray-50 p-4 border-b border-gray-200 flex gap-5 justify-center rounded-md">
              <a href="#" className="text-gray-700 no-underline font-bold hover:text-blue-600 transition-colors">Головна</a>
              <a href="#" className="text-gray-700 no-underline font-bold hover:text-blue-600 transition-colors">Статті</a>
              <a href="#" className="text-gray-700 no-underline font-bold hover:text-blue-600 transition-colors">Контакти</a>
            </nav>
          }
        />

        <LessonCard
          title="Картка Продукту (як на інтернет-магазині)"
          description="Приклад картки товару з зображенням, назвою, ціною та кнопкою 'Додати в кошик'."
          codeExample={`<div class="product-card">
  <img src="https://via.placeholder.com/150/FFD700/000000?text=Товар" alt="Товар" class="product-image">
  <h3 class="product-title">Крутий Гаджет</h3>
  <p class="product-price">299 грн</p>
  <button class="add-to-cart-btn">Додати в кошик</button>
</div>

/* CSS */
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  max-width: 200px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.product-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
}
.product-title {
  font-size: 1.2em;
  margin-bottom: 5px;
  color: #333;
}
.product-price {
  font-size: 1.1em;
  color: #e44d26;
  font-weight: bold;
  margin-bottom: 15px;
}
.add-to-cart-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
}
.add-to-cart-btn:hover {
  background-color: #45a049;
}`}
          language="html"
          result={
            <div className="border border-gray-300 rounded-lg p-4 text-center max-w-xs shadow-md bg-white">
              <img src="https://via.placeholder.com/150/FFD700/000000?text=Товар" alt="Товар" className="w-full h-auto rounded-md mb-3" />
              <h3 className="text-lg font-semibold mb-1 text-gray-800">Крутий Гаджет</h3>
              <p className="text-orange-600 font-bold mb-4">299 грн</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors text-sm">Додати в кошик</button>
            </div>
          }
        />

        <LessonCard
          title="Секція 'Герой' (як на головній сторінці)"
          description="Велика секція з привабливим заголовком та кнопкою дії, що часто використовується на головних сторінках сайтів."
          codeExample={`<div class="hero-section">
  <h1>Ласкаво просимо до нашого сайту!</h1>
  <p>Дізнайтеся більше про наші послуги.</p>
  <button class="hero-button">Почати зараз</button>
</div>

/* CSS */
.hero-section {
  background-color: #6a11cb; /* Градієнтний фон */
  background-image: linear-gradient(to right, #2575fc, #6a11cb);
  color: white;
  text-align: center;
  padding: 80px 20px;
  border-radius: 10px;
}
.hero-section h1 {
  font-size: 2.5em;
  margin-bottom: 15px;
}
.hero-section p {
  font-size: 1.2em;
  margin-bottom: 30px;
}
.hero-button {
  background-color: #ffc107;
  color: #333;
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.hero-button:hover {
  background-color: #e0a800;
}`}
          language="html"
          result={
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center p-16 rounded-lg">
              <h1 className="text-4xl font-bold mb-4">Ласкаво просимо до нашого сайту!</h1>
              <p className="text-xl mb-8">Дізнайтеся більше про наші послуги.</p>
              <button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-md font-bold cursor-pointer hover:bg-yellow-500 transition-colors">Почати зараз</button>
            </div>
          }
        />

        {/* Existing Lesson Cards */}
        <LessonCard
          title="Як зробити заголовок червоним?"
          description="Використаємо тег <h1> та CSS властивість `color`."
          codeExample={`<h1 style="color: red;">Привіт, червоний заголовок!</h1>`}
          language="html"
          result={<h1 style={{ color: 'red' }}>Привіт, червоний заголовок!</h1>}
        />

        <LessonCard
          title="Як додати рамку до картинки та заокруглити її?"
          description="Використаємо тег <img> та CSS властивості `border` і `border-radius`."
          codeExample={`<img src="https://via.placeholder.com/100" alt="Кругла картинка" style="border: 3px solid blue; border-radius: 50%;">`}
          language="html"
          result={<img src="https://via.placeholder.com/100" alt="Кругла картинка" style={{ border: '3px solid blue', borderRadius: '50%' }} className="shadow-md" />}
        />

        <LessonCard
          title="Як створити кнопку з яскравим фоном та білим текстом?"
          description="Використаємо тег <button> та CSS властивості `background-color`, `color`, `padding` та `border-radius`."
          codeExample={`<button style="background-color: #FF6347; color: white; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer;">Натисни мене!</button>`}
          language="html"
          result={<button style={{ backgroundColor: '#FF6347', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Натисни мене!</button>}
        />

        <LessonCard
          title="Як вирівняти текст по центру та змінити його розмір?"
          description="Використаємо тег <p> та CSS властивості `text-align` і `font-size`."
          codeExample={`<p style="text-align: center; font-size: 20px;">Цей текст буде по центру і великим!</p>`}
          language="html"
          result={<p style={{ textAlign: 'center', fontSize: '20px' }}>Цей текст буде по центру і великим!</p>}
        />

        <LessonCard
          title="Як зробити таблицю з рамками?"
          description="Використаємо теги <table>, <tr>, <td> та CSS властивість `border`."
          codeExample={`<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="border: 1px solid black; padding: 8px;">Рядок 1, Комірка 1</td>
    <td style="border: 1px solid black; padding: 8px;">Рядок 1, Комірка 2</td>
  </tr>
  <tr>
    <td style="border: 1px solid black; padding: 8px;">Рядок 2, Комірка 1</td>
    <td style="border: 1px solid black; padding: 8px;">Рядок 2, Комірка 2</td>
  </tr>
</table>`}
          language="html"
          result={
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid black', padding: '8px' }}>Рядок 1, Комірка 1</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>Рядок 2, Комірка 1</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid black', padding: '8px' }}>Рядок 2, Комірка 1</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>Рядок 2, Комірка 2</td>
                </tr>
              </tbody>
            </table>
          }
        />
      </div>
    </div>
  );
};

export default Examples;