import React, { useState, useEffect, useRef } from 'react';

interface EditableTitleProps {
    title: string;
    isEditing: boolean;
    onEdit: (newTitle: string) => void;
    onStartEditing: () => void;
    onCancelEditing: () => void;
}

export function EditableTitle({
      title,
      isEditing,
      onEdit,
      onStartEditing,
      onCancelEditing,
  }: EditableTitleProps) {
    const [editedTitle, setEditedTitle] = useState(title);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedTitle = editedTitle.trim();
        if (trimmedTitle && trimmedTitle !== title) {
            onEdit(trimmedTitle);
        } else {
            onCancelEditing();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onCancelEditing();
        }
    };

    if (isEditing) {
        return (
            <form onSubmit={handleSubmit} className="mb-1">
                <input
                    ref={inputRef}
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={handleSubmit}
                    onKeyDown={handleKeyDown}
                    className="w-3/4 px-2 py-1 text-base font-medium border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </form>
        );
    }

    return (
        <h3
            onClick={onStartEditing}
            className="font-medium mb-1 cursor-pointer hover:text-blue-600"
            title="Click to rename"
        >
            {title}
        </h3>
    );
}