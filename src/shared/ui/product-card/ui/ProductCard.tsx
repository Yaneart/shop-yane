import { useDispatch, useSelector } from '@app/store';
import { addToCart, removeFromCart, selectIsInCart } from '@entities/cart';
import { StarIcon } from '../../custom-icon/CustomIcons';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
}

export function ProductCard({
  id,
  name,
  image,
  price,
  oldPrice,
  rating,
}: ProductCardProps) {
  const dispatch = useDispatch();
  const isInCart = useSelector(selectIsInCart(id));

  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      dispatch(removeFromCart(id));
      toast.success('Удалено из корзины!');
    } else {
      dispatch(addToCart({ id, name, image, price, oldPrice }));
      toast.success('Добавлено в корзину!');
    }
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount && (
          <span className="absolute top-2 left-2 rounded-lg bg-red-500 px-2 py-0.5 text-xs font-semibold text-white sm:text-sm">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex w-full flex-col gap-1 pt-3">
        <h3 className="text-text self-center text-sm font-medium sm:text-base">
          {name}
        </h3>

        <div className="flex items-center gap-0.5 self-center">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
          ))}
          <span className="text-text-tertiary ml-1 text-xs sm:text-sm">
            {rating}/5
          </span>
        </div>

        <div className="flex items-center gap-2 self-center">
          <span className="text-text text-sm font-bold sm:text-base md:text-lg">
            ${price}
          </span>
          {oldPrice && (
            <span className="text-text-tertiary text-xs line-through sm:text-sm">
              ${oldPrice}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className={clsx(
            isInCart ? 'bg-red-500' : 'bg-bg-secondary',
            'mt-2 min-w-[140px] self-center rounded-lg px-4 py-2 text-center text-xs font-medium text-white transition-colors sm:text-sm',
          )}
        >
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
