
import React from 'react';
import { AlertTriangleIcon } from './Icons';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="mt-4 flex items-start gap-3 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
      <div className="flex-shrink-0 pt-1">
        <AlertTriangleIcon />
      </div>
      <div>
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
};
