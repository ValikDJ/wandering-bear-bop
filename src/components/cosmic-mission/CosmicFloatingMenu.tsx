import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ShoppingCart, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import CosmicShopDialog from "./CosmicShopDialog";
import CosmicAchievementsDialog from "./CosmicAchievementsDialog";

interface CosmicFloatingMenuProps {
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

const CosmicFloatingMenu: React.FC<CosmicFloatingMenuProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-24 right-4 z-50 no-print flex flex-col items-end gap-2">
      {isOpen && (
        <>
          {/* Achievements button, positioned above the shop button */}
          <CosmicAchievementsDialog {...props}>
            <Button
              variant="default"
              size="lg"
              className={cn(
                "shadow-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 ease-in-out",
                "w-16 h-16 rounded-full flex items-center justify-center"
              )}
              aria-label="Відкрити Досягнення"
            >
              <Trophy className="h-7 w-7" />
            </Button>
          </CosmicAchievementsDialog>
          {/* Shop button, positioned above the toggle button */}
          <CosmicShopDialog {...props}>
            <Button
              variant="default"
              size="lg"
              className={cn(
                "shadow-lg bg-brand-primary text-primary-foreground hover:bg-brand-primary-hover transition-all duration-300 ease-in-out",
                "w-16 h-16 rounded-full flex items-center justify-center"
              )}
              aria-label="Відкрити Космічний Магазин"
            >
              <ShoppingCart className="h-7 w-7" />
            </Button>
          </CosmicShopDialog>
        </>
      )}
      {/* Toggle button */}
      <Button
        onClick={toggleMenu}
        variant="default"
        size="lg"
        className={cn(
          "shadow-lg bg-brand-primary text-primary-foreground hover:bg-brand-primary-hover transition-all duration-300 ease-in-out",
          "w-16 h-16 rounded-full flex items-center justify-center"
        )}
        aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
      >
        <ChevronLeft className={cn("h-7 w-7 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
      </Button>
    </div>
  );
};

export default CosmicFloatingMenu;