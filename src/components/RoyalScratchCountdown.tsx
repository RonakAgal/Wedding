import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface HeartScratchProps {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  isRevealed: boolean;
  onReveal: () => void;
  className?: string;
}

const SingleHeartScratch: React.FC<HeartScratchProps> = ({
  value,
  label,
  sublabel,
  isRevealed,
  onReveal,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawing = useRef(false);

  // Draw heart outline path on canvas
  const drawHeartPath = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.95);
    ctx.bezierCurveTo(w * 0.45, h * 0.88, w * 0.05, h * 0.62, w * 0.02, h * 0.36);
    ctx.bezierCurveTo(-w * 0.02, h * 0.15, w * 0.12, h * 0.02, w * 0.3, h * 0.02);
    ctx.bezierCurveTo(w * 0.4, h * 0.02, w * 0.48, h * 0.08, w * 0.5, h * 0.18);
    ctx.bezierCurveTo(w * 0.52, h * 0.08, w * 0.6, h * 0.02, w * 0.7, h * 0.02);
    ctx.bezierCurveTo(w * 0.88, h * 0.02, w * 1.02, h * 0.15, w * 0.98, h * 0.36);
    ctx.bezierCurveTo(w * 0.95, h * 0.62, w * 0.55, h * 0.88, w * 0.5, h * 0.95);
    ctx.closePath();
  };

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const w = rect.width || 120;
    const h = rect.height || 105;

    canvas.width = w;
    canvas.height = h;

    // Clip to heart shape
    ctx.save();
    drawHeartPath(ctx, w, h);
    ctx.clip();

    // Fill with rich royal gold foil gradient matching the vintage card
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#E8C988');
    grad.addColorStop(0.3, '#D4AF37');
    grad.addColorStop(0.55, '#FBEAC0');
    grad.addColorStop(0.8, '#C5A059');
    grad.addColorStop(1, '#9E7422');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle gold shimmer speckles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 15; i++) {
      const rx = (i * 29) % w;
      const ry = (i * 37) % h;
      ctx.fillRect(rx, ry, 2, 2);
    }

    // Calligraphic "scratch" text inside heart
    const fontSize = Math.max(13, Math.round(w * 0.16));
    ctx.font = `italic bold ${fontSize}px "Playfair Display", Georgia, serif`;
    ctx.fillStyle = '#6E2626'; // Deep vintage burgundy/brown
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('scratch', w * 0.5, h * 0.53);

    ctx.restore();

    // Delicate heart stroke border
    ctx.save();
    drawHeartPath(ctx, w, h);
    ctx.strokeStyle = '#8B1E1E';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }, [isRevealed]);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealed) initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let transparent = 0;
    const total = data.length / 4;

    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) transparent += 4;
    }

    const pct = (transparent / total) * 100;
    if (pct > 28) {
      onReveal();
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#C89D3C', '#E9CF87', '#8B1E1E', '#FF4D6D'],
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={() => {
        if (!isRevealed) {
          onReveal();
          confetti({
            particleCount: 35,
            spread: 55,
            origin: { y: 0.6 },
            colors: ['#C89D3C', '#E9CF87', '#8B1E1E'],
          });
        }
      }}
      className={`relative select-none cursor-pointer group ${className}`}
      style={{ clipPath: 'url(#wedding-heart-clip)' }}
    >
      {/* Revealed Date Layer (Underneath) */}
      <div className="w-full h-full bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E0] to-[#F5E7C4] border-2 border-[#8B1E1E]/40 flex flex-col items-center justify-center p-2 text-center shadow-inner">
        <span className="font-headline text-lg sm:text-2xl md:text-3xl font-bold text-[#8B1E1E] leading-none tracking-tight">
          {value}
        </span>
        <span className="font-label text-[8px] sm:text-[9px] md:text-[10px] font-bold text-[#987220] tracking-widest uppercase mt-0.5 sm:mt-1">
          {label}
        </span>
        {sublabel && (
          <span className="font-hindi text-[7px] sm:text-[8px] text-[#8B1E1E]/75 font-semibold leading-none">
            {sublabel}
          </span>
        )}
      </div>

      {/* Gold Scratchable Canvas Layer (On Top) */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          onMouseDown={(e) => {
            isDrawing.current = true;
            const { x, y } = getPos(e);
            scratch(x, y);
          }}
          onMouseMove={(e) => {
            if (!isDrawing.current) return;
            const { x, y } = getPos(e);
            scratch(x, y);
          }}
          onMouseUp={() => {
            isDrawing.current = false;
          }}
          onMouseLeave={() => {
            isDrawing.current = false;
          }}
          onTouchStart={(e) => {
            isDrawing.current = true;
            if (e.cancelable) e.preventDefault();
            const { x, y } = getPos(e);
            scratch(x, y);
          }}
          onTouchMove={(e) => {
            if (!isDrawing.current) return;
            if (e.cancelable) e.preventDefault();
            const { x, y } = getPos(e);
            scratch(x, y);
          }}
          onTouchEnd={() => {
            isDrawing.current = false;
          }}
          style={{ touchAction: 'none' }}
          className="absolute inset-0 w-full h-full cursor-pointer z-10 touch-none transition-opacity duration-300"
        />
      )}
    </div>
  );
};

export const RoyalScratchCountdown: React.FC = () => {
  const [revealedHearts, setRevealedHearts] = useState<{ [key: string]: boolean }>({
    day: false,
    month: false,
    year: false,
  });

  const handleRevealHeart = (heartKey: string) => {
    setRevealedHearts((prev) => {
      const next = { ...prev, [heartKey]: true };
      if (next.day && next.month && next.year) {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#C89D3C', '#8B1E1E', '#E9CF87', '#FF4D6D', '#1B4D3E'],
          scalar: 1.2,
        });
      }
      return next;
    });
  };

  return (
    <div className="relative rounded-[28px] overflow-hidden border-2 border-[#C89D3C] rajput-card-shadow bg-[#FAF6EF] select-none w-full">
      {/* SVG ClipPath Definition for Exact Mathematical Heart */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="wedding-heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0.95 C 0.45 0.88 0.05 0.62 0.02 0.36 C -0.02 0.15 0.12 0.02 0.3 0.02 C 0.4 0.02 0.48 0.08 0.5 0.18 C 0.52 0.08 0.6 0.02 0.7 0.02 C 0.88 0.02 1.02 0.15 0.98 0.36 C 0.95 0.62 0.55 0.88 0.5 0.95 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* VINTAGE PARCHMENT SAVE THE DATE CARD WITH 3 INTERACTIVE HEARTS */}
      <div className="relative w-full aspect-[1024/574] overflow-hidden bg-[#FAF6EF]">
        {/* Background Image: Antique deckled parchment paper */}
        <img
          src="/images/save_the_date_bg.jpg"
          alt="Save the Date - For the Wedding Celebration"
          className="w-full h-full object-cover block"
        />

        {/* 3 Interactive Scratch Hearts mapped exactly over the image hearts */}
        {/* Heart 1: DAY (12) */}
        <div className="absolute left-[22.4%] top-[71.5%] -translate-x-1/2 -translate-y-1/2 w-[21%] aspect-[1/0.92]">
          <SingleHeartScratch
            id="day"
            value="12"
            label="DEC"
            sublabel="शनिवार"
            isRevealed={revealedHearts.day}
            onReveal={() => handleRevealHeart('day')}
            className="w-full h-full"
          />
        </div>

        {/* Heart 2: MONTH (DECEMBER) */}
        <div className="absolute left-[49.4%] top-[71.5%] -translate-x-1/2 -translate-y-1/2 w-[21%] aspect-[1/0.92]">
          <SingleHeartScratch
            id="month"
            value="VIVAH"
            label="शुभ लग्न"
            sublabel="महोत्सव"
            isRevealed={revealedHearts.month}
            onReveal={() => handleRevealHeart('month')}
            className="w-full h-full"
          />
        </div>

        {/* Heart 3: YEAR (2026) */}
        <div className="absolute left-[76.4%] top-[71.5%] -translate-x-1/2 -translate-y-1/2 w-[21%] aspect-[1/0.92]">
          <SingleHeartScratch
            id="year"
            value="2026"
            label="YEAR"
            sublabel="उदयपुर"
            isRevealed={revealedHearts.year}
            onReveal={() => handleRevealHeart('year')}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
