import React from 'react';
import { GeneratedLogo, GenerationStatus } from '../types.ts';
import { Download, Share2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface PreviewAreaProps {
  currentLogo: GeneratedLogo | null;
  status: GenerationStatus;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ currentLogo, status }) => {
  const handleDownload = () => {
    if (currentLogo) {
      const link = document.createElement('a');
      link.href = currentLogo.imageUrl;
      link.download = `logocraft-${currentLogo.config.brandName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (status === 'generating') {
    return (
      <div className="w-full aspect-square bg-slate-800/30 border-2 border-dashed border-indigo-500/30 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 animate-pulse" />
         <Sparkles className="w-12 h-12 text-indigo-400 animate-bounce mb-4 relative z-10" />
         <p className="text-slate-300 font-medium relative z-10">Crafting your masterpiece...</p>
         <p className="text-slate-500 text-sm mt-2 relative z-10">This usually takes about 5-10 seconds</p>
      </div>
    );
  }

  if (!currentLogo) {
    return (
      <div className="w-full aspect-square bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center p-8 text-center group hover:border-slate-600 transition-colors">
        <div className="bg-slate-800 p-4 rounded-full mb-4 group-hover:bg-slate-700 transition-colors">
            <ImageIcon className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-slate-300 font-medium text-lg">Ready to Create</h3>
        <p className="text-slate-500 mt-2 max-w-xs">
          Fill in your brand details and click Generate to see the magic happen using Gemini AI.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700">
            {/* The Image */}
            <img 
                src={currentLogo.imageUrl} 
                alt={`Logo for ${currentLogo.config.brandName}`} 
                className="w-full h-auto object-cover"
            />
            
            {/* Overlay actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                    onClick={handleDownload}
                    className="p-3 bg-white text-slate-900 rounded-full hover:bg-indigo-50 transition-colors transform hover:scale-105 active:scale-95"
                    title="Download PNG"
                >
                    <Download className="w-6 h-6" />
                </button>
            </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Generation Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="text-slate-500 block text-xs">Brand</span>
                    <span className="text-slate-200 font-medium">{currentLogo.config.brandName}</span>
                </div>
                 <div>
                    <span className="text-slate-500 block text-xs">Style</span>
                    <span className="text-slate-200 font-medium">{currentLogo.config.style}</span>
                </div>
                 <div className="col-span-2">
                    <span className="text-slate-500 block text-xs">Concept</span>
                    <span className="text-slate-200">{currentLogo.config.description}</span>
                </div>
            </div>
        </div>

        <div className="flex gap-4">
            <button 
                onClick={handleDownload}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
                <Download className="w-4 h-4" />
                Download High Res
            </button>
        </div>
    </div>
  );
};