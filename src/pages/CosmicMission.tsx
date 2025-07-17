import React, { useEffect, useRef, useState, useCallback } from "react";
import LessonNavigation from "@/components/LessonNavigation";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { useTheme } from "@/hooks/use-theme";
import { ThemeMode } from "@/lib/ThemeManager";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"; // Import Button

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
import CosmicFloatingMenu from "@/components/cosmic-mission/CosmicFloatingMenu"; // NEW IMPORT
import { cssChallenges } from "@/data/cosmicCssChallenges";

const LOCAL_STORAGE_ENERGY_KEY = "cosmic-mission-energy";
const LOCAL_STORAGE_MAX_ENERGY_KEY = "cosmic-mission-max-energy";
const LOCAL_STORAGE_ENERGY_PER_CLICK_KEY = "cosmic-mission-energy-per-click";
const LOCAL_STORAGE_TOTAL_CLICKS_KEY = "cosmic-mission-total-clicks";
const LOCAL_STORAGE_TOTAL_ENERGY_COLLECTED_KEY = "cosmic-mission-total-energy-collected";
const LOCAL_STORAGE_REGENERATION_AMOUNT_KEY = "cosmic-mission-regeneration-amount";
const LOCAL_STORAGE_REGENERATION_INTERVAL_KEY = "cosmic-mission-regeneration-interval";
const LOCAL_STORAGE_KEY_CHALLENGES = "cosmic-css-challenges-progress";
const LOCAL_STORAGE_HAS_RAINBOW_CRYSTAL_KEY = "cosmic-mission-has-rainbow-crystal";
const LOCAL_STORAGE_HAS_STAR_BURST_KEY = "cosmic-mission-has-star-burst";
const LOCAL_STORAGE_HAS_COSMIC_MUSIC_KEY = "cosmic-mission-has-cosmic-music";
const LOCAL_STORAGE_ENERGY_SPENT_ON_CHALLENGES_KEY = "cosmic-mission-energy-spent-on-challenges";
const LOCAL_STORAGE_STAGE1_COMPLETED_KEY = "cosmic-mission-stage1-completed"; // Added for reset
const LOCAL_STORAGE_STAGE2_COMPLETED_KEY = "cosmic-mission-stage2-completed"; // Added for reset
const LOCAL_STORAGE_CHECKLIST_COMPLETED_KEY = "cosmic-mission-checklist-progress"; // Added for reset

const CosmicMission: React.FC = () => {
  useScrollToHash();
  const { setTheme, getMode, getPreviousUserMode } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null); // Ref for audio element

  // State for main stage completion
  const [stage1Completed, setStage1Completed] = useState<boolean>(false);
  const [stage2Completed, setStage2Completed] = useState<boolean>(false);
  const [checklistCompleted, setChecklistCompleted] = useState<boolean>(false);

  // State for Cosmic Energy System
  const [cosmicEnergy, setCosmicEnergy] = useState<number>(() => {
    try {
      const storedEnergy = localStorage.getItem(LOCAL_STORAGE_ENERGY_KEY);
      return storedEnergy ? JSON.parse(storedEnergy) : 100; // Changed from 200 to 100
    } catch (error) {
      console.error("Failed to load cosmic energy from localStorage:", error);
      return 100; // Changed from 200 to 100
    }
  });

  // Max energy is now fixed at 200
  const maxEnergy = 200;

  const [energyPerClick, setEnergyPerClick] = useState<number>(() => {
    try {
      const storedEnergyPerClick = localStorage.getItem(LOCAL_STORAGE_ENERGY_PER_CLICK_KEY);
      return storedEnergyPerClick ? JSON.parse(storedEnergyPerClick) : 1;
    }
    catch (error) {
      console.error("Failed to load energy per click from localStorage:", error);
      return 1;
    }
  });

  const [regenerationAmountPerTick, setRegenerationAmountPerTick] = useState<number>(() => {
    try {
      const storedAmount = localStorage.getItem(LOCAL_STORAGE_REGENERATION_AMOUNT_KEY);
      return storedAmount ? JSON.parse(storedAmount) : 1;
    } catch (error) {
      console.error("Failed to load regeneration amount from localStorage:", error);
      return 1;
    }
  });

  const [regenerationTickIntervalMs, setRegenerationTickIntervalMs] = useState<number>(() => {
    try {
      const storedInterval = localStorage.getItem(LOCAL_STORAGE_REGENERATION_INTERVAL_KEY);
      return storedInterval ? JSON.parse(storedInterval) : 10000; // Default: 1 energy every 10 seconds
    } catch (error) {
      console.error("Failed to load regeneration interval from localStorage:", error);
      return 10000;
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

  // Visual Upgrades states
  const [hasRainbowCrystal, setHasRainbowCrystal] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_HAS_RAINBOW_CRYSTAL_KEY);
      return stored ? JSON.parse(stored) : false;
    } catch (error) { return false; }
  });
  const [hasStarBurst, setHasStarBurst] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_HAS_STAR_BURST_KEY);
      return stored ? JSON.parse(stored) : false;
    } catch (error) { return false; }
  });
  const [hasCosmicMusic, setHasCosmicMusic] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_HAS_COSMIC_MUSIC_KEY);
      return stored ? JSON.parse(stored) : false;
    } catch (error) { return false; }
  });
  const [energySpentOnChallenges, setEnergySpentOnChallenges] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ENERGY_SPENT_ON_CHALLENGES_KEY);
      return stored ? JSON.parse(stored) : 0;
    } catch (error) { return 0; }
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
      // localStorage.setItem(LOCAL_STORAGE_MAX_ENERGY_KEY, JSON.stringify(maxEnergy)); // Max energy is now fixed
      localStorage.setItem(LOCAL_STORAGE_ENERGY_PER_CLICK_KEY, JSON.stringify(energyPerClick));
      localStorage.setItem(LOCAL_STORAGE_REGENERATION_AMOUNT_KEY, JSON.stringify(regenerationAmountPerTick));
      localStorage.setItem(LOCAL_STORAGE_REGENERATION_INTERVAL_KEY, JSON.stringify(regenerationTickIntervalMs));
      localStorage.setItem(LOCAL_STORAGE_TOTAL_CLICKS_KEY, JSON.stringify(totalClicks));
      localStorage.setItem(LOCAL_STORAGE_TOTAL_ENERGY_COLLECTED_KEY, JSON.stringify(totalEnergyCollected));
      localStorage.setItem(LOCAL_STORAGE_HAS_RAINBOW_CRYSTAL_KEY, JSON.stringify(hasRainbowCrystal));
      localStorage.setItem(LOCAL_STORAGE_HAS_STAR_BURST_KEY, JSON.stringify(hasStarBurst));
      localStorage.setItem(LOCAL_STORAGE_HAS_COSMIC_MUSIC_KEY, JSON.stringify(hasCosmicMusic));
      localStorage.setItem(LOCAL_STORAGE_ENERGY_SPENT_ON_CHALLENGES_KEY, JSON.stringify(energySpentOnChallenges));
    } catch (error) {
      console.error("Failed to save energy system data to localStorage:", error);
    }
  }, [cosmicEnergy, maxEnergy, energyPerClick, regenerationAmountPerTick, regenerationTickIntervalMs, totalClicks, totalEnergyCollected, hasRainbowCrystal, hasStarBurst, hasCosmicMusic, energySpentOnChallenges]);

  // Passive energy regeneration
  useEffect(() => {
    const regenerationInterval = setInterval(() => {
      setCosmicEnergy(prevEnergy => {
        if (prevEnergy < maxEnergy) {
          return Math.min(prevEnergy + regenerationAmountPerTick, maxEnergy);
        }
        return prevEnergy;
      });
    }, regenerationTickIntervalMs);

    return () => clearInterval(regenerationInterval);
  }, [maxEnergy, regenerationAmountPerTick, regenerationTickIntervalMs]);

  // Function to add cosmic energy (from button click)
  const addCosmicEnergy = useCallback((amount: number) => {
    setCosmicEnergy(prevEnergy => Math.min(prevEnergy + amount, maxEnergy));
    setTotalClicks(prevClicks => prevClicks + 1);
    setTotalEnergyCollected(prevTotal => prevTotal + amount);
    if (hasCosmicMusic && audioRef.current) {
      audioRef.current.currentTime = 0; // Rewind to start
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [maxEnergy, hasCosmicMusic]);

  // Function to decrease cosmic energy (for hints/solutions/purchases)
  const decreaseCosmicEnergy = useCallback((amount: number, actionType: 'hint' | 'solution' | 'purchase') => {
    setCosmicEnergy(prevEnergy => {
      const newEnergy = Math.max(0, prevEnergy - amount);
      if (newEnergy < prevEnergy) {
        if (actionType === 'hint' || actionType === 'solution') {
          setEnergySpentOnChallenges(prevSpent => prevSpent + amount);
          toast.info(`Витрачено ${amount} од. Космічної Енергії за ${actionType === 'hint' ? 'підказку' : 'рішення'}. Залишилось: ${newEnergy}`);
        } else if (actionType === 'purchase') {
          // Toast for purchase is handled in CosmicShop
        }
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

  const handleResetProgress = () => {
    if (window.confirm("Ви впевнені, що хочете скинути весь прогрес Космічної Місії? Це видалить всі збережені дані.")) {
      localStorage.removeItem(LOCAL_STORAGE_ENERGY_KEY);
      localStorage.removeItem(LOCAL_STORAGE_MAX_ENERGY_KEY);
      localStorage.removeItem(LOCAL_STORAGE_ENERGY_PER_CLICK_KEY);
      localStorage.removeItem(LOCAL_STORAGE_TOTAL_CLICKS_KEY);
      localStorage.removeItem(LOCAL_STORAGE_TOTAL_ENERGY_COLLECTED_KEY);
      localStorage.removeItem(LOCAL_STORAGE_REGENERATION_AMOUNT_KEY);
      localStorage.removeItem(LOCAL_STORAGE_REGENERATION_INTERVAL_KEY);
      localStorage.removeItem(LOCAL_STORAGE_KEY_CHALLENGES);
      localStorage.removeItem(LOCAL_STORAGE_HAS_RAINBOW_CRYSTAL_KEY);
      localStorage.removeItem(LOCAL_STORAGE_HAS_STAR_BURST_KEY);
      localStorage.removeItem(LOCAL_STORAGE_HAS_COSMIC_MUSIC_KEY);
      localStorage.removeItem(LOCAL_STORAGE_ENERGY_SPENT_ON_CHALLENGES_KEY);
      // Clear stage completion states as well
      localStorage.removeItem("cosmic-mission-stage1-completed");
      localStorage.removeItem("cosmic-mission-stage2-completed");
      localStorage.removeItem("cosmic-mission-checklist-progress");

      toast.success("Прогрес Космічної Місії скинуто!");
      window.location.reload(); // Reload the page to reset all states
    }
  };

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

      {/* NEW: Cosmic Floating Menu (Shop and Achievements) */}
      <CosmicFloatingMenu
        maxEnergy={maxEnergy}
        setMaxEnergy={() => { /* Max energy is fixed, no-op */ }}
        energyPerClick={energyPerClick}
        setEnergyPerClick={setEnergyPerClick}
        regenerationAmountPerTick={regenerationAmountPerTick}
        setRegenerationAmountPerTick={setRegenerationAmountPerTick}
        regenerationTickIntervalMs={regenerationTickIntervalMs}
        setRegenerationTickIntervalMs={setRegenerationTickIntervalMs}
        currentEnergy={cosmicEnergy}
        decreaseCosmicEnergy={decreaseCosmicEnergy}
        hasRainbowCrystal={hasRainbowCrystal}
        setHasRainbowCrystal={setHasRainbowCrystal}
        hasStarBurst={hasStarBurst}
        setHasStarBurst={setHasStarBurst}
        hasCosmicMusic={hasCosmicMusic}
        setHasCosmicMusic={setHasCosmicMusic}
        totalClicks={totalClicks}
        totalEnergyCollected={totalEnergyCollected}
        allCssChallengesCompleted={allCssChallengesCompleted}
        energySpentOnChallenges={energySpentOnChallenges}
      />

      <CosmicMissionStage3Launch />

      <CosmicMissionChecklist onCompletionChange={setChecklistCompleted} />

      <CosmicMissionWhatsNext />

      <LessonNavigation />

      {/* Cosmic Energy Button */}
      <CosmicEnergyButton
        currentEnergy={cosmicEnergy}
        addEnergy={() => addCosmicEnergy(energyPerClick)}
        energyPerClick={energyPerClick}
        allCssChallengesCompleted={allCssChallengesCompleted}
        hasRainbowCrystal={hasRainbowCrystal}
        hasStarBurst={hasStarBurst}
        hasCosmicMusic={hasCosmicMusic}
      />
      {/* Audio element for cosmic music */}
      <audio ref={audioRef} src="/sounds/cosmic_beep.mp3" preload="auto" />

      <div className="text-center mt-12 no-print">
        <Button
          onClick={handleResetProgress}
          variant="destructive"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg"
        >
          Скинути Прогрес Місії
        </Button>
      </div>
    </div>
  );
};

export default CosmicMission;