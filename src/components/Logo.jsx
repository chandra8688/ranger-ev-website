import React from 'react';
import { companyInfo } from '../data/company';

/** Right-sized logo (96/192px WebP) instead of the 880px PNG. */
export default function Logo({ className, eager = false, alt = '' }) {
  return (
    <img
      src={companyInfo.branding.logo}
      srcSet={`${companyInfo.branding.logo} 1x, ${companyInfo.branding.logo2x} 2x`}
      width="48"
      height="48"
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
