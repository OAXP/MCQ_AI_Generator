import { useQuizStore } from '../store/quizStore';
import { SavedQuestionnaire } from '../types';
import {QuestionnaireCard} from "./QuestionnaireCard.tsx";

interface SavedQuestionnairesProps {
  onQuestionnaireSelect: (questions: SavedQuestionnaire) => void;
}

export function SavedQuestionnaires({ onQuestionnaireSelect }: SavedQuestionnairesProps) {
  const { savedQuestionnaires, deleteQuestionnaire, clearAllQuestionnaires, renameQuestionnaire } = useQuizStore();

  const handleExport = (questionnaire: SavedQuestionnaire) => {
    const blob = new Blob([JSON.stringify(questionnaire, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${questionnaire.title.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (savedQuestionnaires.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Saved Questionnaires</h2>
        <button
          onClick={clearAllQuestionnaires}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="space-y-4 max-h-72 overflow-y-visible overflow-x-hidden [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300
      [&::-webkit-scrollbar-track]:!rounded [&::-webkit-scrollbar-thumb]:!rounded">
        {savedQuestionnaires.map((questionnaire) => (
          <QuestionnaireCard
              key={questionnaire.id}
              questionnaire={questionnaire}
              onRename={renameQuestionnaire}
              onSelect={onQuestionnaireSelect}
              onExport={handleExport}
              onDelete={deleteQuestionnaire}
          />
        ))}
      </div>
    </div>
  );
}