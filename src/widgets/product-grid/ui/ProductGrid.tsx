import { mockProducts, ProductCard } from '@/shared/ui/product-card';
import { Link } from 'react-router-dom';

export function ProductGrid() {
  return (
    <div className="flex-1">
      <h2 className="text-text mb-8 text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
        Catalog
      </h2>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:grid-cols-4">
        {mockProducts.map((product) => (
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
    </div>
  );
}
