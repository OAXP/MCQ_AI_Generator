import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (answerId: string) => void;
  showResults?: boolean;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  showResults = false,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium mb-4">{question.text}</h3>
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = showResults && option.id === question.correctAnswerId;
          const isPartiallyCorrect =
            showResults && option.id === question.partialAnswerId;

          return (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              disabled={showResults}
              className={`w-full text-left p-3 rounded-md transition-colors ${
                isSelected
                  ? 'bg-blue-100 border-blue-500'
                  : 'hover:bg-gray-100'
              } ${
                showResults && isCorrect
                  ? 'bg-green-100 border-green-500'
                  : ''
              } ${
                showResults && isPartiallyCorrect
                  ? 'bg-yellow-100 border-yellow-500'
                  : ''
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 aspect-square rounded-full border mr-3 ${
                    isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                  }`}
                />
                <span>{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}