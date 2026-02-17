import { Link } from 'react-router-dom';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-4 py-10 sm:px-8 md:px-16 md:py-16 lg:px-24 xl:px-40 ${className}`}
    >
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
        <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:gap-4 lg:text-left">
          <h2 className="text-text text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-9xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-text-secondary max-w-2xl text-sm sm:text-base lg:text-lg">
              {subtitle}
            </p>
          )}
          <div className="flex items-center gap-4 self-center lg:self-start">
            <Link to={'/catalog'}>
              <button className="bg-accent text-accent-text hover:bg-accent-hover rounded-2xl px-5 py-2.5 text-sm font-semibold transition-transform duration-200 ease-in-out hover:scale-110 sm:px-6 sm:py-3 sm:text-base md:text-lg">
                shop now
              </button>
            </Link>
            <Link to={'/cart'}>
              <button className="bg-accent-text text-accent border-border hover:border-border-hover rounded-2xl border px-5 py-2.5 text-sm font-semibold transition-transform duration-200 ease-in-out hover:scale-110 sm:px-6 sm:py-3 sm:text-base md:text-lg">
                checkout
              </button>
            </Link>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
