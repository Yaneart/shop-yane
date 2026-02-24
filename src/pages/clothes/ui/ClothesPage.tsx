import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { mockProducts } from '@entities/product';
import { ProductDetail } from '@/widgets/product-detail';

export function ClothesPage() {
  const { id } = useParams();
  const product = mockProducts.find((p) => String(p.id) === id);

  return (
    <>
      <Helmet>
        <title>
          {product ? `${product.name} — YaneSHOP` : 'Product — YaneSHOP'}
        </title>
        {product && (
          <meta
            name="description"
            content={`Buy ${product.name} for $${product.price} at YaneSHOP.`}
          />
        )}
      </Helmet>
      <ProductDetail />
    </>
  );
}
