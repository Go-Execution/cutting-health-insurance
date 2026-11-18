export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      data-agent="about-section"
      className="bg-white py-14 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm font-medium text-ink">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full bg-accent"
          />
          <span>About David Cutting Insurance Services</span>
        </div>

        <h2
          id="about-heading"
          className="mt-6 max-w-4xl text-2xl font-medium tracking-tight text-ink leading-[1.24] sm:text-4xl lg:text-[42px]"
        >
          As an independent California insurance broker, not a single insurance
          company, we compare multiple carriers to protect your auto, home,
          business, and health care.
        </h2>

        <div className="mt-10 grid max-w-4xl grid-cols-1 gap-8 border-t border-border-subtle pt-8 md:grid-cols-2 md:gap-12">
          <p className="text-base leading-relaxed text-ink-muted">
            Based in Upland, California under CA Insurance License #0752131,
            David Cutting Insurance Services works for you rather than one
            carrier. We start with your primary auto and homeowners protection,
            review commercial coverage for local businesses, and help align
            health care plans when needed.
          </p>
          <p className="text-base leading-relaxed text-ink-muted">
            Instead of navigating call centers or guessing at policy limits on
            your own, you get clear side-by-side comparisons, straightforward
            answers on deductibles and liability, and local service Monday
            through Friday.
          </p>
        </div>
      </div>
    </section>
  );
}
