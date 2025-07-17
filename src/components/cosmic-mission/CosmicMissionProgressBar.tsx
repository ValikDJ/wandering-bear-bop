import React from "react";
import { CustomProgressBar } from "@/components/CustomProgressBar";
import { Rocket } from "lucide-react"; // NEW IMPORT
import { cn } from "@/lib/utils"; // NEW IMPORT

interface CosmicMissionProgressBarProps {
  stage1Completed: boolean;
  stage2Completed: boolean;
  checklistCompleted: boolean;
}

const CosmicMissionProgressBar: React.FC<CosmicMissionProgressBarProps> = ({
  stage1Completed,
  stage2Completed,
  checklistCompleted,
}) => {
  const completedStagesCount = [stage1Completed, stage2Completed, checklistCompleted].filter(Boolean).length;
  const totalStages = 3; // HTML Ready, CSS Applied, Checklist Completed
  const progress = (completedStagesCount / totalStages) * 100;

  return (
    <div className="mb-10 no-print relative h-16 flex items-center"> {/* Adjusted height for elements */}
      <h3 className="text-2xl font-bold text-foreground mb-4 absolute -top-8 left-0">Прогрес Орбітальних Завдань:</h3>
      <CustomProgressBar value={progress} className="w-full h-4 bg-muted" indicatorClassName="bg-brand-primary" />

      {/* Rocket */}
      <Rocket
        className="absolute h-6 w-6 text-brand-primary transition-all duration-500 ease-out"
        style={{ left: `calc(${progress}% - 12px)` }} // Adjust 12px for half icon width
      />

      {/* Planet Steps */}
      <div className="absolute inset-0 flex justify-between items-center px-1"> {/* Added px-1 to align with progress bar ends */}
        {/* Stage 1 Planet */}
        <div className={cn(
          "h-5 w-5 rounded-full border-2 border-brand-primary bg-background",
          stage1Completed && "bg-green-500 animate-pulse" // Pulsate when completed
        )} />
        {/* Stage 2 Planet */}
        <div className={cn(
          "h-5 w-5 rounded-full border-2 border-brand-primary bg-background",
          stage2Completed && "bg-green-500 animate-pulse"
        )} />
        {/* Checklist Planet */}
        <div className={cn(
          "h-5 w-5 rounded-full border-2 border-brand-primary bg-background",
          checklistCompleted && "bg-green-500 animate-pulse"
        )} />
      </div>
      <p className="text-right text-sm text-muted-foreground mt-2 absolute -bottom-6 right-0">{Math.round(progress)}% виконано</p>
    </div>
  );
};

export default CosmicMissionProgressBar;