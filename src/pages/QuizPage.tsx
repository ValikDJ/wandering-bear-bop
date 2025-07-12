import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QuizQuestion from "@/components/QuizQuestion";
import LessonNavigation from "@/components/LessonNavigation";
import { quizData } from "@/data/quizData"; // Import quizData from the new file

const QuizPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    if (selectedAnswer === null) { // Allow answering only once per question
      setSelectedAnswer(option);
      setShowFeedback(true);
      if (option === currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizCompleted(false);
  };

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-foreground">Перевір Свої Знання!</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
        Пройди цей короткий тест, щоб перевірити, наскільки добре ти засвоїв основи HTML та CSS. Успіхів!
      </p>

      <Card className="mb-6 bg-card shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-card-foreground">
            {quizCompleted ? "Результати Тесту" : `Питання ${currentQuestionIndex + 1} з ${quizData.length}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {quizCompleted ? (
            <div className="text-center">
              <p className="text-2xl font-semibold mb-4">
                Тест завершено! Твій результат: {score} з {quizData.length}
              </p>
              <Button onClick={handleRestartQuiz} className="bg-primary text-primary-foreground hover:bg-primary/80">
                Спробувати ще раз
              </Button>
            </div>
          ) : (
            <>
              <QuizQuestion
                question={currentQuestion.question}
                options={currentQuestion.options}
                correctAnswer={currentQuestion.correctAnswer}
                onAnswer={handleAnswer}
                selectedAnswer={selectedAnswer}
                showFeedback={showFeedback}
              />
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="bg-accent text-accent-foreground hover:bg-accent/80"
                >
                  {currentQuestionIndex === quizData.length - 1 ? "Завершити Тест" : "Наступне Питання"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <LessonNavigation />
    </div>
  );
};

export default QuizPage;