import { Helmet } from 'react-helmet-async';
import { HomeSection } from '@/widgets/home-section';
import { Reviews } from '@/widgets/reviews-section';
import { ProductSection } from '@/widgets/selling';
import { mockProducts } from '@entities/product';

export function HomePage() {
  return (
    <div>
      <Helmet>
        <title>YaneSHOP</title>
        <meta
          name="description"
          content="Shop unique hoodies, t-shirts, jackets and more at YaneSHOP. Best selling anime & meme apparel."
        />
      </Helmet>
      <HomeSection />
      <ProductSection
        id="best-selling"
        title="Best Selling"
        products={mockProducts.slice(0, 5)}
      />
      <ProductSection
        id="new-arrivals"
        title="New Arrivals"
        products={mockProducts.slice(5, 10)}
      />
      <Reviews />
    </div>
  );
}
