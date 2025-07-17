import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const CosmicMissionWhatsNext: React.FC = () => {
  return (
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
  );
};

export default CosmicMissionWhatsNext;