import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@pages/home';
import { AppLayout } from './layout/AppLayout';
import { CartPage } from '@/pages/cart';
import { ClothesPage } from '@/pages/clothes';
import { CatalogPage } from '@/pages/catalog';
import { NotFoundPage } from '@/pages/not-found';
import { WishlistPage } from '@/pages/wishlist';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/catalog',
        element: <CatalogPage />,
      },
      {
        path: '/clothes/:id',
        element: <ClothesPage />,
      },
      {
        path: '/wishlist',
        element: <WishlistPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
