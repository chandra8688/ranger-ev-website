import React from 'react';

/**
 * RouteGraphic
 * Simple abstract dotted route line with location markers.
 * Shows one active marker (the RANGER Outlet #01) and the route ahead.
 */
export default function RouteGraphic({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 560 120"
      className={className}
      style={{ display: 'block', ...style }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="route-line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1B7A46" stopOpacity="0.15" />
          <stop offset="30%"  stopColor="#1B7A46" stopOpacity="0.8" />
          <stop offset="70%"  stopColor="#1B7A46" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1B7A46" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="active-pin-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1B7A46" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1B7A46" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Route line */}
      <path
        d="M20,60 L540,60"
        stroke="url(#route-line-grad)"
        strokeWidth="2"
        strokeDasharray="10,8"
        fill="none"
      />

      {/* Past markers (faded) */}
      <circle cx="60"  cy="60" r="5" fill="#D2DCD2" />
      <circle cx="120" cy="60" r="5" fill="#D2DCD2" />
      <circle cx="200" cy="60" r="5" fill="#D2DCD2" />

      {/* Active marker — RANGER Outlet #01 */}
      <circle cx="310" cy="60" r="22" fill="url(#active-pin-glow)" />
      <circle cx="310" cy="60" r="12" fill="#1B7A46" />
      <circle cx="310" cy="60" r="8"  fill="white" />
      <circle cx="310" cy="60" r="4"  fill="#1B7A46" />

      {/* Label for active marker */}
      <text x="310" y="91"  textAnchor="middle" fill="#1B7A46" fontSize="9" fontWeight="700" fontFamily="Manrope,sans-serif">Outlet #01</text>
      <text x="310" y="104" textAnchor="middle" fill="#8A9C8A" fontSize="7.5" fontFamily="Manrope,sans-serif">Ayyasagar · NH 765</text>

      {/* Future markers (open/hollow — not yet operational) */}
      <circle cx="410" cy="60" r="6"  fill="none" stroke="#D2DCD2" strokeWidth="1.5" strokeDasharray="3,2" />
      <circle cx="490" cy="60" r="6"  fill="none" stroke="#D2DCD2" strokeWidth="1.5" strokeDasharray="3,2" />

      {/* "Expanding" label on future section */}
      <text x="455" y="48" textAnchor="middle" fill="#8A9C8A" fontSize="7.5" fontFamily="Manrope,sans-serif" fontStyle="italic">Coming soon</text>

      {/* Orange accent — start point */}
      <circle cx="20" cy="60" r="4" fill="#C45614" opacity="0.7" />
      {/* End arrow hint */}
      <path d="M536,55 L546,60 L536,65" stroke="#D2DCD2" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
