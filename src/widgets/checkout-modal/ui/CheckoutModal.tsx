import { useState } from 'react';
import { X } from 'lucide-react';
import { CheckoutForm } from './CheckoutForm';
import { CheckoutSuccess } from './CheckoutSuccess';

interface Props {
  onClose: () => void;
}

export function CheckoutModal({ onClose }: Props) {
  const [successEmail, setSuccessEmail] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="modal-backdrop absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="modal-slide bg-bg relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-2xl">
        <div className="border-border flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-text text-xl font-bold">Checkout</h2>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text btn-icon rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {successEmail ? (
          <CheckoutSuccess email={successEmail} onClose={onClose} />
        ) : (
          <CheckoutForm onSuccess={setSuccessEmail} />
        )}
      </div>
    </div>
  );
}
