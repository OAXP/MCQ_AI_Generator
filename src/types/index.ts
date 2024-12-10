export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctAnswerId: string;
  partialAnswerId?: string;
}

export interface Option {
  id: string;
  text: string;
  points: number;
}

export interface QuizState {
  questions: Question[];
  userAnswers: Record<string, string>;
  currentQuestionIndex: number;
}

export interface CourseContent {
  text: string;
  title: string;
  type: string;
}

export interface SavedQuestionnaire {
  id: string;
  title: string;
  timestamp: number;
  questions: Question[];
}