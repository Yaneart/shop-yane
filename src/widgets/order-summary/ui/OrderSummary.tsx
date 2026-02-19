import { useState } from 'react';
import { useSelector, useDispatch } from '@/app/store';
import {
  selectCartTotal,
  selectCartDiscount,
  selectPromoCode,
  selectPromoPercent,
  applyPromo,
  removePromo,
  AVAILABLE_PROMO_CODES,
} from '@/entities/cart';
import { Tag, X } from 'lucide-react';

const DELIVERY_FEE = 5.0;
const FREE_DELIVERY_THRESHOLD = 50;

export function OrderSummary() {
  const dispatch = useDispatch();
  const subtotal = useSelector(selectCartTotal);
  const discount = useSelector(selectCartDiscount);
  const promoCode = useSelector(selectPromoCode);
  const promoPercent = useSelector(selectPromoPercent);

  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const promoDiscount = promoPercent > 0 ? (subtotal * promoPercent) / 100 : 0;
  const delivery =
    subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
  const total = subtotal - promoDiscount + delivery;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const code = input.toUpperCase().trim();

    if (!code) return;

    if (code in AVAILABLE_PROMO_CODES) {
      dispatch(applyPromo(code));
      setError('');
      setInput('');
    } else {
      setError('Invalid promo code');
    }
  };

  const handleRemove = () => {
    dispatch(removePromo());
    setError('');
  };

  return (
    <div className="w-full lg:w-96">
      <div className="border-border flex flex-col gap-5 rounded-2xl border p-5 sm:p-6">
        <h3 className="text-text text-lg font-bold sm:text-xl">
          Order Summary
        </h3>

        <div className="flex flex-col gap-3">
          <p className="text-text-secondary flex justify-between text-sm sm:text-base">
            Subtotal
            <span className="text-text font-medium">
              ${subtotal.toFixed(2)}
            </span>
          </p>
          <p className="text-text-secondary flex justify-between text-sm sm:text-base">
            Discount
            <span className="font-medium text-red-500">
              -${discount.toFixed(2)}
            </span>
          </p>
          {promoDiscount > 0 && (
            <p className="text-text-secondary flex justify-between text-sm sm:text-base">
              Promo ({promoCode} &minus;{promoPercent}%)
              <span className="font-medium text-red-500">
                -${promoDiscount.toFixed(2)}
              </span>
            </p>
          )}
          <p className="text-text-secondary flex justify-between text-sm sm:text-base">
            Delivery Fee
            <span className="text-text font-medium">
              {delivery === 0 && subtotal > 0
                ? 'Free'
                : `$${delivery.toFixed(2)}`}
            </span>
          </p>
        </div>

        <hr className="border-border" />

        <p className="text-text flex justify-between text-base font-bold sm:text-lg">
          Total
          <span className="font-medium text-green-600">
            ${total.toFixed(2)}
          </span>
        </p>

        {promoCode ? (
          <div className="bg-accent/10 flex items-center justify-between rounded-full px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-accent" />
              <span className="text-accent text-sm font-medium">
                {promoCode} &minus;{promoPercent}%
              </span>
            </div>
            <button
              onClick={handleRemove}
              className="text-text-tertiary hover:text-text transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex flex-col gap-1.5">
            <div className="flex gap-2">
              <div className="border-border flex flex-1 items-center gap-2 rounded-full border px-4 py-2.5">
                <Tag size={16} className="text-text-tertiary shrink-0" />
                <input
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Add promo code"
                  className="text-text placeholder:text-text-tertiary w-full bg-transparent text-sm outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-accent text-accent-text hover:bg-accent-hover shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
              >
                Apply
              </button>
            </div>
            {error && (
              <p className="px-4 text-xs text-red-500">{error}</p>
            )}
          </form>
        )}

        <button className="bg-accent text-accent-text hover:bg-accent-hover w-full rounded-full py-3.5 text-sm font-medium transition-colors sm:text-base">
          Checkout
        </button>
      </div>
    </div>
  );
}
