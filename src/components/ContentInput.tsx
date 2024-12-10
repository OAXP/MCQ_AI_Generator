import { useState } from 'react';
import { FileUpload } from './FileUpload';
import { TextInput } from './TextInput';
import { ContentSources } from './ContentSources';
import { generateQuestions } from '../services/questionGenerator';
import { useQuizStore } from '../store/quizStore';
import toast from 'react-hot-toast';

interface ContentInputProps {
  onQuestionsGenerated: () => void;
}

interface ContentSource {
  id: string;
  title: string;
  type: string;
  content: string;
}

export function ContentInput({ onQuestionsGenerated }: ContentInputProps) {
  const [sources, setSources] = useState<ContentSource[]>([]);
  const [numQuestions, setNumQuestions] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const { setQuestions, saveQuestionnaire } = useQuizStore();

  const handleContentAdded = (content: string, title: string, type: string) => {
    setSources((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        type,
        content,
      },
    ]);
    toast.success('Content added successfully!');
  };

  const handleRemoveSource = (id: string) => {
    setSources((prev) => prev.filter((source) => source.id !== id));
  };

  const handleClearSources = () => {
    setSources([]);
  };

  const handleGenerate = async () => {
    if (sources.length === 0) {
      toast.error('Please add some content first!');
      return;
    }

    try {
      setIsGenerating(true);
      const combinedContent = sources.map((source) => source.content).join('\n\n');
      const questions = await generateQuestions(combinedContent, numQuestions);
      setQuestions(questions);
      saveQuestionnaire(`Quiz ${new Date().toLocaleString()}`, questions);
      onQuestionsGenerated();
    } catch (error) {
      toast.error('Error generating questions');
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Add Content</h2>
        <div className="space-y-4">
          <FileUpload 
            onContentParsed={(content, title) => 
              handleContentAdded(content, title, 'file')
            } 
          />
          <TextInput 
            onContentAdded={(content) => 
              handleContentAdded(content, 'Text Input', 'text')
            } 
          />
          
          <ContentSources
            sources={sources.map(({ id, title, type }) => ({ id, title, type }))}
            onRemoveSource={handleRemoveSource}
            onClearSources={handleClearSources}
          />

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Number of questions to generate
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {sources.length} source{sources.length !== 1 ? 's' : ''} added
            </span>
            <button
              onClick={handleGenerate}
              disabled={isGenerating || sources.length === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Generate Questions'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}