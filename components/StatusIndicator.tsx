
import React, { useRef, useEffect } from 'react';
import { RecordingStatus } from '../types';
import { AudioVisualizer } from './AudioVisualizer';

interface StatusIndicatorProps {
  status: RecordingStatus;
  analyserNode: AnalyserNode | null;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, analyserNode }) => {
  const getStatusContent = () => {
    switch (status) {
      case RecordingStatus.RECORDING:
        return {
          text: 'Recording in Progress',
          color: 'text-red-400',
          pulse: true,
        };
      case RecordingStatus.PROCESSING:
        return {
          text: 'Transcribing Audio...',
          color: 'text-yellow-400',
          pulse: false,
        };
      case RecordingStatus.ERROR:
        return {
          text: 'Error Occurred',
          color: 'text-red-500',
          pulse: false,
        };
      case RecordingStatus.REQUESTING_MIC:
        return {
          text: 'Accessing Microphone...',
          color: 'text-sky-400',
          pulse: false,
        };
      default:
        return {
          text: 'Ready to Record',
          color: 'text-green-400',
          pulse: false,
        };
    }
  };

  const { text, color, pulse } = getStatusContent();

  return (
    <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          {pulse && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75`}></span>}
          <span className={`relative inline-flex rounded-full h-3 w-3 ${pulse ? 'bg-red-500' : 'bg-slate-600'}`}></span>
        </span>
        <span className={`font-semibold text-lg ${color}`}>{text}</span>
      </div>
      <AudioVisualizer analyserNode={analyserNode} isActive={status === RecordingStatus.RECORDING} />
    </div>
  );
};
