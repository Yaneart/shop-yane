import { Link } from 'react-router-dom';
import { CATEGORIES_LIST, mockProducts } from '@entities/product';
import { useFadein } from '@shared/hooks';

export function CategorySection() {
  const { ref, visible } = useFadein();

  return (
    <section className="px-4 py-10 sm:px-8 md:px-16 md:py-16 lg:px-24 xl:px-40">
      <h2 className="text-text mb-8 text-center text-2xl font-bold sm:text-3xl">
        Shop by Category
      </h2>

      <div
        ref={ref}
        className={`hero-animate grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5 ${
          visible ? 'hero-visible' : ''
        }`}
      >
        {CATEGORIES_LIST.map((cat) => {
          const count = mockProducts.filter(
            (p) => p.category === cat.categoryKey,
          ).length;

          return (
            <Link
              key={cat.slug}
              to={`/catalog/${cat.slug}`}
              className="bg-bg-secondary group relative flex h-36 items-center justify-center overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.03] sm:h-44"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="relative z-10 text-center text-white">
                <h3 className="text-lg font-bold sm:text-xl">{cat.title}</h3>
                <p className="text-xs opacity-70">{count} products</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
