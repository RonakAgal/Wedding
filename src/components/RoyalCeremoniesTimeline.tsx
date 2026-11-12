import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Calendar, Clock, Sparkles, Navigation, MapPin } from 'lucide-react';
import { WEDDING_EVENTS, WeddingEvent } from '../data/weddingData';
import { KalashIcon, HaathiIcon, GhodaIcon, ShehnaiIcon } from './RajwadiIcons';

interface ParallaxCeremonyCardProps {
  event: WeddingEvent;
  idx: number;
  originalIndex: number;
  getEventIcon: (type: WeddingEvent['iconType']) => React.ReactNode;
}

const ParallaxCeremonyCard: React.FC<ParallaxCeremonyCardProps> = ({
  event,
  idx,
  originalIndex,
  getEventIcon,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. Scroll-driven Image Parallax (Fluid on Mobile Touch & Desktop Scroll)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.12, 1.18]);

  // 2. Interactive 3D Card Parallax (Mouse Hover / Tilt on Desktop)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 22 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
    setCursorPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setCursorPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: idx * 0.06 }}
      className="relative group h-full flex flex-col"
      style={{ perspective: 1200 }}
    >
      {/* Timeline Node Icon Badge (Mobile only) */}
      <div
        className="md:hidden absolute -left-5 sm:-left-7 top-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 shadow-md bg-[#8B1E1E] border-[#C89D3C]"
      >
        <span className="text-[10px] font-label font-bold text-white">
          0{originalIndex + 1}
        </span>
      </div>

      {/* Royal Ceremony 3D Tilt Card - Always Full Height */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#C89D3C]/40 hover:border-[#8B1E1E]/70 hover:shadow-2xl transition-all duration-300 rajput-card-shadow relative h-full flex flex-col justify-between"
      >
        {/* Dynamic Golden Shimmer Glow Overlay following cursor on hover */}
        {cursorPos.active && (
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 280px at ${cursorPos.x}% ${cursorPos.y}%, rgba(200, 157, 60, 0.16), transparent 70%)`,
            }}
          />
        )}

        {/* Visual Backdrop Banner (Hero Aspect with Parallax Scroll) */}
        <div
          className="relative h-44 sm:h-48 md:h-52 w-full overflow-hidden select-none shrink-0"
        >
          {/* Scroll Parallax Image Layer */}
          <motion.img
            src={event.bgImage || event.image}
            alt={event.title}
            style={{
              y: imageY,
              scale: imageScale,
            }}
            className="w-full h-[125%] -top-[12%] absolute inset-0 object-cover brightness-[0.88] will-change-transform pointer-events-none"
            loading="lazy"
          />

          {/* Deep Palace Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25 pointer-events-none" />

          {/* Parallax Floating Day Badge */}
          <div
            style={{ transform: 'translateZ(26px)' }}
            className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-[#C89D3C]/70 text-[#F0DB9E] text-[10px] font-label font-bold uppercase tracking-wider shadow-lg"
          >
            <Clock className="w-3 h-3 text-[#C89D3C]" />
            <span>DAY {event.date.includes('11') || (event.dateEn && event.dateEn.includes('11')) ? '1' : '2'} • {event.timeEn || event.time}</span>
          </div>

          {/* Parallax Floating Icon Indicator */}
          <div
            style={{ transform: 'translateZ(26px)' }}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C89D3C]/60 shadow-lg"
          >
            {getEventIcon(event.iconType)}
          </div>

          {/* Ceremony Title & Tagline with 3D Depth */}
          <div
            style={{ transform: 'translateZ(30px)' }}
            className="absolute bottom-3 left-3 right-3 pointer-events-none"
          >
            <h3 className="font-headline text-lg sm:text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
              {event.title}
            </h3>
            <p className="font-body text-[11px] text-[#F0DB9E]/90 italic drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] mt-0.5">
              {event.taglineEn || event.tagline}
            </p>
          </div>
        </div>

        {/* Card Content & Details - Equal height flex child */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4 relative z-10 bg-white">
          <div className="space-y-3">
            {/* English Description with full visibility */}
            <p className="font-body text-xs text-[#2A1810]/85 leading-relaxed min-h-[36px]">
              {event.descriptionEn || event.description}
            </p>

            {/* Date & Time Bar */}
            <div className="pt-2 border-t border-[#C89D3C]/20 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#2A1810]">
                <Calendar className="w-3.5 h-3.5 text-[#8B1E1E] shrink-0" />
                <span className="font-body font-semibold text-[11px]">
                  {event.dateEn || event.date}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[#8B1E1E]">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span className="font-body font-bold text-[11px]">
                  {event.timeEn || event.time}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-auto">
            {/* Dress Code Row: 100% Single Line, Perfect Alignment, No awkward text wrapping */}
            <div className="pt-2.5 border-t border-[#C89D3C]/20 flex items-center gap-1.5 min-w-0">
              <Sparkles className="w-3.5 h-3.5 text-[#C89D3C] shrink-0" />
              <span className="text-[10px] font-label font-bold uppercase tracking-wider text-[#987220] shrink-0">
                Dress:
              </span>
              <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[9.5px] md:text-[10px] font-label font-bold bg-[#1B4D3E] text-white shadow-xs tracking-wide whitespace-nowrap overflow-x-auto scrollbar-none">
                {event.dressCode}
              </span>
            </div>

            {/* Extra Details (Venue with Directions & Ceremony Photo) - Always visible in Full Height */}
            <div className="pt-2.5 border-t border-[#C89D3C]/30 space-y-2.5">
              {/* Venue Card with Integrated Directions Action */}
              <div className="flex items-center justify-between gap-2 bg-[#FBF7EE] p-2.5 rounded-xl border border-[#C89D3C]/20 text-[11px]">
                <div className="flex items-start gap-2 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-[#8B1E1E] shrink-0 mt-0.5" />
                  <div className="text-left min-w-0">
                    <span className="font-label font-bold text-[#8B1E1E] block truncate">
                      {event.venue}
                    </span>
                    <span className="text-[#2A1810]/70 text-[10px] block line-clamp-1">
                      {event.venueAddress}
                    </span>
                  </div>
                </div>

                {/* Directions Button */}
                <a
                  href={event.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF3E0] hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#C89D3C]/50 text-[10px] font-label font-bold uppercase tracking-wider shadow-xs transition-all shrink-0 cursor-pointer"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Directions</span>
                </a>
              </div>

              {/* Couple's Memory Tag for this Ceremony */}
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#C89D3C]/30">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-10 h-10 rounded-lg object-cover border border-[#C89D3C] shrink-0"
                />
                <div className="text-left min-w-0">
                  <span className="text-[9px] font-label uppercase tracking-widest text-[#987220] font-bold block">
                    Himanshi & Gagan
                  </span>
                  <span className="text-[11px] font-body text-[#8B1E1E] italic font-semibold line-clamp-2">
                    "{event.taglineEn || event.tagline}"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const RoyalCeremoniesTimeline: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'all' | '1' | '2'>('all');

  const filteredEvents = WEDDING_EVENTS.filter((event) => {
    const isDay1 = event.date.includes('11') || (event.dateEn && event.dateEn.includes('11'));
    if (selectedDay === '1') return isDay1;
    if (selectedDay === '2') return !isDay1;
    return true;
  });

  const getEventIcon = (type: WeddingEvent['iconType']) => {
    switch (type) {
      case 'ganpati':
      case 'kalash':
        return <KalashIcon className="w-5 h-5 text-[#C89D3C]" />;
      case 'carnival':
        return <HaathiIcon className="w-5 h-5 text-[#8B1E1E]" />;
      case 'dj':
        return <ShehnaiIcon className="w-5 h-5 text-[#F0DB9E]" />;
      case 'mayra':
        return <GhodaIcon className="w-5 h-5 text-[#C89D3C]" />;
      case 'barat':
        return <GhodaIcon className="w-5 h-5 text-[#F0DB9E]" />;
      case 'reception':
        return <HaathiIcon className="w-5 h-5 text-[#8B1E1E]" />;
      case 'phere':
        return <KalashIcon className="w-5 h-5 text-[#C89D3C]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C89D3C]" />;
    }
  };

  return (
    <section id="events-section" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="font-label text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#987220] font-bold block mb-1">
          TRADITIONAL RITUALS & CELEBRATIONS
        </span>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#8B1E1E] tracking-tight">
          Auspicious Ceremonies
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="h-px w-8 bg-[#C89D3C]/60"></span>
          <span className="text-[#C89D3C] text-xs">❖</span>
          <span className="h-px w-8 bg-[#C89D3C]/60"></span>
        </div>
      </div>

      {/* Day Filter Pills with Smooth Animation */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 w-full max-w-full px-1">
        {[
          { key: 'all', label: `All Rituals (${WEDDING_EVENTS.length})` },
          { key: '1', label: 'Day 1 • Dec 11' },
          { key: '2', label: 'Day 2 • Dec 12' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedDay(tab.key as 'all' | '1' | '2')}
            className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-label font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              selectedDay === tab.key
                ? 'bg-[#8B1E1E] text-white shadow-md border border-[#8B1E1E]'
                : 'bg-white text-[#2A1810]/70 border border-[#C89D3C]/40 hover:bg-[#FAF3E0]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ceremonies Grid Layout: Single column with timeline on mobile, 2-column cards on tablet & desktop with equal stretch height */}
      <div className="relative pl-6 sm:pl-8 md:pl-0 space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-5 lg:gap-6 md:items-stretch text-left w-full max-w-full">
        {/* Continuous Golden Timeline Line (Mobile/Tablet only) */}
        <div className="md:hidden absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#C89D3C] via-[#8B1E1E] to-[#C89D3C]" />

        {filteredEvents.map((event, idx) => {
          const originalIndex = WEDDING_EVENTS.findIndex((e) => e.id === event.id);

          return (
            <ParallaxCeremonyCard
              key={event.id}
              event={event}
              idx={idx}
              originalIndex={originalIndex}
              getEventIcon={getEventIcon}
            />
          );
        })}
      </div>
    </section>
  );
};
