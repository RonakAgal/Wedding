import React from 'react';

// Sacred Lord Ganesha Icon in Royal Rajput Antique Gold & Crimson
export const GaneshaIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Divine Aura / Prabhavali */}
    <circle cx="50" cy="48" r="44" stroke="#C89D3C" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
    <circle cx="50" cy="48" r="40" stroke="#E9CF87" strokeWidth="0.8" opacity="0.4" />
    
    {/* Royal Mukut / Crown */}
    <path d="M50 8L59 26H41L50 8Z" fill="url(#ganeshaGold)" stroke="#8B1E1E" strokeWidth="1.5" />
    <circle cx="50" cy="13" r="2.5" fill="#8B1E1E" />
    <path d="M37 26C45 22 55 22 63 26L58 31H42L37 26Z" fill="#F0DB9E" stroke="#8B1E1E" strokeWidth="1.2" />
    
    {/* Auspicious Tilak & Trishul */}
    <path d="M47 31H53V42H47V31Z" fill="#8B1E1E" />
    <circle cx="50" cy="35" r="1.8" fill="#C89D3C" />
    <path d="M42 34C46 37 54 37 58 34" stroke="#8B1E1E" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Royal Ears (Supakarna) */}
    <path d="M38 31C24 31 18 42 20 54C22 64 30 68 37 63" fill="url(#ganeshaGold)" stroke="#8B1E1E" strokeWidth="1.8" />
    <path d="M62 31C76 31 82 42 80 54C78 64 70 68 63 63" fill="url(#ganeshaGold)" stroke="#8B1E1E" strokeWidth="1.8" />
    <path d="M26 44C27 50 31 54 35 52" stroke="#C89D3C" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M74 44C73 50 69 54 65 52" stroke="#C89D3C" strokeWidth="1.2" strokeLinecap="round" />

    {/* Sacred Trunk (Vakratunda) curving gracefully */}
    <path d="M42 40C45 50 43 66 52 72C59 76 66 73 67 65C68 58 61 56 57 59" fill="none" stroke="#8B1E1E" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M44 46C48 52 47 62 53 66" stroke="#C89D3C" strokeWidth="1.6" strokeLinecap="round" />
    
    {/* Modak on trunk tip */}
    <circle cx="70" cy="67" r="4.5" fill="#C89D3C" stroke="#8B1E1E" strokeWidth="1.2" />
    <path d="M70 63V71M66 67H74" stroke="#8B1E1E" strokeWidth="0.8" />

    {/* Ekdanta (Sacred Tusk) */}
    <path d="M42 50L36 53" stroke="#FFF7ED" strokeWidth="2.5" strokeLinecap="round" />

    {/* Lotus Base */}
    <path d="M34 82C40 78 50 78 50 82C50 78 60 78 66 82C60 88 40 88 34 82Z" fill="url(#ganeshaGold)" stroke="#8B1E1E" strokeWidth="1.2" />

    <defs>
      <linearGradient id="ganeshaGold" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF2D1" />
        <stop offset="0.4" stopColor="#E9CF87" />
        <stop offset="0.8" stopColor="#C89D3C" />
        <stop offset="1" stopColor="#987220" />
      </linearGradient>
    </defs>
  </svg>
);

// Royal Rajputana Zari Corner Filigree (चारों कोनों के लिए पारंपरिक शाही अलंकरण)
export const OrnateCorner: React.FC<{ className?: string; position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({
  className = 'w-10 h-10',
  position = 'top-left'
}) => {
  const transform = {
    'top-left': '',
    'top-right': '-scale-x-100',
    'bottom-left': '-scale-y-100',
    'bottom-right': '-scale-100'
  }[position];

  return (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} ${transform}`}>
      <path d="M4 4H32C32 4 22 7 17 12C12 17 9 27 9 27L9 4V42" stroke="#C89D3C" strokeWidth="1.8" />
      <path d="M8 8H24C24 8 18 10 14 14C10 18 8 26 8 26L8 8V34" stroke="#E9CF87" strokeWidth="1" />
      <circle cx="16" cy="16" r="2.8" fill="#C89D3C" />
      <circle cx="6" cy="6" r="2.2" fill="#8B1E1E" />
      <path d="M16 6C18 12 24 18 30 18" stroke="#C89D3C" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 16C12 18 18 24 18 30" stroke="#C89D3C" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
};

// Sacred Kalash Motif with Nariyal and Mango leaves in Rajputana Theme
export const KalashIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 8C43 18 36 26 36 32C36 38 42 42 50 42C58 42 64 38 64 32C64 26 57 18 50 8Z" fill="#C89D3C" stroke="#987220" strokeWidth="2" />
    <path d="M28 35C33 28 42 22 50 20C58 22 67 28 72 35" stroke="#1B4D3E" strokeWidth="3" strokeLinecap="round" />
    <path d="M20 42C28 36 38 32 50 32C62 32 72 36 80 42" stroke="#1B4D3E" strokeWidth="3" strokeLinecap="round" />
    <path d="M30 42H70L74 48C74 48 78 54 78 68C78 82 66 88 50 88C34 88 22 82 22 68C22 54 26 48 26 48L30 42Z" fill="url(#goldGrad)" stroke="#8B1E1E" strokeWidth="2.5" />
    <circle cx="50" cy="65" r="8" fill="#8B1E1E" />
    <path d="M46 65H54M50 61V69" stroke="#E9CF87" strokeWidth="2" strokeLinecap="round" />
    <path d="M34 88H66L68 94H32L34 88Z" fill="#C89D3C" stroke="#987220" strokeWidth="2" />
    <defs>
      <linearGradient id="goldGrad" x1="22" y1="42" x2="78" y2="88" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F0DB9E" />
        <stop offset="0.5" stopColor="#C89D3C" />
        <stop offset="1" stopColor="#987220" />
      </linearGradient>
    </defs>
  </svg>
);

// Traditional Mewari Elephant with Ambari & Zari Jhool
export const HaathiIcon: React.FC<{ className?: string; flipped?: boolean }> = ({ className = 'w-16 h-16', flipped = false }) => (
  <svg 
    viewBox="0 0 120 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`${className} ${flipped ? '-scale-x-100' : ''}`}
  >
    {/* Ambari / Royal Canopy */}
    <path d="M50 12C50 7 70 7 70 12V24H50V12Z" fill="#8B1E1E" stroke="#C89D3C" strokeWidth="1.5" />
    <path d="M45 24H75L72 30H48L45 24Z" fill="#C89D3C" />
    <circle cx="60" cy="6" r="3" fill="#C89D3C" />
    {/* Royal Elephant Body */}
    <path 
      d="M25 65C25 50 35 38 52 38H76C90 38 98 48 98 60C98 70 94 75 92 88H82L80 72H68L66 88H54L53 72H41L39 88H27L25 65Z" 
      fill="url(#elephantGold)" 
      stroke="#8B1E1E" 
      strokeWidth="2" 
    />
    {/* Trunk & Head */}
    <path d="M92 48C98 46 108 50 110 60C111 67 106 72 101 70C98 69 98 64 102 63C105 62 105 60 104 57C102 54 96 52 93 54" stroke="#8B1E1E" strokeWidth="3" strokeLinecap="round" />
    {/* Tusk */}
    <path d="M96 64C102 65 106 63 108 59" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
    {/* Eye */}
    <circle cx="88" cy="46" r="2.5" fill="#8B1E1E" />
    {/* Decorative Jhool (Saddle cloth in Tertiary Emerald Green & Primary Crimson) */}
    <path d="M48 42H74C74 42 75 58 70 64C65 70 56 70 52 64C48 58 48 42 48 42Z" fill="#1B4D3E" stroke="#E9CF87" strokeWidth="1.5" />
    <circle cx="61" cy="54" r="4" fill="#C89D3C" />
    {/* Royal Tail */}
    <path d="M26 55C20 60 18 68 20 74" stroke="#8B1E1E" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="elephantGold" x1="25" y1="38" x2="110" y2="88" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBF7EE" />
        <stop offset="0.5" stopColor="#E9CF87" />
        <stop offset="1" stopColor="#C89D3C" />
      </linearGradient>
    </defs>
  </svg>
);

// Decorated Mewari Royal Horse (राजपूताना चेतक / घोड़ा)
export const GhodaIcon: React.FC<{ className?: string; flipped?: boolean }> = ({ className = 'w-16 h-16', flipped = false }) => (
  <svg 
    viewBox="0 0 120 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`${className} ${flipped ? '-scale-x-100' : ''}`}
  >
    {/* Mane plume / Kalgi */}
    <path d="M92 10C94 15 91 22 87 25" stroke="#1B4D3E" strokeWidth="3" strokeLinecap="round" />
    <circle cx="94" cy="9" r="3" fill="#C89D3C" />
    {/* Horse Head & Neck */}
    <path 
      d="M94 28L106 36C108 38 107 42 103 44L95 44L84 34L82 48L68 52L62 40L72 26C76 20 84 18 89 22L94 28Z" 
      fill="url(#horseGold)" 
      stroke="#8B1E1E" 
      strokeWidth="2" 
    />
    {/* Body */}
    <path 
      d="M72 48C80 52 84 62 82 72L86 90H76L73 75H52L49 90H38L42 66C38 64 32 64 26 68L22 86H12L16 60C18 52 28 46 42 46H72Z" 
      fill="url(#horseGold)" 
      stroke="#8B1E1E" 
      strokeWidth="2" 
    />
    {/* Royal Saddle in Tertiary Emerald & Secondary Gold */}
    <path d="M50 48C50 48 56 56 64 56C72 56 76 48 76 48L72 62H52L50 48Z" fill="#1B4D3E" stroke="#C89D3C" strokeWidth="1.5" />
    {/* Reins & Ornaments */}
    <path d="M100 40L82 52L64 58" stroke="#C89D3C" strokeWidth="1.5" strokeDasharray="3 2" />
    {/* Flowing Tail */}
    <path d="M16 60C10 65 6 75 8 85C10 78 14 74 18 70" stroke="#8B1E1E" strokeWidth="2.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="horseGold" x1="12" y1="20" x2="110" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBF7EE" />
        <stop offset="0.6" stopColor="#E9CF87" />
        <stop offset="1" stopColor="#C89D3C" />
      </linearGradient>
    </defs>
  </svg>
);

// Traditional Shehnai & Dhol Motif
export const ShehnaiIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Shehnai pipe */}
    <path d="M20 20L65 65L75 60L72 75L58 72L62 62L18 18L20 20Z" fill="#C89D3C" stroke="#8B1E1E" strokeWidth="2" />
    {/* Bell of the Shehnai */}
    <path d="M64 64C68 62 82 72 86 86C72 82 62 68 64 64Z" fill="#8B1E1E" stroke="#C89D3C" strokeWidth="2" />
    {/* Reed & Tassels */}
    <circle cx="17" cy="17" r="3" fill="#1B4D3E" />
    <path d="M74 74C76 82 82 88 88 92" stroke="#1B4D3E" strokeWidth="2" />
  </svg>
);

// Royal Ornamental Border Divider
export const RoyalDivider: React.FC<{ className?: string; text?: string }> = ({ className = 'my-8', text }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#C89D3C] to-[#8B1E1E]/60 max-w-[140px] sm:max-w-[200px]" />
    <div className="flex items-center gap-2 text-[#8B1E1E]">
      <span className="text-[#C89D3C] text-lg">✦</span>
      {text ? (
        <span className="font-label text-xs uppercase tracking-[0.25em] text-[#8B1E1E] font-semibold">{text}</span>
      ) : (
        <KalashIcon className="w-6 h-6" />
      )}
      <span className="text-[#C89D3C] text-lg">✦</span>
    </div>
    <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#C89D3C] to-[#8B1E1E]/60 max-w-[140px] sm:max-w-[200px]" />
  </div>
);
