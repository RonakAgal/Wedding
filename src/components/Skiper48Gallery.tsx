import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { cn } from "../lib/utils";

interface SkiperCardItem {
  image: string;
  title: string;
  caption?: string;
}

interface Skiper48GalleryProps {
  items: SkiperCardItem[];
  className?: string;
  autoplay?: boolean;
}

export const Skiper48Gallery: React.FC<Skiper48GalleryProps> = ({
  items,
  className,
  autoplay = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className={cn("relative w-full max-w-full overflow-hidden flex flex-col items-center justify-center py-4", className)}
    >
      <style>{`
        .skiper48-swiper {
          width: 250px !important;
          max-width: 80vw !important;
          height: 360px !important;
          overflow: visible !important;
        }
        @media (min-width: 640px) {
          .skiper48-swiper {
            width: 280px !important;
            height: 400px !important;
          }
        }
        @media (min-width: 768px) {
          .skiper48-swiper {
            width: 320px !important;
            height: 440px !important;
          }
        }
        .skiper48-swiper .swiper-slide {
          border-radius: 24px !important;
          box-shadow: 0 15px 35px -5px rgba(139, 30, 30, 0.25), 0 0 0 1px rgba(200, 157, 60, 0.35);
          overflow: hidden !important;
          background-color: #FFFFFF !important;
        }
        .skiper-nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(200, 157, 60, 0.4);
          color: #8B1E1E;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }
        .skiper-nav-btn:hover {
          background: #8B1E1E;
          color: #FFFFFF;
          border-color: #8B1E1E;
          transform: scale(1.08);
        }
      `}</style>

      {/* Swiper Cards Container */}
      <div className="relative w-full max-w-full overflow-hidden flex items-center justify-center py-2">
        <Swiper
          effect="cards"
          grabCursor={true}
          loop={true}
          autoplay={
            autoplay
              ? {
                  delay: 2800,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          navigation={{
            nextEl: ".skiper-next-btn",
            prevEl: ".skiper-prev-btn",
          }}
          className="skiper48-swiper"
          modules={[EffectCards, Autoplay, Pagination, Navigation]}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index} className="relative group">
              <div className="w-full h-full relative overflow-hidden bg-[#1A0A0A]">
                <img
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
                
                {/* Royal Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Top Corner Regal Star Accent */}
                <div className="absolute top-3 right-3 text-[#F0DB9E] text-xs font-serif opacity-80">
                  ✦
                </div>

                {/* Bottom Title & Details Pill */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-left pointer-events-none">
                  <span className="font-label text-[9px] uppercase tracking-[0.2em] text-[#F0DB9E] font-bold block mb-1">
                    MOMENT 0{index + 1}
                  </span>
                  <h4 className="font-headline text-base font-bold text-white drop-shadow-md leading-tight">
                    {item.title}
                  </h4>
                  {item.caption && (
                    <p className="font-body text-[11px] text-[#F0DB9E]/85 line-clamp-1 mt-0.5">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Navigation Controls & Hint */}
      <div className="flex items-center justify-between w-full max-w-[270px] mt-4 px-2">
        <button
          type="button"
          aria-label="Previous Slide"
          className="skiper-nav-btn skiper-prev-btn"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-[10px] font-label uppercase tracking-widest text-[#987220] font-bold">
          Swipe or Click Cards
        </span>

        <button
          type="button"
          aria-label="Next Slide"
          className="skiper-nav-btn skiper-next-btn"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
