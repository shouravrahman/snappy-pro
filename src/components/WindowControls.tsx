import React from 'react';

export const WindowControls: React.FC = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-t-lg">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
    </div>
  );
};