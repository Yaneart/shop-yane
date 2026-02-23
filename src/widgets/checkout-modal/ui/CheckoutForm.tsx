import { useState } from 'react';
import { useDispatch, useSelector } from '@/app/store';
import {
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartDiscount,
  selectPromoCode,
  selectPromoPercent,
} from '@/entities/cart';

const DELIVERY_FEE = 5.0;
const FREE_DELIVERY_THRESHOLD = 50;

interface Props {
  onSuccess: (email: string) => void;
}

const inputCls = (error?: string) =>
  `w-full rounded-xl border px-4 py-2.5 text-sm bg-transparent text-text outline-none transition-colors placeholder:text-text-tertiary ${
    error
      ? 'border-red-500 focus:border-red-500'
      : 'border-border focus:border-accent'
  }`;

export function CheckoutForm({ onSuccess }: Props) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const discount = useSelector(selectCartDiscount);
  const promoCode = useSelector(selectPromoCode);
  const promoPercent = useSelector(selectPromoPercent);

  const promoDiscount = promoPercent > 0 ? (subtotal * promoPercent) / 100 : 0;
  const delivery =
    subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
  const total = subtotal - promoDiscount + delivery;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    payment: 'card',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.zip.trim()) e.zip = 'Required';
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    dispatch(clearCart());
    onSuccess(form.email);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col overflow-y-auto">
      <div className="flex flex-col gap-6 px-6 py-5">
        <section>
          <h3 className="text-text mb-3 text-sm font-semibold tracking-wider uppercase">
            Contact Info
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className={inputCls(errors.name)}
              />
              {errors.name && (
                <p className="mt-1 px-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={inputCls(errors.email)}
              />
              {errors.email && (
                <p className="mt-1 px-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className={inputCls(errors.phone)}
              />
              {errors.phone && (
                <p className="mt-1 px-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-text mb-3 text-sm font-semibold tracking-wider uppercase">
            Delivery Address
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street address"
                className={inputCls(errors.address)}
              />
              {errors.address && (
                <p className="mt-1 px-1 text-xs text-red-500">
                  {errors.address}
                </p>
              )}
            </div>
            <div>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className={inputCls(errors.city)}
              />
              {errors.city && (
                <p className="mt-1 px-1 text-xs text-red-500">{errors.city}</p>
              )}
            </div>
            <div>
              <input
                name="zip"
                value={form.zip}
                onChange={handleChange}
                placeholder="ZIP / Postal code"
                className={inputCls(errors.zip)}
              />
              {errors.zip && (
                <p className="mt-1 px-1 text-xs text-red-500">{errors.zip}</p>
              )}
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-text mb-3 text-sm font-semibold tracking-wider uppercase">
            Payment
          </h3>
          <div className="flex gap-3">
            {(['card', 'cash'] as const).map((method) => (
              <label
                key={method}
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  form.payment === method
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border text-text-secondary hover:border-accent/50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={form.payment === method}
                  onChange={handleChange}
                  className="sr-only"
                />
                {method === 'card' ? 'Credit Card' : 'Cash on Delivery'}
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-text mb-3 text-sm font-semibold tracking-wider uppercase">
            Your Order ({items.length} item{items.length !== 1 ? 's' : ''})
          </h3>
          <div className="border-border flex flex-col gap-2 rounded-xl border p-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-text-secondary">
                  {item.name}
                  {item.size ? ` / ${item.size}` : ''} × {item.quantity}
                </span>
                <span className="text-text font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <hr className="border-border my-1" />
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Discount</span>
                <span className="font-medium text-red-500">
                  -${discount.toFixed(2)}
                </span>
              </div>
            )}
            {promoDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Promo ({promoCode})</span>
                <span className="font-medium text-red-500">
                  -${promoDiscount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Delivery</span>
              <span className="text-text font-medium">
                {delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold">
              <span className="text-text">Total</span>
              <span className="text-green-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </div>

      <div className="border-border border-t px-6 py-4">
        <button
          type="submit"
          className="bg-accent text-accent-text hover:bg-accent-hover w-full rounded-full py-3.5 text-sm font-medium transition-colors sm:text-base"
        >
          Place Order — ${total.toFixed(2)}
        </button>
      </div>
    </form>
  );
}
