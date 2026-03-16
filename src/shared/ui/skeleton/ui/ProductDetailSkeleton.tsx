import { Skeleton } from './Skeleton';

export function ProductDetailSkeleton() {
  return (
    <section className="px-4 py-10 sm:px-8 md:px-16 md:py-16 lg:px-24 xl:px-40">
      <Skeleton className="mb-6 h-4 w-48" />

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-5">
        <div className="flex flex-col-reverse gap-3 sm:flex-row lg:w-1/2">
          <div className="flex gap-2 sm:flex-col">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton
                key={i}
                className="h-16 w-16 flex-shrink-0 rounded-lg sm:h-20 sm:w-20"
              />
            ))}
          </div>
          <Skeleton className="aspect-square w-full rounded-2xl" />
        </div>

        <div className="flex flex-col gap-6 lg:w-1/2">
          <div>
            <Skeleton className="mb-3 h-8 w-3/4 sm:h-9" />
            <Skeleton className="mb-4 h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </div>

          <Skeleton className="h-9 w-40" />

          <hr className="border-border" />

          <div>
            <Skeleton className="mb-3 h-5 w-24" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-10 w-14 rounded-lg" />
              ))}
            </div>
          </div>

          <hr className="border-border" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Skeleton className="h-11 w-32 rounded-full" />
            <Skeleton className="h-12 flex-1 rounded-full" />
          </div>

          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
