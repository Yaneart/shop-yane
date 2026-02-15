import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@app/store';
import { addToCart, selectIsInCart } from '@entities/cart';
import { mockProducts } from '@/shared/ui/product-card';
import clsx from 'clsx';

export function ProductDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const product = mockProducts.find((p) => String(p.id) === id);
  const isInCart = useSelector(selectIsInCart(product?.id ?? -1));

  if (!product) {
    return <div className="p-10 text-xl">Товар не найден</div>;
  }

  return (
    <div className="p-10">
      <h1 className="mb-6 text-3xl font-bold">{product.name}</h1>

      <img
        src={product.image}
        alt={product.name}
        className="mb-6 w-80 rounded-xl"
      />

      <p className="text-xl">${product.price}</p>

      {product.oldPrice && (
        <p className="text-gray-400 line-through">{product.oldPrice} ₽</p>
      )}

      <p className="mt-4">Рейтинг: ⭐ {product.rating}</p>

      <button
        onClick={() =>
          dispatch(
            addToCart({
              id: product.id,
              name: product.name,
              image: product.image,
              price: product.price,
              oldPrice: product.oldPrice,
            }),
          )
        }
        disabled={isInCart}
        className={clsx(
          isInCart ? 'bg-red-500' : 'bg-bg-secondary',
          'mt-2 min-w-[140px] rounded-lg px-4 py-2 text-center text-xs font-medium text-white transition-colors sm:text-sm',
        )}
      >
        {isInCart ? 'In Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
