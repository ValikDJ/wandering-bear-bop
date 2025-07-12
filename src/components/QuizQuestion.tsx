import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (selectedOption: string) => void;
  selectedAnswer: string | null;
  showFeedback: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
  selectedAnswer,
  showFeedback,
}) => {
  return (
    <div className="mb-6 p-4 border border-border rounded-lg bg-background shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-secondary-foreground">{question}</h3>
      <div className="grid grid-cols-1 gap-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = showFeedback && option === correctAnswer;
          const isIncorrect = showFeedback && isSelected && option !== correctAnswer;

          return (
            <Button
              key={index}
              onClick={() => onAnswer(option)}
              disabled={selectedAnswer !== null && showFeedback}
              className={cn(
                "w-full justify-start text-left px-4 py-3 rounded-md transition-colors duration-200",
                "bg-muted text-muted-foreground hover:bg-muted/80",
                isSelected && "ring-2 ring-offset-2 ring-primary", // Highlight selected
                isCorrect && "bg-green-100 text-green-800 border-green-500 hover:bg-green-100", // Correct answer
                isIncorrect && "bg-red-100 text-red-800 border-red-500 hover:bg-red-100", // Incorrect selected answer
              )}
              variant="outline"
            >
              {option}
            </Button>
          );
        })}
      </div>
      {showFeedback && selectedAnswer && (
        <div className="mt-4 text-sm">
          {selectedAnswer === correctAnswer ? (
            <p className="text-green-600 font-medium">Правильно! 🎉</p>
          ) : (
            <p className="text-red-600 font-medium">Неправильно. Правильна відповідь: <span className="font-bold">{correctAnswer}</span></p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;