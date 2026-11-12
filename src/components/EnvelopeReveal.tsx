import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { royalSound } from '../data/audioHelper';

interface EnvelopeRevealProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const EnvelopeReveal: React.FC<EnvelopeRevealProps> = ({ isOpen, onOpen }) => {
  const [phase, setPhase] = useState<'idle' | 'sparkle' | 'opening' | 'unveiled'>('idle');
  const [isRemoved, setIsRemoved] = useState(false);

  const handleSealClick = () => {
    if (phase !== 'idle' || isOpen) return;

    // 1. Sparkle & Golden Glow phase
    setPhase('sparkle');
    royalSound.playWeddingSong();

    // Stage 1: Golden Star Dust explosion from G&H seal center
    confetti({
      particleCount: 55,
      spread: 85,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#F0DB9E', '#C89D3C', '#E9CF87', '#FFFFFF', '#FFD700'],
      scalar: 1.1,
    });

    // Stage 2: Royal Rose & Gold Petals burst
    setTimeout(() => {
      confetti({
        particleCount: 75,
        spread: 110,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FF4D6D', '#FF758F', '#C89D3C', '#F0DB9E'],
        scalar: 1.2,
      });
    }, 400);

    // 2. Open Transition
    setTimeout(() => {
      setPhase('opening');
      confetti({
        particleCount: 90,
        spread: 130,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#C89D3C', '#8B1E1E', '#FF4D6D', '#F0DB9E', '#FFFFFF'],
        scalar: 1.3,
      });
    }, 850);

    // 3. Complete & Unveil Website
    setTimeout(() => {
      setPhase('unveiled');
      onOpen();
    }, 1800);

    // 4. Remove completely from DOM
    setTimeout(() => {
      setIsRemoved(true);
    }, 2800);
  };

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 md:p-10 bg-[#1A0A0A]/95 sm:bg-[#1A0A0A]/90 backdrop-blur-md transition-opacity duration-1000 select-none overflow-hidden touch-none w-full h-[100dvh] h-screen ${phase === 'unveiled' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      {/* Full Complete Width Royal Velvet Envelope Container */}
      <div className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full h-full sm:h-auto max-w-5xl lg:max-w-6xl">
        {/* Envelope Body with Royal Rajput Gold Frame */}
        <div
          onClick={handleSealClick}
          className="relative w-full h-full sm:h-auto sm:aspect-[16/11] md:aspect-[16/11] lg:aspect-[16/9] sm:max-h-[85vh] rounded-none sm:rounded-[32px] md:rounded-[40px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(200,157,60,0.45)] border-0 sm:border-3 md:border-4 border-[#C89D3C] bg-[#5A1111] flex items-center justify-center cursor-pointer group active:scale-[0.99] hover:scale-[1.01] transition-all duration-300"
        >
          {/* Desktop Landscape Cover: The Exact Full Width Horizontal Velvet Artwork Uploaded */}
          <img
            src="/images/envelope_desktop_cover.jpg"
            alt="Royal Velvet Envelope Desktop"
            loading="eager"
            decoding="sync"
            className="hidden sm:block w-full h-full object-cover object-center pointer-events-none group-hover:scale-105 transition-transform duration-700"
          />

          {/* Mobile Vertical Cover (for small screens - 100% full height top & bottom) */}
          <img
            src="/images/envelope_cover-clean.png"
            alt="Royal Velvet Envelope Mobile"
            loading="eager"
            decoding="sync"
            className="block sm:hidden w-full h-full object-cover object-center pointer-events-none group-hover:scale-105 transition-transform duration-700"
          />

          {/* Glowing Golden Sparkle Beams & Fairy Dust Overlay (Transparent center so G&H seal shines!) */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-10 ${phase === 'sparkle' || phase === 'opening' ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
          >
            <img
              src="/images/envelope_sparkle.png"
              alt="Royal Sparkle Glow"
              loading="eager"
              className="w-full h-full object-cover object-center pointer-events-none block mix-blend-screen transition-transform duration-1000"
            />
          </div>

          {/* Radiant Golden Sunburst Light Rays beaming out from G&H Seal on click (Center is transparent so G&H is crystal clear) */}
          {(phase === 'sparkle' || phase === 'opening') && (
            <div
              className="absolute top-[49.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] sm:w-[800px] sm:h-[800px] pointer-events-none z-10 animate-spin opacity-70 mix-blend-screen transition-opacity duration-700"
              style={{ animationDuration: '24s' }}
            >
              <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,transparent_0%,transparent_60px,rgba(255,225,140,0.35)_75px,rgba(200,157,60,0.18)_30%,transparent_60%)]" />
            </div>
          )}

          {/* Expanding Shockwave Gold Ring from G&H Seal */}
          {(phase === 'sparkle' || phase === 'opening') && (
            <div className="absolute top-[49.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#C89D3C]/70 animate-ping pointer-events-none z-10 duration-1000" />
          )}

          {/* Golden Outer Halo around the Wax Seal (Hollow center so G&H monogram is 100% sharp and visible) */}
          <div
            className={`absolute top-[49.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-700 z-10 ${phase === 'sparkle' || phase === 'opening'
                ? 'w-64 sm:w-80 h-64 sm:h-80 opacity-90'
                : 'w-44 sm:w-56 h-44 sm:h-56 opacity-60 group-hover:scale-110'
              }`}
            style={{
              background: 'radial-gradient(circle, transparent 0, transparent 46px, rgba(200,157,60,0.4) 58px, rgba(233,207,135,0.18) 78px, transparent 110px)',
            }}
          />

          {/* Idle Golden Ripple Pulse Waves behind G&H Seal (Draws eye to seal without duplicate text) */}
          {phase === 'idle' && (
            <>
              <div
                className="absolute top-[49.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-36 h-28 sm:h-36 rounded-full border-2 border-[#F0DB9E]/80 animate-ping pointer-events-none z-10"
                style={{ animationDuration: '2.4s' }}
              />
              <div
                className="absolute top-[49.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 sm:w-48 h-36 sm:h-48 rounded-full border border-[#C89D3C]/50 animate-ping pointer-events-none z-10"
                style={{ animationDuration: '3.2s' }}
              />
            </>
          )}
        </div>

        {/* Desktop Elegant Subtitle */}
        <p className="hidden sm:block font-label text-xs sm:text-sm uppercase tracking-[0.3em] text-[#F0DB9E]/90 text-center animate-pulse drop-shadow-md">
          ❖ Shubh Vivah Patrika • Himanshi Agal & Gagan Baheti • Udaipur ❖
        </p>
      </div>
    </div>
  );
};
