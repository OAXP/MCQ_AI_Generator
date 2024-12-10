interface ContentSourcesProps {
  sources: { id: string; title: string; type: string }[];
  onRemoveSource: (id: string) => void;
  onClearSources: () => void;
}

export function ContentSources({ sources, onRemoveSource, onClearSources }: ContentSourcesProps) {
  if (sources.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Added Sources</h3>
        <button
          onClick={onClearSources}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Clear All
        </button>
      </div>
      <div className="space-y-2">
        {sources.map((source) => (
          <div
            key={source.id}
            className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
          >
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                {source.type}
              </span>
              <span className="text-sm text-gray-700">{source.title}</span>
            </div>
            <button
              onClick={() => onRemoveSource(source.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}