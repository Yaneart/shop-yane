import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { mockProducts } from '@entities/product';
import { ProductCard } from '@/shared/ui/product-card';
import { Home, Search } from 'lucide-react';

const recommended = mockProducts.sort(() => 0.5 - Math.random()).slice(0, 4);

export function NotFoundPage() {
  return (
    <section className="page-fade-in px-4 py-16 sm:px-6 lg:px-8">
      <Helmet>
        <title>404 — Page Not Found</title>
      </Helmet>

      <div className="flex flex-col items-center text-center">
        <p className="animate-bounce-slow text-text/20 text-[10rem] leading-none font-bold select-none sm:text-[14rem]">
          404
        </p>

        <h1 className="text-text mt-2 text-2xl font-bold sm:text-3xl">
          Oops! Page not found
        </h1>

        <p className="text-text-tertiary mt-3 max-w-md text-base">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            to="/"
            className="bg-accent text-accent-text flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <Link
            to="/catalog"
            className="border-border text-text hover:bg-bg-secondary flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
          >
            <Search size={16} />
            Browse Catalog
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <h2 className="text-text mb-6 text-center text-xl font-bold">
          Maybe you'll like these
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {recommended.map((p) => (
            <Link key={p.id} to={`/clothes/${p.id}`}>
              <ProductCard
                id={p.id}
                name={p.name}
                image={p.image}
                price={p.price}
                oldPrice={p.oldPrice}
                rating={p.rating}
                stock={p.stock}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
