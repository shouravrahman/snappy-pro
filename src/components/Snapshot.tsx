import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula, atomOneDark, vs, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { SnapshotOptions } from '../types';
import { WindowControls } from './WindowControls';
import { Code, Copy } from 'lucide-react';

const themes = {
   dracula,
   atomOneDark,
   vs,
   tomorrow,
};

interface SnapshotProps {
   options: SnapshotOptions;
   onCopy?: () => void;
}

export const Snapshot: React.FC<SnapshotProps> = ({ options, onCopy }) => {
   const {
      code,
      language,
      theme,
      padding,
      borderType,
      borderColor,
      fontFamily,
      fontSize,
      showLineNumbers,
      backgroundColor,
      watermark,
      watermarkPosition,
      watermarkColor,
      watermarkSize,
      borderRadius = 8,
      opacity = 100,
      includeWindowControls,
      fileName,
   } = options;

   const getBorderStyle = (): string => {
      switch (borderType) {
         case 'simple':
            return `border-2 border-solid border-${borderColor}`;
         case 'gradient':
            return 'border-2 border-transparent';
         case 'neon':
            return `border-2 border-solid border-${borderColor} `;
         case 'dotted':
            return `border-2 border-dotted border-${borderColor}`;
         case 'shadow':
            return 'border-none';
         default:
            return 'border-none';
      }
   };

   const getWatermarkStyle = (): string => {
      const position: { [key: string]: string } = {
         'top-left': 'top-2 left-2',
         'top-right': 'top-2 right-2',
         'bottom-left': 'bottom-2 left-2',
         'bottom-right': 'bottom-2 right-2',
      };

      return `absolute ${position[watermarkPosition || 'bottom-right']}
              opacity-40 select-none pointer-events-none`;
   };

   return (
      <div
         className="relative group rounded-xl overflow-hidden shadow-medium transition-all duration-300
                    hover:shadow-sm transform hover:scale-[1.02]"
         style={{
            opacity: opacity / 100,
         }}
      >
         {/* Header with Window Controls and Filename */}
         <div className="flex items-center justify-between bg-neutral-800 px-4 py-2">
            {includeWindowControls ? <WindowControls /> : <div />}

            {fileName && (
               <div className="flex items-center gap-2 text-neutral-200">
                  <Code className="w-4 h-4" />
                  <span className="text-sm font-code">{fileName}</span>
               </div>
            )}

            {onCopy && (
               <button
                  onClick={onCopy}
                  className="text-neutral-400 hover:text-white transition-colors
                             opacity-0 group-hover:opacity-100
                             focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                  title="Copy Code"
               >
                  <Copy className="w-4 h-4" />
               </button>
            )}
         </div>

         {/* Code Container */}
         <div
            className={`relative ${getBorderStyle()}`}
            style={{
               padding: `${padding}px`,
               backgroundColor,
               boxShadow:
                  borderType === 'neon' ? `0 0 10px ${borderColor}` :
                     borderType === 'shadow' ? `0 4px 20px ${borderColor}` : 'none',
               backgroundImage:
                  borderType === 'gradient'
                     ? `linear-gradient(45deg, ${borderColor}, ${backgroundColor})`
                     : 'none',


               borderBottomLeftRadius: `${borderRadius}px`,
               borderBottomRightRadius: `${borderRadius}px`
            }}
         >
            <SyntaxHighlighter
               language={language}
               style={themes[theme]}
               showLineNumbers={showLineNumbers}
               customStyle={{
                  fontFamily: fontFamily || 'font-code',
                  fontSize: `${fontSize}px`,
                  margin: 0,
                  borderRadius: `${borderRadius}px`,
               }}
            >
               {code}
            </SyntaxHighlighter>

            {watermark && (
               <div
                  className={getWatermarkStyle()}
                  style={{
                     color: watermarkColor,
                     fontSize: `${watermarkSize}px`,
                     fontFamily,
                     textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}
               >
                  {watermark}
               </div>
            )}
         </div>
      </div>
   );
};
