import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
