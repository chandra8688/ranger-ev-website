import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { outletsData, plannedCorridors, directionsUrl } from '../data/outlets';

/**
 * Interactive network map (Leaflet + OpenStreetMap tiles, darkened in CSS). Lazy-loaded by the
 * Outlets page so Leaflet never ships on other routes.
 */
export default function NetworkMap() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return undefined;
    const map = L.map(ref.current, {
      scrollWheelZoom: false,
      attributionControl: true,
      zoomControl: true,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const live = L.divIcon({ className: '', html: '<span class="map-pin"></span>', iconSize: [22, 22], iconAnchor: [11, 11] });
    const soon = L.divIcon({ className: '', html: '<span class="map-pin map-pin--soon"></span>', iconSize: [22, 22], iconAnchor: [11, 11] });

    const points = [];
    for (const o of outletsData) {
      const ll = [o.coordinates.lat, o.coordinates.lng];
      points.push(ll);
      L.marker(ll, { icon: live, title: o.title, keyboard: true })
        .addTo(map)
        .bindPopup(
          `<strong>${o.title}</strong><br>${o.highway}<br>${o.specs.chargersCount} × ${o.specs.powerPerCharger} ${o.specs.connectorType} · ${o.specs.tariff}<br>` +
            `<a href="/outlets/${o.id}">Station details</a> · <a href="${directionsUrl(o)}" target="_blank" rel="noopener noreferrer">Directions</a>`,
        );
    }
    for (const p of plannedCorridors) {
      const ll = [p.lat, p.lng];
      points.push(ll);
      L.marker(ll, { icon: soon, title: p.name }).addTo(map).bindPopup(`<strong>${p.name}</strong><br>Coming soon`);
    }

    // Hyderabad for context so a single outlet isn't shown in a void.
    points.push([17.385, 78.4867]);
    L.circleMarker([17.385, 78.4867], { radius: 4, color: '#A1A9B2', weight: 1, fillOpacity: 0.8 })
      .addTo(map)
      .bindTooltip('Hyderabad', { permanent: true, direction: 'right', className: 'map-city-label' });

    map.fitBounds(L.latLngBounds(points).pad(0.35));
    return () => map.remove();
  }, []);

  return <div ref={ref} className="network-map" role="region" aria-label="Map of RANGER charging outlets" />;
}
