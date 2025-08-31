
export enum RecordingStatus {
  IDLE = 'Idle',
  REQUESTING_MIC = 'Requesting Mic...',
  RECORDING = 'Recording',
  PROCESSING = 'Transcribing...',
  ERROR = 'Error',
}

export interface TranscriptEntry {
  id: number;
  timestamp: string;
  text: string;
}
