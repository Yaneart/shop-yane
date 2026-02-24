import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';

const HomePage = lazy(() =>
  import('@pages/home').then((m) => ({ default: m.HomePage })),
);
const CartPage = lazy(() =>
  import('@/pages/cart').then((m) => ({ default: m.CartPage })),
);
const CatalogPage = lazy(() =>
  import('@/pages/catalog').then((m) => ({ default: m.CatalogPage })),
);
const ClothesPage = lazy(() =>
  import('@/pages/clothes').then((m) => ({ default: m.ClothesPage })),
);
const WishlistPage = lazy(() =>
  import('@/pages/wishlist').then((m) => ({ default: m.WishlistPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/not-found').then((m) => ({ default: m.NotFoundPage })),
);

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="border-accent h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
    </div>
  );
}

function SuspensePage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <SuspensePage>
            <HomePage />
          </SuspensePage>
        ),
      },
      {
        path: '/cart',
        element: (
          <SuspensePage>
            <CartPage />
          </SuspensePage>
        ),
      },
      {
        path: '/catalog',
        element: (
          <SuspensePage>
            <CatalogPage />
          </SuspensePage>
        ),
      },
      {
        path: '/clothes/:id',
        element: (
          <SuspensePage>
            <ClothesPage />
          </SuspensePage>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <SuspensePage>
            <WishlistPage />
          </SuspensePage>
        ),
      },
      {
        path: '*',
        element: (
          <SuspensePage>
            <NotFoundPage />
          </SuspensePage>
        ),
      },
    ],
  },
]);
