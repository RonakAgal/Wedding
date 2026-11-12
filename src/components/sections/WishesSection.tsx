import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '../../lib/supabase';
import { WishItem } from '../../types/wedding';

export const WishesSection: React.FC = () => {
  const [blessingInput, setBlessingInput] = useState('');
  const [guestNameInput, setGuestNameInput] = useState('');
  const [isSubmittingBlessing, setIsSubmittingBlessing] = useState(false);
  const [showAllWishesModal, setShowAllWishesModal] = useState(false);
  const [wishesList, setWishesList] = useState<WishItem[]>([]);

  // Fetch real blessings dynamically from Supabase
  useEffect(() => {
    async function loadSupabaseWishes() {
      try {
        const { data, error } = await supabase
          .from('wishes')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (!error && data && data.length > 0) {
          const formatted: WishItem[] = data.map((d: { id?: string; name?: string; message?: string; created_at?: string }) => {
            let timeStr = 'Recently';
            if (d.created_at) {
              try {
                const diffMs = Date.now() - new Date(d.created_at).getTime();
                const diffMins = Math.floor(diffMs / 60000);
                if (diffMins < 60) timeStr = `${Math.max(1, diffMins)}m ago`;
                else {
                  const diffHours = Math.floor(diffMins / 60);
                  if (diffHours < 24) timeStr = `${diffHours}h ago`;
                  else timeStr = `${Math.floor(diffHours / 24)}d ago`;
                }
              } catch {
                timeStr = 'Recently';
              }
            }
            return {
              id: d.id,
              name: d.name || 'Honored Guest',
              time: timeStr,
              message: d.message || '',
              created_at: d.created_at,
            };
          });
          setWishesList(formatted);
        }
      } catch {
        // Fallback gracefully
      }
    }
    loadSupabaseWishes();
  }, []);

  const handleBlessingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blessingInput.trim()) return;

    setIsSubmittingBlessing(true);
    const newWish: WishItem = {
      name: guestNameInput.trim() || 'Honored Guest',
      time: 'Just now',
      message: blessingInput.trim(),
    };

    setWishesList((prev) => [newWish, ...prev]);
    setBlessingInput('');
    setGuestNameInput('');

    // Shower of flower petals
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.75 },
      colors: ['#C89D3C', '#8B1E1E', '#E9CF87', '#FF4D6D', '#FF758F'],
      scalar: 1.2,
    });

    // Save to Supabase
    try {
      await supabase.from('wishes').insert([
        {
          name: newWish.name,
          message: newWish.message,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch {
      // Local state already updated
    } finally {
      setIsSubmittingBlessing(false);
    }
  };

  return (
    <>
      <section id="wishes-section" className="flex flex-col">
        <div className="text-center md:text-left mb-3">
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#987220] font-bold block mb-1">
            AUSPICIOUS WISHES
          </span>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-[#8B1E1E] tracking-tight">
            Flower Petals &amp; Blessings
          </h2>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-5 md:p-6 border border-[#C89D3C]/30 rajput-card-shadow text-center flex-1 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#FAF3E0] border border-[#C89D3C] mx-auto flex items-center justify-center text-[#987220] mb-2">
              <Sparkles className="w-5 h-5 text-[#C89D3C]" />
            </div>

            <h3 className="font-headline text-lg md:text-xl font-bold text-[#8B1E1E]">
              Shower Divine Blessings
            </h3>
            <p className="font-body text-xs md:text-sm text-[#2A1810]/75 mt-0.5 leading-relaxed">
              Send digital rose petals and heartfelt blessings to the newlyweds.
            </p>

            {/* Interactive Form */}
            <form onSubmit={handleBlessingSubmit} className="mt-4 space-y-2.5 text-left">
              <input
                type="text"
                value={guestNameInput}
                onChange={(e) => setGuestNameInput(e.target.value)}
                placeholder="Your Name / Family (e.g. Vikram Singh Rathore)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF7EE] border border-[#C89D3C]/50 text-xs md:text-sm text-[#2A1810] outline-none focus:border-[#8B1E1E]"
              />

              <textarea
                rows={3}
                required
                value={blessingInput}
                onChange={(e) => setBlessingInput(e.target.value)}
                placeholder="Write an auspicious message for the couple..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF7EE] border border-[#C89D3C]/50 text-xs md:text-sm text-[#2A1810] outline-none focus:border-[#8B1E1E]"
              />

              <button
                type="submit"
                disabled={isSubmittingBlessing}
                className="w-full py-2.5 px-4 rounded-xl bg-[#987220] hover:bg-[#7D5C14] text-[#FFFFFF] font-label text-xs md:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmittingBlessing ? 'Sending...' : '🌸 SHOWER PETALS & SEND BLESSINGS'}</span>
              </button>
            </form>
          </div>

          {/* Recent Blessings Feed */}
          <div className="mt-4 pt-3 border-t border-[#C89D3C]/20 text-left space-y-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label text-[10px] uppercase tracking-wider text-[#987220] font-bold">
                RECENT BLESSINGS ({wishesList.length})
              </span>
              {wishesList.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAllWishesModal(true)}
                  className="text-[11px] font-label font-bold text-[#8B1E1E] hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View All ({wishesList.length})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {wishesList.length === 0 ? (
              <div className="bg-[#FBF7EE] p-4 rounded-xl border border-[#C89D3C]/25 text-center text-xs text-[#2A1810]/75">
                <p className="font-body italic">
                  🌸 Be the first to shower flower petals and write your warm blessings for Himanshi &amp; Gagan!
                </p>
              </div>
            ) : (
              wishesList.slice(0, 2).map((w, i) => (
                <div key={i} className="bg-[#FBF7EE] p-3 rounded-xl border border-[#C89D3C]/20 text-xs md:text-sm shadow-xs">
                  <div className="flex justify-between items-center text-[10px] md:text-xs text-[#987220] font-label font-semibold">
                    <span>{w.name}</span>
                    <span>{w.time}</span>
                  </div>
                  <p className="font-body text-[#2A1810] mt-1 italic">
                    "{w.message}"
                  </p>
                </div>
              ))
            )}

            {/* Button to view all blessings */}
            {wishesList.length > 0 && (
              <button
                type="button"
                onClick={() => setShowAllWishesModal(true)}
                className="w-full mt-2.5 py-2 px-3.5 rounded-xl bg-[#FAF3E0] hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#C89D3C]/50 text-xs font-label font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer group shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C89D3C] group-hover:text-[#F0DB9E]" />
                <span>VIEW ALL BLESSINGS ({wishesList.length})</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Royal View-All Modal */}
      {showAllWishesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md transition-all">
          <div
            className="bg-[#FDFBF7] rounded-[28px] max-w-lg w-full max-h-[85vh] flex flex-col border-2 border-[#C89D3C] shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#C89D3C]/30 bg-[#FAF3E0] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#8B1E1E] text-[#F0DB9E] flex items-center justify-center shadow">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-[#8B1E1E] leading-tight">
                    Auspicious Blessings &amp; Wishes
                  </h3>
                  <span className="font-label text-[10px] uppercase tracking-wider text-[#987220] font-semibold">
                    {wishesList.length} Heartfelt Wishes for Himanshi &amp; Gagan
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAllWishesModal(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#8B1E1E] text-[#8B1E1E] hover:text-white border border-[#C89D3C]/40 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Blessings Feed */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
              {wishesList.length === 0 ? (
                <div className="text-center py-10 px-4 text-[#2A1810]/70">
                  <Sparkles className="w-8 h-8 text-[#C89D3C] mx-auto mb-2 opacity-60" />
                  <p className="font-body italic text-sm">
                    No blessings yet. Be the first to shower flower petals &amp; send your auspicious wishes!
                  </p>
                </div>
              ) : (
                wishesList.map((wish, idx) => (
                  <div
                    key={wish.id || idx}
                    className="bg-[#FFFFFF] p-3.5 sm:p-4 rounded-2xl border border-[#C89D3C]/30 shadow-xs transition-all hover:border-[#8B1E1E]/50"
                  >
                    <div className="flex items-center justify-between text-xs text-[#987220] font-label font-bold pb-1.5 border-b border-[#C89D3C]/20 mb-2">
                      <span className="flex items-center gap-1.5 text-[#8B1E1E]">
                        <Heart className="w-3.5 h-3.5 fill-[#8B1E1E]" />
                        <span className="font-semibold text-[13px]">{wish.name}</span>
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#2A1810]/50 font-normal">
                        {wish.time}
                      </span>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-[#2A1810]/90 italic leading-relaxed">
                      "{wish.message}"
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 sm:p-4 border-t border-[#C89D3C]/30 bg-[#FAF3E0] flex items-center justify-between gap-3">
              <span className="font-label text-[10px] sm:text-[11px] text-[#2A1810]/70">
                May your blessings fill their union with joy
              </span>
              <button
                type="button"
                onClick={() => setShowAllWishesModal(false)}
                className="px-4 py-1.5 rounded-full bg-[#8B1E1E] hover:bg-[#5A1111] text-white font-label text-xs font-bold uppercase tracking-wider transition-all shadow cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

