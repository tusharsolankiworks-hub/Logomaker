import React from 'react';
import { LogoConfig, LOGO_STYLES, COLOR_PALETTES } from '../types.ts';
import { Wand2, Type, Palette, LayoutTemplate } from 'lucide-react';

interface ControlPanelProps {
  config: LogoConfig;
  setConfig: React.Dispatch<React.SetStateAction<LogoConfig>>;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ config, setConfig, onGenerate, isGenerating }) => {
  
  const handleChange = (field: keyof LogoConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex flex-col gap-6 shadow-xl h-fit">
      
      {/* Brand Name Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Type className="w-4 h-4 text-indigo-400" />
          Brand Name
        </label>
        <input
          type="text"
          value={config.brandName}
          onChange={(e) => handleChange('brandName', e.target.value)}
          placeholder="e.g. Nexus, GreenLeaf"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4 text-indigo-400" />
          Description & Concept
        </label>
        <textarea
          value={config.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="e.g. A futuristic robot holding a leaf, symbolizing eco-friendly technology..."
          rows={3}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
        />
      </div>

      {/* Style Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-indigo-400" />
          Art Style
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {LOGO_STYLES.map(style => (
            <button
              key={style}
              onClick={() => handleChange('style', style)}
              className={`text-xs py-2 px-2 rounded-md border transition-all truncate ${
                config.style === style
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Palette className="w-4 h-4 text-indigo-400" />
          Primary Color
        </label>
        <div className="flex flex-wrap gap-3">
          {COLOR_PALETTES.map(color => (
            <button
              key={color.name}
              onClick={() => handleChange('primaryColor', color.name)}
              title={color.name}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                config.primaryColor === color.name ? 'border-white ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-800' : 'border-slate-600'
              }`}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-1">Selected: {config.primaryColor}</p>
      </div>

      {/* Background Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Background</label>
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => handleChange('backgroundColor', '#ffffff')}
            className={`flex-1 py-1.5 text-xs rounded-md font-medium transition-all ${
              config.backgroundColor === '#ffffff' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            White
          </button>
          <button
            onClick={() => handleChange('backgroundColor', '#000000')}
            className={`flex-1 py-1.5 text-xs rounded-md font-medium transition-all ${
              config.backgroundColor === '#000000' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Black
          </button>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating || !config.brandName || !config.description}
        className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Logo...
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5" />
            Generate Logo
          </>
        )}
      </button>
    </div>
  );
};