import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { KalashIcon } from '../RajwadiIcons';

interface HeaderProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  activeTab: 'home' | 'events' | 'venue' | 'gallery' | 'wishes';
  setActiveTab: (tab: 'home' | 'events' | 'venue' | 'gallery' | 'wishes') => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMusicPlaying,
  onToggleMusic,
  activeTab,
  setActiveTab,
}) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FBF7EE]/95 backdrop-blur-md px-3.5 sm:px-5 md:px-6 lg:px-12 py-2.5 sm:py-3 md:py-3.5 border-b border-[#C89D3C]/30 flex items-center justify-between w-full shadow-sm">
        {/* Left Branding: Logo & Title - Never truncated */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <KalashIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 shrink-0" />
          <div className="shrink-0 text-left">
            <span className="font-label text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#8B1E1E] font-bold block leading-tight whitespace-nowrap">
              SHREE GANESHAY NAMAH
            </span>
            <span className="font-headline text-xs sm:text-sm md:text-base font-bold text-[#2A1810] block leading-tight whitespace-nowrap mt-0.5">
              Lagan Patrika
            </span>
          </div>
        </div>

        {/* Center Navigation Links - Tablet & iPad Friendly Spacing */}
        <nav className="hidden md:flex items-center gap-3 sm:gap-4 lg:gap-7 shrink-0">
          <a
            href="#"
            onClick={() => setActiveTab('home')}
            className={`text-[11px] lg:text-xs font-label font-bold uppercase tracking-wider lg:tracking-widest transition-colors hover:text-[#8B1E1E] whitespace-nowrap ${
              activeTab === 'home' ? 'text-[#8B1E1E] border-b-2 border-[#8B1E1E] pb-0.5' : 'text-[#2A1810]/70'
            }`}
          >
            Home
          </a>
          <a
            href="#events-section"
            onClick={() => setActiveTab('events')}
            className={`text-[11px] lg:text-xs font-label font-bold uppercase tracking-wider lg:tracking-widest transition-colors hover:text-[#8B1E1E] whitespace-nowrap ${
              activeTab === 'events' ? 'text-[#8B1E1E] border-b-2 border-[#8B1E1E] pb-0.5' : 'text-[#2A1810]/70'
            }`}
          >
            Ceremonies
          </a>
          <a
            href="#gallery-section"
            onClick={() => setActiveTab('gallery')}
            className={`text-[11px] lg:text-xs font-label font-bold uppercase tracking-wider lg:tracking-widest transition-colors hover:text-[#8B1E1E] whitespace-nowrap ${
              activeTab === 'gallery' ? 'text-[#8B1E1E] border-b-2 border-[#8B1E1E] pb-0.5' : 'text-[#2A1810]/70'
            }`}
          >
            Gallery
          </a>
          <a
            href="#venue-section"
            onClick={() => setActiveTab('venue')}
            className={`text-[11px] lg:text-xs font-label font-bold uppercase tracking-wider lg:tracking-widest transition-colors hover:text-[#8B1E1E] whitespace-nowrap ${
              activeTab === 'venue' ? 'text-[#8B1E1E] border-b-2 border-[#8B1E1E] pb-0.5' : 'text-[#2A1810]/70'
            }`}
          >
            Venue
          </a>
        </nav>

        {/* Audio Toggle Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleMusic}
            className="px-2.5 sm:px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#C89D3C]/60 flex items-center gap-1.5 sm:gap-2 text-[#8B1E1E] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            title={isMusicPlaying ? 'Mute' : 'Play Shehnai'}
          >
            {isMusicPlaying ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse shrink-0" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            )}
            <span className="text-[10px] sm:text-[11px] font-label font-bold uppercase tracking-wider whitespace-nowrap">
              {isMusicPlaying ? 'Shehnai On' : 'Play Shehnai'}
            </span>
          </button>
        </div>
      </header>

      {/* Spacer to prevent header from covering content */}
      <div className="h-[56px] md:h-[65px] w-full shrink-0" aria-hidden="true" />
    </>
  );
};

