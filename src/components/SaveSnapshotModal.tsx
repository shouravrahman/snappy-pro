import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
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

      // Basic validation
      if (!title.trim()) {
         toast.error('Please enter a title');
         return;
      }

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
      setTitle('');
   };

   if (!isOpen) return null;

   return (
      <div
         className="fixed inset-0 z-50 bg-black bg-opacity-40
         flex items-center justify-center p-4"
      >
         <div
            className="bg-white rounded-xl shadow-medium w-full max-w-md
            transform transition-all duration-300
            hover:shadow-lg scale-[1.02]"
         >
            <div
               className="flex justify-between items-center
               px-6 py-4 border-b border-neutral-100"
            >
               <h2 className="text-xl font-semibold text-text-dark flex items-center gap-3">
                  <Save className="w-5 h-5 text-primary-600" />
                  Save Snapshot
               </h2>
               <button
                  onClick={onClose}
                  className="p-2 text-neutral-500 hover:text-neutral-700
                  hover:bg-neutral-100 rounded-full
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-primary-200"
               >
                  <X className="w-5 h-5" />
               </button>
            </div>

            <div className="p-6 space-y-6">
               <div>
                  <label
                     htmlFor="snapshot-title"
                     className="block text-sm font-medium text-text-light mb-2"
                  >
                     Title
                  </label>
                  <input
                     id="snapshot-title"
                     type="text"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     className="w-full px-3 py-2 border border-neutral-200
                     rounded-lg focus:ring-2 focus:ring-primary-300
                     focus:border-primary-500 transition-all duration-300"
                     placeholder="Enter snapshot title..."
                     required
                  />
               </div>

               {previewUrl && (
                  <div>
                     <p className="text-sm font-medium text-text-light mb-2">Preview</p>
                     <img
                        src={previewUrl}
                        alt="Snapshot Preview"
                        className="w-full rounded-lg object-cover max-h-40"
                     />
                  </div>
               )}

               <div className="flex justify-end gap-3">
                  <button
                     onClick={onClose}
                     className="px-4 py-2 text-neutral-600
                     hover:bg-neutral-100 rounded-md
                     transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  >
                     Cancel
                  </button>
                  <button
                     onClick={handleSave}
                     className="px-4 py-2 bg-primary-600 text-white
                     rounded-md hover:bg-primary-700
                     transition-all duration-300
                     flex items-center gap-2
                     focus:outline-none focus:ring-2 focus:ring-primary-300"
                  >
                     <Save className="w-4 h-4" />
                     Save
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
