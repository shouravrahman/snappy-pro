import { toPng, toJpeg, toSvg } from 'html-to-image';
import { ExportFormat } from '../types';

export const exportSnapshot = async (
  element: HTMLElement,
  format: ExportFormat,
  download = true
): Promise<string> => {
  try {
    let dataUrl: string;
    
    switch (format) {
      case 'png':
        dataUrl = await toPng(element);
        break;
      case 'jpeg':
        dataUrl = await toJpeg(element);
        break;
      case 'svg':
        dataUrl = await toSvg(element);
        break;
      default:
        throw new Error('Unsupported format');
    }

    if (download) {
      const link = document.createElement('a');
      link.download = `code-snapshot.${format}`;
      link.href = dataUrl;
      link.click();
    }

    return dataUrl;
  } catch (error) {
    console.error('Error exporting snapshot:', error);
    throw error;
  }
};