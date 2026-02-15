import { BookOpen, Search, Sun, Moon, ShoppingBasket } from 'lucide-react';
import { useTheme } from '@shared/lib';
import { Logo } from '@shared/ui/Logo';
import { Link } from 'react-router-dom';
import { useSelector } from '@/app/store';
import { selectCartItemCount } from '@/entities/cart';

export function Header() {
  const { theme, toggle } = useTheme();
  const count = useSelector(selectCartItemCount);

  return (
    <header className="border-border bg-bg border-b">
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

        <div className="bg-bg-secondary border-border flex h-9 w-96 items-center gap-2 rounded-lg border px-3">
          <Search size={22} className="text-text-tertiary" />
          <input
            placeholder="Поиск..."
            className="text-text placeholder:text-text-tertiary w-full bg-transparent text-sm leading-none outline-none"
          />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-4">
          <Link to={'/cart'}>
            <div className="relative">
              <span className="absolute -right-3">{count}</span>
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
