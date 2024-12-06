import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Trash2, Download, Image } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { exportSnapshot } from '../utils/export';
import toast from 'react-hot-toast';

export const SavedSnapshots: React.FC = () => {
   const [snapshots, setSnapshots] = useState<any>([]);
   const user = useAuthStore((state) => state.user);

   useEffect(() => {
      if (user) {
         loadSnapshots();
      }
   }, [user]);

   const loadSnapshots = async () => {
      const { data, error } = await supabase
         .from('snapshots')
         .select('*')
         .eq('user_id', user?.id)
         .order('created_at', { ascending: false });

      if (error) {
         toast.error('Failed to load snapshots');
         return;
      }

      setSnapshots(data);
   };

   const deleteSnapshot = async (id: string) => {
      const { error } = await supabase
         .from('snapshots')
         .delete()
         .eq('id', id);

      if (error) {
         toast.error('Failed to delete snapshot');
         return;
      }

      toast.success('Snapshot deleted');
      loadSnapshots();
   };

   if (!snapshots.length) {
      return (
         <div className="text-center py-12 bg-neutral-50 rounded-xl">
            <Image className="mx-auto w-16 h-16 text-neutral-400 mb-4" />
            <p className="text-neutral-600">No snapshots saved yet</p>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <h2 className="text-2xl font-semibold text-text-dark flex items-center gap-3">
            <Image className="w-6 h-6 text-primary-600" />
            Saved Snapshots
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snapshots.map((snapshot) => (
               <div
                  key={snapshot.id}
                  className="bg-white rounded-xl border border-neutral-100
                     shadow-subtle overflow-hidden
                     transition-all duration-300
                     hover:shadow-medium
                     hover:scale-[1.02] group"
               >
                  {snapshot.preview_url ? (
                     <img
                        src={snapshot.preview_url}
                        alt={snapshot.title}
                        className="w-full h-40 object-cover
                           group-hover:opacity-90 transition-opacity"
                     />
                  ) : (
                     <div className="w-full h-40 bg-neutral-100
                        flex items-center justify-center">
                        <Image className="w-12 h-12 text-neutral-400" />
                     </div>
                  )}

                  <div className="p-4 space-y-2">
                     <h3 className="font-medium text-text-dark truncate">
                        {snapshot.title}
                     </h3>
                     <p className="text-sm text-neutral-500">
                        {format(new Date(snapshot.created_at), 'PPP')}
                     </p>

                     <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                        <button
                           onClick={() => deleteSnapshot(snapshot.id)}
                           className="p-2 text-red-500 hover:bg-red-50 rounded-md
                              transition-all duration-300
                              hover:text-red-700 focus:outline-none
                              focus:ring-2 focus:ring-red-200"
                        >
                           <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                           onClick={() => exportSnapshot(snapshot.options, 'png')}
                           className="p-2 text-primary-600 hover:bg-primary-50 rounded-md
                              transition-all duration-300
                              hover:text-primary-700 focus:outline-none
                              focus:ring-2 focus:ring-primary-200"
                        >
                           <Download className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};
