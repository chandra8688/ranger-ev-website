import React from 'react';
import SEO from './SEO';
import { staticRoutes } from '../data/seo';
import { BASE_URL } from '../config';

/** SEO for a static route, using the same metadata the prerender bakes into HTML. */
export default function RouteSEO({ path }) {
  const meta = staticRoutes[path];
  return (
    <SEO
      title={meta.title}
      description={meta.description}
      canonicalUrl={`${BASE_URL}${path === '/' ? '/' : path}`}
      jsonLd={meta.jsonLd}
      ogImage={meta.ogImage}
    />
  );
}
