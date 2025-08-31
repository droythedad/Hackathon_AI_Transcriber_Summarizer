
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { TranscriptDisplay } from './components/TranscriptDisplay';
import { StatusIndicator } from './components/StatusIndicator';
import { useAudioRecorder } from './hooks/useAudioRecorder';
import { transcribeAudio, summarizeText } from './services/geminiService';
import { RecordingStatus, type TranscriptEntry } from './types';
import { ErrorMessage } from './components/ErrorMessage';
import { SummaryDisplay } from './components/SummaryDisplay';

const App: React.FC = () => {
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [appStatus, setAppStatus] = useState<RecordingStatus>(RecordingStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
  
  const { startRecording, stopRecording, analyserNode, recordingStatus } = useAudioRecorder({
    onStatusChange: setAppStatus,
    onError: (message) => {
        setError(message);
        setAppStatus(RecordingStatus.ERROR);
    }
  });

  const handleStopRecording = useCallback(async () => {
    const audioData = await stopRecording();
    if (audioData) {
      try {
        setAppStatus(RecordingStatus.PROCESSING);
        setError(null);
        setSummary(null);
        const transcriptionText = await transcribeAudio(audioData.base64, audioData.mimeType);
        
        if (transcriptionText) {
            const newEntry: TranscriptEntry = {
                id: Date.now(),
                timestamp: new Date().toLocaleTimeString(),
                text: transcriptionText,
            };
            setTranscripts((prev) => [newEntry, ...prev]);
        } else {
            setError("Transcription returned empty. The audio may have been silent.");
        }

        setAppStatus(RecordingStatus.IDLE);
      } catch (err) {
        console.error("Transcription error:", err);
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during transcription.";
        setError(`Failed to transcribe audio: ${errorMessage}`);
        setAppStatus(RecordingStatus.ERROR);
      }
    }
  }, [stopRecording]);
  
  const handleSummarize = useCallback(async () => {
    setError(null);
    setSummary(null);
    setIsSummarizing(true);

    const sixtyMinutesAgo = Date.now() - 60 * 60 * 1000;
    const recentTranscripts = transcripts
      .filter(t => t.id > sixtyMinutesAgo)
      .sort((a, b) => a.id - b.id);

    if (recentTranscripts.length === 0) {
      setError("No transcripts from the last 60 minutes to summarize.");
      setIsSummarizing(false);
      return;
    }

    const combinedText = recentTranscripts.map(t => t.text).join('\n\n');

    try {
      const summaryText = await summarizeText(combinedText);
      setSummary(summaryText);
    } catch (err) {
      console.error("Summarization error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during summarization.";
      setError(`Failed to generate summary: ${errorMessage}`);
    } finally {
      setIsSummarizing(false);
    }
  }, [transcripts]);


  const handleClear = () => {
    setTranscripts([]);
    setError(null);
    setSummary(null);
    setAppStatus(RecordingStatus.IDLE);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <Header />
        <div className="bg-slate-800/50 rounded-lg p-6 shadow-2xl border border-slate-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Controls
              status={appStatus}
              onStart={startRecording}
              onStop={handleStopRecording}
              onClear={handleClear}
              onSummarize={handleSummarize}
              isSummarizing={isSummarizing}
              hasTranscripts={transcripts.length > 0}
            />
            <StatusIndicator status={appStatus} analyserNode={analyserNode} />
          </div>
          {error && <ErrorMessage message={error} />}
        </div>
        {summary && <SummaryDisplay summary={summary} onDismiss={() => setSummary(null)} />}
        <TranscriptDisplay transcripts={transcripts} />
      </div>
       <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
