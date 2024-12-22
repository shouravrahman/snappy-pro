import { useRef } from 'react';
import { exportSnapshot } from '../utils/export';
import { ExportFormat } from '../types';
import toast from 'react-hot-toast';

export const useSnapshotExport = () => {
  const snapshotRef = useRef<HTMLDivElement>(null);

  const handleExport = async (format: ExportFormat) => {
    if (snapshotRef.current) {
      try {
        await exportSnapshot(snapshotRef.current, format);
        toast.success(`Exported as ${format.toUpperCase()}`);
      } catch (error) {
        toast.error('Failed to export snapshot');
      }
    }
  };

  const generatePreview = async () => {
    if (snapshotRef.current) {
      return await exportSnapshot(snapshotRef.current, 'png', false);
    }
    return undefined;
  };

  return {
    snapshotRef,
    handleExport,
    generatePreview,
  };
};