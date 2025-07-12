import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Badge } from "@/components/ui/badge"; // Import Badge component

const Index: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center py-8 bg-background">
      <h1 className="text-5xl font-extrabold text-center mb-6 text-primary">
        Привіт, юний Веб-Майстер!
      </h1>
      <p className="text-xl text-center mb-10 max-w-2xl text-muted-foreground">
        Ласкаво просимо до Веб-Майстерні, де ти навчишся створювати власні круті веб-сторінки за допомогою HTML та CSS!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">HTML Теги</CardTitle>
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
            <CardTitle className="text-2xl text-primary">CSS Властивості</CardTitle>
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
            <CardTitle className="text-2xl text-primary">CSS Селектори</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Навчись вибирати елементи для стилізації.</p>
            <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/80">
              <Link to="/css-selectors">Почати</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Практичні Приклади</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Спробуй свої сили на реальних завданнях.</p>
            <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/80">
              <Link to="/examples">Почати</Link>
            </Button>
          </CardContent>
        </Card>

        {/* New Card for Project Template */}
        <Card className="bg-card hover:shadow-lg transition-shadow duration-300 relative">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex justify-between items-center">
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

        {/* New Card for Quiz */}
        <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Перевір Знання!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Пройди короткий тест з HTML та CSS.</p>
            <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
              <Link to="/quiz">Розпочати Тест</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;