import React from 'react';

/**
 * EnergyWave — The signature RANGER organic wave motif
 * Inspired by the green energy-wave graphics on the physical RANGER charger.
 * Use as a decorative background element in sections and transitions.
 */
export default function EnergyWave({
  className = '',
  style = {},
  baseColor = '#0B3D2A',
  accentColor = '#1B7A46',
  flipY = false,
  opacity = 1,
}) {
  const transform = flipY ? 'scale(1,-1)' : undefined;
  return (
    <svg
      viewBox="0 0 1440 200"
      className={className}
      style={{ display: 'block', ...style }}
      aria-hidden="true"
      preserveAspectRatio="none"
      transform={transform}
    >
      {/* Layer 1 — deepest wave */}
      <path
        d="M0,120 C180,70 360,155 540,110 C720,65 900,145 1080,100 C1260,55 1380,130 1440,95 L1440,200 L0,200 Z"
        fill={baseColor}
        opacity={0.55 * opacity}
      />
      {/* Layer 2 */}
      <path
        d="M0,140 C200,95 380,165 580,130 C780,95 940,155 1140,120 C1300,90 1400,145 1440,120 L1440,200 L0,200 Z"
        fill={accentColor}
        opacity={0.45 * opacity}
      />
      {/* Layer 3 — lightest, top wave edge */}
      <path
        d="M0,162 C220,132 420,172 640,152 C860,132 1040,166 1260,148 C1360,138 1420,158 1440,148 L1440,200 L0,200 Z"
        fill={accentColor}
        opacity={0.3 * opacity}
      />
      {/* Fine line texture */}
      <path
        d="M0,135 C180,88 360,148 540,118 C720,88 900,138 1080,108 C1260,78 1380,128 1440,105"
        stroke={accentColor}
        strokeWidth="0.6"
        fill="none"
        opacity={0.35 * opacity}
      />
      <path
        d="M0,148 C200,108 380,158 580,135 C780,112 940,148 1140,128 C1300,108 1400,138 1440,125"
        stroke={accentColor}
        strokeWidth="0.5"
        fill="none"
        opacity={0.25 * opacity}
      />
    </svg>
  );
}
