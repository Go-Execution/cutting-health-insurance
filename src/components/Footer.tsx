import { ShieldPlus } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface pt-12 pb-28 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent"
            >
              <ShieldPlus size={20} weight="bold" />
            </span>
            <div>
              <p className="text-base font-semibold text-ink">
                David Cutting Insurance Services
              </p>
              <p className="text-sm text-ink-muted">
                Health insurance guidance at 163 S Euclid Ave, Upland, CA 91786
              </p>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-6 text-sm font-medium text-ink-muted">
            <a
              href="#coverage"
              className="rounded-md py-1 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Plans
            </a>
            <a
              href="#approach"
              className="rounded-md py-1 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Process
            </a>
            <a
              href="#prep"
              className="rounded-md py-1 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Prep List
            </a>
            <a
              href="#faq"
              className="rounded-md py-1 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="rounded-md py-1 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-8 border-t border-border-subtle pt-6 text-xs leading-relaxed text-ink-muted">
          <p>
            Preview health insurance redesign for David Cutting Insurance
            Services. Add verified California Department of Insurance license
            numbers, carrier appointments, and official privacy disclosures
            prior to production launch.
          </p>
        </div>
      </div>
    </footer>
  );
}
