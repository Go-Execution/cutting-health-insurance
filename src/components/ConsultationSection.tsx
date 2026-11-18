"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CaretDown,
  CheckCircle,
  Clock,
  IdentificationCard,
  MapPin,
  Phone,
  Star,
  WarningCircle,
} from "@phosphor-icons/react";
import { BROKER_FAQS, CONSULTATION_OPTIONS } from "@/data/healthPlans";

interface ConsultationSectionProps {
  selectedPlan: string;
  onSelectedPlanChange: (value: string) => void;
  prefilledNotes: string;
  onPrefilledNotesChange: (value: string) => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
}

const OFFICE_AMENITIES = [
  "Independent broker",
  "Free consultation",
  "In person or by phone",
  "Wheelchair accessible",
  "Parking available",
  "Cards accepted",
] as const;

export function ConsultationSection({
  selectedPlan,
  onSelectedPlanChange,
  prefilledNotes,
  onPrefilledNotesChange,
  nameInputRef,
}: ConsultationSectionProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const announcerRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submittedSummary, setSubmittedSummary] = useState<{
    name: string;
    plan: string;
  } | null>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    let announceTimer: ReturnType<typeof setTimeout> | undefined;
    let announcedField: HTMLElement | null = null;
    const flagged = new WeakSet<Element>();
    const announced = new WeakSet<Element>();

    const supportsUserInvalid = (() => {
      try {
        return CSS.supports("selector(:user-invalid)");
      } catch {
        return false;
      }
    })();

    const dirtyState = new WeakMap<
      Element,
      { hasInteracted: boolean; hasBlurred: boolean }
    >();

    const linkError = (el: HTMLElement, shown: boolean) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length > 0) {
        el.setAttribute("aria-describedby", ids.join(" "));
      } else {
        el.removeAttribute("aria-describedby");
      }
    };

    const spokenText = (node: HTMLElement) => {
      const copy = node.cloneNode(true) as HTMLElement;
      copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
      copy
        .querySelectorAll('[role="img"][aria-label]')
        .forEach((n) => n.replaceWith(`${n.getAttribute("aria-label")}: `));
      return (copy.textContent || "").replace(/\s+/g, " ").trim();
    };

    const announceError = (el: HTMLElement) => {
      const errorId = el.dataset.error;
      if (!errorId || !announcerRef.current) return;
      const errorEl = document.getElementById(errorId);
      if (!errorEl) return;
      const labelEl = (el as HTMLInputElement).labels?.[0];
      const labelPrefix = labelEl ? `${spokenText(labelEl)}: ` : "";
      clearTimeout(announceTimer);
      announcerRef.current.textContent = "";
      announcedField = el;
      announceTimer = setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = labelPrefix + spokenText(errorEl);
        }
      }, 500);
    };

    const isElementUserInvalid = (el: HTMLElement) => {
      if (supportsUserInvalid) {
        return el.matches(":user-invalid");
      }
      const control = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const state = dirtyState.get(el);
      if (!state?.hasBlurred) return false;
      return !control.validity.valid;
    };

    const syncAria = (el: EventTarget | null, announce = false) => {
      if (
        !(el instanceof HTMLElement) ||
        !el.matches("input, select, textarea")
      ) {
        return;
      }

      const invalid = isElementUserInvalid(el);
      if (!supportsUserInvalid) {
        const control = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        const state = dirtyState.get(el);
        const showFallbackValid = Boolean(state?.hasBlurred && control.validity.valid);
        el.classList.toggle("user-invalid-fallback", invalid);
        el.classList.toggle("user-valid-fallback", showFallbackValid);
      }

      if (invalid) {
        if (announce && !announced.has(el)) {
          announceError(el);
          announced.add(el);
        }
        el.setAttribute("aria-invalid", "true");
        linkError(el, true);
        flagged.add(el);
      } else if (flagged.has(el) || el.getAttribute("aria-invalid") !== "true") {
        el.setAttribute("aria-invalid", "false");
        linkError(el, false);
        flagged.delete(el);
        announced.delete(el);
        if (announcedField === el) {
          clearTimeout(announceTimer);
          if (announcerRef.current) {
            announcerRef.current.textContent = "";
          }
        }
      }
    };

    form
      .querySelectorAll("input, select, textarea")
      .forEach((el) => syncAria(el));

    const handleBlur = (e: Event) => {
      if (e.target instanceof Element) {
        const state = dirtyState.get(e.target) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasBlurred = true;
        dirtyState.set(e.target, state);
      }
      syncAria(e.target, true);
    };

    const handleInput = (e: Event) => {
      if (e.target instanceof Element) {
        const state = dirtyState.get(e.target) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasInteracted = true;
        dirtyState.set(e.target, state);
      }
      if (e.target instanceof HTMLElement && e.target.hasAttribute("aria-invalid")) {
        syncAria(e.target);
      }
    };

    const handleChange = (e: Event) => {
      if (e.target instanceof Element) {
        const state = dirtyState.get(e.target) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasInteracted = true;
        state.hasBlurred = true;
        dirtyState.set(e.target, state);
      }
      syncAria(e.target, true);
    };

    const handleInvalid = (e: Event) => {
      if (e.target instanceof HTMLElement) {
        dirtyState.set(e.target, { hasInteracted: true, hasBlurred: true });
        announced.add(e.target);
        syncAria(e.target);
      }
    };

    const handleReset = () => {
      setTimeout(() => {
        form.querySelectorAll("input, select, textarea").forEach((el) => {
          dirtyState.delete(el);
          el.classList.remove("user-invalid-fallback", "user-valid-fallback");
          syncAria(el);
        });
      });
    };

    form.addEventListener("blur", handleBlur, true);
    form.addEventListener("input", handleInput);
    form.addEventListener("change", handleChange, true);
    form.addEventListener("invalid", handleInvalid, true);
    form.addEventListener("reset", handleReset, true);

    return () => {
      clearTimeout(announceTimer);
      form.removeEventListener("blur", handleBlur, true);
      form.removeEventListener("input", handleInput);
      form.removeEventListener("change", handleChange, true);
      form.removeEventListener("invalid", handleInvalid, true);
      form.removeEventListener("reset", handleReset, true);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLElement>(
        "input:invalid, select:invalid, textarea:invalid"
      );
      firstInvalid?.focus();
      form.reportValidity();
      return;
    }

    setSubmittedSummary({
      name: fullName.trim(),
      plan: selectedPlan,
    });
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      data-agent="contact-section"
      className="border-t border-border-subtle bg-surface-soft py-16 sm:py-24"
    >
      <div
        ref={announcerRef}
        aria-live="polite"
        className="visually-hidden"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-ink">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-full bg-accent"
                />
                <span>David Cutting Insurance Services · Upland, CA</span>
              </div>

              <h2
                id="contact-heading"
                className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              >
                Request a multi-carrier quote directly.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                Call for straightforward guidance across auto and home,
                commercial business, or health care coverage. As an independent
                broker, we compare policies on your behalf with zero obligation.
              </p>

              <dl className="mt-8 space-y-5">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Phone size={18} weight="bold" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold text-ink-muted uppercase">
                      Phone
                    </dt>
                    <dd className="mt-0.5">
                      <a
                        href="tel:+19099858098"
                        className="text-base font-semibold text-ink underline decoration-border-subtle underline-offset-4 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        (909) 985-8098
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <MapPin size={18} weight="bold" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold text-ink-muted uppercase">
                      Office Address
                    </dt>
                    <dd className="mt-0.5">
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=163+S+Euclid+Ave+Upland+CA+91786"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-ink underline decoration-border-subtle underline-offset-4 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        163 S Euclid Ave, Upland, CA 91786
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Clock size={18} weight="bold" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold text-ink-muted uppercase">
                      Office Hours
                    </dt>
                    <dd className="mt-0.5 text-base font-medium text-ink">
                      Monday to Friday, 9:00 AM to 5:30 PM
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <IdentificationCard
                      size={18}
                      weight="bold"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold text-ink-muted uppercase">
                      California Insurance License
                    </dt>
                    <dd className="mt-0.5 text-base font-semibold text-ink">
                      License #0752131 (Independent Insurance Broker)
                    </dd>
                  </div>
                </div>
              </dl>

              <ul
                aria-label="Office amenities"
                className="mt-6 flex flex-wrap gap-2"
              >
                {OFFICE_AMENITIES.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border-subtle bg-white px-3 py-1 text-xs font-medium text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Client Review */}
            <div className="rounded-2xl border border-border-subtle bg-white p-6">
              <div className="flex items-center justify-between gap-2">
                <div
                  className="flex items-center gap-1 text-accent"
                  aria-label="5 out of 5 stars"
                >
                  <Star size={16} weight="fill" aria-hidden="true" />
                  <Star size={16} weight="fill" aria-hidden="true" />
                  <Star size={16} weight="fill" aria-hidden="true" />
                  <Star size={16} weight="fill" aria-hidden="true" />
                  <Star size={16} weight="fill" aria-hidden="true" />
                </div>
                <a
                  href="https://david-cutting-insurance-services.ueniweb.com/reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                >
                  <span>4 public reviews</span>
                  <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                </a>
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-ink">
                “Very friendly customer service, fast and best prices possible!
                I have referred friends to David Cutting Insurance.”
              </blockquote>
              <p className="mt-2 text-xs font-semibold text-ink-muted">
                Rachelle Fielding
              </p>
            </div>

            {/* Compact FAQ */}
            <div className="space-y-2.5" data-agent="faq-accordion">
              <p className="text-sm font-semibold text-ink">Quick Questions</p>
              {BROKER_FAQS.map((item) => (
                <details
                  key={item.id}
                  className="faq-details rounded-xl border border-border-subtle bg-white transition-colors hover:border-accent/40"
                >
                  <summary className="flex min-h-[52px] cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                    <span>{item.question}</span>
                    <CaretDown
                      size={16}
                      weight="bold"
                      className="faq-chevron shrink-0 text-accent"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="border-t border-border-subtle/70 px-4 pt-3 pb-4 text-sm leading-relaxed text-ink-muted">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border-subtle bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <h3
                id="consultation-form-heading"
                className="text-2xl font-semibold tracking-tight text-ink"
              >
                Request a Free Quote Comparison
              </h3>
              <p className="mt-1.5 text-sm text-ink-muted">
                All fields are required. Preview form only: no details are sent
                from this demo.
              </p>

              {submittedSummary ? (
                <div
                  role="status"
                  data-agent="consultation-success"
                  className="mt-6 rounded-2xl border border-accent/30 bg-accent-soft p-6"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle
                      size={24}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-lg font-semibold text-ink">
                        Preview request ready for {submittedSummary.name}
                      </p>
                      <p className="mt-1.5 text-base leading-relaxed text-ink-muted">
                        Selected coverage:{" "}
                        <span className="font-semibold text-ink">
                          {submittedSummary.plan}
                        </span>
                        . Because this is a preview build without a connected
                        inbox yet, please call{" "}
                        <a
                          href="tel:+19099858098"
                          className="font-semibold text-accent underline underline-offset-4"
                        >
                          (909) 985-8098
                        </a>{" "}
                        to speak with David Cutting directly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmittedSummary(null)}
                        className="mt-4 inline-flex min-h-[44px] items-center rounded-full border border-border-subtle bg-white px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        Edit request details
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  ref={formRef}
                  action="#contact"
                  method="POST"
                  aria-labelledby="consultation-form-heading"
                  data-agent="consultation-form"
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-5"
                >
                  <div>
                    <label
                      htmlFor="client-name"
                      className="block text-sm font-semibold text-ink"
                    >
                      Full name{" "}
                      <span aria-hidden="true" className="text-accent">
                        *
                      </span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="client-name"
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      autoComplete="name"
                      enterKeyHint="next"
                      aria-invalid="false"
                      data-error="client-name-error"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jordan Alvarez"
                      className="form-control mt-1.5 w-full rounded-xl border border-border-subtle bg-surface-soft px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    />
                    <div id="client-name-error" className="error-msg">
                      <WarningCircle size={16} weight="fill" aria-hidden="true" />
                      <span>Please enter your full name.</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="client-phone"
                        className="block text-sm font-semibold text-ink"
                      >
                        Phone number{" "}
                        <span aria-hidden="true" className="text-accent">
                          *
                        </span>
                      </label>
                      <span
                        id="phone-hint"
                        className="mt-0.5 block text-xs text-ink-muted"
                      >
                        Format: (909) 555-0142
                      </span>
                      <input
                        id="client-phone"
                        name="phone"
                        type="tel"
                        required
                        minLength={7}
                        inputMode="tel"
                        autoComplete="tel"
                        enterKeyHint="next"
                        aria-invalid="false"
                        aria-describedby="phone-hint"
                        data-error="client-phone-error"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(909) 555-0142"
                        className="form-control mt-1.5 w-full rounded-xl border border-border-subtle bg-surface-soft px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      />
                      <div id="client-phone-error" className="error-msg">
                        <WarningCircle size={16} weight="fill" aria-hidden="true" />
                        <span>Please enter a valid phone number.</span>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="client-email"
                        className="block text-sm font-semibold text-ink"
                      >
                        Email address{" "}
                        <span aria-hidden="true" className="text-accent">
                          *
                        </span>
                      </label>
                      <span
                        id="email-hint"
                        className="mt-0.5 block text-xs text-ink-muted"
                      >
                        Format: you@example.com
                      </span>
                      <input
                        id="client-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        enterKeyHint="next"
                        aria-invalid="false"
                        aria-describedby="email-hint"
                        data-error="client-email-error"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="form-control mt-1.5 w-full rounded-xl border border-border-subtle bg-surface-soft px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      />
                      <div id="client-email-error" className="error-msg">
                        <WarningCircle size={16} weight="fill" aria-hidden="true" />
                        <span>
                          Enter an email address in the format you@example.com.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="coverage-topic"
                      className="block text-sm font-semibold text-ink"
                    >
                      Coverage you are looking for{" "}
                      <span aria-hidden="true" className="text-accent">
                        *
                      </span>
                    </label>
                    <select
                      id="coverage-topic"
                      name="coverageTopic"
                      required
                      aria-invalid="false"
                      data-error="coverage-topic-error"
                      value={selectedPlan}
                      onChange={(e) => onSelectedPlanChange(e.target.value)}
                      className="form-control mt-1.5 w-full rounded-xl border border-border-subtle bg-surface-soft px-4 py-3 text-ink focus:border-accent focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      <option value="">Choose a coverage category</option>
                      {CONSULTATION_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div id="coverage-topic-error" className="error-msg">
                      <WarningCircle size={16} weight="fill" aria-hidden="true" />
                      <span>Please choose a coverage category.</span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="coverage-details"
                      className="block text-sm font-semibold text-ink"
                    >
                      Vehicles, property, business, or health details{" "}
                      <span aria-hidden="true" className="text-accent">
                        *
                      </span>
                    </label>
                    <span
                      id="details-hint"
                      className="mt-0.5 block text-xs text-ink-muted"
                    >
                      Share what you want to quote, renewal dates, or questions.
                    </span>
                    <textarea
                      id="coverage-details"
                      name="details"
                      required
                      minLength={8}
                      rows={4}
                      enterKeyHint="done"
                      aria-invalid="false"
                      aria-describedby="details-hint"
                      data-error="coverage-details-error"
                      value={prefilledNotes}
                      onChange={(e) => onPrefilledNotesChange(e.target.value)}
                      placeholder="Example: Comparing an auto and homeowners renewal in Upland, plus general liability for a 6-person business."
                      className="form-control mt-1.5 w-full resize-y rounded-xl border border-border-subtle bg-surface-soft px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    />
                    <div id="coverage-details-error" className="error-msg">
                      <WarningCircle size={16} weight="fill" aria-hidden="true" />
                      <span>
                        Please include a short note (at least 8 characters)
                        about what you are comparing.
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    data-agent="consultation-submit"
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-150 hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    Request a consultation
                  </button>
                </form>
              )}

              <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-soft p-4">
                <p className="text-xs leading-relaxed text-ink-muted">
                  David Cutting Insurance Services is an independent insurance
                  brokerage (CA Insurance License #0752131), not an insurance
                  carrier. Connect this preview form to a secure agency inbox
                  and carrier/privacy disclosures prior to live lead intake.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
