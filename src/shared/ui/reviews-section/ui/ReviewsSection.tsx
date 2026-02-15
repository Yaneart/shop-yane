interface ReviewsSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ReviewsSection({
  id,
  title,
  children,
  className = '',
}: ReviewsSectionProps) {
  return (
    <section
      id={id}
      className={`px-4 py-10 sm:px-8 md:px-16 md:py-16 lg:px-24 xl:px-40 ${className}`}
    >
      <h2 className="text-center text-text mb-6 text-2xl font-bold sm:text-3xl md:mb-10 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4 sm:gap-6">{children}</div>
    </section>
  );
}
