import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trophy } from "lucide-react";
import CosmicAchievements from "./CosmicAchievements";
import { cn } from "@/lib/utils";

interface CosmicAchievementsDialogProps {
  totalClicks: number;
  totalEnergyCollected: number;
  allCssChallengesCompleted: boolean;
  currentEnergy: number;
  maxEnergy: number;
  energySpentOnChallenges: number;
  children: React.ReactNode; // NEW: Accept children for the trigger button
}

const CosmicAchievementsDialog: React.FC<CosmicAchievementsDialogProps> = ({
  children, // NEW
  totalClicks,
  totalEnergyCollected,
  allCssChallengesCompleted,
  currentEnergy,
  maxEnergy,
  energySpentOnChallenges,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
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
  );
};

export default CosmicAchievementsDialog;