import React from 'react';

interface CodeInputProps {
   code: string;
   onChange: (code: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, onChange }) => {
   return (
      <div className="bg-white p-6 rounded-xl shadow-subtle">
         <label className="block text-sm font-medium text-text-dark mb-2">
            Code
         </label>
         <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-64 p-4 font-code text-sm text-text-dark border border-neutral-200 rounded-lg
            focus:ring-2 focus:ring-primary-400 focus:border-primary-400
            transition-all duration-200 ease-in-out
            placeholder-neutral-400"
            placeholder="Enter your code here..."
         />
      </div>
   );
};
