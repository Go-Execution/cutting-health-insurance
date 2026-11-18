import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-white pt-12 pb-28 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex flex-col items-start gap-2">
            <Image
              src="/images/david-cutting-logo.png"
              alt="David Cutting Insurance Services"
              width={1340}
              height={320}
              className="h-9 w-auto object-contain sm:h-10"
            />
            <p className="text-sm text-ink-muted">
              David Cutting Insurance Services · Independent Broker · CA License
              #0752131
            </p>
            <p className="text-sm text-ink-muted">
              163 S Euclid Ave, Upland, CA 91786 · (909) 985-8098
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-6 text-sm font-medium text-ink"
          >
            <a
              href="#top"
              className="rounded-md py-1 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Home
            </a>
            <a
              href="#about"
              className="rounded-md py-1 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              About
            </a>
            <a
              href="#coverage"
              className="rounded-md py-1 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Services
            </a>
            <a
              href="#resources"
              className="rounded-md py-1 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Resources
            </a>
            <a
              href="#contact"
              className="rounded-md py-1 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-8 border-t border-border-subtle pt-6 text-xs leading-relaxed text-ink-muted">
          <p>
            David Cutting Insurance Services operates as an independent
            California insurance broker (CA License #0752131), not an insurance
            underwriting company. Coverage availability, terms, and rates
            depend on carrier underwriting guidelines.
          </p>
        </div>
      </div>
    </footer>
  );
}
