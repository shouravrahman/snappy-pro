import React from 'react';

export const WindowControls: React.FC = () => {
   return (
      <div className="flex items-center gap-3 px-4 py-2 bg-neutral-800 rounded-t-xl ">
         <div
            className="w-4 h-4 rounded-full bg-red-500
        hover:bg-red-600 transition-all duration-300
        cursor-pointer shadow-sm hover:shadow-md"
            title="Close"
         />
         <div
            className="w-4 h-4 rounded-full bg-yellow-500
        hover:bg-yellow-600 transition-all duration-300
        cursor-pointer shadow-sm hover:shadow-md"
            title="Minimize"
         />
         <div
            className="w-4 h-4 rounded-full bg-green-500
        hover:bg-green-600 transition-all duration-300
        cursor-pointer shadow-sm hover:shadow-md"
            title="Maximize"
         />
      </div>
   );
};
