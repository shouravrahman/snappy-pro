import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Trash2, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SavedSnapshot } from '../types';
import { useAuthStore } from '../store/authStore';
import { exportSnapshot } from '../utils/export';
import toast from 'react-hot-toast';

export const SavedSnapshots: React.FC = () => {
  const [snapshots, setSnapshots] = useState<SavedSnapshot[]>([]);
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Saved Snapshots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snapshots.map((snapshot) => (
          <div
            key={snapshot.id}
            className="bg-white p-4 rounded-lg shadow-md space-y-2"
          >
            {snapshot.preview_url && (
              <img
                src={snapshot.preview_url}
                alt={snapshot.title}
                className="w-full h-32 object-cover rounded-md"
              />
            )}
            <h3 className="font-medium text-gray-800">{snapshot.title}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(snapshot.created_at), 'PPP')}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => deleteSnapshot(snapshot.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => exportSnapshot(snapshot.options, 'png')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};