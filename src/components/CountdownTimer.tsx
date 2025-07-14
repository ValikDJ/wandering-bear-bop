import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  deadline: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ deadline }) => {
  const calculateTimeLeft = () => {
    const difference = +deadline - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="flex flex-col items-center mx-2">
        <span className="text-5xl font-bold text-white"> {/* Changed to text-white */}
          {timeLeft[interval as keyof typeof timeLeft]}
        </span>
        <span className="text-lg text-white"> {/* Changed to text-white */}
          {interval === "days" ? "днів" : interval === "hours" ? "годин" : interval === "minutes" ? "хвилин" : "секунд"}
        </span>
      </span>
    );
  });

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg p-6 text-center countdown-timer no-print">
      <CardContent className="p-0">
        <h3 className="text-2xl font-semibold mb-4">До здачі залишилось:</h3>
        <div className="flex justify-center items-center">
          {timerComponents.length ? (
            timerComponents
          ) : (
            <span className="text-4xl font-bold text-red-300">Час вийшов!</span>
          )}
        </div>
        <p className="text-lg mt-4 text-white">Не забудь здати завдання до п'ятниці!</p> {/* Changed to text-white */}
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;