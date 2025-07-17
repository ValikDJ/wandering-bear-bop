import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomProgressBar } from "@/components/CustomProgressBar";

interface CosmicEnergyMeterProps {
  energy: number;
  maxEnergy: number; // NEW PROP
}

const CosmicEnergyMeter: React.FC<CosmicEnergyMeterProps> = ({ energy, maxEnergy }) => {
  const progress = (energy / maxEnergy) * 100;

  const progressColorClass = cn(
    progress > 70 && "bg-green-500",
    progress <= 70 && progress > 30 && "bg-yellow-500",
    progress <= 30 && "bg-red-500"
  );

  return (
    <Card className="mb-10 bg-card shadow-md no-print max-w-lg mx-auto"> {/* Added max-w-lg and mx-auto */}
      <CardContent className="p-4 flex items-center gap-4">
        <Zap className="h-8 w-8 text-primary flex-shrink-0" />
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Космічна Енергія:{" "}
            <span key={energy} className="inline-block animate-energy-pulse"> {/* Added key and animation class */}
              {energy}
            </span>{" "}
            / {maxEnergy}
          </h3>
          <CustomProgressBar value={progress} className="w-full h-3" indicatorClassName={progressColorClass} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CosmicEnergyMeter;