import React from 'react';
import { Skiper48Gallery } from '../Skiper48Gallery';
import { Skiper49Gallery } from '../Skiper49Gallery';
import { GALLERY_MOMENTS } from '../../data/weddingData';

export const GallerySection: React.FC = () => {
  return (
    <section id="gallery-section" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-6 overflow-hidden">
      <div className="text-center mb-3">
        <span className="font-label text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#987220] font-bold block mb-1">
          CHERISHED MEMORIES
        </span>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#8B1E1E] tracking-tight">
          Moments of Love
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span className="h-px w-8 bg-[#C89D3C]/60"></span>
          <span className="text-[#C89D3C] text-xs">❖</span>
          <span className="h-px w-8 bg-[#C89D3C]/60"></span>
        </div>
        <p className="font-body text-xs text-[#2A1810]/75 mt-1.5">
          Swipe left or right through our fondest royal memories
        </p>
      </div>

      {/* Mobile view: Skiper48 3D Card Stack Swipe */}
      <div className="block md:hidden">
        <Skiper48Gallery items={GALLERY_MOMENTS} autoplay={true} />
      </div>

      {/* Desktop view: Inverted Perspective 3D Coverflow Carousel */}
      <div className="hidden md:block">
        <Skiper49Gallery items={GALLERY_MOMENTS} autoplay={true} />
      </div>
    </section>
  );
};

