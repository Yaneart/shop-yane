import { ProductCard } from '@/shared/ui/product-card';
import { ProductCardSkeleton } from '@/shared/ui/skeleton';
import { Link } from 'react-router-dom';
import { useSelector } from '@app/store';
import { selectFilteredProducts } from '@features/catalog-filter';
import { useSimulatedLoading } from '@shared/hooks';
import { QuickViewModal } from '@/widgets/quick-view';
import type { Product } from '@entities/product';
import { useState } from 'react';

export function ProductGrid() {
  const products = useSelector(selectFilteredProducts);
  const isLoading = useSimulatedLoading();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  return (
    <div className="flex-1">
      <h2 className="text-text mb-8 text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
        Catalog
      </h2>

      {isLoading ? (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <li key={i}>
              <ProductCardSkeleton />
            </li>
          ))}
        </ul>
      ) : products.length === 0 ? (
        <p className="text-text-secondary py-20 text-center text-lg">
          Nothing found. Try changing the filters.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/clothes/${product.id}`}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  rating={product.rating}
                  stock={product.stock}
                  category={product.category}
                  sizes={product.sizes}
                  images={product.images}
                  onQuickView={setQuickViewProduct}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
