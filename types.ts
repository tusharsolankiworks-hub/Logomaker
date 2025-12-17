export interface LogoConfig {
  brandName: string;
  description: string;
  style: string;
  primaryColor: string;
  backgroundColor: string;
}

export interface GeneratedLogo {
  id: string;
  imageUrl: string;
  config: LogoConfig;
  createdAt: number;
}

export type GenerationStatus = 'idle' | 'generating' | 'success' | 'error';

export const LOGO_STYLES = [
  'Minimalist',
  'Modern',
  'Vintage/Retro',
  'Abstract',
  '3D/Isometric',
  'Hand-drawn',
  'Tech/Geometric',
  'Luxury/Elegant',
  'Mascot/Character'
];

export const COLOR_PALETTES = [
  { name: 'Midnight Blue', value: '#1e3a8a' },
  { name: 'Emerald Green', value: '#059669' },
  { name: 'Crimson Red', value: '#dc2626' },
  { name: 'Royal Purple', value: '#7c3aed' },
  { name: 'Sunset Orange', value: '#ea580c' },
  { name: 'Slate Gray', value: '#475569' },
  { name: 'Pitch Black', value: '#000000' },
  { name: 'Pure White', value: '#ffffff' },
  { name: 'Gold', value: '#d97706' },
  { name: 'Hot Pink', value: '#db2777' },
];