import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx('bg-bg-secondary animate-pulse rounded-lg', className)}
    />
  );
}
