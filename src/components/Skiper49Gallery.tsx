import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

// Swiper CSS styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { cn } from '../lib/utils';

export interface Skiper49Item {
  title: string;
  hindi?: string;
  image: string;
  caption?: string;
}

interface Skiper49GalleryProps {
  items: Skiper49Item[];
  className?: string;
  autoplay?: boolean;
}

export const Skiper49Gallery: React.FC<Skiper49GalleryProps> = ({
  items,
  className,
  autoplay = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('relative w-full max-w-full overflow-hidden flex flex-col items-center justify-center py-4 select-none', className)}
    >
      <style>{`
        /* Skiper49 Inverted Perspective Coverflow Dimensions & Styles */
        .skiper49-carousel-wrapper {
          width: 100%;
          max-width: 100%;
          padding: 20px 0 35px 0;
          overflow: hidden;
        }

        .skiper49-carousel-wrapper .swiper {
          width: 100%;
          padding-top: 15px;
          padding-bottom: 45px;
          overflow: visible !important;
        }

        .skiper49-carousel-wrapper .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 270px !important;
          height: 380px !important;
          border-radius: 26px !important;
          overflow: hidden !important;
          box-shadow: 0 20px 50px -10px rgba(74, 14, 14, 0.4), 0 0 0 2px rgba(200, 157, 60, 0.5) !important;
          transition: transform 0.4s ease, box-shadow 0.4s ease !important;
        }

        @media (min-width: 640px) {
          .skiper49-carousel-wrapper .swiper-slide {
            width: 290px !important;
            height: 400px !important;
          }
        }

        @media (min-width: 768px) {
          .skiper49-carousel-wrapper .swiper-slide {
            width: 310px !important;
            height: 430px !important;
            border-radius: 28px !important;
          }
        }

        @media (min-width: 1024px) {
          .skiper49-carousel-wrapper .swiper-slide {
            width: 360px !important;
            height: 490px !important;
            border-radius: 30px !important;
          }
        }

        .skiper49-carousel-wrapper .swiper-slide-active {
          box-shadow: 0 30px 70px -10px rgba(139, 30, 30, 0.5), 0 0 0 3px rgba(200, 157, 60, 0.85), 0 0 30px rgba(200, 157, 60, 0.25) !important;
          transform: scale(1.03) !important;
        }

        .skiper49-bullet {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(200, 157, 60, 0.35);
          margin: 0 4px !important;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .skiper49-bullet-active {
          width: 24px !important;
          border-radius: 9999px !important;
          background: #8B1E1E !important;
          box-shadow: 0 2px 8px rgba(139, 30, 30, 0.4);
        }
      `}</style>

      {/* 3D Coverflow Container */}
      <div className="skiper49-carousel-wrapper relative w-full">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 22,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={
            autoplay
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          pagination={{
            clickable: true,
            el: '.skiper49-pagination',
            bulletClass: 'skiper49-bullet',
            bulletActiveClass: 'skiper49-bullet-active',
          }}
          navigation={{
            prevEl: '.skiper49-prev-btn',
            nextEl: '.skiper49-next-btn',
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="w-full"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index} className="relative group">
              {/* Full Bleed Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                loading="lazy"
              />

              {/* Palace Ambient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A0808]/95 via-[#2A0808]/40 to-transparent flex flex-col justify-end p-5 text-left pointer-events-none">
                <span className="font-label text-[9px] uppercase tracking-[0.25em] text-[#F0DB9E] font-bold block mb-1">
                  MOMENT 0{index + 1}
                </span>

                <h3 className="font-headline text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                  {item.title}
                </h3>

                {item.hindi && (
                  <p className="font-hindi text-xs sm:text-sm text-[#F0DB9E] font-semibold mt-0.5 drop-shadow-sm">
                    {item.hindi}
                  </p>
                )}

                <div className="flex items-center gap-2 my-1.5 opacity-80">
                  <div className="h-[1px] w-6 bg-[#C89D3C]" />
                  <Heart className="w-2.5 h-2.5 fill-[#F0DB9E] text-[#F0DB9E]" />
                  <div className="h-[1px] w-12 bg-[#C89D3C]" />
                </div>

                {item.caption && (
                  <p className="font-body text-[11px] sm:text-xs text-white/90 italic line-clamp-2 leading-relaxed">
                    "{item.caption}"
                  </p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows (Desktop / Tablet) */}
        <div className="absolute inset-y-1/2 -translate-y-1/2 left-2 right-2 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none z-20">
          <button
            type="button"
            className="skiper49-prev-btn w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#C89D3C]/60 flex items-center justify-center shadow-lg transition-all duration-300 pointer-events-auto cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            className="skiper49-next-btn w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#C89D3C]/60 flex items-center justify-center shadow-lg transition-all duration-300 pointer-events-auto cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Royal Dots Pagination */}
      <div className="skiper49-pagination flex items-center justify-center gap-1 mt-2 z-10" />
    </motion.div>
  );
};

