interface SellingSectionProps {
  id: string;
  title: string;
  linkText?: string;
  linkHref?: string;
  children: React.ReactNode;
  className?: string;
}

export function SellingSection({
  id,
  title,
  linkText,
  linkHref = '/catalog',
  children,
  className = '',
}: SellingSectionProps) {
  return (
    <section
      id={id}
      className={`px-4 py-10 sm:px-8 md:px-16 md:py-16 lg:px-24 xl:px-40 ${className}`}
    >
      <div className="relative mb-6 flex items-center justify-center md:mb-10">
        <h2 className="text-text text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
          {title}
        </h2>

        {linkText && (
          <a
            href={linkHref}
            className="text-text-secondary hover:text-text absolute right-0 text-sm transition-colors sm:text-base md:text-lg"
          >
            {linkText}
          </a>
        )}
      </div>

      <div className="flex items-center gap-10">
        {children}
      </div>
    </section>
  );
}
