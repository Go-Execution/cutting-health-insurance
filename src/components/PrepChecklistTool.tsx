"use client";

import { useState } from "react";
import { ArrowRight, CheckSquare, Square } from "@phosphor-icons/react";
import { PREP_TRACKS } from "@/data/healthPlans";

interface PrepChecklistToolProps {
  onApplyPrepToConsultation: (formOption: string, contextNote: string) => void;
}

export function PrepChecklistTool({
  onApplyPrepToConsultation,
}: PrepChecklistToolProps) {
  const [selectedTrackId, setSelectedTrackId] = useState<
    "individual" | "medicare" | "employer"
  >("individual");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const track =
    PREP_TRACKS.find((item) => item.id === selectedTrackId) ?? PREP_TRACKS[0];

  const completedCount = track.checklist.filter(
    (item) => checkedItems[item.id]
  ).length;

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSendToForm = () => {
    const readyLabels = track.checklist
      .filter((item) => checkedItems[item.id])
      .map((item) => item.text);

    const note =
      readyLabels.length > 0
        ? `Path: ${track.label}. I have ready: ${readyLabels.join("; ")}.`
        : `Looking for guidance on ${track.label} health coverage.`;

    onApplyPrepToConsultation(track.formOption, note);
  };

  return (
    <section
      id="prep"
      aria-labelledby="prep-heading"
      data-agent="prep-checklist"
      className="border-y border-border-subtle bg-surface-soft py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-border-subtle bg-surface p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h2
                id="prep-heading"
                className="text-3xl font-bold tracking-tight text-ink sm:text-4xl"
              >
                Four details that turn a quick call into real quotes.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                You do not need every document on day one. Pick your situation
                to see what helps most, and check off anything you already have
                ready.
              </p>

              <div
                role="group"
                aria-label="Choose your coverage path"
                className="mt-6 flex flex-wrap gap-2"
              >
                {PREP_TRACKS.map((item) => {
                  const active = item.id === track.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={active}
                      data-agent={`prep-track-${item.id}`}
                      onClick={() => setSelectedTrackId(item.id)}
                      className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                        active
                          ? "border-accent bg-accent text-white"
                          : "border-border-subtle bg-canvas text-ink hover:bg-surface-soft"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl border border-border-subtle bg-canvas p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">
                    Items ready for your call
                  </span>
                  <span className="font-mono text-sm font-semibold text-accent">
                    {completedCount} / {track.checklist.length}
                  </span>
                </div>
                <button
                  type="button"
                  data-agent="prep-apply-cta"
                  onClick={handleSendToForm}
                  className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-xs transition-all duration-150 hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <span>Start consultation with this path</span>
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-ink">{track.headline}</p>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {track.checklist.map((item) => {
                  const checked = Boolean(checkedItems[item.id]);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        data-agent={`prep-item-${item.id}`}
                        onClick={() => toggleItem(item.id)}
                        className={`flex h-full w-full flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                          checked
                            ? "border-accent bg-accent-soft"
                            : "border-border-subtle bg-canvas hover:bg-surface-soft"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-base font-semibold text-ink">
                            {item.text}
                          </span>
                          <span className="mt-0.5 shrink-0 text-accent">
                            {checked ? (
                              <CheckSquare size={22} weight="fill" aria-hidden="true" />
                            ) : (
                              <Square size={22} weight="regular" aria-hidden="true" />
                            )}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                          {item.reason}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
