import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Zap, MousePointerClick, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CosmicAchievementsProps {
  totalClicks: number;
  totalEnergyCollected: number;
  allCssChallengesCompleted: boolean;
  currentEnergy: number;
  maxEnergy: number;
  energySpentOnChallenges: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  isUnlocked: boolean;
  icon: React.ElementType;
}

const CosmicAchievements: React.FC<CosmicAchievementsProps> = ({
  totalClicks,
  totalEnergyCollected,
  allCssChallengesCompleted,
  currentEnergy,
  maxEnergy,
  energySpentOnChallenges,
}) => {
  const achievements: Achievement[] = [
    {
      id: "first-contact",
      name: "Перший Контакт",
      description: "Зроби 10 кліків по енергетичній кнопці.",
      isUnlocked: totalClicks >= 10,
      icon: MousePointerClick,
    },
    {
      id: "full-tank",
      name: "Повний Бак",
      description: "Досягни максимального рівня енергії (200).",
      isUnlocked: currentEnergy >= maxEnergy,
      icon: Zap,
    },
    {
      id: "energy-collector",
      name: "Енергетичний Збирач",
      description: "Збери 500 енергії всього.",
      isUnlocked: totalEnergyCollected >= 500,
      icon: Zap,
    },
    {
      id: "reactor-master",
      name: "Майстер Реактора",
      description: "Збери 1000 енергії всього.",
      isUnlocked: totalEnergyCollected >= 1000,
      icon: Zap,
    },
    {
      id: "marathoner",
      name: "Марафонець",
      description: "Зроби 100 кліків по енергетичній кнопці.",
      isUnlocked: totalClicks >= 100,
      icon: MousePointerClick,
    },
    {
      id: "css-hero",
      name: "CSS-Герой",
      description: "Виконай всі Орбітальні Завдання з CSS.",
      isUnlocked: allCssChallengesCompleted,
      icon: CheckCircle,
    },
    {
      id: "efficient",
      name: "Ефективний",
      description: "Виконай всі CSS-завдання, витративши менше 100 енергії на підказки/рішення.",
      isUnlocked: allCssChallengesCompleted && energySpentOnChallenges <= 100,
      icon: CheckCircle,
    },
    {
      id: "shop-explorer",
      name: "Дослідник Магазину",
      description: "Придбай будь-яке покращення в Космічному Магазині.",
      isUnlocked: (localStorage.getItem("cosmic-mission-energy-per-click") && JSON.parse(localStorage.getItem("cosmic-mission-energy-per-click")!) > 1) ||
                  (localStorage.getItem("cosmic-mission-regeneration-amount") && JSON.parse(localStorage.getItem("cosmic-mission-regeneration-amount")!) > 1) ||
                  (localStorage.getItem("cosmic-mission-regeneration-interval") && JSON.parse(localStorage.getItem("cosmic-mission-regeneration-interval")!) < 10000) ||
                  (localStorage.getItem("cosmic-mission-has-rainbow-crystal") && JSON.parse(localStorage.getItem("cosmic-mission-has-rainbow-crystal")!)) ||
                  (localStorage.getItem("cosmic-mission-has-star-burst") && JSON.parse(localStorage.getItem("cosmic-mission-has-star-burst")!)) ||
                  (localStorage.getItem("cosmic-mission-has-cosmic-music") && JSON.parse(localStorage.getItem("cosmic-mission-has-cosmic-music")!)),
      icon: Zap, // Using Zap for shop-related achievement
    },
  ];

  const unlockedAchievements = achievements.filter(a => a.isUnlocked).length;

  return (
    <Card className="mb-12 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          Твої Космічні Досягнення ({unlockedAchievements}/{achievements.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-muted-foreground">
          Відстежуй свої успіхи у Космічній CSS-академії!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <Card key={achievement.id} className={cn(
                "bg-muted p-4 flex items-center gap-4",
                achievement.isUnlocked ? "border-2 border-green-500 opacity-100" : "opacity-50"
              )}>
                <Icon className={cn("h-8 w-8", achievement.isUnlocked ? "text-green-500" : "text-muted-foreground")} />
                <div>
                  <h4 className="font-semibold text-lg text-secondary-foreground">{achievement.name}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CosmicAchievements;