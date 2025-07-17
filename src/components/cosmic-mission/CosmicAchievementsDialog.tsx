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
}

const CosmicAchievementsDialog: React.FC<CosmicAchievementsDialogProps> = ({
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
        <Button
          variant="default"
          size="lg"
          className={cn(
            "fixed bottom-4 right-24 z-50 shadow-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 ease-in-out no-print",
            "w-16 h-16 rounded-full flex items-center justify-center"
          )}
          aria-label="Відкрити Досягнення"
        >
          <Trophy className="h-7 w-7" />
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
  );
};

export default CosmicAchievementsDialog;