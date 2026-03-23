import { StarRating } from '../../star-rating';

interface ReviewCardProps {
  name: string;
  rating: number;
  text: string;
}

export function ReviewCard({ name, rating, text }: ReviewCardProps) {
  return (
    <div className="border-border flex h-full flex-col gap-3 rounded-2xl border p-5 sm:p-6">
      <div className="flex items-center gap-0.5">
        <StarRating value={rating} readonly />
        <span className="text-text-tertiary ml-1 text-xs sm:text-sm">
          {rating}/5
        </span>
      </div>

      <p className="text-text-secondary flex-1 text-sm leading-relaxed sm:text-base">
        "{text}"
      </p>

      <span className="text-text text-sm font-semibold sm:text-base">
        {name}
      </span>
    </div>
  );
}
