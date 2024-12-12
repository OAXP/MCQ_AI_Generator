import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, QuizState, SavedQuestionnaire } from '../types';

interface QuizStore extends QuizState {
  setQuestions: (questions: Question[]) => void;
  setUserAnswer: (questionId: string, answerId: string) => void;
  setCurrentQuestionIndex: (index: number) => void;
  resetQuiz: () => void;
  savedQuestionnaires: SavedQuestionnaire[];
  saveQuestionnaire: (title: string, questions: Question[]) => void;
  renameQuestionnaire: (id: string, newTitle: string) => void;
  deleteQuestionnaire: (id: string) => void;
  clearAllQuestionnaires: () => void;
  calculateScore: () => {
    total: number;
    correct: number;
    partial: number;
    incorrect: number;
  };
}

const initialState = {
  questions: [],
  userAnswers: {},
  currentQuestionIndex: 0,
  savedQuestionnaires: [],
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setQuestions: (questions) => set({ questions }),

      setUserAnswer: (questionId, answerId) =>
        set((state) => ({
          userAnswers: { ...state.userAnswers, [questionId]: answerId },
        })),

      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

      resetQuiz: () => set({ questions: [], userAnswers: {}, currentQuestionIndex: 0 }),

      savedQuestionnaires: [],

      saveQuestionnaire: (title, questions) =>
        set((state) => ({
          savedQuestionnaires: [
            ...state.savedQuestionnaires,
            {
              id: crypto.randomUUID(),
              title,
              timestamp: Date.now(),
              questions,
            },
          ],
        })),

      renameQuestionnaire: (id, newTitle) =>
        set((state) => ({
            savedQuestionnaires: state.savedQuestionnaires.map((q) =>
                q.id === id ? { ...q, title: newTitle } : q
            ),
        })),

      deleteQuestionnaire: (id) =>
        set((state) => ({
          savedQuestionnaires: state.savedQuestionnaires.filter((q) => q.id !== id),
        })),

      clearAllQuestionnaires: () =>
        set({ savedQuestionnaires: [] }),

      calculateScore: () => {
        const state = get();
        const results = {
          total: state.questions.length,
          correct: 0,
          partial: 0,
          incorrect: 0,
        };

        state.questions.forEach((question) => {
          const userAnswer = state.userAnswers[question.id];
          const selectedOption = question.options.find((opt) => opt.id === userAnswer);
          
          if (!selectedOption) {
            results.incorrect++;
            return;
          }

          if (selectedOption.points === 1) results.correct++;
          else if (selectedOption.points === 0.5) results.partial++;
          else results.incorrect++;
        });

        return results;
      },
    }),
    {
      name: 'quiz-storage',
      partialize: (state) => ({ savedQuestionnaires: state.savedQuestionnaires }),
    }
  )
);