import { Helmet } from 'react-helmet-async';
import { CatalogFilters } from '@/widgets/catalog-filters';
import { ProductGrid } from '@/widgets/product-grid';
import { BreadCrumbs } from '@/shared/ui/breadcrumbs';

export function CatalogPage() {
  return (
    <section className="px-4 py-10 sm:px-8 md:px-16 md:py-16 lg:px-24 xl:px-40">
      <Helmet>
        <title>Catalog — YaneSHOP</title>
        <meta
          name="description"
          content="Browse our full catalog of hoodies, t-shirts, jackets, pajamas and long-sleeves."
        />
      </Helmet>
      <BreadCrumbs items={[{ label: 'Catalog' }]} />
      <div className="flex flex-col lg:flex-row lg:gap-10">
        <CatalogFilters />
        <ProductGrid />
      </div>
    </section>
  );
}
