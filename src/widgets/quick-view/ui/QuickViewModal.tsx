import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from '@app/store';
import { addToCart, removeFromCart, selectIsInCart } from '@entities/cart';
import { toggleWishlist, selectIsInWishlist } from '@entities/wishlist';
import { StarIcon } from '@/shared/ui/custom-icon/CustomIcons';
import {
  X,
  Minus,
  Plus,
  Heart,
  ExternalLink,
  Undo2,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import type { Product } from '@entities/product';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const dispatch = useDispatch();
  const isInCart = useSelector(selectIsInCart(product.id));
  const isInWishlist = useSelector(selectIsInWishlist(product.id));

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[1] ?? product.sizes[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [cartPop, setCartPop] = useState(false);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleCartToggle = () => {
    setCartPop(true);
    if (isInCart) {
      dispatch(removeFromCart(product.id));
      toast.success('Removed from cart!');
    } else {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          oldPrice: product.oldPrice,
          quantity,
          size: selectedSize,
        }),
      );
      toast.success('Added to cart!');
    }
  };

  const handleToggleWishlist = () => {
    dispatch(
      toggleWishlist({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        oldPrice: product.oldPrice,
        rating: product.rating,
      }),
    );
    toast.success(
      isInWishlist ? 'Удалено из избранного!' : 'Добавлено в избранное!',
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="modal-backdrop absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="modal-slide bg-bg relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl shadow-2xl">
        <div className="border-border flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-text text-lg font-bold">Quick View</h2>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text btn-icon rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-6 overflow-y-auto p-6 md:flex-row md:gap-8">
          <div className="relative flex-shrink-0 md:w-1/2">
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {discount && (
              <span className="absolute top-3 left-3 rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                -{discount}%
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4 md:w-1/2">
            <div>
              <h3 className="text-text text-xl font-bold sm:text-2xl">
                {product.name}
              </h3>

              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon
                    key={i}
                    className={clsx(
                      'h-4 w-4',
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300',
                    )}
                  />
                ))}
                <span className="text-text-tertiary ml-1 text-sm">
                  {product.rating}/5
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-text text-2xl font-bold">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-text-tertiary text-base line-through">
                  ${product.oldPrice}
                </span>
              )}
              {discount && (
                <span className="rounded-lg bg-red-500/10 px-2 py-0.5 text-sm font-semibold text-red-500">
                  -{discount}%
                </span>
              )}
            </div>

            <p className="text-text-secondary text-sm leading-relaxed">
              Premium quality {product.category.toLowerCase()} designed for
              comfort and style. Available in multiple sizes.
            </p>

            <hr className="border-border" />

            <div>
              <p className="text-text mb-2 text-sm font-medium">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={clsx(
                      'btn-press rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                      selectedSize === size
                        ? 'bg-accent text-accent-text border-transparent'
                        : 'border-border text-text hover:border-border-hover',
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="border-border flex items-center gap-3 rounded-full border px-3 py-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-text-secondary hover:text-text btn-icon"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-text w-6 text-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-text-secondary hover:text-text btn-icon"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleCartToggle}
                onAnimationEnd={() => setCartPop(false)}
                disabled={product.stock === 0}
                className={clsx(
                  'btn-press btn-ripple flex-1 rounded-full px-6 py-2.5 text-sm font-medium',
                  product.stock === 0
                    ? 'cursor-not-allowed bg-gray-400 text-white opacity-50'
                    : isInCart
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-accent text-accent-text hover:bg-accent-hover',
                  cartPop && 'add-cart-pop',
                )}
              >
                {product.stock === 0
                  ? 'Out of Stock'
                  : isInCart
                    ? 'Remove from Cart'
                    : 'Add to Cart'}
              </button>

              <button
                onClick={handleToggleWishlist}
                className="btn-icon border-border hover:border-border-hover rounded-full border p-2.5 transition-colors"
                aria-label={
                  isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
                }
              >
                <Heart
                  size={18}
                  className={clsx(
                    'transition-colors',
                    isInWishlist
                      ? 'fill-red-500 text-red-500'
                      : 'text-text-secondary',
                  )}
                />
              </button>
            </div>

            <div className="border-border flex flex-wrap gap-x-4 gap-y-2 rounded-xl border p-3 text-xs">
              <div className="flex items-center gap-1.5">
                <Undo2 className="text-text-secondary h-3.5 w-3.5" />
                <span className="text-text">Free returns</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="text-text-secondary h-3.5 w-3.5" />
                <span className="text-text">Free shipping $100+</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="text-text-secondary h-3.5 w-3.5" />
                <span className="text-text">1-year guarantee</span>
              </div>
            </div>

            <Link
              to={`/clothes/${product.id}`}
              onClick={onClose}
              className="text-accent hover:text-accent-hover flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              View Full Details
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
