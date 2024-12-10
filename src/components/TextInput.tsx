import { useState, FormEvent } from 'react';

interface TextInputProps {
  onContentAdded: (content: string) => void;
}

export function TextInput({ onContentAdded }: TextInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onContentAdded(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Or enter text directly
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          placeholder="Enter your content here..."
        />
      </div>
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 transition-colors"
      >
        Add Text
      </button>
    </form>
  );
}