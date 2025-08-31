
import { useState, useRef, useCallback } from 'react';
import { RecordingStatus } from '../types';

interface UseAudioRecorderProps {
    onStatusChange: (status: RecordingStatus) => void;
    onError: (message: string) => void;
}

export const useAudioRecorder = ({ onStatusChange, onError }: UseAudioRecorderProps) => {
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>(RecordingStatus.IDLE);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);

  const updateStatus = useCallback((status: RecordingStatus) => {
    setRecordingStatus(status);
    onStatusChange(status);
  }, [onStatusChange]);

  const startRecording = async () => {
    if (recordingStatus !== RecordingStatus.IDLE && recordingStatus !== RecordingStatus.ERROR) {
      return;
    }

    updateStatus(RecordingStatus.REQUESTING_MIC);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserNodeRef.current = audioContextRef.current.createAnalyser();
        analyserNodeRef.current.fftSize = 256;
      }

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserNodeRef.current);
      
      const options = { mimeType: 'audio/webm' };
      mediaRecorderRef.current = new MediaRecorder(stream, options);

      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      });

      mediaRecorderRef.current.start();
      updateStatus(RecordingStatus.RECORDING);

    } catch (err) {
      console.error('Error accessing microphone:', err);
      const errorMessage = err instanceof Error && err.name === 'NotAllowedError'
        ? 'Microphone permission denied. Please allow microphone access in your browser settings.'
        : 'Could not access microphone. Please ensure it is connected and enabled.';
      onError(errorMessage);
      updateStatus(RecordingStatus.ERROR);
    }
  };

  const stopRecording = (): Promise<{ base64: string; mimeType: string } | null> => {
    return new Promise((resolve) => {
        if (!mediaRecorderRef.current || recordingStatus !== RecordingStatus.RECORDING) {
            resolve(null);
            return;
        }

        mediaRecorderRef.current.onstop = () => {
            const mimeType = mediaRecorderRef.current!.mimeType;
            const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
            
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => {
                const base64String = (reader.result as string).split(',')[1];
                resolve({ base64: base64String, mimeType });
            };

            // Clean up stream
            mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
            mediaRecorderRef.current = null;
            updateStatus(RecordingStatus.IDLE);
        };
        
        mediaRecorderRef.current.stop();
    });
  };

  return { startRecording, stopRecording, analyserNode: analyserNodeRef.current, recordingStatus };
};
