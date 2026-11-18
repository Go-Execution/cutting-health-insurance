import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { HEALTH_FAQS } from "@/data/healthPlans";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      data-agent="faq-accordion"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2
              id="faq-heading"
              className="text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              Common questions about California health plans.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Plain answers on broker fees, doctor networks, Medicare timing,
              and Special Enrollment rules.
            </p>
          </div>

          <div className="space-y-3 lg:col-span-8">
            {HEALTH_FAQS.map((item) => (
              <details
                key={item.id}
                className="faq-details rounded-2xl border border-border-subtle bg-surface shadow-xs transition-colors hover:border-ink-muted/40"
              >
                <summary className="flex min-h-[60px] cursor-pointer items-center justify-between gap-4 rounded-2xl px-6 py-4 text-left text-base font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:text-lg">
                  <span>{item.question}</span>
                  <CaretDown
                    size={20}
                    weight="bold"
                    className="faq-chevron shrink-0 text-accent"
                    aria-hidden="true"
                  />
                </summary>
                <div className="border-t border-border-subtle/70 px-6 pt-4 pb-6 text-base leading-relaxed text-ink-muted">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
