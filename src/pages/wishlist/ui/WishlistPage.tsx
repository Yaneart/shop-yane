import { Helmet } from 'react-helmet-async';
import { useSelector } from '@app/store';
import { selectWishlistItems } from '@entities/wishlist';
import { ProductCard } from '@shared/ui/product-card';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function WishlistPage() {
  const items = useSelector(selectWishlistItems);

  if (items.length === 0) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <Helmet>
          <title>Wishlist — YaneSHOP</title>
        </Helmet>
        <Heart size={64} className="text-text/20" />
        <h1 className="text-text text-2xl font-bold">Избранное пусто</h1>
        <p className="text-text-tertiary max-w-sm text-base">
          Добавляйте товары в избранное, нажимая на сердечко на карточке.
        </p>
        <Link
          to="/catalog"
          className="bg-accent text-accent-text mt-4 rounded-full px-8 py-3 text-sm font-medium transition-opacity hover:opacity-80"
        >
          Перейти в каталог
        </Link>
      </section>
    );
  }

  return (
    <section className="px-4 py-10 sm:px-8 lg:px-16">
      <Helmet>
        <title>Wishlist ({items.length}) — YaneSHOP</title>
      </Helmet>
      <h1 className="text-text mb-8 text-2xl font-bold sm:text-3xl">
        Избранное
        <span className="text-text-tertiary ml-2 text-lg font-normal">
          ({items.length})
        </span>
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item) => (
          <Link key={item.id} to={`/clothes/${item.id}`}>
            <ProductCard {...item} />
          </Link>
        ))}
      </div>
    </section>
  );
}
