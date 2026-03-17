import { Home, LayoutGrid, Heart, ShoppingBasket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '@/app/store';
import { selectCartItemCount } from '@/entities/cart';
import { selectWishlistCount } from '@/entities/wishlist';
import clsx from 'clsx';

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/catalog', icon: LayoutGrid, label: 'Catalog' },
  { to: '/wishlist', icon: Heart, label: 'Wishlist' },
  { to: '/cart', icon: ShoppingBasket, label: 'Cart' },
] as const;

export function BottomNav() {
  const location = useLocation();
  const count = useSelector(selectCartItemCount);
  const wishlistCount = useSelector(selectWishlistCount);

  const getBadge = (to: string) => {
    if (to === '/cart' && count > 0) return count;
    if (to === '/wishlist' && wishlistCount > 0) return wishlistCount;
    return null;
  };

  return (
    <nav className="border-border bg-bg fixed bottom-0 left-0 z-50 w-full border-t md:hidden">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          const badge = getBadge(to);

          return (
            <Link
              key={to}
              to={to}
              className={clsx(
                'flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors',
                isActive ? 'text-accent' : 'text-text-tertiary',
              )}
            >
              <div className="relative">
                <Icon size={20} />
                {badge && (
                  <span className="bg-accent text-accent-text absolute -top-1.5 -right-2.5 rounded-full px-1 text-[10px] leading-tight font-bold">
                    {badge}
                  </span>
                )}
              </div>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
