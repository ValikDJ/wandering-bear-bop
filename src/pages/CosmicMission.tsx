import React, { useEffect, useRef, useState } from "react";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { useTheme } from "@/hooks/use-theme";
import { ThemeMode } from "@/lib/ThemeManager";

// Імпорт нових модульних компонентів
import CosmicMissionHeader from "@/components/cosmic-mission/CosmicMissionHeader";
import CosmicMissionProgressBar from "@/components/cosmic-mission/CosmicMissionProgressBar";
import CosmicMissionStage1Html from "@/components/cosmic-mission/CosmicMissionStage1Html";
import CosmicMissionStage2Css from "@/components/cosmic-mission/CosmicMissionStage2Css";
import CosmicMissionStage3Launch from "@/components/cosmic-mission/CosmicMissionStage3Launch";
import CosmicMissionChecklist from "@/components/CosmicMissionChecklist";
import CosmicMissionWhatsNext from "@/components/cosmic-mission/CosmicMissionWhatsNext";

const CosmicMission: React.FC = () => {
  useScrollToHash();
  const { setTheme, getMode, getPreviousUserMode } = useTheme();
  const initialThemeRef = useRef<ThemeMode | null>(null);

  // State for main stage completion
  const [stage1Completed, setStage1Completed] = useState<boolean>(false);
  const [stage2Completed, setStage2Completed] = useState<boolean>(false);
  const [checklistCompleted, setChecklistCompleted] = useState<boolean>(false);

  useEffect(() => {
    initialThemeRef.current = getMode();
    setTheme(ThemeMode.Cosmic, true);

    return () => {
      const previousMode = getPreviousUserMode();
      if (previousMode) {
        setTheme(previousMode, false);
      } else {
        setTheme(ThemeMode.System, false);
      }
    };
  }, [setTheme, getMode, getPreviousUserMode]);

  return (
    <div className="py-8">
      <CosmicMissionHeader />

      <CosmicMissionProgressBar
        stage1Completed={stage1Completed}
        stage2Completed={stage2Completed}
        checklistCompleted={checklistCompleted}
      />

      <CosmicMissionStage1Html
        completed={stage1Completed}
        onCompletionChange={setStage1Completed}
      />

      <CosmicMissionStage2Css
        completed={stage2Completed}
        onCompletionChange={setStage2Completed}
      />

      <CosmicMissionStage3Launch />

      <CosmicMissionChecklist onCompletionChange={setChecklistCompleted} />

      <CosmicMissionWhatsNext />

      <LessonNavigation />
    </div>
  );
};

export default CosmicMission;