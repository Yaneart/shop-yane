import { useState } from 'react';
import {
  BookOpen,
  Sun,
  Moon,
  ShoppingBasket,
  Heart,
  Menu,
  X,
} from 'lucide-react';
import { useTheme } from '@shared/lib';
import { Logo } from '@shared/ui/Logo';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '@/app/store';
import { selectCartItemCount } from '@/entities/cart';
import { selectWishlistCount } from '@/entities/wishlist';
import { SearchDropdown } from '@features/search';

export function Header() {
  const { theme, toggle } = useTheme();
  const count = useSelector(selectCartItemCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = () => closeMenu();

  return (
    <header className="border-border bg-bg sticky top-0 z-50 border-b">
      <nav className="hidden w-full items-center gap-15 px-16 py-4 md:flex">
        <div className="flex shrink-0 items-center gap-3">
          <Link to="/">
            <Logo className="text-text hover:text-primary h-10 transition-all duration-300 hover:scale-105" />
          </Link>
          <Link to="/catalog">
            <BookOpen
              size={35}
              className="text-text-secondary hover:text-text transition-colors"
            />
          </Link>
        </div>

        <SearchDropdown />

        <div className="ml-auto flex shrink-0 items-center gap-4">
          <Link to="/wishlist">
            <div className="relative">
              {wishlistCount > 0 && (
                <span
                  key={wishlistCount}
                  className="cart-pop absolute -right-3"
                >
                  {wishlistCount}
                </span>
              )}
              <Heart
                size={35}
                className="text-text-secondary hover:text-text transition-colors"
              />
            </div>
          </Link>
          <Link to="/cart">
            <div className="relative">
              <span key={count} className="cart-pop absolute -right-3">
                {count}
              </span>
              <ShoppingBasket
                size={35}
                className="text-text-secondary hover:text-text transition-colors"
              />
            </div>
          </Link>
          <button onClick={toggle} className="btn-icon">
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

      <nav className="flex items-center justify-between px-4 py-3 md:hidden">
        <Link to="/">
          <Logo className="text-text h-8" />
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/cart">
            <div className="relative">
              {count > 0 && (
                <span
                  key={count}
                  className="cart-pop absolute -right-2 text-xs"
                >
                  {count}
                </span>
              )}
              <ShoppingBasket
                size={24}
                className="text-text-secondary hover:text-text transition-colors"
              />
            </div>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="btn-icon"
            aria-label="Open menu"
          >
            <Menu size={24} className="text-text" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="modal-backdrop fixed inset-0 z-[100] bg-black/50"
          onClick={closeMenu}
        />
      )}

      {menuOpen && (
        <div
          className="bg-bg fixed top-0 right-0 z-[101] flex h-full w-72 flex-col shadow-2xl"
          style={{ animation: 'menu-slide-in 0.25s ease-out forwards' }}
        >
          <div className="border-border flex items-center justify-between border-b px-4 py-3">
            <span className="text-text font-bold">Menu</span>
            <button
              onClick={closeMenu}
              className="btn-icon"
              aria-label="Close menu"
            >
              <X size={24} className="text-text" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-1 p-4">
            <div className="mb-4">
              <SearchDropdown />
            </div>

            <Link
              to="/"
              onClick={handleNavClick}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-bg-tertiary hover:text-text'
              }`}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              onClick={handleNavClick}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === '/catalog'
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-bg-tertiary hover:text-text'
              }`}
            >
              Catalog
            </Link>
            <Link
              to="/wishlist"
              onClick={handleNavClick}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === '/wishlist'
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-bg-tertiary hover:text-text'
              }`}
            >
              Wishlist
              {wishlistCount > 0 && (
                <span className="bg-accent text-accent-text rounded-full px-2 py-0.5 text-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              onClick={handleNavClick}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === '/cart'
                  ? 'bg-accent/10 text-accent'
                  : 'text-text-secondary hover:bg-bg-tertiary hover:text-text'
              }`}
            >
              Cart
              {count > 0 && (
                <span className="bg-accent text-accent-text rounded-full px-2 py-0.5 text-xs">
                  {count}
                </span>
              )}
            </Link>
          </div>

          <div className="border-border border-t px-4 py-4">
            <button
              onClick={toggle}
              className="text-text-secondary hover:text-text flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
            >
              {theme === 'light' ? (
                <>
                  <Moon size={18} /> Dark mode
                </>
              ) : (
                <>
                  <Sun size={18} /> Light mode
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
