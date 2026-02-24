import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '../ErrorBoundary';

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
