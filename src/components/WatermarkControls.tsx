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
      <div className="space-y-4 bg-neutral-50 p-4 rounded-xl shadow-subtle">
         <div>
            <label className="block text-sm font-medium text-text-light mb-2">
               Watermark Text
            </label>
            <input
               type="text"
               value={options.watermark || ''}
               onChange={(e) => onOptionsChange({ watermark: e.target.value })}
               className="w-full px-3 py-2 border border-neutral-200 rounded-lg
          focus:ring-2 focus:ring-primary-300 focus:border-primary-500
          transition-all duration-300"
               placeholder="Enter watermark text..."
            />
         </div>

         <div>
            <label className="block text-sm font-medium text-text-light mb-2">
               Position
            </label>
            <select
               value={options.watermarkPosition || 'bottom-right'}
               onChange={(e) =>
                  onOptionsChange({
                     watermarkPosition: e.target.value as SnapshotOptions['watermarkPosition'],
                  })
               }
               className="w-full px-3 py-2 border border-neutral-200 rounded-lg
          focus:ring-2 focus:ring-primary-300 focus:border-primary-500
          transition-all duration-300"
            >
               <option value="top-left">Top Left</option>
               <option value="top-right">Top Right</option>
               <option value="bottom-left">Bottom Left</option>
               <option value="bottom-right">Bottom Right</option>
            </select>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-medium text-text-light mb-2">
                  Color
               </label>
               <input
                  type="color"
                  value={options.watermarkColor || '#ffffff'}
                  onChange={(e) => onOptionsChange({ watermarkColor: e.target.value })}
                  className="w-full h-12 rounded-lg border border-neutral-200"
               />
            </div>
            <div>
               <label className="block text-sm font-medium text-text-light mb-2">
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
                  className="w-full h-2 bg-neutral-200 rounded-full
            appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:bg-primary-600
            [&::-webkit-slider-thumb]:rounded-full"
               />
            </div>
         </div>
      </div>
   );
};
