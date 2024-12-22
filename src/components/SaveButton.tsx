import React from 'react';
import { Save } from 'lucide-react';

interface SaveButtonProps {
  onClick: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
    >
      <Save className="w-4 h-4" />
      Save Snapshot
    </button>
  );
};