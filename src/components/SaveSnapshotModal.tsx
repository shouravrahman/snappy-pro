import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SnapshotOptions } from '../types';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

interface SaveSnapshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: SnapshotOptions;
  previewUrl?: string;
}

export const SaveSnapshotModal: React.FC<SaveSnapshotModalProps> = ({
  isOpen,
  onClose,
  options,
  previewUrl,
}) => {
  const [title, setTitle] = useState('');
  const user = useAuthStore((state) => state.user);

  const handleSave = async () => {
    if (!user) return;

    const { error } = await supabase.from('snapshots').insert({
      user_id: user.id,
      title,
      options,
      preview_url: previewUrl,
    });

    if (error) {
      toast.error('Failed to save snapshot');
      return;
    }

    toast.success('Snapshot saved successfully');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Save Snapshot</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter snapshot title..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};