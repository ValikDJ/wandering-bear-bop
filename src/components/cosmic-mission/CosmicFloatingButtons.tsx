import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart, Trophy } from "lucide-react";
import CosmicShop from "./CosmicShop";
import CosmicAchievements from "./CosmicAchievements";
import { cn } from "@/lib/utils";

interface CosmicFloatingButtonsProps {
  maxEnergy: number;
  setMaxEnergy: (value: number) => void;
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
  totalClicks: number;
  totalEnergyCollected: number;
  allCssChallengesCompleted: boolean;
  energySpentOnChallenges: number;
}

const CosmicFloatingButtons: React.FC<CosmicFloatingButtonsProps> = ({
  maxEnergy,
  setMaxEnergy,
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
  totalClicks,
  totalEnergyCollected,
  allCssChallengesCompleted,
  energySpentOnChallenges,
}) => {
  return (
    <div className="fixed bottom-24 right-4 z-50 no-print flex flex-col gap-2">
      {/* Shop Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className={cn(
              "shadow-lg bg-brand-primary text-primary-foreground hover:bg-brand-primary-hover transition-all duration-300 ease-in-out",
              "w-14 h-14 rounded-full flex items-center justify-center"
            )}
            aria-label="Відкрити Космічний Магазин"
          >
            <ShoppingCart className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-card text-card-foreground p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-primary" />
              Космічний Магазин
            </DialogTitle>
          </DialogHeader>
          <CosmicShop
            maxEnergy={maxEnergy}
            setMaxEnergy={setMaxEnergy}
            energyPerClick={energyPerClick}
            setEnergyPerClick={setEnergyPerClick}
            regenerationAmountPerTick={regenerationAmountPerTick}
            setRegenerationAmountPerTick={setRegenerationAmountPerTick}
            regenerationTickIntervalMs={regenerationTickIntervalMs}
            setRegenerationTickIntervalMs={setRegenerationTickIntervalMs}
            currentEnergy={currentEnergy}
            decreaseCosmicEnergy={decreaseCosmicEnergy}
            hasRainbowCrystal={hasRainbowCrystal}
            setHasRainbowCrystal={setHasRainbowCrystal}
            hasStarBurst={hasStarBurst}
            setHasStarBurst={setHasStarBurst}
            hasCosmicMusic={hasCosmicMusic}
            setHasCosmicMusic={setHasCosmicMusic}
          />
        </DialogContent>
      </Dialog>

      {/* Achievements Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className={cn(
              "shadow-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 ease-in-out",
              "w-14 h-14 rounded-full flex items-center justify-center"
            )}
            aria-label="Відкрити Досягнення"
          >
            <Trophy className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-card text-card-foreground p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-500" />
              Твої Космічні Досягнення
            </DialogTitle>
          </DialogHeader>
          <CosmicAchievements
            totalClicks={totalClicks}
            totalEnergyCollected={totalEnergyCollected}
            allCssChallengesCompleted={allCssChallengesCompleted}
            currentEnergy={currentEnergy}
            maxEnergy={maxEnergy}
            energySpentOnChallenges={energySpentOnChallenges}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CosmicFloatingButtons;