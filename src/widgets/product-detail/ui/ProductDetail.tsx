import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@app/store';
import { addToCart, removeFromCart, selectIsInCart } from '@entities/cart';
import { mockProducts } from '@/shared/ui/product-card';
import clsx from 'clsx';
import { StarIcon } from '@/shared/ui/custom-icon/CustomIcons';
import {
  ChevronRight,
  Minus,
  Plus,
  Undo2,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

export function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = mockProducts.find((p) => String(p.id) === id);
  const isInCart = useSelector(selectIsInCart(product?.id ?? -1));

  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-text-secondary text-xl">Товар не найден</p>
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const images = [product.image, product.image, product.image];

  const handleCartToggle = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
      toast('Удалено из корзины!');
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
        toast.success('Добавлено в корзину!')
      );
    }
  };

  return (
    <section className="px-4 py-10 sm:px-8 md:px-16 md:py-16 lg:px-24 xl:px-40">
      <nav className="text-text-tertiary mb-6 flex items-center gap-1 text-sm">
        <Link to="/" className="hover:text-text transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/catalog" className="hover:text-text transition-colors">
          Catalog
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-text">{product.name}</span>
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-5">
        <div className="flex flex-col-reverse gap-3 sm:flex-row lg:w-1/2">
          <div className="flex gap-2 sm:flex-col">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={clsx(
                  'h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-20 sm:w-20',
                  selectedImage === i
                    ? 'border-accent'
                    : 'border-border hover:border-border-hover',
                )}
              >
                <img
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {discount && (
              <span className="absolute top-3 left-3 rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:w-1/2">
          <div>
            <h1 className="text-text mb-3 text-2xl font-bold sm:text-3xl">
              {product.name}
            </h1>

            <div className="mb-4 flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  key={i}
                  className={clsx(
                    'h-5 w-5',
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

            <p className="text-text-secondary leading-relaxed">
              Brave the elements in style with our durable and weather-resistant
              jacket. Designed for both function and fashion, it keeps you warm
              without compromising on looks.
            </p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-text text-3xl font-bold">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="text-text-tertiary text-lg line-through">
                ${product.oldPrice}
              </span>
            )}
            {discount && (
              <span className="rounded-lg bg-red-500/10 px-2 py-0.5 text-sm font-semibold text-red-500">
                -{discount}%
              </span>
            )}
          </div>

          <hr className="border-border" />

          <div>
            <p className="text-text mb-3 font-medium">Choose Size</p>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={clsx(
                    'rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors',
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

          <hr className="border-border" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="border-border flex items-center gap-4 rounded-full border px-4 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-text-secondary hover:text-text transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-text w-8 text-center font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-text-secondary hover:text-text transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleCartToggle}
              className={clsx(
                'flex-1 rounded-full px-8 py-3 font-medium transition-colors',
                isInCart
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-accent text-accent-text hover:bg-accent-hover',
              )}
            >
              {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
          </div>

          <div className="border-border flex flex-col gap-3 rounded-2xl border p-4">
            <div className="flex items-center gap-3">
              <Undo2 className="text-text-secondary h-5 w-5" />
              <span className="text-text text-sm">Free 10-day returns</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="text-text-secondary h-5 w-5" />
              <span className="text-text text-sm">
                Free shipping on orders over $100
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-text-secondary h-5 w-5" />
              <span className="text-text text-sm">
                1-year quality guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
