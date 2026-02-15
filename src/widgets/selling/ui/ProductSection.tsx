import { ProductCard } from '@/shared/ui/product-card';
import { SellingSection } from '@/shared/ui/selling-section';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
}

interface ProductSectionProps {
  id: string;
  title: string;
  products: Product[];
}

export function ProductSection({ id, title, products }: ProductSectionProps) {
  return (
    <SellingSection id={id} title={title} linkText="View All">
      <div>
        <ul className="flex items-center gap-10">
          {products.map((p) => (
            <Link key={p.id} to={`/clothes/${p.id}`}>
              <ProductCard
                id={p.id}
                name={p.name}
                image={p.image}
                price={p.price}
                oldPrice={p.oldPrice}
                rating={p.rating}
              />
            </Link>
          ))}
        </ul>
      </div>
    </SellingSection>
  );
}
