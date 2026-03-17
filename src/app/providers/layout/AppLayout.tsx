import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '../ErrorBoundary';
import { ScrollToTop } from '@/shared/ui/scroll-to-top';
import { BottomNav } from '@/shared/ui/bottom-nav';

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-14 md:pb-0">
        <ErrorBoundary>
          <div className="page-transition" key={location.pathname}>
            <Outlet />
          </div>
        </ErrorBoundary>
      </main>
      <Footer />
      <ScrollToTop />
      <BottomNav />
    </div>
  );
}
