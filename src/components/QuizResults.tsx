import { Question } from '../types';

interface QuizResultsProps {
  questions: Question[];
  userAnswers: Record<string, string>;
  onRetry: () => void;
}

export function QuizResults({
  questions,
  userAnswers,
  onRetry,
}: QuizResultsProps) {
  const calculateScore = () => {
    let totalPoints = 0;
    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      const selectedOption = question.options.find(
        (opt) => opt.id === userAnswer
      );
      if (selectedOption) {
        totalPoints += selectedOption.points;
      }
    });
    return (totalPoints / questions.length) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
      <div className="mb-6">
        <p className="text-xl">
          Final Score: {calculateScore().toFixed(1)}%
        </p>
      </div>
      
      <div className="space-y-6">
        {questions.map((question) => {
          const userAnswer = userAnswers[question.id];
          const selectedOption = question.options.find(
            (opt) => opt.id === userAnswer
          );
          const correctOption = question.options.find(
            (opt) => opt.id === question.correctAnswerId
          );

          return (
            <div key={question.id} className="border-t pt-4">
              <p className="font-medium mb-2">{question.text}</p>
              <p className="text-sm">
                Your answer:{' '}
                <span
                  className={
                    selectedOption?.points === 1
                      ? 'text-green-600'
                      : selectedOption?.points === 0.5
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }
                >
                  {selectedOption?.text || 'Not answered'}
                </span>
              </p>
              <p className="text-sm text-green-600">
                Correct answer: {correctOption?.text}
              </p>
            </div>
          );
        })}
      </div>

      <button
        onClick={onRetry}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}