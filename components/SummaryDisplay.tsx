
import React from 'react';
import { SparklesIcon, CloseIcon } from './Icons';

interface SummaryDisplayProps {
  summary: string;
  onDismiss: () => void;
}

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary, onDismiss }) => {
  return (
    <div className="bg-sky-900/60 border border-sky-700 text-sky-200 px-4 py-3 rounded-lg relative animate-fade-in shadow-lg" role="status">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 pt-1 text-sky-400">
          <SparklesIcon />
        </div>
        <div className="flex-grow">
          <strong className="font-bold block mb-1 text-sky-300">Summary of Last Hour</strong>
          <p className="text-slate-200">{summary}</p>
        </div>
        <button
          onClick={onDismiss}
          className="p-1 rounded-full text-sky-300 hover:bg-sky-800 hover:text-white transition-colors"
          aria-label="Dismiss summary"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
