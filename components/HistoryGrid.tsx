import React from 'react';
import { GeneratedLogo } from '../types.ts';
import { Clock } from 'lucide-react';

interface HistoryGridProps {
  history: GeneratedLogo[];
  onSelect: (logo: GeneratedLogo) => void;
}

export const HistoryGrid: React.FC<HistoryGridProps> = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-bold text-white">Recent Generations</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {history.map((logo) => (
          <div 
            key={logo.id}
            onClick={() => onSelect(logo)}
            className="group cursor-pointer relative aspect-square bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500 transition-all hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <img 
              src={logo.imageUrl} 
              alt={logo.config.brandName} 
              className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <p className="text-white text-xs font-bold truncate">{logo.config.brandName}</p>
              <p className="text-slate-300 text-[10px] truncate">{logo.config.style}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};