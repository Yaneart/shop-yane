import { useSelector } from '@/app/store';
import { selectCartTotal, selectCartDiscount } from '@/entities/cart';
import { Tag } from 'lucide-react';

const DELIVERY_FEE = 5.0;
const FREE_DELIVERY_THRESHOLD = 50;

export function OrderSummary() {
  const subtotal = useSelector(selectCartTotal);
  const discount = useSelector(selectCartDiscount);

  const delivery =
    subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

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

        <form className="flex gap-2">
          <div className="border-border flex flex-1 items-center gap-2 rounded-full border px-4 py-2.5">
            <Tag size={16} className="text-text-tertiary shrink-0" />
            <input
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
        </form>

        <button className="bg-accent text-accent-text hover:bg-accent-hover w-full rounded-full py-3.5 text-sm font-medium transition-colors sm:text-base">
          Checkout
        </button>
      </div>
    </div>
  );
}
