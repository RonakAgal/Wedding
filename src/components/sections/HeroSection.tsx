import React from 'react';
import { ChevronDown, Heart } from 'lucide-react';
import { FAMILY_DETAILS } from '../../data/weddingData';

interface HeroSectionProps {
  hasScrolled: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ hasScrolled }) => {
  const handleScrollDown = () => {
    const detailsSection = document.getElementById('wedding-details');
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: window.innerHeight - 56, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Grand Royal Palace Wedding Invitation Card Artwork */}
      <section className="w-full h-[calc(100vh-57px)] h-[calc(100dvh-57px)] sm:h-auto sm:min-h-0 max-w-full sm:max-w-2xl md:max-w-3xl mx-auto px-0 sm:px-6 md:px-8 pt-0 sm:pt-6 md:pt-8 pb-0 sm:pb-6 overflow-hidden relative">
        <div className="relative w-full h-full rounded-none sm:rounded-[28px] overflow-hidden bg-transparent group">
          <img
            src="/images/Gemini_Generated_Image_nxa54cnxa54cnxa5.png"
            alt="Shubh Vivah Patrika - Himanshi Agal & Gagan Baheti"
            loading="eager"
            decoding="sync"
            className="w-full h-full object-cover object-center sm:object-contain block transition-transform duration-700 group-hover:scale-[1.01]"
          />

          {/* Top Right Royal "Scroll Down" Indicator Button */}
          <button
            onClick={handleScrollDown}
            className={`absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8B1E1E]/95 hover:bg-[#8B1E1E] text-[#F0DB9E] border border-[#C89D3C] shadow-[0_4px_15px_rgba(139,30,30,0.35)] backdrop-blur-sm transition-all duration-500 cursor-pointer active:scale-95 hover:scale-105 ${
              hasScrolled ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 animate-bounce'
            }`}
            aria-label="Scroll down to view wedding details"
          >
            <span className="font-label text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#F0DB9E] drop-shadow-sm">
              Scroll Down
            </span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F0DB9E] stroke-[2.5]" />
          </button>

          {/* Bottom Royal Scroll Down Cue */}
          <button
            onClick={handleScrollDown}
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF7EE]/90 border border-[#C89D3C]/60 text-[#8B1E1E] shadow-md backdrop-blur-sm sm:hidden transition-all duration-500 cursor-pointer ${
              hasScrolled ? 'opacity-0 pointer-events-none scale-75' : 'opacity-90 animate-bounce'
            }`}
            aria-label="Scroll to celebration details"
          >
            <span className="font-label text-[9.5px] font-bold tracking-wider uppercase text-[#8B1E1E]">
              Scroll Down
            </span>
            <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </section>

      {/* 2. Royal Couple Portrait Card */}
      <section className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 overflow-hidden">
        <div className="relative rounded-[28px] overflow-hidden border-2 border-[#C89D3C] rajput-card-shadow group">
          <div className="aspect-[3/4] sm:aspect-[4/5] relative">
            <img
              src="/images/couple/hero_ethnic_sunglasses.jpg"
              alt="Himanshi Agal & Gagan Baheti"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            {/* Grand Fort / Palace Ambient Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E0E] via-[#4A0E0E]/30 to-transparent flex flex-col justify-end p-5 sm:p-6 text-center">
              <span className="font-label text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#F0DB9E] font-semibold mb-1">
                CELEBRATING OUR UNION
              </span>
              <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#FFFFFF] tracking-tight">
                {FAMILY_DETAILS.groom}
              </h2>
              <div className="flex items-center justify-center gap-2 my-1">
                <div className="h-[1px] w-8 bg-[#C89D3C]" />
                <Heart className="w-3.5 h-3.5 fill-[#F0DB9E] text-[#F0DB9E]" />
                <div className="h-[1px] w-8 bg-[#C89D3C]" />
              </div>
              <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#F0DB9E] tracking-tight">
                {FAMILY_DETAILS.bride}
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

