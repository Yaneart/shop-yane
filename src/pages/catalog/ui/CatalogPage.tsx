import { CatalogFilters } from '@/widgets/catalog-filters';
import { ProductGrid } from '@/widgets/product-grid';

export function CatalogPage() {
  return (
    <section className="flex gap-10 px-4 py-10 sm:px-8 md:px-16 md:py-16 lg:px-24 xl:px-40">
      <CatalogFilters />
      <ProductGrid />
    </section>
  );
}
