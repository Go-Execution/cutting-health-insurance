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
          <span>About David Cutting</span>
        </div>

        <h2
          id="about-heading"
          className="mt-6 max-w-4xl text-2xl font-medium tracking-tight text-ink leading-[1.24] sm:text-4xl lg:text-[42px]"
        >
          We understand that choosing the right health insurance can feel
          overwhelming, which is why we are dedicated to making the process
          simple, transparent, and tailored to your unique needs.
        </h2>

        <div className="mt-10 grid max-w-4xl grid-cols-1 gap-8 border-t border-border-subtle pt-8 md:grid-cols-2 md:gap-12">
          <p className="text-base leading-relaxed text-ink-muted">
            At David Cutting Insurance Services in Upland, California, we
            believe everyone deserves access to clear health coverage without
            confusing fine print. We sit down with you to compare real plan
            tradeoffs and match coverage to your budget.
          </p>
          <p className="text-base leading-relaxed text-ink-muted">
            Whether you are reviewing Covered California options, turning 65
            and sorting through Medicare, or setting up benefits for a small
            local team, we check your doctors and prescriptions before you
            enroll.
          </p>
        </div>
      </div>
    </section>
  );
}
