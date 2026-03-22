import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface bredCrumbsItem {
  label: string;
  to?: string;
}

interface bredCrumbsProps {
  items: bredCrumbsItem[];
}

export function BreadCrumbs({ items }: bredCrumbsProps) {
  return (
    <nav className="text-text-tertiary mb-6 flex items-center gap-1 text-sm">
      <Link to="/" className="hover:text-text transition-colors">
        Home
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4" />
          {item.to ? (
            <Link to={item.to} className="hover:text-text transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-text">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
