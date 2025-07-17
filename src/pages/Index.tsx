import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator"; // Import Separator

const Index: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center py-8">
      <h1 className="text-5xl font-extrabold text-center mb-6 text-foreground">
        Привіт, юний Веб-Майстер!
      </h1>
      <p className="text-xl text-center mb-10 max-w-2xl text-muted-foreground">
        Ласкаво просимо до Веб-Майстерні, де ти навчишся створювати власні круті веб-сторінки за допомогою HTML та CSS!
      </p>

      <div className="w-full max-w-5xl space-y-12"> {/* Increased space between sections */}
        {/* Нова Космічна Місія - актуальний розділ */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-8 text-foreground">Твоя Нова Місія!</h2>
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300 relative">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground flex justify-between items-center">
                  🚀 Космічна CSS-академія
                  <Badge variant="destructive" className="ml-2 bg-purple-500 text-white">АКТУАЛЬНО!</Badge> {/* New badge color */}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Вирушай у захопливу подорож, щоб створити та запустити свою власну веб-сторінку!
                </p>
                <Button asChild size="lg" className="w-full bg-brand-primary text-primary-foreground hover:bg-brand-primary-hover">
                  <Link to="/cosmic-mission">Розпочати Місію</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" /> {/* Separator between sections */}

        {/* Домашнє завдання - перенесений розділ */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-8 text-foreground">Твоє Перше Завдання!</h2>
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300 relative">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground flex justify-between items-center">
                  Домашнє завдання: Створи свій сайт!
                  <Badge variant="destructive" className="ml-2 bg-green-500 text-white">Актуально!</Badge> {/* Changed to green for 'Актуально' */}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Твій перший великий проект: створи власний персональний сайт!
                </p>
                <Button asChild size="lg" className="w-full bg-brand-primary text-primary-foreground hover:bg-brand-primary-hover">
                  <Link to="/homework">Почати Завдання</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" /> {/* Separator between sections */}

        {/* Основи HTML та CSS */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-8 text-foreground">Основи HTML та CSS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground">HTML Теги</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Дізнайся, як будувати структуру веб-сторінки.</p>
                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/80">
                  <Link to="/html-tags">Почати</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground">CSS Властивості</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Зроби свою сторінку красивою та стильною!</p>
                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/80">
                  <Link to="/css-properties">Почати</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground">CSS Селектори</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Навчись вибирати елементи для стилізації.</p>
                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/80">
                  <Link to="/css-selectors">Почати</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Практика та Проекти */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-8 text-foreground">Практика та Проекти</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground">Практичні Приклади</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Спробуй свої сили на реальних завданнях.</p>
                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/80">
                  <Link to="/examples">Почати</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground">CSS Майстерня</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Експериментуй з кольорами та CSS кодом!</p>
                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/80">
                  <Link to="/css-playground">Почати</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow duration-300 relative">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground flex justify-between items-center">
                  Шаблон Проекту
                  <Badge variant="destructive" className="ml-2">Важливо!</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Готовий шаблон для твого власного веб-проекту.</p>
                <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/80">
                  <Link to="/project-template">Переглянути</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Перевірка Знань та Довідник */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-8 text-foreground">Перевірка Знань та Довідник</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground">Перевір Знання!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Пройди короткий тест з HTML та CSS.</p>
                <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
                  <Link to="/quiz">Розпочати Тест</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-card-foreground">Словник Термінів</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Швидко знайди визначення основних термінів.</p>
                <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
                  <Link to="/glossary">Відкрити Словник</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;