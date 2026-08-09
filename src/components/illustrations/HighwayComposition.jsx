import React from 'react';

/**
 * HighwayComposition
 * 
 * Abstract premium illustration representing the RANGER highway charging experience:
 * EV + road + RANGER charger + energy connection + landscape.
 * Used in Hero and Outlet sections.
 * 
 * Props:
 *   className, style
 */
export default function HighwayComposition({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 620 500"
      className={className}
      style={{ display: 'block', ...style }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#E8F0EC" />
          <stop offset="100%" stopColor="#F6F8F5" />
        </linearGradient>
        <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#D8EDE0" />
          <stop offset="100%" stopColor="#C8E0CE" />
        </linearGradient>
        <linearGradient id="road-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#92A89A" />
          <stop offset="50%"  stopColor="#A8B8AC" />
          <stop offset="100%" stopColor="#92A89A" />
        </linearGradient>
        <radialGradient id="scene-glow" cx="65%" cy="40%" r="40%">
          <stop offset="0%"   stopColor="#1B7A46" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#1B7A46" stopOpacity="0" />
        </radialGradient>
        <filter id="scene-shadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.1)" />
        </filter>
        <clipPath id="ev-clip">
          <rect x="100" y="305" width="180" height="80" rx="6" />
        </clipPath>
      </defs>

      {/* Sky */}
      <rect width="620" height="500" fill="url(#sky-grad)" />

      {/* Scene glow */}
      <rect width="620" height="500" fill="url(#scene-glow)" />

      {/* ——— Distant horizon hills ——— */}
      <path d="M0,295 Q80,260 180,278 Q280,255 380,270 Q480,252 580,265 L620,268 L620,360 L0,360 Z"
        fill="#1B7A46" opacity="0.1" />
      <path d="M0,310 Q100,278 220,295 Q340,268 460,285 Q560,268 620,280 L620,360 L0,360 Z"
        fill="#0E5035" opacity="0.14" />

      {/* ——— Ground ——— */}
      <path d="M0,340 Q155,326 310,332 Q465,320 620,328 L620,500 L0,500 Z"
        fill="url(#ground-grad)" />

      {/* Landscape texture strips */}
      <path d="M0,355 Q155,344 310,349 Q465,336 620,344 L620,360 L0,360 Z"
        fill="#C0D8C6" opacity="0.5" />

      {/* ——— Road (two-lane, perspective) ——— */}
      {/* Road surface */}
      <path d="M160,500 L268,336 L352,336 L460,500 Z" fill="url(#road-grad)" />

      {/* Road edge lines */}
      <path d="M160,500 L268,336" stroke="#B0BEB4" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M460,500 L352,336" stroke="#B0BEB4" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Road center dashes (perspective) */}
      <path d="M303,356 L300,370" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <path d="M304,382 L300,400" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <path d="M305,415 L300,438" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      <path d="M308,455 L302,484" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />

      {/* Road shoulder edge (orange dashes, route accent) */}
      <path d="M460,500 L352,336" stroke="#C45614" strokeWidth="1.2" strokeDasharray="6,8" fill="none" opacity="0.35" />

      {/* ——— RANGER Charger (right of road) ——— */}
      <g filter="url(#scene-shadow)">
        {/* Charger base */}
        <rect x="396" y="346" width="68" height="10" rx="3" fill="#1A2530" opacity="0.75" />
        {/* Charger body */}
        <rect x="404" y="240" width="56" height="108" rx="5" fill="#FFFFFF" />
        {/* Top charcoal section */}
        <rect x="404" y="240" width="56" height="38" rx="5" fill="#1A2530" />
        <rect x="404" y="268" width="56" height="10" fill="#1A2530" />
        {/* R circle logo */}
        <circle cx="432" cy="252" r="8" fill="none" stroke="#3DAA6B" strokeWidth="1" />
        <text x="432" y="256" textAnchor="middle" fill="#3DAA6B" fontSize="7" fontWeight="800" fontFamily="Manrope,sans-serif">R</text>
        {/* RANGER text */}
        <text x="432" y="272" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="Manrope,sans-serif" letterSpacing="1.5">RANGER</text>
        {/* Display panel */}
        <rect x="411" y="283" width="42" height="26" rx="3" fill="#0D1820" />
        {/* Bolt icons */}
        <path d="M420,287 L426,296 L422,296 L428,308 L422,298 L426,298 Z" fill="#3DAA6B" />
        {/* Green wave lower body */}
        <path d="M404,315 Q420,305 460,308 L460,356 L404,356 Z" fill="#0B3D2A" opacity="0.85" />
        <path d="M404,327 Q425,318 460,320 L460,356 L404,356 Z" fill="#1B7A46" opacity="0.6" />
        {/* Fine wave lines */}
        <path d="M404,318 Q422,310 460,313" stroke="#3DAA6B" strokeWidth="0.5" fill="none" opacity="0.4" />
        <path d="M404,324 Q422,317 460,320" stroke="#3DAA6B" strokeWidth="0.5" fill="none" opacity="0.3" />
        {/* Body outline */}
        <rect x="404" y="240" width="56" height="108" rx="5" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
        {/* Cable */}
        <path d="M404,306 Q390,316 388,336 Q385,350 380,364" stroke="#1A2530" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        <rect x="374" y="361" width="13" height="8" rx="2" fill="#1A2530" />
        <rect x="376" y="367" width="9" height="5" rx="1" fill="#3DAA6B" />
      </g>

      {/* ——— EV Vehicle (on road, driving towards charger) ——— */}
      <g transform="translate(100, 370)">
        {/* Car shadow */}
        <ellipse cx="88" cy="44" rx="72" ry="5" fill="rgba(0,0,0,0.12)" />
        {/* Body lower */}
        <path d="M12,36 L12,40 Q12,44 16,44 L160,44 Q164,44 164,40 L164,36 Z" fill="#1A2530" />
        {/* Body main */}
        <path d="M20,36 Q24,14 55,8 Q80,4 92,4 Q110,4 126,8 Q152,14 156,36 Z" fill="#1C2C30" />
        {/* Windshield */}
        <path d="M52,12 Q64,6 92,5 Q115,4 130,10 Q140,14 138,24 L52,24 Z" fill="#3A5A6A" opacity="0.55" />
        {/* Side window */}
        <path d="M28,24 L52,24 L52,34 L28,34 Z" fill="#3A5A6A" opacity="0.45" />
        {/* Door detail line */}
        <path d="M16,36 L160,36" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        {/* EV badge */}
        <rect x="70" y="30" width="20" height="8" rx="2" fill="#1B7A46" opacity="0.7" />
        <text x="80" y="37" textAnchor="middle" fill="white" fontSize="5" fontWeight="700" fontFamily="Manrope,sans-serif">EV</text>
        {/* Wheels */}
        <circle cx="38"  cy="44" r="12" fill="#0A1218" />
        <circle cx="38"  cy="44" r="8"  fill="#222E32" />
        <circle cx="38"  cy="44" r="3"  fill="#4A5A5E" />
        <circle cx="134" cy="44" r="12" fill="#0A1218" />
        <circle cx="134" cy="44" r="8"  fill="#222E32" />
        <circle cx="134" cy="44" r="3"  fill="#4A5A5E" />
        {/* Headlights */}
        <ellipse cx="160" cy="30" rx="3" ry="4" fill="#F5D060" opacity="0.8" />
      </g>

      {/* ——— Energy connection arc (charger → EV) ——— */}
      <path
        d="M382,328 Q360,310 330,316 Q300,322 278,336 Q260,346 252,354"
        stroke="#1B7A46"
        strokeWidth="2"
        fill="none"
        strokeDasharray="6,5"
        opacity="0.65"
      />
      {/* Energy flow dots */}
      <circle cx="360" cy="314" r="2.8" fill="#2AAD62" opacity="0.8" />
      <circle cx="330" cy="318" r="2.2" fill="#3DAA6B" opacity="0.7" />
      <circle cx="302" cy="326" r="2.8" fill="#2AAD62" opacity="0.85" />
      <circle cx="275" cy="340" r="2.2" fill="#3DAA6B" opacity="0.65" />

      {/* ——— RANGER totem signboard (simplified) ——— */}
      {/* Pole */}
      <rect x="507" y="302" width="4" height="60" rx="1" fill="#1A2530" opacity="0.6" />
      {/* Sign board */}
      <rect x="490" y="282" width="42" height="24" rx="3" fill="#1A2530" />
      <rect x="490" y="282" width="42" height="4" rx="2" fill="#1B7A46" opacity="0.8" />
      <text x="511" y="297" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="800" fontFamily="Manrope,sans-serif" letterSpacing="1.2">RANGER</text>
      <text x="511" y="303" textAnchor="middle" fill="#3DAA6B" fontSize="4.5" fontFamily="Manrope,sans-serif">EV HUB</text>

      {/* ——— NH 765 route badge ——— */}
      <rect x="18" y="456" width="44" height="18" rx="4" fill="#C45614" opacity="0.8" />
      <text x="40" y="468" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="700" fontFamily="Manrope,sans-serif">NH 765</text>

      {/* ——— Ambient energy wave motif (background, lower right) ——— */}
      <path d="M460,468 C500,455 545,470 590,460 Q610,455 620,462" stroke="#1B7A46" strokeWidth="2" fill="none" opacity="0.25" />
      <path d="M460,478 C500,466 545,480 590,470 Q610,465 620,472" stroke="#1B7A46" strokeWidth="1.5" fill="none" opacity="0.18" />
      <path d="M460,488 C500,478 545,490 590,480 Q610,475 620,482" stroke="#1B7A46" strokeWidth="1" fill="none" opacity="0.12" />
    </svg>
  );
}
