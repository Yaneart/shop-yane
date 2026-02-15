import { Section } from '@/shared/ui/section';

export function HomeSection() {
  return (
    <Section
      id="home"
      title="Discover And Shop Fashion"
      subtitle={
        <>
          Explore, Find And Wear Unique Styles In Our Curated Clothing Store.
          Shop From Thousands Of Items And Get a{' '}
          <span className="text-accent font-semibold">$20 Welcome Bonus</span>.
        </>
      }
    >
      <div className="shrink-0 pt-6 md:pt-10 lg:pt-20">
        <div className="flex gap-3 md:gap-4">
          <a className="overflow-hidden rounded-lg">
            <picture>
              <img
                src="/hoodie1.png"
                alt="red hoodie"
                className="w-40 rounded-lg transition-transform duration-300 hover:scale-105 sm:w-48 md:w-56 lg:w-64 xl:w-80"
              />
            </picture>
          </a>

          <a className="overflow-hidden rounded-lg pt-10 sm:pt-16 md:pt-24 lg:pt-40">
            <picture>
              <img
                src="/hoodie2.png"
                alt="black hoodie"
                className="w-40 rounded-lg transition-transform duration-300 hover:scale-105 sm:w-48 md:w-56 lg:w-64 xl:w-80"
              />
            </picture>
          </a>
        </div>
      </div>
    </Section>
  );
}
