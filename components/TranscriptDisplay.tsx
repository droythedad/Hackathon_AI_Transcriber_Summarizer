
import React from 'react';
import { type TranscriptEntry } from '../types';
import { ChatBubbleIcon } from './Icons';

interface TranscriptDisplayProps {
  transcripts: TranscriptEntry[];
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcripts }) => {
  if (transcripts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center bg-slate-800/50 rounded-lg p-10 border border-slate-700 h-96">
        <ChatBubbleIcon />
        <h3 className="text-xl font-semibold text-slate-300 mt-4">No Transcripts Yet</h3>
        <p className="text-slate-400 mt-1">Click "Start Recording" to begin transcribing your meeting.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-lg p-6 shadow-2xl border border-slate-700 space-y-4 max-h-[60vh] overflow-y-auto">
      {transcripts.map((entry) => (
        <div key={entry.id} className="bg-slate-900/70 p-4 rounded-lg border border-slate-700/50 animate-fade-in">
          <p className="text-sm font-medium text-cyan-400 mb-2">{entry.timestamp}</p>
          <p className="text-slate-200 whitespace-pre-wrap">{entry.text}</p>
        </div>
      ))}
    </div>
  );
};
