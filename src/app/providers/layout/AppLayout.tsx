import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '../ErrorBoundary';

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ErrorBoundary>
          <div className="page-transition" key={location.pathname}>
            <Outlet />
          </div>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
