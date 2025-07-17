import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface CosmicEnergyMeterProps {
  energy: number;
}

const CosmicEnergyMeter: React.FC<CosmicEnergyMeterProps> = ({ energy }) => {
  const progressColorClass = cn(
    energy > 70 && "bg-green-500",
    energy <= 70 && energy > 30 && "bg-yellow-500",
    energy <= 30 && "bg-red-500"
  );

  return (
    <Card className="mb-10 bg-card shadow-md no-print">
      <CardContent className="p-4 flex items-center gap-4">
        <Zap className="h-8 w-8 text-primary flex-shrink-0" />
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-foreground mb-2">Космічна Енергія: {energy} / 100</h3>
          <Progress value={energy} className="w-full h-3" indicatorClassName={progressColorClass} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CosmicEnergyMeter;