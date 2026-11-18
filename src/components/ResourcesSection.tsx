"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle, X } from "@phosphor-icons/react";
import { RESOURCE_GUIDES, type ResourceGuide } from "@/data/healthPlans";

interface ResourcesSectionProps {
  onSelectGuideTopic: (formOption: string, contextNote: string) => void;
}

export function ResourcesSection({
  onSelectGuideTopic,
}: ResourcesSectionProps) {
  const [selectedGuide, setSelectedGuide] = useState<ResourceGuide | null>(
    null
  );

  return (
    <section
      id="resources"
      aria-labelledby="resources-heading"
      data-agent="resources-section"
      className="bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm font-medium text-ink">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full bg-accent"
          />
          <span>Guides & Resources</span>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2
            id="resources-heading"
            className="max-w-lg text-3xl font-semibold tracking-tight text-ink leading-[1.15] sm:text-4xl"
          >
            Practical Insights For Smarter California Coverage
          </h2>
          <p className="max-w-md text-base leading-relaxed text-ink-muted">
            Clear broker notes on auto and home renewals, commercial business
            liability, and health care plan comparisons.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {RESOURCE_GUIDES.map((guide) => {
            const isOpen = selectedGuide?.id === guide.id;
            return (
              <article
                key={guide.id}
                className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface-soft p-4 transition-shadow duration-150 hover:shadow-md"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white">
                    <Image
                      src={guide.image}
                      alt={guide.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <p className="mt-4 text-xs font-semibold text-accent">
                    {guide.tag} · {guide.readTime}
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold leading-snug text-ink">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-2">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    data-agent={`guide-read-${guide.id}`}
                    onClick={() => setSelectedGuide(isOpen ? null : guide)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <span>{isOpen ? "Hide checklist" : "Read key points"}</span>
                    <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {selectedGuide && (
          <div
            role="region"
            aria-label={selectedGuide.title}
            data-agent="selected-guide-panel"
            className="mt-8 rounded-2xl border border-accent/25 bg-accent-soft p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-accent uppercase">
                  {selectedGuide.tag}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-ink sm:text-2xl">
                  {selectedGuide.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close guide panel"
                onClick={() => setSelectedGuide(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-white text-ink transition-colors hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X size={18} weight="bold" aria-hidden="true" />
              </button>
            </div>

            <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
              {selectedGuide.keyTakeaways.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 rounded-xl bg-white p-4 text-sm leading-relaxed text-ink"
                >
                  <CheckCircle
                    size={18}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <button
                type="button"
                onClick={() =>
                  onSelectGuideTopic(
                    selectedGuide.formOption,
                    `Question from guide: ${selectedGuide.title}`
                  )
                }
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <span>Ask David about this topic</span>
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            data-agent="resources-consult-cta"
            className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-ink py-1.5 pr-1.5 pl-5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-accent active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <span>Request Multi-Carrier Quote</span>
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink"
            >
              <ArrowUpRight size={15} weight="bold" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
