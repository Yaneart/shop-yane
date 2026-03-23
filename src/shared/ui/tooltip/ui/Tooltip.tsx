import { useState } from 'react';
import clsx from 'clsx';

interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

export function Tooltip({ text, position = 'bottom', children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          className={clsx(
            'bg-bg-secondary text-text pointer-events-none absolute z-50 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-lg',
            'animate-fade-in',
            positionClasses[position],
          )}
        >
          {text}
        </span>
      )}
    </div>
  );
}
