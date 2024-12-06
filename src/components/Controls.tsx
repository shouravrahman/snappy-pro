import React from 'react';
import Select from 'react-select';
import { Settings, Download, Code } from 'lucide-react';
import { ThemeType, BorderType, ExportFormat, SnapshotOptions, LanguageType } from '../types';

interface ControlsProps {
   options: SnapshotOptions;
   onOptionsChange: (options: Partial<SnapshotOptions>) => void;
   onExport: (format: ExportFormat) => void;
}

export const Controls: React.FC<ControlsProps> = ({
   options,
   onOptionsChange,
   onExport,
}) => {
   const themes: { value: ThemeType; label: string }[] = [
      { value: 'dracula', label: 'Dracula' },
      { value: 'atomOneDark', label: 'Atom One Dark' },
      { value: 'vs', label: 'Visual Studio' },
      { value: 'tomorrow', label: 'Tomorrow' },
      { value: 'twilight', label: 'Twilight' },
   ];

   const borders: { value: BorderType; label: string }[] = [
      { value: 'none', label: 'None' },
      { value: 'simple', label: 'Simple' },
      { value: 'gradient', label: 'Gradient' },
      { value: 'neon', label: 'Neon' },
      { value: 'shadow', label: 'Shadow' },
      { value: 'dotted', label: 'Dotted' },
   ];

   const languages: { value: LanguageType; label: string }[] = [
      { value: 'typescript', label: 'TypeScript' },
      { value: 'javascript', label: 'JavaScript' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: 'cpp', label: 'C++' },
      { value: 'html', label: 'HTML' },
      { value: 'css', label: 'CSS' },
      { value: 'json', label: 'JSON' },
      { value: 'markdown', label: 'Markdown' },
   ];

   const customStyles = {
      control: (base) => ({
         ...base,
         borderColor: 'rgb(209 213 219)',
         borderRadius: '0.5rem',
         boxShadow: 'none',
         '&:hover': {
            borderColor: 'rgb(99 102 241)',
         },
      }),
      option: (base, state) => ({
         ...base,
         backgroundColor: state.isSelected ? 'rgb(99 102 241)' : 'white',
         color: state.isSelected ? 'white' : 'black',
         '&:hover': {
            backgroundColor: 'rgb(199 210 254)',
         },
      }),
   };

   return (
      <div className="bg-white p-6 rounded-xl shadow-subtle space-y-6">
         <div className="flex items-center gap-2 text-xl font-semibold text-text-dark">
            <Settings className="w-6 h-6 text-primary-600" />
            <h2>Customization</h2>
         </div>

         <div className="space-y-4">
            <div>
               <label className="block text-sm font-medium text-text-dark mb-2">
                  Language
               </label>
               <Select
                  styles={customStyles}
                  value={languages.find((l) => l.value === options.language)}
                  options={languages}
                  onChange={(option) => onOptionsChange({ language: option?.value as LanguageType })}
                  className="w-full"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-text-dark mb-2">
                  Theme
               </label>
               <Select
                  styles={customStyles}
                  value={themes.find((t) => t.value === options.theme)}
                  options={themes}
                  onChange={(option) => onOptionsChange({ theme: option?.value as ThemeType })}
                  className="w-full"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-text-dark mb-2">
                  Border Style
               </label>
               <Select
                  styles={customStyles}
                  value={borders.find((b) => b.value === options.borderType)}
                  options={borders}
                  onChange={(option) => onOptionsChange({ borderType: option?.value as BorderType })}
                  className="w-full"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-text-dark mb-2">
                  Border Color
               </label>
               <input
                  type="color"
                  value={options.borderColor}
                  onChange={(e) => onOptionsChange({ borderColor: e.target.value })}
                  className="w-full h-12 border-none rounded-lg cursor-pointer
                  focus:ring-2 focus:ring-primary-400
                  transition-all duration-200 ease-in-out"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-text-dark mb-2">
                  File Name (Optional)
               </label>
               <input
                  type="text"
                  value={options.fileName || ''}
                  onChange={(e) => onOptionsChange({ fileName: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg
                  focus:ring-2 focus:ring-primary-400 focus:border-primary-400
                  text-text-dark placeholder-neutral-400
                  transition-all duration-200 ease-in-out"
                  placeholder="e.g., App.tsx"
               />
            </div>

            <div className="space-y-2">
               <label className="block text-sm font-medium text-text-dark">
                  Border Radius: {options.borderRadius}px
               </label>
               <input
                  type="range"
                  min="0"
                  max="20"
                  value={options.borderRadius}
                  onChange={(e) => onOptionsChange({ borderRadius: Number(e.target.value) })}
                  className="w-full h-2 bg-neutral-200 rounded-full
                  appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:bg-primary-600
                  [&::-webkit-slider-thumb]:rounded-full
                  focus:outline-none focus:ring-2 focus:ring-primary-400"
               />
            </div>

            <div className="space-y-2">
               <label className="block text-sm font-medium text-text-dark">
                  Opacity: {options.opacity}%
               </label>
               <input
                  type="range"
                  min="20"
                  max="100"
                  value={options.opacity}
                  onChange={(e) => onOptionsChange({ opacity: Number(e.target.value) })}
                  className="w-full h-2 bg-neutral-200 rounded-full
                  appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:bg-primary-600
                  [&::-webkit-slider-thumb]:rounded-full
                  focus:outline-none focus:ring-2 focus:ring-primary-400"
               />
            </div>

            <div className="space-y-2">
               <label className="block text-sm font-medium text-text-dark">
                  Padding: {options.padding}px
               </label>
               <input
                  type="range"
                  min="0"
                  max="64"
                  value={options.padding}
                  onChange={(e) => onOptionsChange({ padding: Number(e.target.value) })}
                  className="w-full h-2 bg-neutral-200 rounded-full
                  appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:bg-primary-600
                  [&::-webkit-slider-thumb]:rounded-full
                  focus:outline-none focus:ring-2 focus:ring-primary-400"
               />
            </div>

            <div className="space-y-2">
               <label className="block text-sm font-medium text-text-dark">
                  Font Size: {options.fontSize}px
               </label>
               <input
                  type="range"
                  min="12"
                  max="24"
                  value={options.fontSize}
                  onChange={(e) => onOptionsChange({ fontSize: Number(e.target.value) })}
                  className="w-full h-2 bg-neutral-200 rounded-full
                  appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:bg-primary-600
                  [&::-webkit-slider-thumb]:rounded-full
                  focus:outline-none focus:ring-2 focus:ring-primary-400"
               />
            </div>

            <div className="flex items-center space-x-4">
               <label className="flex items-center gap-2 cursor-pointer">
                  <input
                     type="checkbox"
                     checked={options.showLineNumbers}
                     onChange={(e) => onOptionsChange({ showLineNumbers: e.target.checked })}
                     className="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 rounded
                     focus:ring-primary-500 focus:ring-2 cursor-pointer"
                  />
                  <span className="text-sm text-text-dark">Show Line Numbers</span>
               </label>
               <label className="flex items-center gap-2 cursor-pointer">
                  <input
                     type="checkbox"
                     checked={options.includeWindowControls}
                     onChange={(e) =>
                        onOptionsChange({ includeWindowControls: e.target.checked })
                     }
                     className="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 rounded
                     focus:ring-primary-500 focus:ring-2 cursor-pointer"
                  />
                  <span className="text-sm text-text-dark">Window Controls</span>
               </label>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
               {['png', 'jpeg', 'svg'].map((format) => (
                  <button
                     key={format}
                     onClick={() => onExport(format as ExportFormat)}
                     className="bg-primary-600 text-white px-4 py-2 rounded-lg
                     hover:bg-primary-700 flex items-center justify-center gap-2
                     transition-colors duration-200 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
                  >
                     <Download className="w-4 h-4" />
                     {format.toUpperCase()}
                  </button>
               ))}
            </div>
         </div>
      </div>
   );
};
