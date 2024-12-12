import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { SavedQuestionnaire } from '../types';
import toast from 'react-hot-toast';

interface ImportQuestionnaireProps {
  onImport: (questionnaire: SavedQuestionnaire) => void;
}

export function ImportQuestionnaire({ onImport }: ImportQuestionnaireProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        try {
          const text = await file.text();
          const questionnaire = JSON.parse(text);

          // Basic validation
          if (!questionnaire.questions || !Array.isArray(questionnaire.questions)) {
            throw new Error('Invalid questionnaire format');
          }

          onImport(questionnaire);
          toast.success('Questionnaire imported successfully!');
        } catch (error) {
          toast.error('Error importing questionnaire');
          console.error('Error importing questionnaire:', error);
        }
      }
    },
    [onImport]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400'
        }`}
    >
      <input {...getInputProps()} />
      <p className="text-sm text-gray-600">
        {isDragActive
          ? 'Drop the questionnaire file here...'
          : 'Import a questionnaire (JSON)'}
      </p>
    </div>
  );
}