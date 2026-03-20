import clsx from 'clsx';
import { useRef, useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  name: string;
  discount?: number | null;
}

export function ImageGallery({ images, name, discount }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    imageRef.current.style.setProperty('--zoom-x', `${x}%`);
    imageRef.current.style.setProperty('--zoom-y', `${y}%`);
  };

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <div className="flex gap-2 sm:flex-col">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={clsx(
              'h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-20 sm:w-20',
              selectedImage === i
                ? 'border-accent'
                : 'border-border hover:border-border-hover',
            )}
          >
            <img
              src={img}
              alt={`${name} ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <div
        ref={imageRef}
        className={clsx(
          'relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl',
          isZoomed && 'cursor-zoom-out',
        )}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsZoomed((z) => !z)}
      >
        <img
          src={images[selectedImage]}
          alt={name}
          className={clsx(
            'h-full w-full object-cover transition-transform duration-300 ease-out',
            isZoomed && 'scale-200',
          )}
          style={
            isZoomed
              ? {
                  transformOrigin: 'var(--zoom-x, 50%) var(--zoom-y, 50%)',
                }
              : undefined
          }
          draggable={false}
        />
        {discount && (
          <span className="absolute top-3 left-3 rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white">
            -{discount}%
          </span>
        )}
      </div>
    </div>
  );
}
