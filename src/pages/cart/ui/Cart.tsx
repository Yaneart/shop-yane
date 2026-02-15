import { CartList } from '@/widgets/cart-list';
import { OrderSummary } from '@/widgets/order-summary';

export function CartPage() {
  return (
    <section className="px-4 py-10 sm:px-8 md:px-16 md:py-16 lg:px-24 xl:px-40">
      <h2 className="text-text mb-8 text-2xl font-bold sm:text-3xl md:text-4xl">
        Your Cart
      </h2>

      <div className="flex flex-col gap-8 lg:flex-row">
        <CartList />
        <OrderSummary />
      </div>
    </section>
  );
}
