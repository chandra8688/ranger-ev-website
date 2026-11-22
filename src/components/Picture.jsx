import React from 'react';

/**
 * Responsive AVIF/WebP picture for photos produced by scripts/process-images.cjs.
 * `photo` = { src (base path), width, height, alt }.
 */
export default function Picture({ photo, sizes = '100vw', eager = false, className, imgClassName, style, alt }) {
  const w640 = Math.min(640, photo.width);
  const wMax = Math.min(1280, photo.width);
  const set = (ext) => `${photo.src}-640.${ext} ${w640}w, ${photo.src}-1280.${ext} ${wMax}w`;

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`${photo.src}-1280.webp`}
        width={photo.width}
        height={photo.height}
        alt={alt ?? photo.alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding={eager ? 'sync' : 'async'}
        className={imgClassName}
        style={style}
      />
    </picture>
  );
}
