'use client';

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  theme?: 'dark' | 'light';
}

export function BrandLogoIcon({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`relative shrink-0 flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chimney */}
        <path
          d="M68 23 V13 H77 V30"
          stroke="#0F4A34"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* House Roof */}
        <path
          d="M15 40 L50 12 L85 40"
          stroke="#0F4A34"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 4 Golden Window Panes */}
        <rect x="41.5" y="23" width="7" height="7" rx="1" fill="#C29B63" />
        <rect x="51.5" y="23" width="7" height="7" rx="1" fill="#C29B63" />
        <rect x="41.5" y="33" width="7" height="7" rx="1" fill="#C29B63" />
        <rect x="51.5" y="33" width="7" height="7" rx="1" fill="#C29B63" />

        {/* Open Ledger / Khata at Base */}
        {/* Left Page */}
        <path
          d="M50 86 C37 83 23 86 16 88 V52 C23 49 37 46 50 49 Z"
          fill="#FFFFFF"
          stroke="#0F4A34"
          strokeWidth="5.5"
          strokeLinejoin="round"
        />

        {/* Right Page */}
        <path
          d="M50 86 C63 83 77 86 84 88 V52 C77 49 63 46 50 49 Z"
          fill="#FFFFFF"
          stroke="#0F4A34"
          strokeWidth="5.5"
          strokeLinejoin="round"
        />

        {/* Center Dashed Spine */}
        <line
          x1="50"
          y1="49"
          x2="50"
          y2="86"
          stroke="#0F4A34"
          strokeWidth="3.2"
          strokeDasharray="2.5 3"
        />

        {/* Left Page Taka Symbol '৳' */}
        <text
          x="33"
          y="73"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="22"
          fill="#0F4A34"
          textAnchor="middle"
        >
          ৳
        </text>

        {/* Right Page Accounting Ledger Lines */}
        <line x1="57" y1="59" x2="76" y2="59" stroke="#C29B63" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="57" y1="68" x2="76" y2="68" stroke="#C29B63" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="57" y1="77" x2="70" y2="77" stroke="#C29B63" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function BrandLogo({
  size = 'md',
  showSubtitle = true,
  className = '',
  theme = 'light',
}: BrandLogoProps) {
  const isDark = theme === 'dark';

  const titleSizes = {
    sm: 'text-base font-black',
    md: 'text-lg sm:text-xl font-black',
    lg: 'text-2xl sm:text-3xl font-black',
  };

  const subtitleSizes = {
    sm: 'text-[9px] font-bold',
    md: 'text-[10px] sm:text-[11px] font-bold',
    lg: 'text-xs sm:text-sm font-bold',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* Visual Logo Icon */}
      <BrandLogoIcon size={size} className="group-hover:scale-105 transition-transform" />

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`tracking-tight whitespace-nowrap ${titleSizes[size]} ${
              isDark ? 'text-white' : 'text-[#0F4A34]'
            }`}
          >
            ভাড়া খাতা
          </span>
        </div>

        {showSubtitle && (
          <p
            className={`tracking-normal whitespace-nowrap mt-0.5 ${subtitleSizes[size]} ${
              isDark ? 'text-emerald-300' : 'text-emerald-800'
            }`}
          >
            স্মার্ট প্রপার্টি ম্যানেজমেন্ট
          </p>
        )}
      </div>
    </div>
  );
}
