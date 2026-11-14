import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { royalSound } from './data/audioHelper';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Section Components
import { EnvelopeReveal } from './components/EnvelopeReveal';
import { HeroSection } from './components/sections/HeroSection';
import { RoyalScratchCountdown } from './components/RoyalScratchCountdown';
import { RoyalCeremoniesTimeline } from './components/RoyalCeremoniesTimeline';
import { GallerySection } from './components/sections/GallerySection';
import { WardrobePlanner } from './components/WardrobePlanner';
import { VenueSection } from './components/sections/VenueSection';
import { WishesSection } from './components/sections/WishesSection';
import { RoyalWeddingBot } from './components/RoyalWeddingBot';

export function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'events' | 'venue' | 'gallery' | 'wishes'>('home');
  const [hasScrolled, setHasScrolled] = useState(false);

  // Track window scroll for responsive UI elements
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while envelope wax seal is closed
  useEffect(() => {
    if (!isOpen) {
      document.body.classList.add('overflow-hidden', 'touch-none');
    } else {
      document.body.classList.remove('overflow-hidden', 'touch-none');
    }
    return () => {
      document.body.classList.remove('overflow-hidden', 'touch-none');
    };
  }, [isOpen]);

  // Handle royal wax seal envelope open
  const handleOpenEnvelope = () => {
    setIsOpen(true);
    const playing = royalSound.playWeddingSong();
    setIsMusicPlaying(playing);

    // Initial celebratory rose petals shower
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FF4D6D', '#C89D3C', '#E9CF87', '#8B1E1E'],
      scalar: 1.2,
    });
  };

  const handleToggleMusic = () => {
    const nextState = royalSound.toggleMusic();
    setIsMusicPlaying(nextState);
  };

  return (
    <div className="min-h-screen bg-[#FBF7EE] text-[#2A1810] flex flex-col items-center selection:bg-[#8B1E1E]/20 selection:text-[#8B1E1E] w-full max-w-full overflow-x-hidden">
      {/* Interactive Luxury Velvet Envelope & Wax Seal Reveal */}
      <EnvelopeReveal isOpen={isOpen} onOpen={handleOpenEnvelope} />

      {/* Main Full-Width Responsive Layout */}
      <div className="w-full max-w-full min-h-screen bg-[#FBF7EE] shadow-none relative flex flex-col pb-6 sm:pb-8 overflow-x-hidden">
        {/* Fixed Top Header with Royal Monogram & Audio Controls */}
        <Header
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* 1. Grand Royal Palace Wedding Invitation Card & Couple Portrait */}
        <HeroSection hasScrolled={hasScrolled} />

        {/* 2. Interactive Save The Date Scratch Card */}
        <section className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-8 overflow-hidden">
          <RoyalScratchCountdown />
        </section>

        {/* 3. Auspicious Ceremonies & Itinerary Timeline */}
        <RoyalCeremoniesTimeline />

        {/* 4. Cherished Moments Photo Gallery */}
        <GallerySection />

        {/* 5. Vintage Floral Wardrobe Planner */}
        <WardrobePlanner />

        {/* 6. Destination Venue Section */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 overflow-hidden">
          <VenueSection />
        </div>

        {/* 7. Family Blessings, Helpline & Footer */}
        <Footer />

        {/* 8. Royal Wedding AI Concierge (शाही सहायक) */}
        {isOpen && <RoyalWeddingBot />}
      </div>
    </div>
  );
}

export default App;
