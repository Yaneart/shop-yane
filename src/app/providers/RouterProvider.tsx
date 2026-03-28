import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { PageLoader } from './layout/PageLoader';

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
const AboutPage = lazy(() =>
  import('@/pages/about').then((m) => ({ default: m.AboutPage })),
);
const CategoryPage = lazy(() =>
  import('@/pages/category').then((m) => ({ default: m.CategoryPage })),
);
const AuthPage = lazy(() =>
  import('@/pages/auth').then((m) => ({ default: m.AuthPage })),
);

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: '/catalog',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CatalogPage />
          </Suspense>
        ),
      },
      {
        path: '/clothes/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ClothesPage />
          </Suspense>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <Suspense fallback={<PageLoader />}>
            <WishlistPage />
          </Suspense>
        ),
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: '/catalog/:category',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CategoryPage />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
