import { BUSINESS_EMAIL } from '../config.js';

export const companyInfo = {
  name: 'RANGER EV',
  legalName: 'RANGER EV Infrastructure',
  brandName: 'RANGER',
  tagline: 'POWERING EVERY JOURNEY',
  subTagline: "Building a reliable EV charging network for India's highways.",
  description:
    'RANGER EV is an Indian EV fast-charging brand focused on developing accessible highway charging infrastructure for long-distance intercity travel.',

  contact: {
    primaryPhone: '+916301858198',
    displayPhone: '+91 6301858198',
    whatsappNumber: '919491340720',
    displayWhatsapp: '+91 9491340720',
    email: BUSINESS_EMAIL,
  },

  office: {
    label: 'Corporate Office',
    city: 'Hyderabad, Telangana',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hyderabad%2C%20Telangana',
  },

  branding: {
    logo: '/images/brand/ranger-logo-96.webp',
    logo2x: '/images/brand/ranger-logo-192.webp',
    logoSchema: '/images/brand/ranger-logo-transparent.png',
  },
};

/** wa.me deep link, optionally with a prefilled message. */
export function whatsappLink(message) {
  const base = `https://wa.me/${companyInfo.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
