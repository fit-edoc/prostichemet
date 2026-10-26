'use client';
import React from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  leadCount: number;
}

export function ExportModal({ isOpen, onClose, onConfirm, leadCount }: ExportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full space-y-4">
        <h3 className="text-lg font-semibold text-zinc-100">Export Leads</h3>
        <p className="text-sm text-zinc-400">
          You are about to export {leadCount} prospects as a structured CSV file.
        </p>
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-zinc-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
          >
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
}
