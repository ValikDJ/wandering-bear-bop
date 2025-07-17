import React, { useEffect, useRef, useState, useCallback } from "react";
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
import CosmicEnergyMeter from "@/components/cosmic-mission/CosmicEnergyMeter";
import CosmicEnergyButton from "@/components/CosmicEnergyButton"; // NEW IMPORT
import { cssChallenges } from "@/data/cosmicCssChallenges"; // NEW IMPORT to check all challenges completion

const LOCAL_STORAGE_ENERGY_KEY = "cosmic-mission-energy";
const LOCAL_STORAGE_KEY_CHALLENGES = "cosmic-css-challenges-progress"; // NEW: Import key for challenges progress

const CosmicMission: React.FC = () => {
  useScrollToHash();
  const { setTheme, getMode, getPreviousUserMode } = useTheme();

  // State for main stage completion
  const [stage1Completed, setStage1Completed] = useState<boolean>(false);
  const [stage2Completed, setStage2Completed] = useState<boolean>(false);
  const [checklistCompleted, setChecklistCompleted] = useState<boolean>(false);

  // State for Cosmic Energy
  const [cosmicEnergy, setCosmicEnergy] = useState<number>(() => {
    try {
      const storedEnergy = localStorage.getItem(LOCAL_STORAGE_ENERGY_KEY);
      return storedEnergy ? JSON.parse(storedEnergy) : 200; // Default to 200
    } catch (error) {
      console.error("Failed to load cosmic energy from localStorage:", error);
      return 200;
    }
  });

  // NEW: State for individual challenge completion
  const [challengeCompletion, setChallengeCompletion] = useState<{ [key: string]: boolean }>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY_CHALLENGES);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error("Failed to load cosmic CSS challenges completion:", error);
      return {};
    }
  });

  // NEW: Determine if all CSS challenges are completed
  const allCssChallengesCompleted = cssChallenges.every(challenge => challengeCompletion[challenge.id]);

  // Persist cosmic energy to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ENERGY_KEY, JSON.stringify(cosmicEnergy));
    } catch (error) {
      console.error("Failed to save cosmic energy to localStorage:", error);
    }
  }, [cosmicEnergy]);

  // Function to add cosmic energy
  const addCosmicEnergy = useCallback((amount: number) => {
    setCosmicEnergy(prevEnergy => prevEnergy + amount);
  }, []);

  // Function to decrease cosmic energy (for hints/solutions)
  const decreaseCosmicEnergy = useCallback((amount: number, actionType: 'hint' | 'solution') => {
    setCosmicEnergy(prevEnergy => {
      const newEnergy = Math.max(0, prevEnergy - amount);
      if (newEnergy < prevEnergy) {
        toast.info(`Витрачено ${amount} од. Космічної Енергії за ${actionType === 'hint' ? 'підказку' : 'рішення'}. Залишилось: ${newEnergy}`);
      } else if (prevEnergy === 0) {
        toast.warning("Недостатньо Космічної Енергії!");
      }
      return newEnergy;
    });
  }, []);

  // Callback for CosmicMissionStage2Css to update challenge completion
  const handleChallengeCompletionChange = useCallback((id: string, isChecked: boolean) => {
    setChallengeCompletion(prev => ({
      ...prev,
      [id]: isChecked,
    }));
  }, []);

  // Effect to update stage2Completed based on allCssChallengesCompleted
  useEffect(() => {
    setStage2Completed(allCssChallengesCompleted);
  }, [allCssChallengesCompleted]);

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

      {/* Cosmic Energy Meter */}
      <CosmicEnergyMeter energy={cosmicEnergy} />

      <CosmicMissionStage1Html
        completed={stage1Completed}
        onCompletionChange={setStage1Completed}
      />

      <CosmicMissionStage2Css
        completed={stage2Completed}
        onCompletionChange={setStage2Completed}
        cosmicEnergy={cosmicEnergy}
        decreaseCosmicEnergy={decreaseCosmicEnergy}
        challengeCompletion={challengeCompletion} // Pass challenge completion state
        onChallengeCompletionChange={handleChallengeCompletionChange} // Pass handler
      />

      <CosmicMissionStage3Launch />

      <CosmicMissionChecklist onCompletionChange={setChecklistCompleted} />

      <CosmicMissionWhatsNext />

      <LessonNavigation />

      {/* Cosmic Energy Button */}
      <CosmicEnergyButton
        currentEnergy={cosmicEnergy}
        addEnergy={addCosmicEnergy}
        allCssChallengesCompleted={allCssChallengesCompleted}
      />
    </div>
  );
};

export default CosmicMission;