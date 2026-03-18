import { RouterProvider } from 'react-router-dom';
import { router } from './providers';
import './styles/index.css';
import { Toaster, ToastBar } from 'react-hot-toast';

const toastOptions = {
  duration: 2500,
  style: {
    background: 'var(--bg-tertiary)',
    color: 'var(--text)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    padding: '10px 16px',
    fontSize: '13px',
    fontFamily: 'Sora, sans-serif',
    fontWeight: 500,
    boxShadow: '0 4px 24px var(--shadow)',
  },
  success: {
    iconTheme: {
      primary: 'var(--accent)',
      secondary: 'var(--bg-tertiary)',
    },
  },
  error: {
    iconTheme: {
      primary: '#ef4444',
      secondary: 'var(--bg-tertiary)',
    },
  },
};

export function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-center" gutter={8} toastOptions={toastOptions}>
        {(t) => (
          <div
            style={{
              animation: t.visible
                ? 'toast-slide-in 0.35s ease-out'
                : 'toast-slide-out 0.3s ease-in forwards',
            }}
          >
            <ToastBar toast={t} style={{ ...t.style, animation: 'none' }} />
          </div>
        )}
      </Toaster>
    </div>
  );
}
