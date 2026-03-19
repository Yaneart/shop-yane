import { type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel = 'Перейти в каталог',
  actionTo = '/catalog',
}: EmptyStateProps) {
  return (
    <div className="empty-fade-in flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="bg-bg-tertiary/50 flex h-24 w-24 items-center justify-center rounded-full">
        <Icon size={40} strokeWidth={1.5} className="text-text-tertiary" />
      </div>
      <h2 className="text-text text-xl font-bold sm:text-2xl">{title}</h2>
      <p className="text-text-tertiary max-w-sm text-sm sm:text-base">
        {description}
      </p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="bg-accent text-accent-text btn-press mt-2 rounded-full px-8 py-3 text-sm font-medium"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
