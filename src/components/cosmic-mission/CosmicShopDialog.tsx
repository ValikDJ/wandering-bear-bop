import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import CosmicShop from "./CosmicShop";
import { cn } from "@/lib/utils";

interface CosmicShopDialogProps {
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
  children: React.ReactNode; // NEW: Accept children for the trigger button
}

const CosmicShopDialog: React.FC<CosmicShopDialogProps> = ({
  children, // NEW
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
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
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
  );
};

export default CosmicShopDialog;