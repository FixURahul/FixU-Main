'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, ArrowLeft, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle size={48} className="text-orange-500" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        
        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Our team has been notified.
        </p>
        
        {error.message && !error.message.includes('internal server error') && (
          <div className="bg-gray-100 p-4 rounded-md mb-6 text-left">
            <p className="text-sm text-gray-700 font-mono">{error.message}</p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw size={16} />
            Try again
          </button>
          
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            <Home size={16} />
            Go to homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-gray-300 hover:bg-gray-100 rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
