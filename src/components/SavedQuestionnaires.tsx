import { useQuizStore } from '../store/quizStore';
import { SavedQuestionnaire } from '../types';

interface SavedQuestionnairesProps {
  onQuestionnaireSelect: (questions: SavedQuestionnaire) => void;
}

export function SavedQuestionnaires({ onQuestionnaireSelect }: SavedQuestionnairesProps) {
  const { savedQuestionnaires, deleteQuestionnaire, clearAllQuestionnaires } = useQuizStore();

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
      <div className="space-y-4">
        {savedQuestionnaires.map((questionnaire) => (
          <div
            key={questionnaire.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1">
              <h3 className="font-medium">{questionnaire.title}</h3>
              <p className="text-sm text-gray-500">
                {questionnaire.questions.length} questions •{' '}
                {new Date(questionnaire.timestamp).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onQuestionnaireSelect(questionnaire)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
              >
                Start
              </button>
              <button
                onClick={() => handleExport(questionnaire)}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
              >
                Export
              </button>
              <button
                onClick={() => deleteQuestionnaire(questionnaire.id)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}