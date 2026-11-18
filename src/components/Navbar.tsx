"use client";

import Image from "next/image";
import { ArrowUpRight, Phone } from "@phosphor-icons/react";

const NAV_ITEMS = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#coverage", label: "Services" },
  { href: "#resources", label: "Resources" },
] as const;

export function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/95 backdrop-blur-md">
        <div
          data-agent="nav-bar"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8"
        >
          <a
            href="#top"
            className="flex shrink-0 items-center rounded-lg py-0.5 transition-opacity duration-150 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <Image
              src="/images/david-cutting-logo.png"
              alt="David Cutting Insurance"
              width={1295}
              height={766}
              priority
              className="h-12 w-auto object-contain sm:h-14 md:h-[68px]"
            />
          </a>

          <div className="flex items-center gap-6 lg:gap-8">
            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-6 md:flex lg:gap-8"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-agent={`nav-link-${item.label.toLowerCase()}`}
                  className="text-sm font-medium text-ink transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              data-agent="nav-talk-cta"
              className="inline-flex min-h-[42px] shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full bg-accent py-1.5 pr-1.5 pl-4 text-sm font-semibold text-white shadow-xs transition-all duration-150 hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span>Talk to Us</span>
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-accent"
              >
                <ArrowUpRight size={14} weight="bold" />
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile bottom action bar */}
      <nav
        aria-label="Mobile quick actions"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-white/95 px-4 py-2.5 backdrop-blur-md md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <a
            href="#coverage"
            className="flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-xl border border-border-subtle bg-surface-soft px-3 text-sm font-medium text-ink transition-colors hover:bg-accent-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Services
          </a>
          <a
            href="#contact"
            className="flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-xl border border-border-subtle bg-surface-soft px-3 text-sm font-medium text-ink transition-colors hover:bg-accent-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Get Quote
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
