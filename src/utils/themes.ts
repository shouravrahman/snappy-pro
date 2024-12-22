import { 
  dracula, 
  atomOneDark, 
  vs, 
  tomorrow 
} from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Define available themes with their display names and styles
export const codeThemes = {
  dracula: {
    label: 'Dracula',
    style: dracula
  },
  atomOneDark: {
    label: 'Atom One Dark',
    style: atomOneDark
  },
  vs: {
    label: 'Visual Studio',
    style: vs
  },
  tomorrow: {
    label: 'Tomorrow',
    style: tomorrow
  }
} as const;

export type ThemeType = keyof typeof codeThemes;