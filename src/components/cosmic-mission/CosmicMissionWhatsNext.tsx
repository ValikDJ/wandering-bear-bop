import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Sparkles } from "lucide-react"; // Added Sparkles icon

const CosmicMissionWhatsNext: React.FC = () => {
  return (
    <Card className="mb-12 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" /> {/* Added Sparkles and animation */}
          Місія Виконана! Нові Галактики Чекають!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground text-lg">
          🎉 **Вітаю, юний Веб-Космонавте!** 🎉
        </p>
        <p className="mb-4 text-muted-foreground">
          Ти успішно завершив свою першу космічну місію зі стилізації веб-сторінки! Твій сайт тепер не просто каркас, а справжня сяюча зірка в безмежному просторі Інтернету! Ти довів, що можеш керувати кольорами, формами та розташуванням елементів, як справжній майстер CSS.
        </p>
        <p className="text-lg font-semibold text-brand-primary">
          І пам'ятай, на **відкритому уроці** ти матимеш унікальну можливість **продемонструвати свої космічні проекти батькам** та показати їм усі свої неймовірні досягнення! Вони будуть пишатися твоїми результатами!
        </p>
        <p className="mt-4 text-center text-muted-foreground text-sm">
          Готуйся до нових, неймовірних пригод у світі кодування! Продовжуй досліджувати та творити! Майбутнє веб-космосу за тобою!
        </p>
      </CardContent>
    </Card>
  );
};

export default CosmicMissionWhatsNext;