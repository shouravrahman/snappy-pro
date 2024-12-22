import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { SnapshotOptions } from '../types';
import { WindowControls } from './WindowControls';
import { Code } from 'lucide-react';
import { getBorderEffects } from '../utils/borderStyles';
import { codeThemes } from '../utils/themes';

interface CodeEditorProps {
  options: SnapshotOptions;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ options }) => {
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

  const getWatermarkStyle = () => {
    const position: { [key: string]: string } = {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
      'bottom-left': 'bottom-2 left-2',
      'bottom-right': 'bottom-2 right-2',
    };

    return `absolute ${position[watermarkPosition || 'bottom-right']}`;
  };

  const borderStyles = getBorderEffects(borderType, borderColor, backgroundColor);

  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{
        opacity: opacity / 100,
        boxShadow: borderType === 'shadow' ? `0 4px 20px ${borderColor}` : undefined,
      }}
    >
      {includeWindowControls && <WindowControls />}
      {fileName && (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white">
          <Code className="w-4 h-4" />
          <span className="text-sm">{fileName}</span>
        </div>
      )}
      <div
        style={{
          padding: `${padding}px`,
          backgroundColor,
          borderRadius: `${borderRadius}px`,
          ...borderStyles,
        }}
      >
        <SyntaxHighlighter
          language={language}
          style={codeThemes[theme].style}
          showLineNumbers={showLineNumbers}
          customStyle={{
            fontFamily,
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