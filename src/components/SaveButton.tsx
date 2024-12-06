import React from 'react';
import { Save } from 'lucide-react';

interface SaveButtonProps {
   onClick: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
   return (
      <button
         onClick={onClick}
         className="w-full flex items-center justify-center gap-2
         bg-primary-600 text-white px-4 py-2
         rounded-xl shadow-medium
         hover:bg-primary-700
         transition-all duration-300
         transform hover:scale-[1.02]
         active:scale-[0.98]"
      >
         <Save className="w-5 h-5 text-white" strokeWidth={2} />
         <span className="font-medium">Save Snapshot</span>
      </button>
   );
};
