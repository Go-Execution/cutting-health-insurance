"use client";

import { Phone, ShieldPlus } from "@phosphor-icons/react";

const NAV_ITEMS = [
  { href: "#coverage", label: "Plans" },
  { href: "#approach", label: "Process" },
  { href: "#prep", label: "Prep List" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
        <div
          data-agent="nav-bar"
          className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border border-border-subtle/90 bg-surface/90 px-3.5 py-2 shadow-sm backdrop-blur-md sm:gap-4 sm:px-4 sm:py-2.5"
        >
          <a
            href="#top"
            className="flex min-w-0 items-center gap-2.5 rounded-full py-1 pr-1 transition-transform duration-150 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:gap-3 sm:pr-2"
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent sm:h-9 sm:w-9"
            >
              <ShieldPlus size={18} weight="bold" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-semibold tracking-tight text-ink sm:text-base">
                David Cutting
              </span>
              <span className="truncate font-mono text-[9px] tracking-[0.12em] text-ink-muted uppercase sm:text-[10px] sm:tracking-[0.14em]">
                Health Insurance
              </span>
            </span>
          </a>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-agent={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors duration-150 hover:bg-surface-soft hover:text-ink active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="tel:+19099858098"
            data-agent="nav-phone-cta"
            className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-all duration-150 hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <Phone size={15} weight="bold" aria-hidden="true" />
            <span>(909) 985-8098</span>
          </a>
        </div>
      </header>

      {/* Mobile quick-action bottom dock */}
      <nav
        aria-label="Mobile quick actions"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-surface/95 px-4 py-2.5 backdrop-blur-md md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <a
            href="#coverage"
            className="flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-xl border border-border-subtle bg-canvas px-3 text-sm font-medium text-ink transition-colors hover:bg-surface-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Plans
          </a>
          <a
            href="#contact"
            className="flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-xl border border-border-subtle bg-canvas px-3 text-sm font-medium text-ink transition-colors hover:bg-surface-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Consult
          </a>
          <a
            href="tel:+19099858098"
            className="flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-accent px-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Phone size={15} weight="bold" aria-hidden="true" />
            <span>Call David</span>
          </a>
        </div>
      </nav>
    </>
  );
}
