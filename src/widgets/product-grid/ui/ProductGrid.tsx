import { ProductCard } from '@/shared/ui/product-card';
import { Link } from 'react-router-dom';
import { useSelector } from '@app/store';
import { selectFilteredProducts } from '@features/catalo-filter';

export function ProductGrid() {
  const products = useSelector(selectFilteredProducts);

  return (
    <div className="flex-1">
      <h2 className="text-text mb-8 text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
        Catalog
      </h2>

      {products.length === 0 ? (
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
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
