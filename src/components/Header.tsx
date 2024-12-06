import React from 'react';
import { Code } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Header: React.FC = () => {
   const user = useAuthStore((state) => state.user);

   return (
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-3">
            <Code className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">
               Code Snapshot Maker
            </h1>
         </div>
         {user ? (
            <button
               onClick={() => useAuthStore.getState().signOut()}
               className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md"
            >
               Sign Out
            </button>
         ) : null}
      </div>
   );
};
