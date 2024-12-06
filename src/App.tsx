import { useState } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { Snapshot } from './components/Snapshot';
import { Controls } from './components/Controls';
import { WatermarkControls } from './components/WatermarkControls';
import { Auth } from './components/Auth';
import { SavedSnapshots } from './components/SavedSnapshots';
import { SaveSnapshotModal } from './components/SaveSnapshotModal';
import { SaveButton } from './components/SaveButton';
import { SnapshotOptions } from './types';
import { useAuthStore } from './store/authStore';
import { useSupabaseAuth } from './hooks/useSupabaseAuth';
import { useSnapshotExport } from './hooks/useSnapshotExport';
import toast, { Toaster } from 'react-hot-toast';

const defaultOptions: SnapshotOptions = {
   code: `function greet(name: string) {
  return`,
   language: 'typescript',
   theme: 'dracula',
   padding: 32,
   borderType: 'gradient',
   borderColor: '#6366f1',
   fontFamily: 'Monaco, Consolas, monospace',
   fontSize: 14,
   showLineNumbers: true,
   backgroundColor: '#1e1e1e',
   watermark: '',
   watermarkPosition: 'bottom-right',
   watermarkColor: '#ffffff',
   watermarkSize: 12,
   borderRadius: 8,
   opacity: 100,
   includeWindowControls: false,
   fileName: '',
}



function App() {
   const [options, setOptions] = useState<SnapshotOptions>(defaultOptions);
   const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
   const [previewUrl, setPreviewUrl] = useState<string>();

   const user = useAuthStore((state) => state.user);
   const { snapshotRef, handleExport, generatePreview } = useSnapshotExport();

   useSupabaseAuth();

   const handleOptionsChange = (newOptions: Partial<SnapshotOptions>) => {
      setOptions((prev) => ({ ...prev, ...newOptions }));
   };

   const handleCodeChange = (code: string) => {
      handleOptionsChange({ code });
   };

   const handleSave = async () => {
      if (!user) {
         toast.error('Please sign in to save snapshots');
         return;
      }

      const preview = await generatePreview();
      setPreviewUrl(preview);
      setIsSaveModalOpen(true);
   };

   return (
      <div className="min-h-screen bg-background text-text-dark">
         <Toaster
            position="top-right"
            toastOptions={{
               className: 'bg-primary-600 text-white',
               success: {
                  className: 'bg-green-600 text-white'
               },
               error: {
                  className: 'bg-red-600 text-white'
               }
            }}
         />
         <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
            <Header />

            {!user ? (
               <Auth />
            ) : (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <CodeInput code={options.code} onChange={handleCodeChange} />
                     <Controls
                        options={options}
                        onOptionsChange={handleOptionsChange}
                        onExport={handleExport}
                     />
                     <div className="bg-white p-6 rounded-xl shadow-subtle">
                        <h2 className="text-lg font-semibold mb-4 text-text-dark">Watermark</h2>
                        <WatermarkControls
                           options={options}
                           onOptionsChange={handleOptionsChange}
                        />
                     </div>
                     <SaveButton onClick={handleSave} />
                     <SavedSnapshots />
                  </div>

                  <div className="sticky top-8">
                     <div ref={snapshotRef} className="inline-block w-full transition-transform hover:scale-[1.02]">
                        <Snapshot options={options} />
                     </div>
                  </div>
               </div>
            )}
         </div>
         <SaveSnapshotModal
            isOpen={isSaveModalOpen}
            onClose={() => setIsSaveModalOpen(false)}
            options={options}
            previewUrl={previewUrl}
         />
      </div>
   );
}

export default App;
