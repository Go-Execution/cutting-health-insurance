"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react";
import { COVERAGE_CATEGORIES } from "@/data/healthPlans";

interface CoverageShowcaseProps {
  onSelectPlanForConsultation: (formOption: string, contextNote?: string) => void;
}

const MOSAIC_ROWS = [
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
  [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
];

export function CoverageShowcase({
  onSelectPlanForConsultation,
}: CoverageShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = COVERAGE_CATEGORIES.length;

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const activeCategory = COVERAGE_CATEGORIES[activeIndex];
  const prevCategory = COVERAGE_CATEGORIES[prevIndex];
  const nextCategory = COVERAGE_CATEGORIES[nextIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section
      id="coverage"
      aria-labelledby="coverage-heading"
      data-agent="coverage-showcase"
      className="bg-navy pt-16 text-white sm:pt-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-200">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-full bg-white"
            />
            <span>Brokerage Coverage Services</span>
          </div>

          <h2 id="coverage-heading" className="visually-hidden">
            Auto, Home, Commercial Business, and Health Care Insurance
          </h2>
        </div>

        {/* Staggered 3-card photo showcase matching the reference design */}
        <div className="mt-10 grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-8">
          <button
            type="button"
            onClick={handlePrev}
            aria-label={`View ${prevCategory.shortLabel}`}
            className="group hidden overflow-hidden rounded-2xl border border-white/15 bg-navy-soft/70 text-left opacity-70 transition-all duration-200 hover:opacity-95 md:col-span-3 md:block md:-rotate-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={prevCategory.image}
                alt={prevCategory.imageAlt}
                fill
                sizes="260px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="px-4 py-3 text-xs font-medium text-blue-100">
              {prevCategory.shortLabel}
            </p>
          </button>

          <div className="md:col-span-6">
            <div className="overflow-hidden rounded-3xl border border-white/20 bg-white p-2 shadow-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-navy-soft">
                {COVERAGE_CATEGORIES.map((category, idx) => (
                  <Image
                    key={category.id}
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 560px"
                    aria-hidden={idx !== activeIndex}
                    className={`object-cover transition-opacity duration-200 ${
                      idx === activeIndex
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label={`View ${nextCategory.shortLabel}`}
            className="group hidden overflow-hidden rounded-2xl border border-white/15 bg-navy-soft/70 text-left opacity-70 transition-all duration-200 hover:opacity-95 md:col-span-3 md:block md:rotate-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={nextCategory.image}
                alt={nextCategory.imageAlt}
                fill
                sizes="260px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="px-4 py-3 text-xs font-medium text-blue-100">
              {nextCategory.shortLabel}
            </p>
          </button>
        </div>

        {/* Active track quick pills ordered by brokerage priority */}
        <div
          role="tablist"
          aria-label="Insurance brokerage coverage tracks"
          data-agent="coverage-tabs"
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {COVERAGE_CATEGORIES.map((category, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active}
                data-agent={`coverage-tab-${category.id}`}
                onClick={() => setActiveIndex(idx)}
                className={`min-h-[40px] rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  active
                    ? "bg-white text-ink shadow-sm"
                    : "border border-white/25 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {category.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Centered active details + carousel arrows */}
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm font-medium text-blue-200">
            {activeCategory.priorityTag} · {activeCategory.subtitle}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {activeCategory.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-blue-100/90">
            {activeCategory.summary}
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-sm text-white/95">
            {activeCategory.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check
                  size={16}
                  weight="bold"
                  className="shrink-0 text-blue-300"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous coverage option"
              data-agent="coverage-prev"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm transition-transform duration-150 hover:scale-105 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            </button>

            <button
              type="button"
              data-agent={`discuss-${activeCategory.id}-cta`}
              onClick={() =>
                onSelectPlanForConsultation(
                  activeCategory.formOption,
                  `Interested in comparing ${activeCategory.title}.`
                )
              }
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-150 hover:bg-white hover:text-ink active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Compare {activeCategory.shortLabel}</span>
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next coverage option"
              data-agent="coverage-next"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm transition-transform duration-150 hover:scale-105 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Stepped pixel-mosaic transition from Navy Blue to White */}
      <div
        aria-hidden="true"
        className="mt-16 grid w-full grid-cols-16 bg-white"
      >
        {MOSAIC_ROWS.flatMap((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              className={`h-6 sm:h-8 ${
                cell === 1 ? "bg-navy" : "bg-white"
              }`}
            />
          ))
        )}
      </div>
    </section>
  );
}
