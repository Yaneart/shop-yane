import { Skeleton } from './Skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl">
      <Skeleton className="aspect-square rounded-2xl" />
      <div className="flex w-full flex-col items-center gap-1 pt-3">
        <Skeleton className="h-4 w-3/4 sm:h-5" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-16 sm:h-6" />
        <Skeleton className="mt-2 h-9 w-[140px] rounded-lg" />
      </div>
    </div>
  );
}
