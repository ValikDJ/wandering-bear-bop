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
  // const initialThemeRef = useRef<ThemeMode | null>(null); // Цей реф більше не потрібен

  // State for main stage completion
  const [stage1Completed, setStage1Completed] = useState<boolean>(false);
  const [stage2Completed, setStage2Completed] = useState<boolean>(false);
  const [checklistCompleted, setChecklistCompleted] = useState<boolean>(false);

  // Видаляємо useEffect, який примусово встановлював космічну тему
  // Тепер тема контролюється глобальним перемикачем у Navbar
  useEffect(() => {
    // Якщо ви хочете, щоб ця сторінка завжди починалася з космічної теми,
    // але дозволяла користувачеві її змінити, можна залишити цей рядок:
    // setTheme(ThemeMode.Cosmic, true); // 'true' означає тимчасово, не зберігати в localStorage
    // Однак, якщо мета - дозволити користувачеві вибирати тему, то краще не встановлювати її примусово.
    // Залишаємо цей useEffect порожнім, щоб не конфліктувати з глобальним перемикачем.
  }, []); // Залежності порожні, щоб не викликати ре-рендер

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