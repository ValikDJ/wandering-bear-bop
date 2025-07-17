import React, { useEffect, useRef, useState, useCallback } from "react";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { useTheme } from "@/hooks/use-theme";
import { ThemeMode } from "@/lib/ThemeManager";
import { toast } from "sonner";

// Імпорт нових модульних компонентів
import CosmicMissionHeader from "@/components/cosmic-mission/CosmicMissionHeader";
import CosmicMissionProgressBar from "@/components/cosmic-mission/CosmicMissionProgressBar";
import CosmicMissionStage1Html from "@/components/cosmic-mission/CosmicMissionStage1Html";
import CosmicMissionStage2Css from "@/components/cosmic-mission/CosmicMissionStage2Css";
import CosmicMissionStage3Launch from "@/components/cosmic-mission/CosmicMissionStage3Launch";
import CosmicMissionChecklist from "@/components/CosmicMissionChecklist";
import CosmicMissionWhatsNext from "@/components/cosmic-mission/CosmicMissionWhatsNext";
import CosmicEnergyMeter from "@/components/cosmic-mission/CosmicEnergyMeter";
import CosmicEnergyButton from "@/components/CosmicEnergyButton";
import CosmicShop from "@/components/cosmic-mission/CosmicShop"; // NEW IMPORT
import CosmicAchievements from "@/components/cosmic-mission/CosmicAchievements"; // NEW IMPORT
import { cssChallenges } from "@/data/cosmicCssChallenges";

const LOCAL_STORAGE_ENERGY_KEY = "cosmic-mission-energy";
const LOCAL_STORAGE_MAX_ENERGY_KEY = "cosmic-mission-max-energy";
const LOCAL_STORAGE_ENERGY_PER_CLICK_KEY = "cosmic-mission-energy-per-click";
const LOCAL_STORAGE_TOTAL_CLICKS_KEY = "cosmic-mission-total-clicks";
const LOCAL_STORAGE_TOTAL_ENERGY_COLLECTED_KEY = "cosmic-mission-total-energy-collected";
const LOCAL_STORAGE_KEY_CHALLENGES = "cosmic-css-challenges-progress";

const CosmicMission: React.FC = () => {
  useScrollToHash();
  const { setTheme, getMode, getPreviousUserMode } = useTheme();

  // State for main stage completion
  const [stage1Completed, setStage1Completed] = useState<boolean>(false);
  const [stage2Completed, setStage2Completed] = useState<boolean>(false);
  const [checklistCompleted, setChecklistCompleted] = useState<boolean>(false);

  // State for Cosmic Energy System
  const [cosmicEnergy, setCosmicEnergy] = useState<number>(() => {
    try {
      const storedEnergy = localStorage.getItem(LOCAL_STORAGE_ENERGY_KEY);
      return storedEnergy ? JSON.parse(storedEnergy) : 200;
    } catch (error) {
      console.error("Failed to load cosmic energy from localStorage:", error);
      return 200;
    }
  });

  const [maxEnergy, setMaxEnergy] = useState<number>(() => {
    try {
      const storedMaxEnergy = localStorage.getItem(LOCAL_STORAGE_MAX_ENERGY_KEY);
      return storedMaxEnergy ? JSON.parse(storedMaxEnergy) : 200;
    } catch (error) {
      console.error("Failed to load max energy from localStorage:", error);
      return 200;
    }
  });

  const [energyPerClick, setEnergyPerClick] = useState<number>(() => {
    try {
      const storedEnergyPerClick = localStorage.getItem(LOCAL_STORAGE_ENERGY_PER_CLICK_KEY);
      return storedEnergyPerClick ? JSON.parse(storedEnergyPerClick) : 1;
    } catch (error) {
      console.error("Failed to load energy per click from localStorage:", error);
      return 1;
    }
  });

  const [totalClicks, setTotalClicks] = useState<number>(() => {
    try {
      const storedTotalClicks = localStorage.getItem(LOCAL_STORAGE_TOTAL_CLICKS_KEY);
      return storedTotalClicks ? JSON.parse(storedTotalClicks) : 0;
    } catch (error) {
      console.error("Failed to load total clicks from localStorage:", error);
      return 0;
    }
  });

  const [totalEnergyCollected, setTotalEnergyCollected] = useState<number>(() => {
    try {
      const storedTotalEnergyCollected = localStorage.getItem(LOCAL_STORAGE_TOTAL_ENERGY_COLLECTED_KEY);
      return storedTotalEnergyCollected ? JSON.parse(storedTotalEnergyCollected) : 0;
    } catch (error) {
      console.error("Failed to load total energy collected from localStorage:", error);
      return 0;
    }
  });

  // State for individual challenge completion
  const [challengeCompletion, setChallengeCompletion] = useState<{ [key: string]: boolean }>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY_CHALLENGES);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error("Failed to load cosmic CSS challenges completion:", error);
      return {};
    }
  });

  // Determine if all CSS challenges are completed
  const allCssChallengesCompleted = cssChallenges.every(challenge => challengeCompletion[challenge.id]);

  // Persist energy system states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ENERGY_KEY, JSON.stringify(cosmicEnergy));
      localStorage.setItem(LOCAL_STORAGE_MAX_ENERGY_KEY, JSON.stringify(maxEnergy));
      localStorage.setItem(LOCAL_STORAGE_ENERGY_PER_CLICK_KEY, JSON.stringify(energyPerClick));
      localStorage.setItem(LOCAL_STORAGE_TOTAL_CLICKS_KEY, JSON.stringify(totalClicks));
      localStorage.setItem(LOCAL_STORAGE_TOTAL_ENERGY_COLLECTED_KEY, JSON.stringify(totalEnergyCollected));
    } catch (error) {
      console.error("Failed to save energy system data to localStorage:", error);
    }
  }, [cosmicEnergy, maxEnergy, energyPerClick, totalClicks, totalEnergyCollected]);

  // Passive energy regeneration
  useEffect(() => {
    const regenerationInterval = setInterval(() => {
      setCosmicEnergy(prevEnergy => {
        if (prevEnergy < maxEnergy) {
          return Math.min(prevEnergy + 1, maxEnergy);
        }
        return prevEnergy;
      });
    }, 10000); // +1 energy every 10 seconds

    return () => clearInterval(regenerationInterval);
  }, [maxEnergy]);

  // Function to add cosmic energy (from button click)
  const addCosmicEnergy = useCallback((amount: number) => {
    setCosmicEnergy(prevEnergy => Math.min(prevEnergy + amount, maxEnergy));
    setTotalClicks(prevClicks => prevClicks + 1);
    setTotalEnergyCollected(prevTotal => prevTotal + amount);
  }, [maxEnergy]);

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

  // Persist challenge completion to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CHALLENGES, JSON.stringify(challengeCompletion));
    } catch (error) {
      console.error("Failed to save cosmic CSS challenges progress:", error);
    }
  }, [challengeCompletion]);

  return (
    <div className="py-8">
      <CosmicMissionHeader />

      <CosmicMissionProgressBar
        stage1Completed={stage1Completed}
        stage2Completed={stage2Completed}
        checklistCompleted={checklistCompleted}
      />

      {/* Cosmic Energy Meter */}
      <CosmicEnergyMeter energy={cosmicEnergy} maxEnergy={maxEnergy} />

      <CosmicMissionStage1Html
        completed={stage1Completed}
        onCompletionChange={setStage1Completed}
      />

      <CosmicMissionStage2Css
        completed={stage2Completed}
        onCompletionChange={setStage2Completed}
        cosmicEnergy={cosmicEnergy}
        decreaseCosmicEnergy={decreaseCosmicEnergy}
        challengeCompletion={challengeCompletion}
        onChallengeCompletionChange={handleChallengeCompletionChange}
      />

      {/* NEW: Cosmic Shop Placeholder */}
      <CosmicShop
        maxEnergy={maxEnergy}
        setMaxEnergy={setMaxEnergy}
        energyPerClick={energyPerClick}
        setEnergyPerClick={setEnergyPerClick}
        currentEnergy={cosmicEnergy}
        decreaseCosmicEnergy={decreaseCosmicEnergy}
      />

      {/* NEW: Cosmic Achievements Placeholder */}
      <CosmicAchievements
        totalClicks={totalClicks}
        totalEnergyCollected={totalEnergyCollected}
        allCssChallengesCompleted={allCssChallengesCompleted}
      />

      <CosmicMissionStage3Launch />

      <CosmicMissionChecklist onCompletionChange={setChecklistCompleted} />

      <CosmicMissionWhatsNext />

      <LessonNavigation />

      {/* Cosmic Energy Button */}
      <CosmicEnergyButton
        currentEnergy={cosmicEnergy}
        addEnergy={() => addCosmicEnergy(energyPerClick)} // Pass energyPerClick
        energyPerClick={energyPerClick} // Pass energyPerClick for animation
        allCssChallengesCompleted={allCssChallengesCompleted}
      />
    </div>
  );
};

export default CosmicMission;