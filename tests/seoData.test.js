/**
 * Route metadata used by both <SEO> and the build-time prerender.
 */
import { describe, it, expect } from 'vitest';
import { allRoutes, staticRoutes } from '../src/data/seo.js';
import { outletsData } from '../src/data/outlets.js';

describe('route metadata', () => {
  const routes = allRoutes();

  it('covers every static page and every outlet', () => {
    const paths = routes.map((r) => r.path);
    for (const p of ['/', '/about', '/chargers', '/outlets', '/partner', '/contact', '/privacy']) expect(paths).toContain(p);
    for (const o of outletsData) expect(paths).toContain(`/outlets/${o.id}`);
  });

  it('has a unique title and a useful description for every route', () => {
    const titles = new Set();
    for (const r of routes) {
      expect(r.title.length).toBeGreaterThan(15);
      expect(r.title.length).toBeLessThanOrEqual(75);
      expect(r.description.length).toBeGreaterThan(70);
      expect(r.description.length).toBeLessThanOrEqual(200);
      expect(titles.has(r.title)).toBe(false);
      titles.add(r.title);
    }
  });

  it('does not make claims the site cannot back up', () => {
    for (const r of routes) expect(r.description.toLowerCase()).not.toMatch(/real-time|live status/);
  });

  it('gives the outlet page geo-coordinates in its structured data', () => {
    const outletRoute = routes.find((r) => r.path === `/outlets/${outletsData[0].id}`);
    const station = outletRoute.jsonLd.find((j) => j['@type'] === 'ElectricVehicleChargingStation');
    expect(station.geo.latitude).toBe(outletsData[0].coordinates.lat);
    expect(station.geo.longitude).toBe(outletsData[0].coordinates.lng);
  });

  it('lists outlets in the Outlets ItemList', () => {
    const list = staticRoutes['/outlets'].jsonLd.find((j) => j['@type'] === 'ItemList');
    expect(list.itemListElement).toHaveLength(outletsData.length);
  });
});
