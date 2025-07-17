import React, { useEffect, useRef, useState } from "react";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { useTheme } from "@/hooks/use-theme";
import { ThemeMode } from "@/lib/ThemeManager";
import { toast } from "sonner"; // Import toast for notifications

// Імпорт нових модульних компонентів
import CosmicMissionHeader from "@/components/cosmic-mission/CosmicMissionHeader";
import CosmicMissionProgressBar from "@/components/cosmic-mission/CosmicMissionProgressBar";
import CosmicMissionStage1Html from "@/components/cosmic-mission/CosmicMissionStage1Html";
import CosmicMissionStage2Css from "@/components/cosmic-mission/CosmicMissionStage2Css";
import CosmicMissionStage3Launch from "@/components/cosmic-mission/CosmicMissionStage3Launch";
import CosmicMissionChecklist from "@/components/CosmicMissionChecklist";
import CosmicMissionWhatsNext from "@/components/cosmic-mission/CosmicMissionWhatsNext";
import CosmicEnergyMeter from "@/components/cosmic-mission/CosmicEnergyMeter"; // NEW IMPORT

const LOCAL_STORAGE_ENERGY_KEY = "cosmic-mission-energy";

const CosmicMission: React.FC = () => {
  useScrollToHash();
  const { setTheme, getMode, getPreviousUserMode } = useTheme();

  // State for main stage completion
  const [stage1Completed, setStage1Completed] = useState<boolean>(false);
  const [stage2Completed, setStage2Completed] = useState<boolean>(false);
  const [checklistCompleted, setChecklistCompleted] = useState<boolean>(false);

  // NEW: State for Cosmic Energy
  const [cosmicEnergy, setCosmicEnergy] = useState<number>(() => {
    try {
      const storedEnergy = localStorage.getItem(LOCAL_STORAGE_ENERGY_KEY);
      return storedEnergy ? JSON.parse(storedEnergy) : 100; // Default to 100
    } catch (error) {
      console.error("Failed to load cosmic energy from localStorage:", error);
      return 100;
    }
  });

  // NEW: Persist cosmic energy to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ENERGY_KEY, JSON.stringify(cosmicEnergy));
    } catch (error) {
      console.error("Failed to save cosmic energy to localStorage:", error);
    }
  }, [cosmicEnergy]);

  // NEW: Function to decrease cosmic energy
  const decreaseCosmicEnergy = (amount: number, actionType: 'hint' | 'solution') => {
    setCosmicEnergy(prevEnergy => {
      const newEnergy = Math.max(0, prevEnergy - amount);
      if (newEnergy < prevEnergy) {
        toast.info(`Витрачено ${amount} од. Космічної Енергії за ${actionType === 'hint' ? 'підказку' : 'рішення'}. Залишилось: ${newEnergy}`);
      } else if (prevEnergy === 0) {
        toast.warning("Недостатньо Космічної Енергії!");
      }
      return newEnergy;
    });
  };

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

      {/* NEW: Cosmic Energy Meter */}
      <CosmicEnergyMeter energy={cosmicEnergy} />

      <CosmicMissionStage1Html
        completed={stage1Completed}
        onCompletionChange={setStage1Completed}
      />

      <CosmicMissionStage2Css
        completed={stage2Completed}
        onCompletionChange={setStage2Completed}
        cosmicEnergy={cosmicEnergy} // NEW: Pass energy
        decreaseCosmicEnergy={decreaseCosmicEnergy} // NEW: Pass energy decrease function
      />

      <CosmicMissionStage3Launch />

      <CosmicMissionChecklist onCompletionChange={setChecklistCompleted} />

      <CosmicMissionWhatsNext />

      <LessonNavigation />
    </div>
  );
};

export default CosmicMission;