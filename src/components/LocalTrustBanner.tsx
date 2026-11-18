import {
  ArrowUpRight,
  Car,
  CreditCard,
  PhoneCall,
  Quotes,
  Star,
  Wheelchair,
} from "@phosphor-icons/react/dist/ssr";

const OFFICE_AMENITIES = [
  { icon: PhoneCall, label: "In person or by phone" },
  { icon: Wheelchair, label: "Wheelchair accessible" },
  { icon: Car, label: "Parking available" },
  { icon: CreditCard, label: "Cards accepted" },
] as const;

export function LocalTrustBanner() {
  return (
    <section
      aria-labelledby="review-heading"
      data-agent="local-trust"
      className="border-y border-border-subtle bg-surface py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-border-subtle bg-canvas p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-accent" aria-label="5 out of 5 stars">
                <Star size={18} weight="fill" aria-hidden="true" />
                <Star size={18} weight="fill" aria-hidden="true" />
                <Star size={18} weight="fill" aria-hidden="true" />
                <Star size={18} weight="fill" aria-hidden="true" />
                <Star size={18} weight="fill" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs font-medium text-ink-muted uppercase">
                Google review
              </span>
            </div>

            <blockquote
              id="review-heading"
              className="mt-5 flex items-start gap-3 text-xl font-semibold tracking-tight text-ink leading-snug sm:text-2xl"
            >
              <Quotes
                size={28}
                weight="fill"
                className="mt-0.5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <span>
                “Very friendly customer service, fast and best prices possible!
                I have referred friends to David Cutting Insurance.”
              </span>
            </blockquote>

            <p className="mt-4 pl-10 text-sm font-medium text-ink-muted">
              Rachelle Fielding
            </p>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 border-t border-border-subtle pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <p className="text-sm leading-relaxed text-ink-muted">
              Local service in Upland remembered for being personal, quick, and
              straightforward.
            </p>
            <a
              href="https://david-cutting-insurance-services.ueniweb.com/reviews"
              target="_blank"
              rel="noopener noreferrer"
              data-agent="public-reviews-link"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border-subtle bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-150 hover:bg-surface-soft hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span>Read 4 public reviews</span>
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <ul
          aria-label="Upland office amenities"
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {OFFICE_AMENITIES.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                className="flex items-center gap-2.5 rounded-2xl border border-border-subtle bg-canvas px-4 py-3 text-sm font-medium text-ink"
              >
                <Icon
                  size={18}
                  weight="bold"
                  className="shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
