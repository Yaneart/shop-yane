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
  stock: number;
}

interface ProductSectionProps {
  id: string;
  title: string;
  products: Product[];
}

export function ProductSection({ id, title, products }: ProductSectionProps) {
  return (
    <SellingSection id={id} title={title} linkText="View All">
      <div className="-mx-4 px-4 md:mx-0 md:px-0">
        <ul className="flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-5 lg:gap-10 [&::-webkit-scrollbar]:hidden">
          {products.map((p) => (
            <li key={p.id} className="w-40 shrink-0 sm:w-48 md:w-auto">
              <Link to={`/clothes/${p.id}`}>
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
            </li>
          ))}
        </ul>
      </div>
    </SellingSection>
  );
}
