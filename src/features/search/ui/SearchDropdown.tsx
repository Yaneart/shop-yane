import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockProducts } from '@shared/ui/product-card/mock';

export function SearchDropdown() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results =
    query.trim().length > 0
      ? mockProducts
          .filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 5)
      : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-96">
      <div className="bg-bg-secondary border-border flex h-9 items-center gap-2 rounded-lg border px-3">
        <Search size={22} className="text-text-tertiary" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query.trim() && setOpen(true)}
          placeholder="Поиск..."
          className="text-text placeholder:text-text-tertiary w-full bg-transparent text-sm leading-none outline-none"
        />
      </div>

      {open && query.trim().length > 0 && (
        <div className="bg-bg border-border absolute top-full z-50 mt-2 w-full overflow-hidden rounded-lg border shadow-lg">
          {results.length > 0 ? (
            <ul>
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/clothes/${product.id}`}
                    onClick={() => {
                      setOpen(false);
                      setQuery('');
                    }}
                    className="hover:bg-bg-secondary flex items-center gap-3 px-3 py-2 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 rounded object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-text truncate text-sm">
                        {product.name}
                      </p>
                      <p className="text-primary text-xs font-semibold">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text-tertiary px-3 py-4 text-center text-sm">
              Ничего не найдено
            </p>
          )}
        </div>
      )}
    </div>
  );
}
