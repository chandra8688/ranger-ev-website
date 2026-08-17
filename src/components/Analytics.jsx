import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-328SHQT2V0', {
        page_path: pathname + search,
      });
    }
  }, [pathname, search]);

  return null;
}
