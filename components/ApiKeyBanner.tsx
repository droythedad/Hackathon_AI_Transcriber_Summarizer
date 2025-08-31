import React from 'react';
import { AlertTriangleIcon } from './Icons';

export const ApiKeyBanner: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-800 border border-yellow-700 text-yellow-200 px-6 py-8 rounded-lg shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 pt-1 text-yellow-400">
            <AlertTriangleIcon />
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-yellow-300">Configuration Required</h2>
            <p className="mt-2 text-lg">
              Your Gemini API key is missing.
            </p>
            <p className="mt-4 text-slate-300">
              To get the application running, you need to add your API key to the source code. Please follow these steps:
            </p>
            <ol className="list-decimal list-inside mt-3 space-y-2 bg-slate-900/50 p-4 rounded-md text-slate-300">
              <li>
                Open the file <code className="bg-slate-700 text-cyan-300 px-1 py-0.5 rounded text-sm">services/geminiService.ts</code> in your code editor.
              </li>
              <li>
                Find the line that says: <br/>
                <code className="bg-slate-700 text-red-400 px-1 py-0.5 rounded text-sm mt-1 inline-block">const API_KEY = 'YOUR_API_KEY_HERE';</code>
              </li>
              <li>
                Replace <code className="bg-slate-700 text-cyan-300 px-1 py-0.5 rounded text-sm">'YOUR_API_KEY_HERE'</code> with your actual Gemini API key.
              </li>
            </ol>
            <p className="mt-4 text-sm text-slate-400">
              You can get a free API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline hover:text-sky-300">Google AI Studio</a>. After updating the file, you will need to redeploy the application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};