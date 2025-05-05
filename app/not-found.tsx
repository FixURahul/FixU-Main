'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Search size={48} className="text-orange-500" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-5xl font-bold text-orange-500 mb-6">404</p>
        
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md flex items-center justify-center gap-2 transition-colors"
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
