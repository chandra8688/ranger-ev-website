/**
 * Route metadata + structured data, shared by the runtime <SEO> component
 * and scripts/prerender.mjs (which bakes it into each route's static HTML so
 * crawlers and link previews see the right title/description without JS).
 * Keep imports Node-compatible (explicit .js extensions, no JSX).
 */
import { BASE_URL, BUSINESS_EMAIL, DEFAULT_OG_IMAGE } from '../config.js';
import { companyInfo } from './company.js';
import { outletsData } from './outlets.js';

const ORG_ID = `${BASE_URL}/#organization`;
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: companyInfo.name,
  alternateName: 'RANGER EV HUB',
  url: BASE_URL,
  logo: `${BASE_URL}${companyInfo.branding.logoSchema}`,
  email: BUSINESS_EMAIL,
  telephone: companyInfo.contact.primaryPhone,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: companyInfo.contact.primaryPhone,
    contactType: 'customer service',
    email: BUSINESS_EMAIL,
    areaServed: 'IN',
    availableLanguage: ['en', 'te', 'hi'],
  },
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: companyInfo.name,
  url: BASE_URL,
  publisher: { '@id': ORG_ID },
};

export function outletJsonLd(outlet) {
  const url = `${BASE_URL}/outlets/${outlet.id}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ElectricVehicleChargingStation',
    '@id': `${url}#station`,
    name: outlet.title,
    url,
    image: outlet.photos.slice(0, 3).map((p) => `${BASE_URL}${p.src}-1280.webp`),
    telephone: companyInfo.contact.primaryPhone,
    priceRange: outlet.specs.tariff,
    parentOrganization: { '@id': ORG_ID },
    address: {
      '@type': 'PostalAddress',
      streetAddress: outlet.address.street,
      addressLocality: outlet.address.locality,
      addressRegion: outlet.address.region,
      postalCode: outlet.address.postalCode,
      addressCountry: outlet.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: outlet.coordinates.lat,
      longitude: outlet.coordinates.lng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAYS,
      opens: '00:00',
      closes: '23:59',
    },
    amenityFeature: outlet.amenities.map((a) => ({
      '@type': 'LocationFeatureSpecification',
      name: a.name,
      value: true,
    })),
  };
}

function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${BASE_URL}${path}`,
    })),
  };
}

export function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Static routes. Outlet routes are generated from outletsData below. */
export const staticRoutes = {
  '/': {
    title: 'RANGER EV | Highway EV Fast Charging in India',
    description:
      "RANGER EV builds 24×7 highway fast-charging hubs in India. Outlet #01 on NH 765 (Srisailam Highway): 60 kW DC CCS2 charging at ₹23/kWh, café, Wi-Fi and restrooms.",
    jsonLd: [websiteLd, organizationLd],
    changefreq: 'weekly',
    priority: '1.0',
  },
  '/about': {
    title: 'About RANGER EV | Highway Charging Infrastructure',
    description:
      'How RANGER EV is building a dependable 60 kW CCS2 highway charging network for intercity electric travel in India, starting with Outlet #01 on NH 765.',
    jsonLd: [organizationLd, breadcrumbLd([['Home', '/'], ['About', '/about']])],
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/chargers': {
    title: 'RANGER 60 kW DC Fast Charger | CCS2 Specifications',
    description:
      'Specifications of the RANGER 60 kW DC fast charger: dual CCS2 guns, two cars at once, 24×7 availability and ₹23/kWh at Outlet #01. Estimate your charging time and cost.',
    jsonLd: [breadcrumbLd([['Home', '/'], ['Chargers', '/chargers']])],
    changefreq: 'monthly',
    priority: '0.8',
  },
  '/outlets': {
    title: 'RANGER EV Charging Stations | Outlet Locations & Map',
    description:
      'Find RANGER EV fast-charging outlets on India’s highways. Locations on a map, directions, charging specs, pricing and amenities for every RANGER outlet.',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: outletsData.map((o, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${BASE_URL}/outlets/${o.id}`,
          name: o.title,
        })),
      },
      breadcrumbLd([['Home', '/'], ['Outlets', '/outlets']]),
    ],
    changefreq: 'weekly',
    priority: '0.9',
  },
  '/partner': {
    title: 'Host a RANGER EV Fast Charger | Partner With Us',
    description:
      'Own highway land, a dhaba, hotel or fuel station? Partner with RANGER EV to host a 60 kW CCS2 DC fast-charging hub. Submit your location for evaluation.',
    jsonLd: [breadcrumbLd([['Home', '/'], ['Partner', '/partner']])],
    changefreq: 'monthly',
    priority: '0.7',
  },
  '/contact': {
    title: 'Contact RANGER EV | 24×7 Charging Support',
    description:
      'Call, WhatsApp or email RANGER EV for 24×7 charging support, business partnerships and site acquisition enquiries.',
    jsonLd: [organizationLd, breadcrumbLd([['Home', '/'], ['Contact', '/contact']])],
    changefreq: 'monthly',
    priority: '0.7',
  },
  '/privacy': {
    title: 'Privacy Policy | RANGER EV',
    description: 'How RANGER EV collects, uses and protects personal data submitted through this website.',
    jsonLd: null,
    changefreq: 'yearly',
    priority: '0.3',
  },
};

export function outletRouteMeta(outlet) {
  return {
    title: `${outlet.title} – ${outlet.shortName}, ${outlet.highway} | RANGER EV`,
    description: `${outlet.specs.chargersCount} × ${outlet.specs.powerPerCharger} DC ${outlet.specs.connectorType} fast chargers at ${outlet.locationArea}, ${outlet.address.region}. ${outlet.specs.operatingHours}, ${outlet.specs.tariff}. Café, Wi-Fi, restrooms and parking near ${outlet.landmark}.`,
    ogImage: `/images/outlets/${outlet.id}/og-1200x630.jpg`,
    jsonLd: [
      outletJsonLd(outlet),
      breadcrumbLd([['Home', '/'], ['Outlets', '/outlets'], [outlet.title, `/outlets/${outlet.id}`]]),
    ],
    changefreq: 'weekly',
    priority: '0.9',
  };
}

/** Every indexable route with its metadata, in sitemap order. */
export function allRoutes() {
  const routes = Object.entries(staticRoutes).map(([path, meta]) => ({ path, ...meta }));
  for (const o of outletsData) routes.push({ path: `/outlets/${o.id}`, ...outletRouteMeta(o) });
  return routes;
}

export const notFoundMeta = {
  title: 'Page Not Found | RANGER EV',
  description: 'The page you are looking for could not be found.',
};

export { DEFAULT_OG_IMAGE };
