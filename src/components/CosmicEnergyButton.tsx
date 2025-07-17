import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CosmicEnergyButtonProps {
  currentEnergy: number;
  addEnergy: (amount: number) => void;
  allCssChallengesCompleted: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

const CosmicEnergyButton: React.FC<CosmicEnergyButtonProps> = ({
  currentEnergy,
  addEnergy,
  allCssChallengesCompleted,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lastAchievement, setLastAchievement] = useState(0);

  const energyMultiplier = allCssChallengesCompleted ? 2 : 1;
  const energyToAdd = 1 * energyMultiplier;

  const checkAchievements = useCallback((energy: number) => {
    const achievements = [100, 500, 1000];
    for (const threshold of achievements) {
      if (energy >= threshold && lastAchievement < threshold) {
        toast.success(`🎉 Досягнення! Ти зібрав ${threshold} од. Космічної Енергії!`);
        setLastAchievement(threshold);
        break; // Only show one achievement at a time
      }
    }
  }, [lastAchievement]);

  useEffect(() => {
    checkAchievements(currentEnergy);
  }, [currentEnergy, checkAchievements]);

  const handleClick = () => {
    if (isClicked) return; // Prevent spamming

    setIsClicked(true);
    setShowPlusOne(true);
    addEnergy(energyToAdd);

    // Generate particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 5; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * 40 - 20, // -20 to 20
        y: Math.random() * 40 - 20, // -20 to 20
        delay: i * 0.05, // Staggered animation
      });
    }
    setParticles(newParticles);

    setTimeout(() => {
      setIsClicked(false);
      setShowPlusOne(false);
      setParticles([]); // Clear particles after animation
    }, 800); // Match animation duration
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 no-print flex flex-col items-end">
      <div className="mb-1 p-1 px-2 bg-card rounded-lg shadow-lg flex items-center gap-1 text-foreground font-bold text-base"> {/* Зменшено mb-2 до mb-1, p-2 до p-1, px-2, text-lg до text-base */}
        <Zap className="h-5 w-5 text-yellow-500" /> {/* Зменшено h-6 w-6 до h-5 w-5 */}
        <span>{currentEnergy} ЕНЕРГІЇ</span>
      </div>
      <Button
        onClick={handleClick}
        className={cn(
          "relative w-16 h-16 rounded-full flex items-center justify-center text-white text-base font-bold shadow-lg", /* Зменшено w-20 h-20 до w-16 h-16, text-lg до text-base */
          "bg-gradient-to-br from-purple-600 to-blue-600",
          "transition-all duration-200 ease-out",
          "hover:from-purple-700 hover:to-blue-700",
          "animate-pulse-slow", // Constant pulse
          isClicked && "scale-110 shadow-2xl ring-4 ring-blue-400 ring-opacity-75 animate-none" // Click animation
        )}
        style={{
          boxShadow: isClicked ? "0 0 20px rgba(129, 140, 248, 0.8), 0 0 40px rgba(129, 140, 248, 0.6)" : "0 0 10px rgba(0,0,0,0.3)",
        }}
      >
        <Zap className="h-6 w-6" /> {/* Зменшено h-8 w-8 до h-6 w-6 */}
        {showPlusOne && (
          <span
            key={currentEnergy} // Key to re-render and re-trigger animation
            className={cn(
              "absolute text-xl font-extrabold text-yellow-300 pointer-events-none", /* Зменшено text-2xl до text-xl */
              "animate-float-up-fade-out"
            )}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            +{energyToAdd} ЕНЕРГІЯ
          </span>
        )}
        {particles.map(p => (
          <Sparkles
            key={p.id}
            className="absolute h-3 w-3 text-yellow-200 animate-particle-burst" /* Зменшено h-4 w-4 до h-3 w-3 */
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${p.x}px, ${p.y}px)`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </Button>
      {allCssChallengesCompleted && (
        <div className="mt-1 p-0.5 px-2 bg-green-500 text-white rounded-full text-xs font-semibold shadow-md animate-bounce-once"> {/* Зменшено mt-2 до mt-1, p-1 до p-0.5, text-sm до text-xs */}
          x2 БОНУС!
        </div>
      )}
    </div>
  );
};

export default CosmicEnergyButton;