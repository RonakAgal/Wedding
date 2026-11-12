import React from 'react';
import { MapPin, Navigation, Calendar } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const handleAddToCalendar = () => {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Himanshi+%26+Gagan+Wedding&dates=20261211T040000Z/20261212T183000Z&details=Shubh+Vivah+Mahotsav+of+Himanshi+Agal+%26+Gagan+Baheti+at+The+Belita+Hotel+%26+Spa,+Udaipur&location=The+Belita+Hotel+%26+Spa,+Udaipur`;
    window.open(url, '_blank');
  };

  return (
    <section id="venue-section" className="flex flex-col w-full">
      <div className="text-center mb-4">
        <span className="font-label text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#987220] font-bold block mb-1">
          DESTINATION & LOCATION
        </span>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#8B1E1E] tracking-tight">
          Royal Venue & Heritage Stay
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span className="h-px w-8 bg-[#C89D3C]/60"></span>
          <span className="text-[#C89D3C] text-xs">❖</span>
          <span className="h-px w-8 bg-[#C89D3C]/60"></span>
        </div>
      </div>

      <div className="bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#C89D3C]/30 rajput-card-shadow flex flex-col md:grid md:grid-cols-2 md:items-stretch">
        {/* Hotel / Lakeview Photo */}
        <div className="h-48 sm:h-56 md:h-auto min-h-[220px] md:min-h-[300px] bg-[#E9E4D6] relative overflow-hidden group">
          <img
            src="/images/wedding/perfectstayz_hotel.jpg"
            alt="The Belita Hotel & Spa, Udaipur"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Location Badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex items-end justify-start p-3.5 sm:p-4">
            <div className="px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/95 backdrop-blur-md text-[#8B1E1E] font-label text-xs font-bold shadow-md flex items-center gap-1.5 border border-[#C89D3C]/40">
              <MapPin className="w-3.5 h-3.5 text-[#8B1E1E] shrink-0" />
              <span>Swarn Jayanti Park, Udaipur</span>
            </div>
          </div>
        </div>

        {/* Venue Text Details */}
        <div className="p-5 sm:p-6 text-left flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#8B1E1E]">
              Swarn Jayanti Park
            </h3>
            <p className="font-body text-xs sm:text-sm text-[#2A1810]/85 mt-1 leading-relaxed">
              Govardhan Vilas, near Lake Garden Estate, Goverdhan Villas, Sector 14, Hiran Magri, Udaipur, Rajasthan 313001
            </p>

            {/* Travel Connectivity (Railway, Bus, Airport, Weather) */}
            <div className="grid grid-cols-2 gap-2 mt-4 text-center">
              <div className="bg-[#FBF7EE] rounded-xl p-2.5 border border-[#C89D3C]/20">
                <span className="font-label text-[8px] sm:text-[9px] uppercase tracking-wider text-[#987220] block font-semibold">
                  RAILWAY STATION
                </span>
                <span className="font-headline text-xs sm:text-sm font-bold text-[#2A1810] block mt-0.5">
                  Udaipur Stn (2.5 km)
                </span>
              </div>
              <div className="bg-[#FBF7EE] rounded-xl p-2.5 border border-[#C89D3C]/20">
                <span className="font-label text-[8px] sm:text-[9px] uppercase tracking-wider text-[#987220] block font-semibold">
                  BUS STAND
                </span>
                <span className="font-headline text-xs sm:text-sm font-bold text-[#2A1810] block mt-0.5">
                  Udaipur Stand (3 km)
                </span>
              </div>
              <div className="bg-[#FBF7EE] rounded-xl p-2.5 border border-[#C89D3C]/20">
                <span className="font-label text-[8px] sm:text-[9px] uppercase tracking-wider text-[#987220] block font-semibold">
                  AIRPORT
                </span>
                <span className="font-headline text-xs sm:text-sm font-bold text-[#2A1810] block mt-0.5">
                  Udaipur Airport (24 km)
                </span>
              </div>
              <div className="bg-[#FBF7EE] rounded-xl p-2.5 border border-[#C89D3C]/20">
                <span className="font-label text-[8px] sm:text-[9px] uppercase tracking-wider text-[#987220] block font-semibold">
                  WEATHER
                </span>
                <span className="font-headline text-xs sm:text-sm font-bold text-[#2A1810] block mt-0.5">
                  Pleasant (22°C - 12°C)
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Get Directions & Add to Calendar */}
          <div className="space-y-2 pt-2">
            <a
              href="https://maps.google.com/?q=Swarn+Jayanti+Park+Goverdhan+Sagar+Ring+Rd+Udaipur"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#8B1E1E] hover:bg-[#5A1111] text-[#FFFFFF] font-label text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>GET DIRECTIONS (GOOGLE MAPS)</span>
            </a>

            <button
              onClick={handleAddToCalendar}
              className="w-full py-2 px-4 rounded-xl bg-[#FBF7EE] hover:bg-[#FAF3E0] text-[#8B1E1E] border border-[#C89D3C]/50 font-label text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C89D3C]" />
              <span>ADD TO CALENDAR</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

