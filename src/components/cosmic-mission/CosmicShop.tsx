import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, Palette, Sparkles, Music } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CosmicShopProps {
  maxEnergy: number;
  setMaxEnergy: (value: number) => void; // Keep for type compatibility, but it will be a no-op
  energyPerClick: number;
  setEnergyPerClick: (value: number) => void;
  regenerationAmountPerTick: number;
  setRegenerationAmountPerTick: (value: number) => void;
  regenerationTickIntervalMs: number;
  setRegenerationTickIntervalMs: (value: number) => void;
  currentEnergy: number;
  decreaseCosmicEnergy: (amount: number, actionType: 'purchase') => void;
  hasRainbowCrystal: boolean;
  setHasRainbowCrystal: (value: boolean) => void;
  hasStarBurst: boolean;
  setHasStarBurst: (value: boolean) => void;
  hasCosmicMusic: boolean;
  setHasCosmicMusic: (value: boolean) => void;
}

const CosmicShop: React.FC<CosmicShopProps> = ({
  maxEnergy,
  setMaxEnergy, // This will be a no-op now
  energyPerClick,
  setEnergyPerClick,
  regenerationAmountPerTick,
  setRegenerationAmountPerTick,
  regenerationTickIntervalMs,
  setRegenerationTickIntervalMs,
  currentEnergy,
  decreaseCosmicEnergy,
  hasRainbowCrystal,
  setHasRainbowCrystal,
  hasStarBurst,
  setHasStarBurst,
  hasCosmicMusic,
  setHasCosmicMusic,
}) => {
  const upgrades = [
    {
      id: "double-click",
      name: "Подвійний Клік (x2)",
      description: "Отримуй 2 енергії за клік.",
      cost: 100,
      effect: () => setEnergyPerClick(2),
      isAvailable: energyPerClick < 2,
      isPurchased: energyPerClick >= 2,
      category: "energy",
    },
    {
      id: "triple-click",
      name: "Потрійний Клік (x3)",
      description: "Отримуй 3 енергії за клік.",
      cost: 180,
      effect: () => setEnergyPerClick(3),
      isAvailable: energyPerClick < 3 && energyPerClick >= 2, // Requires previous upgrade
      isPurchased: energyPerClick >= 3,
      category: "energy",
    },
    // "Турбо-режим" (temporary effect) is not implemented for simplicity.

    {
      id: "fast-regeneration",
      name: "Швидка Регенерація (5с)",
      description: "Енергія відновлюється кожні 5 секунд.",
      cost: 100,
      effect: () => setRegenerationTickIntervalMs(5000),
      isAvailable: regenerationTickIntervalMs > 5000,
      isPurchased: regenerationTickIntervalMs <= 5000,
      category: "automation",
    },
    {
      id: "energy-drone",
      name: "Енергетичний Дрон (+1/5с)",
      description: "Додатково +1 енергія кожні 5 секунд.",
      cost: 120,
      effect: () => setRegenerationAmountPerTick(prev => prev + 1),
      isAvailable: regenerationAmountPerTick < 2 && regenerationTickIntervalMs <= 5000, // Requires fast regeneration
      isPurchased: regenerationAmountPerTick >= 2,
      category: "automation",
    },

    {
      id: "rainbow-crystal",
      name: "Райдужний Кристал",
      description: "Кнопка енергії світиться всіма кольорами веселки.",
      cost: 80,
      effect: () => setHasRainbowCrystal(true),
      isAvailable: !hasRainbowCrystal,
      isPurchased: hasRainbowCrystal,
      category: "visual",
      icon: Palette,
    },
    {
      id: "star-burst",
      name: "Зоряний Вибух",
      description: "Більше енергетичних частинок при кліку.",
      cost: 120,
      effect: () => setHasStarBurst(true),
      isAvailable: !hasStarBurst,
      isPurchased: hasStarBurst,
      category: "visual",
      icon: Sparkles,
    },
    {
      id: "cosmic-music",
      name: "Космічна Музика",
      description: "Додає космічний звук при зборі енергії.",
      cost: 40,
      effect: () => setHasCosmicMusic(true),
      isAvailable: !hasCosmicMusic,
      isPurchased: hasCosmicMusic,
      category: "visual",
      icon: Music,
    },
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

  const energyUpgrades = upgrades.filter(u => u.category === "energy");
  const automationUpgrades = upgrades.filter(u => u.category === "automation");
  const visualUpgrades = upgrades.filter(u => u.category === "visual");

  return (
    <div className="no-print"> {/* Removed Card wrapper as it's now inside DialogContent */}
      <p className="mb-6 text-muted-foreground">
        Використовуй свою Космічну Енергію, щоб покращити свою базу та прискорити збір енергії!
      </p>

      <h3 className="text-2xl font-bold text-foreground mb-4">Покращення Енергії:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {energyUpgrades.map((upgrade) => (
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

      <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Автоматизація:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {automationUpgrades.map((upgrade) => (
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

      <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">Візуальні Покращення:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visualUpgrades.map((upgrade) => {
          const Icon = upgrade.icon;
          return (
            <Card key={upgrade.id} className={cn(
              "bg-muted p-4 flex flex-col justify-between",
              upgrade.isPurchased && "border-2 border-green-500 opacity-80"
            )}>
              <div>
                <h4 className="font-semibold text-lg text-secondary-foreground flex items-center gap-2">
                  {Icon && <Icon className="h-5 w-5 text-primary" />} {upgrade.name}
                </h4>
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
          );
        })}
      </div>
    </div>
  );
};

export default CosmicShop;