import React, { useState } from 'react';

interface ApiKeyBannerProps {
  onSave: (apiKey: string) => void;
}

export const ApiKeyBanner: React.FC<ApiKeyBannerProps> = ({ onSave }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-800 border border-sky-700 px-6 py-8 rounded-lg shadow-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold text-sky-300">Configuration Required</h2>
            <p className="mt-2 text-slate-300">
              Please enter your Google Gemini API key to begin. Your key will be stored in your browser's local storage and will not be sent anywhere else.
            </p>
          </div>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-slate-100 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-500"
            placeholder="Enter your API key..."
            aria-label="Gemini API Key"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 disabled:bg-slate-600 transition-colors"
          >
            Save and Start Transcribing
          </button>
          <p className="text-center text-sm text-slate-400">
            You can get a free API key from{' '}
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline hover:text-sky-300">
              Google AI Studio
            </a>.
          </p>
        </form>
      </div>
    </div>
  );
};
