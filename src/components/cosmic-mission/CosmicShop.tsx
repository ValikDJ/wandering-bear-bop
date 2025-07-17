import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CosmicShopProps {
  maxEnergy: number;
  setMaxEnergy: (value: number) => void;
  energyPerClick: number;
  setEnergyPerClick: (value: number) => void;
  currentEnergy: number;
  decreaseCosmicEnergy: (amount: number, actionType: 'purchase') => void;
}

const CosmicShop: React.FC<CosmicShopProps> = ({
  maxEnergy,
  setMaxEnergy,
  energyPerClick,
  setEnergyPerClick,
  currentEnergy,
  decreaseCosmicEnergy,
}) => {
  const upgrades = [
    {
      id: "increased-tank-1",
      name: "Збільшений Бак (250⚡)",
      description: "Збільшує максимальну енергію до 250.",
      cost: 300,
      effect: () => setMaxEnergy(250),
      isAvailable: maxEnergy < 250,
      isPurchased: maxEnergy >= 250,
    },
    {
      id: "increased-tank-2",
      name: "Великий Реактор (300⚡)",
      description: "Збільшує максимальну енергію до 300 (фінал).",
      cost: 500,
      effect: () => setMaxEnergy(300),
      isAvailable: maxEnergy < 300 && maxEnergy >= 250, // Requires previous upgrade
      isPurchased: maxEnergy >= 300,
    },
    {
      id: "double-click",
      name: "Подвійний Клік (x2)",
      description: "Отримуй 2 енергії за клік.",
      cost: 200,
      effect: () => setEnergyPerClick(2),
      isAvailable: energyPerClick < 2,
      isPurchased: energyPerClick >= 2,
    },
    {
      id: "triple-click",
      name: "Потрійний Клік (x3)",
      description: "Отримуй 3 енергії за клік.",
      cost: 400,
      effect: () => setEnergyPerClick(3),
      isAvailable: energyPerClick < 3 && energyPerClick >= 2, // Requires previous upgrade
      isPurchased: energyPerClick >= 3,
    },
    // Regeneration upgrades will be added here later
  ];

  const handlePurchase = (upgrade: typeof upgrades[0]) => {
    if (currentEnergy >= upgrade.cost) {
      decreaseCosmicEnergy(upgrade.cost, 'purchase');
      upgrade.effect();
      toast.success(`🎉 Покращення "${upgrade.name}" придбано!`);
    } else {
      toast.error("Недостатньо Космічної Енергії для цього покращення!");
    }
  };

  return (
    <Card className="mb-12 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
          <ShoppingCart className="h-8 w-8 text-primary" />
          Космічний Магазин
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-muted-foreground">
          Використовуй свою Космічну Енергію, щоб покращити свою базу та прискорити збір енергії!
        </p>

        <h3 className="text-2xl font-bold text-foreground mb-4">Покращення Енергії:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upgrades.map((upgrade) => (
            <Card key={upgrade.id} className={cn(
              "bg-muted p-4 flex flex-col justify-between",
              upgrade.isPurchased && "border-2 border-green-500 opacity-80"
            )}>
              <div>
                <h4 className="font-semibold text-lg text-secondary-foreground">{upgrade.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{upgrade.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-primary flex items-center gap-1">
                  <Zap className="h-5 w-5 text-yellow-500" /> {upgrade.cost}
                </span>
                {upgrade.isPurchased ? (
                  <Button disabled className="bg-green-600 text-white">Придбано!</Button>
                ) : (
                  <Button
                    onClick={() => handlePurchase(upgrade)}
                    disabled={!upgrade.isAvailable || currentEnergy < upgrade.cost}
                    className="bg-brand-primary text-primary-foreground hover:bg-brand-primary-hover"
                  >
                    {upgrade.isAvailable ? "Придбати" : "Недоступно"}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Placeholder for other sections */}
        <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Автоматизація:</h3>
        <p className="text-muted-foreground">
          (Тут будуть покращення для автоматичного збору енергії)
        </p>

        <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Візуальні Покращення:</h3>
        <p className="text-muted-foreground">
          (Тут будуть візуальні ефекти для твоєї бази)
        </p>
      </CardContent>
    </Card>
  );
};

export default CosmicShop;