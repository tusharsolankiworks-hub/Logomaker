import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { PreviewArea } from './components/PreviewArea';
import { HistoryGrid } from './components/HistoryGrid';
import { LogoConfig, GeneratedLogo, GenerationStatus, LOGO_STYLES, COLOR_PALETTES } from './types';
import { generateLogoImage } from './services/geminiService';

const DEFAULT_CONFIG: LogoConfig = {
  brandName: '',
  description: '',
  style: LOGO_STYLES[0],
  primaryColor: COLOR_PALETTES[0].name,
  backgroundColor: '#ffffff'
};

function App() {
  const [config, setConfig] = useState<LogoConfig>(DEFAULT_CONFIG);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [currentLogo, setCurrentLogo] = useState<GeneratedLogo | null>(null);
  const [history, setHistory] = useState<GeneratedLogo[]>([]);

  const handleGenerate = async () => {
    if (!config.brandName || !config.description) return;

    setStatus('generating');
    
    try {
      const imageUrl = await generateLogoImage(config);
      
      const newLogo: GeneratedLogo = {
        id: crypto.randomUUID(),
        imageUrl,
        config: { ...config }, // snapshot current config
        createdAt: Date.now()
      };

      setCurrentLogo(newLogo);
      setHistory(prev => [newLogo, ...prev]);
      setStatus('success');
    } catch (error) {
      console.error("Failed to generate logo", error);
      setStatus('error');
      // In a real app, we would show a toast or error message here
      alert("Failed to generate logo. Please check your API Key and try again.");
    }
  };

  const handleSelectHistory = useCallback((logo: GeneratedLogo) => {
    setCurrentLogo(logo);
    // Optionally populate form with this logo's config to allow iteration
    setConfig(logo.config);
    // Scroll to top to see preview
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1">
             <div className="sticky top-24">
                <ControlPanel 
                  config={config} 
                  setConfig={setConfig} 
                  onGenerate={handleGenerate}
                  isGenerating={status === 'generating'}
                />
             </div>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2">
            <PreviewArea currentLogo={currentLogo} status={status} />
          </div>
        </div>

        {/* Bottom Section: History */}
        <div className="border-t border-slate-800 mt-16 pt-8">
           <HistoryGrid history={history} onSelect={handleSelectHistory} />
        </div>

      </main>
      
      <footer className="py-8 text-center text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} LogoCraft AI. Generated images are for demonstration purposes.</p>
      </footer>
    </div>
  );
}

export default App;