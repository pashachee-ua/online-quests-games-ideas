import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Скроллит наверх при смене маршрута. Используем вместо <ScrollRestoration/>,
 * который требует data-router (createBrowserRouter), а у нас обычный BrowserRouter.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}
