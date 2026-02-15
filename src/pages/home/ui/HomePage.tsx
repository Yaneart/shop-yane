import { HomeSection } from '@/widgets/home-section';
import { Reviews } from '@/widgets/reviews-section';
import { ProductSection } from '@/widgets/selling';
import { mockProducts } from '@/shared/ui/product-card';

export function HomePage() {
  return (
    <div>
      <HomeSection />
      <ProductSection id="best-selling" title="Best Selling" products={mockProducts.slice(0, 5)} />
      <ProductSection id="new-arrivals" title="New Arrivals" products={mockProducts.slice(5, 10)} />
      <Reviews />
    </div>
  );
}
