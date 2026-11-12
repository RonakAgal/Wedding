# ⚜️ Himanshi & Gagan — Royal Rajput Wedding Web Experience

An ultra-luxurious, responsive royal wedding invitation and interactive celebration portal crafted for **Himanshi Agal & Gagan Baheti** (11–12 December 2026, Udaipur, Rajasthan).

Built with modern web technologies (**React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Supabase**), blending traditional Mewari & Marwari palace elegance with cutting-edge micro-interactions and 3D carousels.

---

## ✨ Key Features & Experience

- **💌 Royal Wax Seal Envelope Reveal**:
  - Interactive velvet envelope cover with glowing golden wax seal.
  - Realistic ripple ping waves, sound toggle, and celebratory rose petal burst upon opening.
- **🎵 Shehnai & Traditional Soundscapes**:
  - Background wedding audio with persistent play/mute toggle and animated sound-wave indicator.
- **📜 Grand Shubh Vivah Patrika & Couple Portrait**:
  - Vedic invocation (*Shree Ganeshaya Namah*), noble family compliments, and couple portrait.
- **⏳ Auspicious Scratch Card & Countdown**:
  - Interactive scratch-to-reveal Save-the-Date card and real-time live countdown timer.
- **🪔 8-Ceremony Interactive Itinerary Timeline**:
  - Day 1 (11 Dec) & Day 2 (12 Dec) filter tabs.
  - Dynamic ceremony cards with custom Rajwadi SVG icons (*Kalash, Haathi, Ghoda, Shehnai*).
  - Expandable rituals, dress codes, times, and venue map links.
- **📸 Cherished Memories 3D Photo Gallery**:
  - **Desktop**: Inverted perspective 3D coverflow carousel with smooth transitions.
  - **Mobile**: Touch-optimized swipeable card stack with inertial drag gestures.
- **👗 Vintage Floral Wardrobe Planner**:
  - High-definition dress code guide for family and honored guests.
- **📍 Heritage Venue & Transit Connectivity**:
  - Venue cards for *The Belita Hotel & Spa* and celebration garden *Swarn Jayanti Park*.
  - 4 transit connectivity indicators (Railway Station 2.5 km, Bus Stand 3 km, Airport 24 km, Weather 22°C - 12°C).
  - 1-click Google Maps directions and Add to Google Calendar integration.
- **🌸 Dynamic Digital Flower Petals & Blessings (Guestbook)**:
  - 100% dynamic live Supabase database sync.
  - Flower petal confetti explosion on submitting wishes.
  - Full-screen royal modal to scroll and read all blessings.

---

## 🏗️ Architecture & Project Structure

The project follows a clean, modular component architecture:

```
HimanshiWebsite/
├── public/                     # Static media assets & audio
│   ├── audio/                  # Traditional Shehnai wedding audio
│   └── images/                 # Palace backdrops, couple portraits, icons
├── src/
│   ├── assets/                 # Couple high-res gallery photos
│   ├── components/             # Reusable UI & experience components
│   │   ├── layout/             # Master layout components
│   │   │   ├── Header.tsx      # Fixed royal navbar with audio toggle & navigation
│   │   │   └── Footer.tsx      # Family compliments, helpline & share invite
│   │   ├── sections/           # Modular page sections
│   │   │   ├── HeroSection.tsx     # Patrika artwork & couple portrait
│   │   │   ├── GallerySection.tsx  # 3D moments carousel (desktop + mobile)
│   │   │   ├── VenueSection.tsx    # Hotel stay, garden & transit connectivity
│   │   │   └── WishesSection.tsx   # Live Supabase guestbook & confetti
│   │   ├── ui/                 # Atomic UI primitives
│   │   ├── EnvelopeReveal.tsx          # Interactive wax seal envelope
│   │   ├── RajwadiIcons.tsx            # Custom Rajput cultural SVG icons
│   │   ├── RoyalCeremoniesTimeline.tsx # Expandable ceremonies itinerary
│   │   ├── RoyalScratchCountdown.tsx   # Scratch-to-reveal countdown card
│   │   ├── Skiper48Gallery.tsx         # Mobile touch-enabled card stack
│   │   ├── Skiper49Gallery.tsx         # Desktop 3D coverflow carousel
│   │   └── WardrobePlanner.tsx         # High-resolution wardrobe guide
│   ├── data/                   # Data models & helpers
│   │   ├── audioHelper.ts      # Audio manager & playback controller
│   │   └── weddingData.ts      # Centralized events, dates, venue & family data
│   ├── lib/                    # Shared libraries & utilities
│   │   ├── supabase.ts         # Supabase client initialization
│   │   └── utils.ts            # Classnames & Tailwind merge helpers
│   ├── types/                  # Shared TypeScript interfaces & types
│   │   └── wedding.ts          # WeddingEvent, Venue, Family & Wish contracts
│   ├── App.tsx                 # Root application component
│   ├── index.css               # Global styles & royal Rajput theme tokens
│   ├── main.tsx                # React root mount
│   └── vite-env.d.ts           # Global type declarations
├── .env.example                # Template for environment variables
├── package.json                # Project dependencies & scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite bundler configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** / **yarn**

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd HimanshiWebsite
npm install
```

### 3. Environment Setup
Copy the example environment file and configure your Supabase credentials:
```bash
cp .env.example .env
```
Update `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

#### Supabase Database Schema (Table: `wishes`)
```sql
create table wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table wishes enable row level security;

-- Allow public read access
create policy "Allow public read" on wishes
  for select using (true);

-- Allow public insert access
create policy "Allow public insert" on wishes
  for insert with check (true);
```

### 4. Running Locally (Development)
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 5. Building for Production
```bash
npm run build
```
The optimized, minified production assets will be output to the `dist/` folder.

To preview the production build locally:
```bash
npm run preview
```

---

## 🎨 Design Tokens & Palette

| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Rajput Crimson** | `#8B1E1E` | Primary titles, CTA buttons, accents |
| **Royal Gold** | `#C89D3C` | Borders, wax seal, icons, luxury highlights |
| **Imperial Gold** | `#987220` | Secondary labels, section taglines |
| **Palace Cream** | `#FBF7EE` | Page background, cards, smooth backdrop |
| **Warm Ivory** | `#FAF3E0` | Pill badges, subtle container backgrounds |
| **Deep Charcoal** | `#2A1810` | High-contrast readable typography |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Rajput SVGs
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Database**: [Supabase](https://supabase.com/)

---

## 👨‍💻 Developer & Inquiries

**Crafted with ❤️ by Ronak Agal**  
- **WhatsApp**: [+91 77375 90048](https://wa.me/917737590048)  
- **Location**: Udaipur, Rajasthan  
