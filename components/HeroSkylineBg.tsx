'use client';

import React from 'react';

/**
 * HeroSkylineBg Component
 * -------------------------------------------------------------
 * Adds a subtle, elegant architectural skyline watermark background
 * to the Hero section of the homepage.
 *
 * Characteristics:
 * - 100% non-intrusive (pointer-events-none, -z-10)
 * - Ultra-soft opacity (fades out smoothly towards the top)
 * - Fully vector SVG (sharp on all Retina / 4K / Mobile screens)
 * - Can be added or removed with 1 line of code without affecting any app logic.
 */
export default function HeroSkylineBg() {
  return (
    <div
      className="absolute inset-x-0 bottom-0 pointer-events-none -z-10 select-none overflow-hidden flex items-end justify-center"
      style={{
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full min-w-[1000px] h-44 sm:h-56 lg:h-68 opacity-40 sm:opacity-45 object-cover object-bottom"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="skylineGrad1" x1="0" y1="0" x2="0" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#047857" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#064E3B" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="skylineGrad2" x1="0" y1="0" x2="0" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f766e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="skylineGrad3" x1="0" y1="0" x2="0" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#334155" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* --- Background Far Layer (Towers & High Rises) --- */}
        {/* Tower 1 */}
        <rect x="80" y="40" width="90" height="240" rx="3" fill="url(#skylineGrad3)" />
        <rect x="110" y="20" width="30" height="20" fill="url(#skylineGrad3)" />
        {/* Windows Tower 1 */}
        <g opacity="0.4" fill="#ffffff">
          <rect x="95" y="60" width="12" height="10" rx="1" />
          <rect x="115" y="60" width="12" height="10" rx="1" />
          <rect x="135" y="60" width="12" height="10" rx="1" />
          <rect x="95" y="85" width="12" height="10" rx="1" />
          <rect x="115" y="85" width="12" height="10" rx="1" />
          <rect x="135" y="85" width="12" height="10" rx="1" />
          <rect x="95" y="110" width="12" height="10" rx="1" />
          <rect x="115" y="110" width="12" height="10" rx="1" />
          <rect x="135" y="110" width="12" height="10" rx="1" />
        </g>

        {/* Tower 2 (Far Center-Left) */}
        <rect x="320" y="30" width="110" height="250" rx="4" fill="url(#skylineGrad3)" />
        <polygon points="320,30 375,0 430,30" fill="url(#skylineGrad3)" />
        {/* Antenna */}
        <line x1="375" y1="0" x2="375" y2="-15" stroke="#047857" strokeWidth="2" opacity="0.4" />

        {/* Tower 3 (Center High Rise) */}
        <rect x="660" y="20" width="130" height="260" rx="4" fill="url(#skylineGrad2)" />
        <rect x="700" y="5" width="50" height="15" fill="url(#skylineGrad2)" />
        <g opacity="0.45" fill="#ffffff">
          <rect x="680" y="45" width="14" height="10" rx="1" />
          <rect x="705" y="45" width="14" height="10" rx="1" />
          <rect x="730" y="45" width="14" height="10" rx="1" />
          <rect x="755" y="45" width="14" height="10" rx="1" />
          <rect x="680" y="70" width="14" height="10" rx="1" />
          <rect x="705" y="70" width="14" height="10" rx="1" />
          <rect x="730" y="70" width="14" height="10" rx="1" />
          <rect x="755" y="70" width="14" height="10" rx="1" />
          <rect x="680" y="95" width="14" height="10" rx="1" />
          <rect x="705" y="95" width="14" height="10" rx="1" />
          <rect x="730" y="95" width="14" height="10" rx="1" />
          <rect x="755" y="95" width="14" height="10" rx="1" />
        </g>

        {/* Tower 4 (Right High Rise) */}
        <rect x="1020" y="45" width="100" height="235" rx="3" fill="url(#skylineGrad3)" />
        <polygon points="1020,45 1070,18 1120,45" fill="url(#skylineGrad3)" />

        {/* Tower 5 (Far Right) */}
        <rect x="1240" y="55" width="120" height="225" rx="3" fill="url(#skylineGrad3)" />

        {/* --- Midground Layer (Apartments & Commercial Buildings) --- */}
        {/* Apartment Left */}
        <rect x="0" y="90" width="95" height="190" fill="url(#skylineGrad1)" />
        <rect x="180" y="80" width="130" height="200" rx="3" fill="url(#skylineGrad1)" />
        {/* Balconies on Apartment */}
        <g opacity="0.35" fill="#ffffff">
          <rect x="195" y="105" width="22" height="12" rx="1" />
          <rect x="235" y="105" width="22" height="12" rx="1" />
          <rect x="275" y="105" width="22" height="12" rx="1" />
          <rect x="195" y="130" width="22" height="12" rx="1" />
          <rect x="235" y="130" width="22" height="12" rx="1" />
          <rect x="275" y="130" width="22" height="12" rx="1" />
          <rect x="195" y="155" width="22" height="12" rx="1" />
          <rect x="235" y="155" width="22" height="12" rx="1" />
          <rect x="275" y="155" width="22" height="12" rx="1" />
        </g>

        {/* Duplex / Residential Houses with Pitched Roof (Center Left) */}
        <path d="M440 135 L510 85 L580 135 V280 H440 Z" fill="url(#skylineGrad1)" />
        {/* Chimney */}
        <rect x="540" y="80" width="15" height="25" fill="url(#skylineGrad1)" />
        {/* Attic Window */}
        <circle cx="510" cy="115" r="9" fill="#ffffff" opacity="0.4" />

        {/* Mid-Rise Center Right */}
        <rect x="800" y="70" width="125" height="210" rx="3" fill="url(#skylineGrad1)" />
        <g opacity="0.35" fill="#ffffff">
          <rect x="815" y="95" width="20" height="12" rx="1" />
          <rect x="850" y="95" width="20" height="12" rx="1" />
          <rect x="885" y="95" width="20" height="12" rx="1" />
          <rect x="815" y="125" width="20" height="12" rx="1" />
          <rect x="850" y="125" width="20" height="12" rx="1" />
          <rect x="885" y="125" width="20" height="12" rx="1" />
        </g>

        {/* Duplex / Residential Houses with Pitched Roof (Right) */}
        <path d="M1130 140 L1190 95 L1250 140 V280 H1130 Z" fill="url(#skylineGrad1)" />
        <circle cx="1190" cy="120" r="8" fill="#ffffff" opacity="0.4" />

        {/* Foreground Rooftops & Base Accent Line */}
        <path d="M575 160 L620 125 L665 160 V280 H575 Z" fill="url(#skylineGrad2)" />
        <path d="M920 155 L965 120 L1010 155 V280 H920 Z" fill="url(#skylineGrad2)" />

        {/* Ground Baseline */}
        <line x1="0" y1="279" x2="1440" y2="279" stroke="#047857" strokeWidth="2" opacity="0.2" />
      </svg>
    </div>
  );
}
