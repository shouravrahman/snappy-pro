import React from 'react';
import { SnapshotOptions } from '../types';

interface WatermarkControlsProps {
  options: SnapshotOptions;
  onOptionsChange: (options: Partial<SnapshotOptions>) => void;
}

export const WatermarkControls: React.FC<WatermarkControlsProps> = ({
  options,
  onOptionsChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Watermark Text
        </label>
        <input
          type="text"
          value={options.watermark || ''}
          onChange={(e) => onOptionsChange({ watermark: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter watermark text..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Position
        </label>
        <select
          value={options.watermarkPosition || 'bottom-right'}
          onChange={(e) =>
            onOptionsChange({
              watermarkPosition: e.target.value as SnapshotOptions['watermarkPosition'],
            })
          }
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <input
          type="color"
          value={options.watermarkColor || '#ffffff'}
          onChange={(e) => onOptionsChange({ watermarkColor: e.target.value })}
          className="w-full h-10 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Size
        </label>
        <input
          type="range"
          min="10"
          max="24"
          value={options.watermarkSize || 12}
          onChange={(e) =>
            onOptionsChange({ watermarkSize: Number(e.target.value) })
          }
          className="w-full"
        />
      </div>
    </div>
  );
};