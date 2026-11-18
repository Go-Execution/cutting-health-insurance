"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import {
  HEALTH_PLAN_CATEGORIES,
  type PlanCategoryId,
} from "@/data/healthPlans";

interface CoverageExplorerProps {
  onSelectPlanForConsultation: (formOption: string, contextNote?: string) => void;
}

export function CoverageExplorer({
  onSelectPlanForConsultation,
}: CoverageExplorerProps) {
  const [activeId, setActiveId] = useState<PlanCategoryId>("individual");

  const activeCategory =
    HEALTH_PLAN_CATEGORIES.find((cat) => cat.id === activeId) ??
    HEALTH_PLAN_CATEGORIES[0];

  return (
    <section
      id="coverage"
      aria-labelledby="coverage-heading"
      data-agent="coverage-explorer"
      className="border-y border-border-subtle bg-surface py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="coverage-heading"
              className="text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              Health plans matched to your doctors, prescriptions, and budget.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-muted">
            Select a coverage track below to see how David evaluates networks,
            metal tiers, and out-of-pocket exposure before you enroll.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Health insurance coverage tracks"
          data-agent="coverage-tabs"
          className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {HEALTH_PLAN_CATEGORIES.map((category) => {
            const isSelected = category.id === activeCategory.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`tab-${category.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${category.id}`}
                data-agent={`coverage-tab-${category.id}`}
                onClick={() => setActiveId(category.id)}
                className={`flex min-h-[76px] flex-col items-start justify-between rounded-2xl border p-4 text-left transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  isSelected
                    ? "border-accent bg-accent-soft text-ink shadow-xs"
                    : "border-border-subtle bg-canvas text-ink-muted hover:bg-surface-soft hover:text-ink"
                }`}
              >
                <span className="font-mono text-xs font-medium text-accent">
                  {category.code}
                </span>
                <span className="mt-1.5 text-base font-semibold text-ink">
                  {category.shortLabel}
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${activeCategory.id}`}
          aria-labelledby={`tab-${activeCategory.id}`}
          className="mt-6 rounded-3xl border border-border-subtle bg-canvas p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <p className="font-mono text-xs font-medium tracking-wider text-accent uppercase">
                  {activeCategory.audience}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {activeCategory.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  {activeCategory.summary}
                </p>

                <div className="mt-6">
                  <p className="text-xs font-semibold tracking-wide text-ink uppercase">
                    Plan structures compared
                  </p>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {activeCategory.planStructures.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border-subtle bg-surface px-3 py-1.5 text-sm font-medium text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-border-subtle pt-6">
                <p className="text-sm leading-relaxed text-ink-muted">
                  <span className="font-semibold text-ink">Best fit: </span>
                  {activeCategory.idealFor}
                </p>
                <button
                  type="button"
                  data-agent={`discuss-${activeCategory.id}-cta`}
                  onClick={() =>
                    onSelectPlanForConsultation(
                      activeCategory.formOption,
                      `Interested in ${activeCategory.title} options.`
                    )
                  }
                  className="mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all duration-150 hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <span>Discuss {activeCategory.shortLabel}</span>
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-border-subtle bg-surface p-6 sm:p-8 lg:col-span-6">
              <h4 className="text-lg font-semibold text-ink">
                What David checks before you enroll
              </h4>
              <ul className="mt-5 space-y-4">
                {activeCategory.whatDavidChecks.map((check) => (
                  <li key={check} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-base leading-relaxed text-ink-muted">
                      {check}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
