import { useState } from 'react';
import { StarIcon } from '../../custom-icon/CustomIcons';
import clsx from 'clsx';

interface StartRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: string;
}

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = 'h-5 w-5',
}: StartRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= (hovered || value);

        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => !readonly && setHovered(starValue)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={clsx(
              size,
              'transition-colors',
              readonly ? 'cursor-default' : 'cursor-pointer',
              filled ? 'text-yellow-400' : 'text-gray-300',
            )}
          >
            <StarIcon className={size} />
          </button>
        );
      })}
    </div>
  );
}
