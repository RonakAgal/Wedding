import React from 'react';
import { motion } from 'framer-motion';

export const WardrobePlanner: React.FC = () => {
  return (
    <section className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-4">
        <span className="font-label text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#987220] font-bold block mb-1">
          CEREMONY DRESS CODES
        </span>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#8B1E1E] tracking-tight">
          Wardrobe Planner
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span className="h-px w-8 bg-[#C89D3C]/60"></span>
          <span className="text-[#C89D3C] text-xs">❖</span>
          <span className="h-px w-8 bg-[#C89D3C]/60"></span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-[28px] overflow-hidden border-2 border-[#C89D3C] rajput-card-shadow bg-[#FFFDF9] group shadow-xl"
      >
        {/* High-Resolution Enhanced Wardrobe Planner Artwork */}
        <img
          src="/images/wedding/wardrobe_planner_full.png"
          alt="Dress for the Moment - Wardrobe Planner"
          className="w-full h-auto block object-contain transition-transform duration-700 group-hover:scale-[1.01] brightness-[1.03] contrast-[1.06] saturate-[1.12]"
          loading="lazy"
        />

        {/* Elegant Bottom Caption */}
        <div className="py-2.5 px-4 text-center bg-[#FAF3E0] border-t border-[#C89D3C]/40">
          <p className="font-body text-xs text-[#8B1E1E] italic font-semibold">
            ✨ Traditional attire & elegant dress codes for all wedding ceremonies
          </p>
        </div>
      </motion.div>
    </section>
  );
};
