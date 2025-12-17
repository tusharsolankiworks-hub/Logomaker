import React from 'react';
import { PenTool, Hexagon } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Hexagon className="w-6 h-6 text-white fill-indigo-600" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            LogoCraft AI
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://ai.google.dev" 
            target="_blank" 
            rel="noreferrer"
            className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            Powered by Gemini
          </a>
        </div>
      </div>
    </header>
  );
};