"use client";

import Image from "next/image";
import { ArrowUpRight, Phone } from "@phosphor-icons/react";

export function HeroSection() {
  return (
    <section
      id="top"
      data-agent="hero-section"
      className="bg-white px-4 pt-4 pb-10 sm:px-6 sm:pt-6 sm:pb-14 lg:px-8"
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-navy sm:rounded-3xl">
        <div className="relative min-h-[540px] w-full sm:min-h-[600px] lg:min-h-[640px]">
          <Image
            src="/images/hero-family.jpg"
            alt="Smiling California grandfather and child seated together on a sunlit living room sofa"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center"
          />

          {/* Subtle left-side scrim for crisp white headline legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#07254e]/85 via-[#07254e]/45 to-[#07254e]/10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#07254e]/75 via-transparent to-transparent"
          />

          <div className="relative z-10 flex min-h-[540px] flex-col justify-between p-6 sm:min-h-[600px] sm:p-10 lg:min-h-[640px] lg:p-14">
            <div className="max-w-2xl pt-2 sm:pt-4">
              <p className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md sm:text-sm">
                Your health, your family, our commitment to care.
              </p>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white leading-[1.08] sm:text-5xl lg:text-6xl">
                Your Health Deserves The Best Protection
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90 sm:text-lg">
                Clear guidance for Covered California, Medicare, and small
                business health plans in Upland, California.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  data-agent="hero-quote-cta"
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-white py-1.5 pr-1.5 pl-5 text-sm font-semibold text-ink shadow-md transition-all duration-150 hover:bg-accent-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  <span>Get Your Quote</span>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white"
                  >
                    <ArrowUpRight size={15} weight="bold" />
                  </span>
                </a>

                <a
                  href="tel:+19099858098"
                  data-agent="hero-call-cta"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/40 bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-150 hover:bg-white/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  <Phone size={16} weight="bold" aria-hidden="true" />
                  <span>Call (909) 985-8098</span>
                </a>
              </div>

              <a
                href="#contact"
                className="hidden items-center gap-3.5 rounded-2xl border border-white/25 bg-white/95 p-2.5 pr-4 shadow-lg backdrop-blur-md transition-transform duration-150 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-soft">
                  <Image
                    src="/images/hero-consultation.jpg"
                    alt="In-person consultation at David Cutting Insurance"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-accent">
                    Free Plan Review
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-ink">
                    Upland Office or Phone
                  </p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    Mon to Fri, 9:00 AM to 5:30 PM
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
