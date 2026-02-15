import { useSelector, useDispatch } from '@app/store';
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
} from '@entities/cart';

export function CartList() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col gap-4">
        <div className="border-border rounded-2xl border p-4 sm:p-6">
          <p className="text-text-tertiary py-10 text-center text-lg">
            Your cart is empty
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="border-border flex items-center gap-4 rounded-2xl border p-4 sm:p-6"
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-20 w-20 rounded-lg object-cover"
          />
          <div className="flex flex-1 flex-col gap-1">
            <p className="font-medium">{item.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-text-secondary text-sm">${item.price}</p>
              {item.oldPrice && (
                <>
                  <p className="text-text-tertiary text-xs line-through">
                    ${item.oldPrice}
                  </p>
                  <span className="rounded bg-bg-tertiary px-1.5 py-0.5 text-xs font-semibold text-red-500">
                    -
                    {Math.round(
                      ((item.oldPrice - item.price) / item.oldPrice) * 100,
                    )}
                    %
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    quantity: item.quantity - 1,
                  }),
                )
              }
              className="border-border rounded-lg border px-3 py-1"
            >
              −
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    quantity: item.quantity + 1,
                  }),
                )
              }
              className="border-border rounded-lg border px-3 py-1"
            >
              +
            </button>
          </div>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-text-tertiary hover:text-red-500"
          >
            ✕
          </button>
        </div>
      ))}

      <div className="border-border rounded-2xl border p-4 sm:p-6">
        <p className="text-right text-lg font-semibold">
          Total: ${total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
