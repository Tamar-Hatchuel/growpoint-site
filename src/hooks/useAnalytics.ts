
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-84PPE405S5', {
        page_path: location.pathname,
      });
    }
  }, [location]);

  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  const trackPageView = (pagePath: string, pageTitle?: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-84PPE405S5', {
        page_path: pagePath,
        page_title: pageTitle,
      });
    }
  };

  return { trackEvent, trackPageView };
};
