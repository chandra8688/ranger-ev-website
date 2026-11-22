import { useEffect } from 'react';
import { trackPageView } from '../lib/analytics';

/**
 * Sends one GA4 page_view per route. <SEO> fires `ranger:pageview-ready`
 * after it has updated document.title, so the recorded title is the new
 * page's, not the previous one's.
 */
export default function Analytics() {
  useEffect(() => {
    const onReady = () => trackPageView();
    window.addEventListener('ranger:pageview-ready', onReady);
    return () => window.removeEventListener('ranger:pageview-ready', onReady);
  }, []);

  return null;
}
