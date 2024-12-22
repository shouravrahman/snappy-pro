export type BorderType = 'none' | 'simple' | 'gradient' | 'neon' | 'shadow' | 'dotted';
export type ExportFormat = 'png' | 'jpeg' | 'svg';
export type LanguageType = 'typescript' | 'javascript' | 'python' | 'java' | 'cpp' | 'html' | 'css' | 'json' | 'markdown';
export type { ThemeType } from '../utils/themes';

export interface SnapshotOptions {
  code: string;
  language: LanguageType;
  theme: ThemeType;
  padding: number;
  borderType: BorderType;
  borderColor: string;
  borderImage?: string;
  fontFamily: string;
  fontSize: number;
  showLineNumbers: boolean;
  backgroundColor: string;
  watermark?: string;
  watermarkPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  watermarkColor?: string;
  watermarkSize?: number;
  borderRadius?: number;
  opacity?: number;
  includeWindowControls?: boolean;
  fileName?: string;
}