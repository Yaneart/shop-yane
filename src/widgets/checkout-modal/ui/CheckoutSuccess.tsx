import { CheckCircle } from 'lucide-react';

interface Props {
  email: string;
  onClose: () => void;
}

export function CheckoutSuccess({ email, onClose }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
      <CheckCircle size={64} className="text-green-500" />
      <h3 className="text-text text-2xl font-bold">Order Placed!</h3>
      <p className="text-text-secondary text-sm">
        Thank you for your order. We'll send a confirmation to{' '}
        <span className="text-text font-medium">{email}</span>.
      </p>
      <button
        onClick={onClose}
        className="bg-accent text-accent-text hover:bg-accent-hover btn-press mt-2 rounded-full px-8 py-3 text-sm font-medium transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
}
