import React, { useEffect, useRef } from 'react';

/**
 * Fades content in when it scrolls into view. Without JS, or with
 * reduced motion, content is simply visible (see .js .reveal in CSS).
 */
export default function Reveal({ as: Tag = 'div', delay, className = '', children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px 10% 0px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} data-delay={delay} {...rest}>
      {children}
    </Tag>
  );
}
