'use client';

import React from 'react';

export default function ArchitecturalBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Minor Technical CAD Grid (40px) */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0F4A34 1px, transparent 1px),
            linear-gradient(to bottom, #0F4A34 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 2. Major Blueprint Architectural Grid (200px) */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0F4A34 1.5px, transparent 1.5px),
            linear-gradient(to bottom, #0F4A34 1.5px, transparent 1.5px)
          `,
          backgroundSize: '200px 200px',
        }}
      />

      {/* 3. Micro Dots at Grid Intersections */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `radial-gradient(#0F4A34 1.2px, transparent 1.2px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
        }}
      />

      {/* 4. Soft Center Contrast Mask (Softens grid behind main central text) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(248, 250, 252, 0.7) 0%, rgba(248, 250, 252, 0.3) 55%, transparent 85%)',
        }}
      />

      {/* 5. Top-Left Architectural CAD Scale & Compass Stamp */}
      <div className="absolute top-20 left-6 text-[#0F4A34] opacity-[0.07] hidden xl:block">
        <svg width="130" height="130" viewBox="0 0 130 130" fill="none" stroke="currentColor">
          <circle cx="65" cy="65" r="45" strokeWidth="1.2" strokeDasharray="4 2" />
          <circle cx="65" cy="65" r="55" strokeWidth="0.8" />
          <line x1="65" y1="8" x2="65" y2="122" strokeWidth="1.2" />
          <line x1="8" y1="65" x2="122" y2="65" strokeWidth="1.2" />
          <polygon points="65,14 60,26 70,26" fill="currentColor" stroke="none" />
          <text x="61" y="9" fontSize="11" fontWeight="bold" fill="currentColor" stroke="none">N</text>
          <text x="68" y="118" fontSize="8" fill="currentColor" stroke="none">SCALE 1:100</text>
        </svg>
      </div>

      {/* 6. Left Flank: Detailed Apartment Floorplan Blueprint */}
      <div className="absolute -left-12 lg:-left-2 top-24 w-[380px] lg:w-[460px] h-[560px] opacity-[0.08] text-[#0F4A34] hidden md:block">
        <svg viewBox="0 0 450 550" fill="none" stroke="currentColor" className="w-full h-full">
          {/* Site Boundary Wall */}
          <rect x="30" y="30" width="380" height="480" strokeWidth="2.5" />
          <rect x="36" y="36" width="368" height="468" strokeWidth="0.8" strokeDasharray="4 4" />

          {/* Dimension Line Left */}
          <line x1="18" y1="30" x2="18" y2="510" strokeWidth="1.2" />
          <line x1="10" y1="30" x2="26" y2="30" strokeWidth="1.2" />
          <line x1="10" y1="510" x2="26" y2="510" strokeWidth="1.2" />
          <text x="14" y="275" fontSize="11" fontWeight="bold" fill="currentColor" stroke="none" transform="rotate(-90 14 275)">৫০ ফুট (প্রপার্টি লেন্থ)</text>

          {/* Dimension Line Top */}
          <line x1="30" y1="18" x2="410" y2="18" strokeWidth="1.2" />
          <line x1="30" y1="10" x2="30" y2="26" strokeWidth="1.2" />
          <line x1="410" y1="10" x2="410" y2="26" strokeWidth="1.2" />
          <text x="180" y="14" fontSize="11" fontWeight="bold" fill="currentColor" stroke="none">৩৮ ফুট (ওয়াইডথ)</text>

          {/* Master Bedroom */}
          <rect x="36" y="36" width="190" height="180" strokeWidth="2" />
          <text x="75" y="115" fontSize="13" fontWeight="bold" fill="currentColor" stroke="none">মাস্টার বেডরুম</text>
          <text x="85" y="135" fontSize="10" fill="currentColor" stroke="none">১৪&apos;-০&quot; × ১২&apos;-০&quot;</text>
          {/* Door Swing */}
          <path d="M180 216 A40 40 0 0 0 220 176" strokeWidth="1.4" />
          <line x1="180" y1="216" x2="220" y2="216" strokeWidth="1.4" />

          {/* Attached Balcony */}
          <rect x="36" y="36" width="60" height="50" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="45" y="65" fontSize="10" fill="currentColor" stroke="none">বারান্দা</text>

          {/* Drawing & Dining Hall */}
          <rect x="226" y="36" width="178" height="260" strokeWidth="2" />
          <text x="255" y="145" fontSize="13" fontWeight="bold" fill="currentColor" stroke="none">ড্রয়িং ও ডাইনিং স্পেস</text>
          <text x="275" y="168" fontSize="10" fill="currentColor" stroke="none">১৮&apos;-৬&quot; × ১৩&apos;-০&quot;</text>

          {/* Kitchen */}
          <rect x="36" y="216" width="110" height="120" strokeWidth="2" />
          <text x="65" y="280" fontSize="12" fontWeight="bold" fill="currentColor" stroke="none">রান্নাঘর</text>
          <text x="62" y="298" fontSize="9" fill="currentColor" stroke="none">৮&apos;-০&quot; × ৭&apos;-৬&quot;</text>

          {/* Toilet / Bath */}
          <rect x="146" y="216" width="80" height="120" strokeWidth="2" />
          <text x="165" y="280" fontSize="11" fontWeight="bold" fill="currentColor" stroke="none">বাথরুম</text>

          {/* Bedroom 2 */}
          <rect x="36" y="336" width="220" height="168" strokeWidth="2" />
          <text x="95" y="420" fontSize="13" fontWeight="bold" fill="currentColor" stroke="none">বেডরুম ০২</text>
          <text x="100" y="440" fontSize="10" fill="currentColor" stroke="none">১২&apos;-০&quot; × ১১&apos;-০&quot;</text>

          {/* Lobby & Entrance */}
          <rect x="256" y="296" width="148" height="208" strokeWidth="2" />
          <text x="285" y="390" fontSize="13" fontWeight="bold" fill="currentColor" stroke="none">প্রবেশদ্বার / লবি</text>
          {/* Main Entry Arrow */}
          <line x1="330" y1="520" x2="330" y2="470" strokeWidth="2" />
          <polygon points="330,460 324,475 336,475" fill="currentColor" stroke="none" />
          <text x="305" y="535" fontSize="10" fontWeight="bold" fill="currentColor" stroke="none">মেইন এন্ট্রি</text>
        </svg>
      </div>

      {/* 7. Right Flank: Architectural Multi-Story Building Isometric Elevation */}
      <div className="absolute -right-12 lg:-right-2 top-16 w-[380px] lg:w-[480px] h-[640px] opacity-[0.08] text-[#0F4A34] hidden md:block">
        <svg viewBox="0 0 500 650" fill="none" stroke="currentColor" className="w-full h-full">
          {/* Isometric Tower Structure */}
          {/* Front Left Facet */}
          <path d="M120 180 L250 90 L250 540 L120 620 Z" strokeWidth="2.2" />
          {/* Front Right Facet */}
          <path d="M250 90 L390 180 L390 620 L250 540 Z" strokeWidth="2.2" />
          {/* Rooftop Surface */}
          <path d="M250 90 L120 180 L250 240 L390 180 Z" strokeWidth="2.2" />

          {/* Rooftop Overhead Water Tank & Parapet */}
          <path d="M230 50 L270 25 L310 50 L270 75 Z" strokeWidth="1.8" />
          <path d="M230 50 L230 80 L270 105 L270 75 Z" strokeWidth="1.8" />
          <path d="M270 75 L270 105 L310 80 L310 50 Z" strokeWidth="1.8" />

          {/* Floor Dividers (Horizontal Slab Projections) */}
          <line x1="120" y1="230" x2="250" y2="155" strokeWidth="1.4" />
          <line x1="250" y1="155" x2="390" y2="230" strokeWidth="1.4" />

          <line x1="120" y1="285" x2="250" y2="210" strokeWidth="1.4" />
          <line x1="250" y1="210" x2="390" y2="285" strokeWidth="1.4" />

          <line x1="120" y1="340" x2="250" y2="265" strokeWidth="1.4" />
          <line x1="250" y1="265" x2="390" y2="340" strokeWidth="1.4" />

          <line x1="120" y1="395" x2="250" y2="320" strokeWidth="1.4" />
          <line x1="250" y1="320" x2="390" y2="395" strokeWidth="1.4" />

          <line x1="120" y1="450" x2="250" y2="375" strokeWidth="1.4" />
          <line x1="250" y1="375" x2="390" y2="450" strokeWidth="1.4" />

          <line x1="120" y1="505" x2="250" y2="430" strokeWidth="1.4" />
          <line x1="250" y1="430" x2="390" y2="505" strokeWidth="1.4" />

          <line x1="120" y1="560" x2="250" y2="485" strokeWidth="1.4" />
          <line x1="250" y1="485" x2="390" y2="560" strokeWidth="1.4" />

          {/* Balconies Left Facet */}
          <rect x="145" y="240" width="30" height="24" strokeWidth="1.2" />
          <rect x="190" y="215" width="30" height="24" strokeWidth="1.2" />
          <rect x="145" y="295" width="30" height="24" strokeWidth="1.2" />
          <rect x="190" y="270" width="30" height="24" strokeWidth="1.2" />
          <rect x="145" y="350" width="30" height="24" strokeWidth="1.2" />
          <rect x="190" y="325" width="30" height="24" strokeWidth="1.2" />
          <rect x="145" y="405" width="30" height="24" strokeWidth="1.2" />
          <rect x="190" y="380" width="30" height="24" strokeWidth="1.2" />

          {/* Windows Right Facet */}
          <rect x="280" y="215" width="32" height="24" strokeWidth="1.2" />
          <rect x="330" y="240" width="32" height="24" strokeWidth="1.2" />
          <rect x="280" y="270" width="32" height="24" strokeWidth="1.2" />
          <rect x="330" y="295" width="32" height="24" strokeWidth="1.2" />
          <rect x="280" y="325" width="32" height="24" strokeWidth="1.2" />
          <rect x="330" y="350" width="32" height="24" strokeWidth="1.2" />
          <rect x="280" y="380" width="32" height="24" strokeWidth="1.2" />
          <rect x="330" y="405" width="32" height="24" strokeWidth="1.2" />

          {/* Elevation Benchmark Level Indicators */}
          <line x1="395" y1="180" x2="435" y2="180" strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="435" cy="180" r="3" fill="currentColor" />
          <text x="442" y="184" fontSize="11" fontWeight="bold" fill="currentColor" stroke="none">লেভেল ৮ (রুফটপ)</text>

          <line x1="395" y1="340" x2="435" y2="340" strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="435" cy="340" r="3" fill="currentColor" />
          <text x="442" y="344" fontSize="11" fontWeight="bold" fill="currentColor" stroke="none">লেভেল ৫ (ফ্ল্যাট ৫-এ/বি)</text>

          <line x1="395" y1="450" x2="435" y2="450" strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="435" cy="450" r="3" fill="currentColor" />
          <text x="442" y="454" fontSize="11" fontWeight="bold" fill="currentColor" stroke="none">লেভেল ৩ (ফ্ল্যাট ৩-এ/বি)</text>

          <line x1="395" y1="620" x2="435" y2="620" strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="435" cy="620" r="3" fill="currentColor" />
          <text x="442" y="624" fontSize="11" fontWeight="bold" fill="currentColor" stroke="none">গ্রাউন্ড ফ্লোর (পার্কিং)</text>
        </svg>
      </div>
    </div>
  );
}
