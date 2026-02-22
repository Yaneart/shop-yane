import { BookOpen, Sun, Moon, ShoppingBasket, Heart } from 'lucide-react';
import { useTheme } from '@shared/lib';
import { Logo } from '@shared/ui/Logo';
import { Link } from 'react-router-dom';
import { useSelector } from '@/app/store';
import { selectCartItemCount } from '@/entities/cart';
import { selectWishlistCount } from '@/entities/wishlist';
import { SearchDropdown } from '@features/search';

export function Header() {
  const { theme, toggle } = useTheme();
  const count = useSelector(selectCartItemCount);
  const wishlistCount = useSelector(selectWishlistCount);

  return (
    <header className="border-border bg-bg sticky top-0 z-50 border-b">
      <nav className="flex w-full items-center gap-15 px-16 py-4">
        <div className="flex shrink-0 items-center gap-3">
          <Link to={'/'}>
            <Logo className="text-text hover:text-primary h-10 transition-all duration-300 hover:scale-105" />
          </Link>
          <Link to={'/catalog'}>
            <BookOpen
              size={35}
              className="text-text-secondary hover:text-text transition-colors"
            />
          </Link>
        </div>

        <SearchDropdown />

        <div className="ml-auto flex shrink-0 items-center gap-4">
          <Link to={'/wishlist'}>
            <div className="relative">
              {wishlistCount > 0 && (
                <span key={wishlistCount} className="cart-pop absolute -right-3">
                  {wishlistCount}
                </span>
              )}
              <Heart
                size={35}
                className="text-text-secondary hover:text-text transition-colors"
              />
            </div>
          </Link>
          <Link to={'/cart'}>
            <div className="relative">
              <span key={count} className="cart-pop absolute -right-3">{count}</span>
              <ShoppingBasket
                size={35}
                className="text-text-secondary hover:text-text transition-colors"
              />
            </div>
          </Link>
          <button onClick={toggle}>
            {theme === 'light' ? (
              <Moon
                size={35}
                className="text-text-secondary hover:text-text transition-colors"
              />
            ) : (
              <Sun
                size={35}
                className="text-text-secondary hover:text-text transition-colors"
              />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
