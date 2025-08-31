
import React from 'react';
import { RecordingStatus } from '../types';
import { MicIcon, StopIcon, TrashIcon, SparklesIcon } from './Icons';

interface ControlsProps {
  status: RecordingStatus;
  onStart: () => void;
  onStop: () => void;
  onClear: () => void;
  onSummarize: () => void;
  isSummarizing: boolean;
  hasTranscripts: boolean;
}

export const Controls: React.FC<ControlsProps> = ({ status, onStart, onStop, onClear, onSummarize, isSummarizing, hasTranscripts }) => {
  const isRecording = status === RecordingStatus.RECORDING;
  const isIdle = status === RecordingStatus.IDLE || status === RecordingStatus.ERROR;
  const isProcessing = status === RecordingStatus.PROCESSING || status === RecordingStatus.REQUESTING_MIC;

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <button
        onClick={onStart}
        disabled={!isIdle}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105 disabled:scale-100"
      >
        <MicIcon />
        <span>Start Recording</span>
      </button>
      <button
        onClick={onStop}
        disabled={!isRecording}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105 disabled:scale-100"
      >
        <StopIcon />
        <span>Stop</span>
      </button>

      <div className="h-8 w-px bg-slate-700 mx-2"></div>

      <button
        onClick={onSummarize}
        disabled={isProcessing || isRecording || isSummarizing || !hasTranscripts}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105 disabled:scale-100"
        title="Generate a summary of the last 60 minutes"
      >
        <SparklesIcon />
        <span>{isSummarizing ? 'Summarizing...' : 'Summarize'}</span>
      </button>

      <button
        onClick={onClear}
        disabled={isProcessing || isRecording || isSummarizing || !hasTranscripts}
        className="p-3 bg-slate-700 text-slate-300 font-semibold rounded-lg shadow-md hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
        aria-label="Clear all transcripts"
      >
        <TrashIcon />
      </button>
    </div>
  );
};
