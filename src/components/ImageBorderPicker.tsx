import React from 'react';
import { Upload } from 'lucide-react';

interface ImageBorderPickerProps {
  onImageSelect: (imageUrl: string) => void;
  borderImage?: string;
}

export const ImageBorderPicker: React.FC<ImageBorderPickerProps> = ({ onImageSelect, borderImage }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageSelect(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Custom Border Image
        </label>
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Upload className="w-4 h-4" />
          <span>Upload</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
      {borderImage && (
        <div className="relative h-20 rounded-md overflow-hidden">
          <img
            src={borderImage}
            alt="Border preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};