import { Section } from '@/shared/ui/section';

export function HomeSection() {
  return (
    <Section
      id="home"
      title="Discover And Shop Fashion"
      className="min-h-[70vh] flex items-center"
      subtitle={
        <>
          Explore, Find And Wear Unique Styles In Our Curated Clothing Store.
          Shop From Thousands Of Items And Get a{' '}
          <span className="text-accent font-semibold">$20 Welcome Bonus</span>.
        </>
      }
    >
      <div className="hidden shrink-0 pt-6 sm:block md:pt-10 lg:pt-20">
        <div className="flex gap-3 md:gap-4">
          <a className="overflow-hidden rounded-lg">
            <picture>
              <img
                src="/hoodie1.png"
                alt="red hoodie"
                className="w-56 rounded-lg transition-transform duration-300 hover:scale-105 md:w-64 lg:w-80 xl:w-[28rem]"
              />
            </picture>
          </a>

          <a className="overflow-hidden rounded-lg pt-16 md:pt-24 lg:pt-40">
            <picture>
              <img
                src="/hoodie2.png"
                alt="black hoodie"
                className="w-56 rounded-lg transition-transform duration-300 hover:scale-105 md:w-64 lg:w-80 xl:w-[28rem]"
              />
            </picture>
          </a>
        </div>
      </div>
    </Section>
  );
}
