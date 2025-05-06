'use client';

import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Application Error</h1>
          
          <p className="text-gray-600 mb-6">
            We're sorry, but a critical error has occurred. Please try refreshing the page.
          </p>
          
          <div className="flex flex-col gap-4 justify-center">
            <button
              onClick={reset}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md flex items-center justify-center gap-2 transition-colors mx-auto"
            >
              <RefreshCw size={16} />
              Try again
            </button>
            
            <a
              href="/"
              className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-md flex items-center justify-center gap-2 transition-colors mx-auto"
            >
              <Home size={16} />
              Go to homepage
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
