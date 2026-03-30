import { useDispatch, useSelector } from '@app/store';
import { addToCart, removeFromCart, selectIsInCart } from '@entities/cart';
import { toggleWishlist, selectIsInWishlist } from '@entities/wishlist';
import { StarIcon } from '../../custom-icon/CustomIcons';
import { Heart, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';
import { useState } from 'react';
import type { Product } from '@entities/product';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  stock?: number;
  onQuickView?: (product: Product) => void;
  category?: string;
  sizes?: string[];
  images?: string[];
}

export function ProductCard({
  id,
  name,
  image,
  images,
  price,
  oldPrice,
  rating,
  stock = 99,
  onQuickView,
  category = '',
  sizes = [],
}: ProductCardProps) {
  const dispatch = useDispatch();
  const isInCart = useSelector(selectIsInCart(id));
  const isInWishlist = useSelector(selectIsInWishlist(id));
  const [cartPop, setCartPop] = useState(false);

  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : null;

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist({ id, name, image, price, oldPrice, rating }));
    toast.success(
      isInWishlist ? 'Удалено из избранного!' : 'Добавлено в избранное!',
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCartPop(true);
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
        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          <button
            onClick={handleToggleWishlist}
            className="btn-icon rounded-full p-1.5 backdrop-blur-sm"
            aria-label={
              isInWishlist ? 'Удалить из избранного' : 'В избранное'
            }
          >
            <Heart
              size={18}
              className={clsx(
                'transition-colors',
                isInWishlist
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-400',
              )}
            />
          </button>
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView({
                  id,
                  name,
                  image,
                  images,
                  price,
                  oldPrice,
                  rating,
                  stock,
                  category,
                  sizes,
                });
              }}
              className="btn-icon rounded-full p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
              aria-label="Quick view"
            >
              <Eye size={18} className="text-gray-400" />
            </button>
          )}
        </div>
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

        <span
          className={clsx(
            'self-center text-xs',
            stock === 0
              ? 'font-semibold text-red-500'
              : stock <= 3
                ? 'text-orange-500'
                : 'text-text-tertiary',
          )}
        >
          {stock === 0 ? 'Нет в наличии' : `В наличии: ${stock} шт`}
        </span>

        <button
          onClick={handleAddToCart}
          onAnimationEnd={() => setCartPop(false)}
          disabled={stock === 0}
          className={clsx(
            stock === 0
              ? 'cursor-not-allowed bg-gray-400 opacity-50'
              : isInCart
                ? 'bg-red-500'
                : 'bg-bg-secondary',
            'btn-press btn-ripple mt-2 min-w-[140px] self-center rounded-lg px-4 py-2 text-center text-xs font-medium text-white sm:text-sm',
            cartPop && 'add-cart-pop',
          )}
        >
          {stock === 0 ? 'Out of Stock' : isInCart ? 'In Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
