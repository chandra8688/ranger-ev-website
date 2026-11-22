import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Picture from './Picture';

/** Photo grid + accessible lightbox built on the native <dialog> element. */
export default function Gallery({ photos, label = 'Photo gallery' }) {
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(null);
  const lastTrigger = useRef(null);

  const open = (i, e) => {
    lastTrigger.current = e.currentTarget;
    setIndex(i);
  };
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal?.();
    if (index === null && dialog.open) {
      dialog.close();
      lastTrigger.current?.focus();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, step]);

  const current = index !== null ? photos[index] : null;

  return (
    <>
      <ul className="gallery" aria-label={label}>
        {photos.map((p, i) => (
          <li key={p.src} className="gallery__item">
            <button
              type="button"
              onClick={(e) => open(i, e)}
              aria-label={`Open photo ${i + 1} of ${photos.length}: ${p.alt}`}
            >
              <Picture photo={p} sizes={i === 0 ? '(max-width: 640px) 66vw, 40vw' : '(max-width: 640px) 33vw, 20vw'} />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={label}
        onClose={close}
        onClick={(e) => { if (e.target === e.currentTarget || e.target.classList.contains('lightbox__inner')) close(); }}
      >
        {current && (
          <div className="lightbox__inner">
            <p className="lightbox__count" aria-live="polite">{index + 1} / {photos.length}</p>
            <button type="button" className="lightbox__btn lightbox__close" onClick={close} aria-label="Close gallery">
              <X size={22} aria-hidden="true" />
            </button>
            <button type="button" className="lightbox__btn lightbox__prev" onClick={() => step(-1)} aria-label="Previous photo">
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <figure className="lightbox__figure">
              <Picture photo={current} sizes="100vw" eager />
              <figcaption>{current.alt}</figcaption>
            </figure>
            <button type="button" className="lightbox__btn lightbox__next" onClick={() => step(1)} aria-label="Next photo">
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
