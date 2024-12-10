import { useState } from 'react';
import { ContentInput } from './components/ContentInput';
import { QuestionCard } from './components/QuestionCard';
import { QuizResults } from './components/QuizResults';
import { SavedQuestionnaires } from './components/SavedQuestionnaires';
import { ImportQuestionnaire } from './components/ImportQuestionnaire';
import { useQuizStore } from './store/quizStore';
import { SavedQuestionnaire } from './types';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [showResults, setShowResults] = useState(false);
  const {
    questions,
    userAnswers,
    currentQuestionIndex,
    setQuestions,
    setUserAnswer,
    setCurrentQuestionIndex,
    resetQuiz,
    saveQuestionnaire,
  } = useQuizStore();

  const handleQuestionnaireSelect = (questionnaire: SavedQuestionnaire) => {
    setQuestions(questionnaire.questions);
  };

  const handleAnswerSelect = (answerId: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setUserAnswer(currentQuestion.id, answerId);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleRetry = () => {
    resetQuiz();
    setShowResults(false);
  };

  const handleImport = (questionnaire: SavedQuestionnaire) => {
    saveQuestionnaire(questionnaire.title, questionnaire.questions);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Quiz Generation Platform
        </h1>

        {questions.length === 0 ? (
          <>
            <div className="flex justify-end">
              <ImportQuestionnaire onImport={handleImport} />
            </div>
            <SavedQuestionnaires onQuestionnaireSelect={handleQuestionnaireSelect} />
            <ContentInput onQuestionsGenerated={() => setShowResults(false)} />
          </>
        ) : showResults ? (
          <QuizResults
            questions={questions}
            userAnswers={userAnswers}
            onRetry={handleRetry}
          />
        ) : (
          <div className="space-y-6">
            <QuestionCard
              question={questions[currentQuestionIndex]}
              selectedAnswer={userAnswers[questions[currentQuestionIndex].id]}
              onAnswerSelect={handleAnswerSelect}
            />

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 transition-colors"
              >
                Previous
              </button>

              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              )}
            </div>

            <div className="text-center text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}