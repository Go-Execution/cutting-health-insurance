import Image from "next/image";
import { CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import { ADVISORY_STEPS, ENROLLMENT_WINDOWS } from "@/data/healthPlans";

export function AdvisoryProcess() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      data-agent="advisory-process"
      className="py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <p className="font-mono text-xs font-medium tracking-[0.14em] text-accent uppercase">
              How we compare plans
            </p>
            <h2
              id="approach-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              Start with your care. Then weigh the numbers.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              A cheaper monthly premium does not help if your specialist is out
              of network or your medication sits in a high tier. Every review
              looks at total annual risk first.
            </p>

            <div className="mt-8 overflow-hidden rounded-3xl border border-border-subtle bg-surface p-2 shadow-sm">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-soft">
                <Image
                  src="/images/california-couple.jpg"
                  alt="Smiling couple in their 60s walking along a sunlit tree-lined sidewalk in Southern California"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <p className="px-3 py-3 text-sm font-medium text-ink-muted">
                Steady year-round support for Inland Empire families, self-employed
                workers, and Medicare retirees.
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-7">
            <ol className="space-y-4">
              {ADVISORY_STEPS.map((step) => (
                <li
                  key={step.number}
                  className="rounded-3xl border border-border-subtle bg-surface p-6 shadow-xs sm:p-8"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-sm font-semibold text-accent">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-ink-muted">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="rounded-3xl border border-border-subtle bg-surface-soft p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-ink">
                <CalendarCheck
                  size={22}
                  weight="bold"
                  className="text-accent"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold">
                  Key California enrollment windows
                </h3>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {ENROLLMENT_WINDOWS.map((win) => (
                  <div
                    key={win.label}
                    className="rounded-2xl border border-border-subtle bg-surface p-4"
                  >
                    <p className="font-mono text-xs font-semibold text-accent">
                      {win.dates}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-ink">
                      {win.label}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {win.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
