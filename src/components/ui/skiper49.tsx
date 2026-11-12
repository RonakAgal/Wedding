import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { cn } from '../../lib/utils';

export interface Carousel003Image {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
}

export interface Carousel003Props {
  images: Carousel003Image[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}

export const Carousel_003: React.FC<Carousel003Props> = ({
  images,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = true,
  spaceBetween = 0,
}) => {
  return (
    <div className={cn('relative w-full max-w-full overflow-hidden py-4 select-none', className)}>
      <style>{`
        .skiper49-wrapper .swiper {
          width: 100%;
          padding-top: 15px;
          padding-bottom: 45px;
        }
        .skiper49-wrapper .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 320px !important;
          height: 450px !important;
          border-radius: 24px !important;
          overflow: hidden !important;
          box-shadow: 0 20px 40px -10px rgba(74, 14, 14, 0.4), 0 0 0 2px rgba(200, 157, 60, 0.6) !important;
          transition: transform 0.4s ease, box-shadow 0.4s ease !important;
        }
        @media (min-width: 768px) {
          .skiper49-wrapper .swiper-slide {
            width: 360px !important;
            height: 490px !important;
          }
        }
        .skiper49-wrapper .swiper-slide-active {
          box-shadow: 0 30px 60px -10px rgba(139, 30, 30, 0.5), 0 0 0 3px rgba(200, 157, 60, 0.9) !important;
          transform: scale(1.03) !important;
        }
      `}</style>
      <div className="skiper49-wrapper relative w-full">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={loop}
          spaceBetween={spaceBetween}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 140,
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
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  prevEl: '.skiper49-nav-prev',
                  nextEl: '.skiper49-nav-next',
                }
              : false
          }
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="w-full"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className="relative group">
              <img
                src={img.src}
                alt={img.alt || `Slide ${idx + 1}`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              {(img.title || img.caption) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 text-left">
                  {img.title && (
                    <h3 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
                      {img.title}
                    </h3>
                  )}
                  {img.caption && (
                    <p className="font-body text-xs text-[#F0DB9E] mt-1 line-clamp-2">
                      {img.caption}
                    </p>
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {showNavigation && (
          <div className="absolute inset-y-1/2 -translate-y-1/2 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
            <button
              type="button"
              className="skiper49-nav-prev w-10 h-10 rounded-full bg-white/90 hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#C89D3C]/60 flex items-center justify-center shadow-lg transition-all duration-300 pointer-events-auto cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="skiper49-nav-next w-10 h-10 rounded-full bg-white/90 hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#C89D3C]/60 flex items-center justify-center shadow-lg transition-all duration-300 pointer-events-auto cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel_003;

