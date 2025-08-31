
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
        AI Meeting Transcriber
      </h1>
      <p className="text-slate-400 mt-2 text-lg">
        Record your meeting audio and get instant, accurate transcriptions.
      </p>
    </header>
  );
};
