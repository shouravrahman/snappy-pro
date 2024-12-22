import React from 'react';
import { SnapshotOptions } from '../types';

interface CodeInputProps {
  code: string;
  onChange: (code: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Code
      </label>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 p-4 font-mono text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter your code here..."
      />
    </div>
  );
};