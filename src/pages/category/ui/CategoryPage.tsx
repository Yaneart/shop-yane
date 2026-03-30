import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CATEGORY_MAP, mockProducts } from '@entities/product';
import type { Product } from '@entities/product';
import { BreadCrumbs } from '@/shared/ui/breadcrumbs';
import { ProductCard } from '@/shared/ui/product-card';
import { QuickViewModal } from '@/widgets/quick-view';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );
  const data = category ? CATEGORY_MAP[category] : undefined;

  if (!data) {
    return <Navigate to="/404" replace />;
  }

  const products = mockProducts.filter((p) => p.category === data.categoryKey);

  return (
    <section className="px-4 py-10 sm:px-8 md:px-16 md:py-16 lg:px-24 xl:px-40">
      <Helmet>
        <title>{data.title} — YaneSHOP</title>
        <meta name="description" content={data.description} />
      </Helmet>

      <BreadCrumbs
        items={[{ label: 'Catalog', to: '/catalog' }, { label: data.title }]}
      />

      <div className="bg-bg-secondary relative mb-10 flex h-48 items-center justify-center overflow-hidden rounded-2xl md:h-64">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-3xl font-bold md:text-5xl">{data.title}</h1>
          <p className="mt-2 text-sm opacity-80 md:text-lg">
            {data.description}
          </p>
          <p className="mt-1 text-xs opacity-60">{products.length} products</p>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link key={product.id} to={`/clothes/${product.id}`}>
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
          ))}
        </div>
      ) : (
        <p className="text-text-tertiary py-20 text-center text-lg">
          No products found in this category.
        </p>
      )}

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}
