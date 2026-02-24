import { Helmet } from 'react-helmet-async';
import { CatalogFilters } from '@/widgets/catalog-filters';
import { ProductGrid } from '@/widgets/product-grid';

export function CatalogPage() {
  return (
    <section className="flex gap-10 px-4 py-10 sm:px-8 md:px-16 md:py-16 lg:px-24 xl:px-40">
      <Helmet>
        <title>Catalog — YaneSHOP</title>
        <meta
          name="description"
          content="Browse our full catalog of hoodies, t-shirts, jackets, pajamas and long-sleeves."
        />
      </Helmet>
      <CatalogFilters />
      <ProductGrid />
    </section>
  );
}
