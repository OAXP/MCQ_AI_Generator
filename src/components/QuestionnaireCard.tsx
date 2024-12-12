import { useState } from 'react';
import { SavedQuestionnaire } from '../types';
import { EditableTitle } from './EditableTitle';

interface QuestionnaireCardProps {
    questionnaire: SavedQuestionnaire;
    onRename: (id: string, newTitle: string) => void;
    onSelect: (questionnaire: SavedQuestionnaire) => void;
    onExport: (questionnaire: SavedQuestionnaire) => void;
    onDelete: (id: string) => void;
}

export function QuestionnaireCard({
      questionnaire,
      onRename,
      onSelect,
      onExport,
      onDelete,
  }: QuestionnaireCardProps) {
    const [isEditing, setIsEditing] = useState(false);

    const handleRename = (newTitle: string) => {
        onRename(questionnaire.id, newTitle);
        setIsEditing(false);
    };

    return (
        <div className="flex items-center justify-between p-4 mx-3 border rounded-lg hover:bg-gray-50">
            <div className="flex-1">
                <EditableTitle
                    title={questionnaire.title}
                    isEditing={isEditing}
                    onEdit={handleRename}
                    onStartEditing={() => setIsEditing(true)}
                    onCancelEditing={() => setIsEditing(false)}
                />
                <p className="text-sm text-gray-500">
                    {questionnaire.questions.length} questions •{' '}
                    {new Date(questionnaire.timestamp).toLocaleDateString()}
                </p>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => onSelect(questionnaire)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                >
                    Start
                </button>
                <button
                    onClick={() => onExport(questionnaire)}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                >
                    Export
                </button>
                <button
                    onClick={() => onDelete(questionnaire.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}