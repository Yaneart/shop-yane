import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 300;
      if (show && !visible) {
        setHiding(false);
        setVisible(true);
      } else if (!show && visible) {
        setHiding(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  const handleAnimationEnd = () => {
    if (hiding) {
      setVisible(false);
      setHiding(false);
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onAnimationEnd={handleAnimationEnd}
      className="btn-icon bg-accent text-accent-text fixed right-6 bottom-20 z-50 rounded-full p-3 shadow-lg md:bottom-6"
      style={{
        animation: hiding
          ? 'scroll-top-out 0.25s ease-in forwards'
          : 'scroll-top-in 0.25s ease-out forwards',
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
