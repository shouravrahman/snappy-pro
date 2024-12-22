import { BorderType } from '../types';

export const getBorderStyle = (borderType: BorderType, borderColor: string) => {
  switch (borderType) {
    case 'simple':
      return `2px solid ${borderColor}`;
    case 'gradient':
      return '2px solid transparent';
    case 'neon':
      return `2px solid ${borderColor}`;
    case 'dotted':
      return `2px dotted ${borderColor}`;
    case 'shadow':
      return 'none';
    default:
      return 'none';
  }
};

export const getBorderEffects = (borderType: BorderType, borderColor: string, backgroundColor: string) => {
  return {
    border: getBorderStyle(borderType, borderColor),
    boxShadow: borderType === 'neon' ? `0 0 10px ${borderColor}` : 'none',
    backgroundImage: borderType === 'gradient'
      ? `linear-gradient(45deg, ${borderColor}, ${backgroundColor})`
      : 'none',
  };
};