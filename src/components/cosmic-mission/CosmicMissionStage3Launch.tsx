import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { toast } from "sonner";

const CosmicMissionStage3Launch: React.FC = () => {
  const handleSubmitInstructions = () => {
    toast.info("Збережи файли на платформі Logika та покажи вчителю! 🧑‍🏫");
  };

  return (
    <Card className="mb-12 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Rocket className="h-8 w-8 text-primary" />
          Етап 3: Запуск Місії CSS! (Перегляд та Здача)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Твоя космічна база готова до запуску! Після того, як ти вставив HTML та CSS код у відповідні вкладки на платформі Logika, ти зможеш одразу побачити результат!
        </p>
        <p className="mb-6 text-muted-foreground">
          Коли ти впевнений, що твій сайт виглядає чудово, настав час показати його своєму вчителю!
        </p>
        <div className="text-center mb-6">
          <Button
            onClick={handleSubmitInstructions}
            className="bg-brand-primary text-primary-foreground hover:bg-brand-primary-hover text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 no-print"
          >
            ➡️ Як здати роботу вчителю ⬅️
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CosmicMissionStage3Launch;