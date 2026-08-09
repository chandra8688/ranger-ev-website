import React from 'react';

/**
 * RangerChargerIllustration
 * 
 * Stylized digital representation of the physical RANGER 60 kW DC Fast Charger.
 * 
 * Preserves recognizable characteristics:
 * - Tall rectangular white body
 * - Dark charcoal upper section with RANGER branding
 * - Central interface/display panel
 * - Organic green energy-wave graphics on lower body
 * - Two charging cables/guns (one per side)
 * - CCS2 and 60 kW identification
 * 
 * Props:
 *   variant: 'light' | 'dark'  — adapts shadow/background glow for the host bg
 *   className, style
 */
export default function RangerChargerIllustration({ className = '', style = {}, variant = 'light' }) {
  const glowOpacity = variant === 'dark' ? 0.18 : 0.09;
  const shadowColor = variant === 'dark' ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.15)';

  return (
    <svg
      viewBox="0 0 320 560"
      className={className}
      style={{ display: 'block', maxWidth: '100%', ...style }}
      aria-label="RANGER 60 kW DC Fast Charger — Stylized Illustration"
      role="img"
    >
      <defs>
        {/* Body shadow */}
        <filter id="charger-drop-shadow" x="-20%" y="-5%" width="140%" height="115%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor={shadowColor} />
        </filter>

        {/* Background glow circle */}
        <radialGradient id="charger-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B7A46" stopOpacity={glowOpacity} />
          <stop offset="100%" stopColor="#1B7A46" stopOpacity="0" />
        </radialGradient>

        {/* Wave fill gradient */}
        <linearGradient id="wave-fill-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B3D2A" />
          <stop offset="100%" stopColor="#0B3D2A" stopOpacity="0.7" />
        </linearGradient>

        {/* Clip for body interior */}
        <clipPath id="body-clip">
          <rect x="68" y="54" width="184" height="430" rx="10" />
        </clipPath>

        {/* Display screen gradient */}
        <linearGradient id="display-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D1820" />
          <stop offset="100%" stopColor="#141E28" />
        </linearGradient>
      </defs>

      {/* Ambient background glow */}
      <ellipse cx="160" cy="280" rx="145" ry="245" fill="url(#charger-bg-glow)" />

      {/* ——— Main charger body ——— */}
      <rect
        x="68" y="54" width="184" height="430"
        rx="10"
        fill="#FFFFFF"
        filter="url(#charger-drop-shadow)"
      />

      {/* ——— Top charcoal header section ——— */}
      {/* Dark header area */}
      <rect x="68" y="54" width="184" height="116" rx="10" fill="#1A2530" />
      {/* Bottom overlap for seamless join */}
      <rect x="68" y="154" width="184" height="16" fill="#1A2530" />

      {/* RANGER brand circle logo mark */}
      <circle cx="160" cy="84" r="17" fill="none" stroke="#3DAA6B" strokeWidth="1.5" />
      <circle cx="160" cy="84" r="14" fill="none" stroke="rgba(61,170,107,0.3)" strokeWidth="0.8" />
      {/* R letterform simplified */}
      <text
        x="160" y="90"
        textAnchor="middle"
        fill="#3DAA6B"
        fontSize="14"
        fontWeight="800"
        fontFamily="Manrope, system-ui, sans-serif"
      >R</text>

      {/* RANGER wordmark */}
      <text
        x="160" y="118"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="16"
        fontWeight="800"
        fontFamily="Manrope, system-ui, sans-serif"
        letterSpacing="3.5"
      >RANGER</text>

      {/* Tagline */}
      <text
        x="160" y="132"
        textAnchor="middle"
        fill="rgba(255,255,255,0.45)"
        fontSize="5.5"
        fontFamily="Manrope, system-ui, sans-serif"
        letterSpacing="1.5"
      >POWERING EVERY JOURNEY</text>

      {/* ——— Body content (clipped) ——— */}
      <g clipPath="url(#body-clip)">

        {/* White body base */}
        <rect x="68" y="54" width="184" height="430" fill="#F8FAF8" />

        {/* ——— Central interface panel ——— */}
        <rect x="88" y="178" width="144" height="114" rx="7" fill="#1A2530" />

        {/* Display screen bezel */}
        <rect x="95" y="185" width="130" height="68" rx="4" fill="url(#display-grad)" />
        <rect x="97" y="187" width="126" height="64" rx="3" fill="#0A1218" />

        {/* Lightning bolt icons on display */}
        {/* Left bolt */}
        <path d="M132,196 L142,210 L136,210 L146,226 L136,214 L142,214 Z" fill="#3DAA6B" opacity="0.9" />
        {/* Right bolt */}
        <path d="M162,196 L172,210 L166,210 L176,226 L166,214 L172,214 Z" fill="#3DAA6B" opacity="0.9" />

        {/* Controls below display */}
        {/* Emergency stop */}
        <circle cx="116" cy="264" r="7" fill="#D93030" />
        <circle cx="116" cy="264" r="5" fill="#E84040" />

        {/* NFC payment pad */}
        <rect x="137" y="257" width="15" height="14" rx="3" fill="#2A50C8" />
        {/* NFC arcs */}
        <path d="M140,261 Q143,264 140,268" stroke="white" strokeWidth="0.9" fill="none" />
        <path d="M142,259 Q147,264 142,270" stroke="white" strokeWidth="0.8" fill="none" />

        {/* Side label — vertical "EV FAST CHARGER" */}
        <g transform="rotate(-90, 83, 275)">
          <text
            x="83" y="279"
            textAnchor="middle"
            fill="#1B7A46"
            fontSize="6"
            fontWeight="700"
            fontFamily="Manrope, system-ui, sans-serif"
            letterSpacing="2"
          >EV FAST CHARGER</text>
        </g>

        {/* ——— Green wave section (lower body) ——— */}

        {/* Wave layer 1 — back/darkest */}
        <path
          d="M68,318 C108,290 148,330 200,305 C240,284 265,312 252,315 L252,484 L68,484 Z"
          fill="#0B3D2A"
          opacity="0.9"
        />

        {/* Wave layer 2 */}
        <path
          d="M68,338 C115,308 158,348 208,320 C248,298 265,330 252,332 L252,484 L68,484 Z"
          fill="#0E5035"
          opacity="0.8"
        />

        {/* Wave layer 3 — front/lightest */}
        <path
          d="M68,360 C120,332 165,368 218,342 C250,326 265,350 252,352 L252,484 L68,484 Z"
          fill="#1B7A46"
          opacity="0.55"
        />

        {/* Fine wave line textures */}
        <path d="M68,322 C108,294 148,334 200,309 C240,288 265,316 252,319" stroke="#3DAA6B" strokeWidth="0.55" fill="none" opacity="0.4" />
        <path d="M68,330 C108,302 148,342 200,317 C240,296 265,324 252,327" stroke="#3DAA6B" strokeWidth="0.5"  fill="none" opacity="0.35" />
        <path d="M68,340 C108,312 148,352 200,327 C240,306 265,334 252,337" stroke="#3DAA6B" strokeWidth="0.45" fill="none" opacity="0.3" />
        <path d="M68,350 C115,320 158,360 208,335 C248,313 265,340 252,343" stroke="#3DAA6B" strokeWidth="0.4"  fill="none" opacity="0.25" />
        <path d="M68,360 C120,330 165,368 218,344 C250,328 265,352 252,354" stroke="#3DAA6B" strokeWidth="0.4"  fill="none" opacity="0.2" />

        {/* ——— Bottom branding strip ——— */}
        <rect x="68" y="432" width="184" height="52" fill="#0B3D2A" />

        {/* CCS2 label */}
        <text x="92" y="450" fill="#FFFFFF" fontSize="7.5" fontWeight="700" fontFamily="Manrope,sans-serif" opacity="0.85">CCS2</text>
        {/* 60kW label */}
        <text x="92" y="466" fill="#3DAA6B" fontSize="11" fontWeight="800" fontFamily="Manrope,sans-serif">60kW</text>

        {/* Small R logo bottom right */}
        <circle cx="224" cy="455" r="10" fill="none" stroke="#3DAA6B" strokeWidth="1.2" opacity="0.8" />
        <text x="224" y="460" textAnchor="middle" fill="#3DAA6B" fontSize="9" fontWeight="800" fontFamily="Manrope,sans-serif" opacity="0.8">R</text>

        {/* RANGER text small */}
        <text x="224" y="472" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="5" fontFamily="Manrope,sans-serif" letterSpacing="1.5">RANGER</text>
      </g>

      {/* Body outline */}
      <rect x="68" y="54" width="184" height="430" rx="10" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="0.8" />

      {/* ——— Pedestal / base ——— */}
      <rect x="108" y="484" width="104" height="14"  rx="4" fill="#1A2530" />
      <rect x="118" y="498" width="18"  height="42"  rx="3" fill="#1A2530" />
      <rect x="184" y="498" width="18"  height="42"  rx="3" fill="#1A2530" />
      {/* Foot plates */}
      <rect x="104" y="536" width="46"  height="8"   rx="3" fill="#1A2530" opacity="0.7" />
      <rect x="170" y="536" width="46"  height="8"   rx="3" fill="#1A2530" opacity="0.7" />

      {/* Ground shadow */}
      <ellipse cx="160" cy="548" rx="72" ry="6" fill="rgba(0,0,0,0.1)" />

      {/* ——— Left charging cable ——— */}
      <path
        d="M82,360 Q55,384 58,424 Q60,448 46,472"
        stroke="#2A3A2C"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      {/* Left gun connector */}
      <rect x="35" y="468" width="22" height="15" rx="4" fill="#1A2530" />
      <rect x="39" y="480" width="14" height="10" rx="2" fill="#3DAA6B" />

      {/* ——— Right charging cable ——— */}
      <path
        d="M238,360 Q265,384 262,424 Q260,448 274,472"
        stroke="#2A3A2C"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right gun connector */}
      <rect x="263" y="468" width="22" height="15" rx="4" fill="#1A2530" />
      <rect x="267" y="480" width="14" height="10" rx="2" fill="#3DAA6B" />

      {/* Subtle energy pulse dots on cables (visual only) */}
      <circle cx="60" cy="412" r="2.5" fill="#3DAA6B" opacity="0.6" />
      <circle cx="55" cy="442" r="2"   fill="#3DAA6B" opacity="0.45" />
      <circle cx="260" cy="412" r="2.5" fill="#3DAA6B" opacity="0.6" />
      <circle cx="265" cy="442" r="2"   fill="#3DAA6B" opacity="0.45" />
    </svg>
  );
}
