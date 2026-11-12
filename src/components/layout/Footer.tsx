import React from 'react';
import { Phone, Share2, Heart, Sparkles } from 'lucide-react';
import { KalashIcon } from '../RajwadiIcons';

export const Footer: React.FC = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Himanshi & Gagan Royal Wedding Invitation',
        text: 'Shubh Vivah Mahotsav of Himanshi Agal & Gagan Baheti at Swarn Jayanti Park & Perfectstayz Premium, Udaipur.',
        url: window.location.href,
      }).catch(() => {
        // Fallback or cancelled
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Invitation link copied to clipboard!');
    }
  };

  return (
    <footer className="px-3 sm:px-6 py-6 sm:py-8 text-center border-t border-[#C89D3C]/30 bg-[#FAF3E0]/40 overflow-hidden w-full">
      <KalashIcon className="w-8 h-8 mx-auto mb-2" />
      <span className="font-label text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#987220] font-bold block mb-3">
        WITH THE NOBLE BLESSING & BEST COMPLIMENTS
      </span>

      {/* Two Family Columns: Left Side Agal Family, Right Side Baheti Family */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-2xl mx-auto my-3 text-center">
        {/* Agal Family (Left) */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white/90 border border-[#C89D3C]/40 shadow-xs hover:border-[#8B1E1E]/50 transition-all flex flex-col justify-between items-center space-y-2">
          <div>
            <span className="text-[9px] sm:text-[10px] font-label font-bold uppercase tracking-wider text-[#987220] block">
              Bride's Family
            </span>
            <h3 className="font-headline text-sm sm:text-lg font-bold text-[#8B1E1E] mt-0.5">
              The Agal Family
            </h3>
            <p className="font-body text-[11px] sm:text-xs text-[#2A1810]/85 mt-1 leading-tight sm:leading-relaxed">
              Gopal Lal Agal, Shanta Devi Agal
              <span className="block text-[10px] sm:text-[11px] text-[#2A1810]/60 italic mt-0.5">
                & all Family members
              </span>
            </p>
          </div>

          <a
            href="tel:+919351689814"
            className="w-full max-w-[170px] px-3 py-1.5 sm:py-2 rounded-full bg-[#FAF3E0] hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#C89D3C]/60 text-[10px] sm:text-xs font-label font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer group"
            title="Call Agal Family Helpline"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>Helpline</span>
          </a>
        </div>

        {/* Baheti Family (Right) */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white/90 border border-[#C89D3C]/40 shadow-xs hover:border-[#8B1E1E]/50 transition-all flex flex-col justify-between items-center space-y-2">
          <div>
            <span className="text-[9px] sm:text-[10px] font-label font-bold uppercase tracking-wider text-[#987220] block">
              Groom's Family
            </span>
            <h3 className="font-headline text-sm sm:text-lg font-bold text-[#8B1E1E] mt-0.5">
              The Baheti Family
            </h3>
            <p className="font-body text-[11px] sm:text-xs text-[#2A1810]/85 mt-1 leading-tight sm:leading-relaxed">
              Gopal Swaroop Baheti, Upasana Baheti
              <span className="block text-[10px] sm:text-[11px] text-[#2A1810]/60 italic mt-0.5">
                & all Family members
              </span>
            </p>
          </div>

          <a
            href="tel:+919602162256"
            className="w-full max-w-[170px] px-3 py-1.5 sm:py-2 rounded-full bg-[#FAF3E0] hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#C89D3C]/60 text-[10px] sm:text-xs font-label font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer group"
            title="Call Baheti Family Helpline"
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>Helpline</span>
          </a>
        </div>
      </div>

      {/* Share Invitation */}
      <div className="flex items-center justify-center mt-3.5">
        <button
          onClick={handleShare}
          className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#FFFFFF] hover:bg-[#8B1E1E] hover:text-white border border-[#C89D3C]/50 text-xs font-label text-[#8B1E1E] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Invitation</span>
        </button>
      </div>

      {/* Creator & Wedding Website Inquiries Badge (Ronak Agal) */}
      <div className="mt-8 pt-5 border-t border-[#C89D3C]/25 flex flex-col items-center justify-center gap-2.5">
        <div className="flex items-center gap-1.5 text-xs text-[#2A1810]/80">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 fill-[#8B1E1E] text-[#8B1E1E] inline" />
          <span>by</span>
          <span className="font-bold text-[#8B1E1E] tracking-wide">Ronak Agal</span>
        </div>

        <a
          href="https://wa.me/917737590048?text=Hello%20Ronak!%20I%20saw%20Himanshi%20%26%20Gagan's%20wedding%20website.%20I%20would%20like%20to%20create%20a%20similar%20digital%20wedding%20invitation."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl sm:rounded-full bg-[#FAF3E0] hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#C89D3C]/60 shadow-xs hover:shadow-md transition-all text-xs font-label font-bold uppercase tracking-wider group cursor-pointer text-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C89D3C] group-hover:text-[#F0DB9E] shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 leading-tight">
            <span className="whitespace-nowrap">Get Your Wedding Website</span>
            <span className="hidden sm:inline text-[#C89D3C] group-hover:text-white">•</span>
            <span className="whitespace-nowrap font-sans font-bold text-xs tracking-normal">
              WhatsApp: +91 77375 90048
            </span>
          </div>
        </a>

        <p className="font-label text-[9px] text-[#2A1810]/50 uppercase tracking-widest mt-2">
          CORDIALLY WELCOMING YOU IN UDAIPUR • 11-12 DECEMBER 2026
        </p>
      </div>
    </footer>
  );
};

