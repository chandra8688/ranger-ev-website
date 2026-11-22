import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { mapEmbedUrl } from '../data/outlets';

/**
 * Click-to-load Google Map. Avoids ~450 KB of Maps scripts until the
 * visitor actually wants the map (Stage 5D-2C in docs/context.md).
 */
export default function MapEmbed({ outlet }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="map-frame">
      {loaded ? (
        <iframe
          src={mapEmbedUrl(outlet)}
          title={`Map showing the location of ${outlet.title}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="map-facade">
          <span className="map-facade__pin"><MapPin size={26} aria-hidden="true" /></span>
          <p className="small">{outlet.landmark} · {outlet.highway}</p>
          <button type="button" className="btn btn--secondary btn--sm" onClick={() => setLoaded(true)}>
            Load interactive map
          </button>
        </div>
      )}
    </div>
  );
}
