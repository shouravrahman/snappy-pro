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

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
        <Settings className="w-6 h-6" />
        <h2>Customization</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <Select
            value={languages.find((l) => l.value === options.language)}
            options={languages}
            onChange={(option) => onOptionsChange({ language: option?.value as LanguageType })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme
          </label>
          <Select
            value={themes.find((t) => t.value === options.theme)}
            options={themes}
            onChange={(option) => onOptionsChange({ theme: option?.value as ThemeType })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Border Style
          </label>
          <Select
            value={borders.find((b) => b.value === options.borderType)}
            options={borders}
            onChange={(option) => onOptionsChange({ borderType: option?.value as BorderType })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Border Color
          </label>
          <input
            type="color"
            value={options.borderColor}
            onChange={(e) => onOptionsChange({ borderColor: e.target.value })}
            className="w-full h-10 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            File Name (Optional)
          </label>
          <input
            type="text"
            value={options.fileName || ''}
            onChange={(e) => onOptionsChange({ fileName: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="e.g., App.tsx"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Border Radius
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={options.borderRadius}
            onChange={(e) => onOptionsChange({ borderRadius: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Opacity
          </label>
          <input
            type="range"
            min="20"
            max="100"
            value={options.opacity}
            onChange={(e) => onOptionsChange({ opacity: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Padding
          </label>
          <input
            type="range"
            min="0"
            max="64"
            value={options.padding}
            onChange={(e) => onOptionsChange({ padding: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Size
          </label>
          <input
            type="range"
            min="12"
            max="24"
            value={options.fontSize}
            onChange={(e) => onOptionsChange({ fontSize: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.showLineNumbers}
              onChange={(e) => onOptionsChange({ showLineNumbers: e.target.checked })}
              className="rounded text-indigo-600"
            />
            <span className="text-sm text-gray-700">Show Line Numbers</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.includeWindowControls}
              onChange={(e) =>
                onOptionsChange({ includeWindowControls: e.target.checked })
              }
              className="rounded text-indigo-600"
            />
            <span className="text-sm text-gray-700">Window Controls</span>
          </label>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onExport('png')}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            PNG
          </button>
          <button
            onClick={() => onExport('jpeg')}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            JPEG
          </button>
          <button
            onClick={() => onExport('svg')}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            SVG
          </button>
        </div>
      </div>
    </div>
  );
};