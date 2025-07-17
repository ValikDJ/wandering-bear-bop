import React from "react";
import { Progress } from "@/components/ui/progress";

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
    <div className="mb-10 no-print">
      <h3 className="text-2xl font-bold text-foreground mb-4">Прогрес Орбітальних Завдань:</h3>
      <Progress value={progress} className="w-full h-4 bg-muted bg-brand-primary" />
      <p className="text-right text-sm text-muted-foreground mt-2">{Math.round(progress)}% виконано</p>
    </div>
  );
};

export default CosmicMissionProgressBar;