"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, Heartbeat, Phone } from "@phosphor-icons/react";

const PILLARS = [
  "Covered California",
  "Medicare & Medigap",
  "Small Group",
  "Dental & Vision",
] as const;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = shouldReduceMotion
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section
      id="top"
      data-agent="hero-section"
      className="px-4 pt-12 pb-16 sm:px-6 md:pt-16 md:pb-24"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <motion.div
          {...fadeUp}
          className="flex flex-col items-start lg:col-span-6"
        >
          <p className="mb-4 font-mono text-xs font-medium tracking-[0.14em] text-accent uppercase">
            Upland, California · Health Coverage Advisory
          </p>

          <h1 className="max-w-xl text-4xl font-bold tracking-tighter text-ink leading-[1.06] sm:text-5xl md:text-6xl">
            Health coverage built around real care.
          </h1>

          <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-ink-muted sm:text-lg">
            David Cutting helps Upland individuals, families, seniors, and small
            employers compare California health plans without confusion.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="tel:+19099858098"
              data-agent="hero-call-cta"
              className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white shadow-sm transition-all duration-150 hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <Phone size={18} weight="bold" aria-hidden="true" />
              <span>Call (909) 985-8098</span>
            </a>

            <a
              href="#coverage"
              data-agent="hero-explore-cta"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-border-subtle bg-surface px-6 py-3 text-base font-medium text-ink transition-all duration-150 hover:bg-surface-soft hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span>Explore health plans</span>
              <ArrowDownRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] as const }
          }
          className="relative lg:col-span-6"
        >
          <div className="rounded-3xl border border-border-subtle bg-surface p-2.5 shadow-md">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-soft">
              <Image
                src="/images/hero-consultation.jpg"
                alt="A licensed California health insurance advisor reviewing printed medical plan comparisons with a couple in a sunlit Upland office"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-soft px-4 py-3.5">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-accent shadow-xs">
                  <Heartbeat size={18} weight="bold" aria-hidden="true" />
                </span>
                <span>Four California health tracks</span>
              </div>

              <ul
                aria-label="Health insurance coverage categories"
                className="flex flex-wrap gap-1.5"
              >
                {PILLARS.map((pillar) => (
                  <li
                    key={pillar}
                    className="rounded-full border border-border-subtle bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted"
                  >
                    {pillar}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
