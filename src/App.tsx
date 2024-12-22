import { useState } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { CodeEditor } from './components/CodeEditor';
import { Controls } from './components/Controls';
import { WatermarkControls } from './components/WatermarkControls';
import { ImageBorderPicker } from './components/ImageBorderPicker';
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

   const handleBorderImageSelect = (imageUrl: string) => {
      handleOptionsChange({ borderImage: imageUrl });
   };

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
         <Toaster position="top-right" />
         <div className="max-w-7xl mx-auto px-4 py-8">
            <Header />

            {!user ? (
               <Auth />
            ) : (
                  <div className="grid grid-cols-12 gap-6">
                     {/* Main Preview - Spans 8 columns on large screens */}
                     <div className="col-span-12 lg:col-span-8 sticky top-8">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                           <div ref={snapshotRef} className="inline-block w-full">
                              <CodeEditor options={options} />
                           </div>
                        </div>
                     </div>

                     {/* Controls Grid - Spans 4 columns */}
                     <div className="col-span-12 lg:col-span-4 space-y-6">
                        {/* Code Input */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                           <CodeInput code={options.code} onChange={(code) => handleOptionsChange({ code })} />
                        </div>

                        {/* Theme & Effects */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                           <h2 className="text-lg font-semibold mb-4">Theme & Effects</h2>
                           <Controls
                              options={options}
                              onOptionsChange={handleOptionsChange}
                              onExport={handleExport}
                           />
                        </div>

                        {/* Border Image */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                           <h2 className="text-lg font-semibold mb-4">Border Image</h2>
                           <ImageBorderPicker
                              onImageSelect={handleBorderImageSelect}
                              borderImage={options.borderImage}
                           />
                        </div>

                        {/* Watermark */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                           <h2 className="text-lg font-semibold mb-4">Watermark</h2>
                           <WatermarkControls
                              options={options}
                              onOptionsChange={handleOptionsChange}
                           />
                        </div>

                        {/* Save & Export */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                           <SaveButton onClick={() => {
                              if (!user) {
                                 toast.error('Please sign in to save snapshots');
                                 return;
                              }
                              generatePreview().then(preview => {
                                 setPreviewUrl(preview);
                                 setIsSaveModalOpen(true);
                              });
                           }} />
                        </div>
                     </div>

                     {/* Saved Snapshots - Full width */}
                     <div className="col-span-12">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                           <SavedSnapshots />
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
