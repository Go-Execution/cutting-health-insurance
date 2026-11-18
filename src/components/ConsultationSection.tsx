"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  Clock,
  Info,
  MapPin,
  Phone,
  WarningCircle,
} from "@phosphor-icons/react";
import { CONSULTATION_OPTIONS } from "@/data/healthPlans";

interface ConsultationSectionProps {
  selectedPlan: string;
  onSelectedPlanChange: (value: string) => void;
  prefilledNotes: string;
  onPrefilledNotesChange: (value: string) => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
}

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
      className="py-16 sm:py-24"
    >
      <div
        ref={announcerRef}
        aria-live="polite"
        className="visually-hidden"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div>
              <p className="font-mono text-xs font-medium tracking-[0.14em] text-accent uppercase">
                Upland Office · Free Consultation
              </p>
              <h2
                id="contact-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
              >
                Talk through your health plan options directly.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                Call for a direct walkthrough or request a consultation below.
                You do not need to know which carrier or tier you want before
                getting in touch.
              </p>

              <dl className="mt-8 space-y-5">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Phone size={18} weight="bold" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-ink-muted uppercase">
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
                    <dt className="text-xs font-semibold tracking-wide text-ink-muted uppercase">
                      Upland Office
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
                    <dt className="text-xs font-semibold tracking-wide text-ink-muted uppercase">
                      Hours
                    </dt>
                    <dd className="mt-0.5 text-base font-medium text-ink">
                      Monday to Friday, 9:00 AM to 5:30 PM
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-border-subtle bg-surface-soft p-5">
              <div className="flex items-start gap-3">
                <Info
                  size={20}
                  weight="bold"
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Before this preview goes live
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    Connect this consultation form to a secure agency inbox and
                    insert verified California DOI licensing, carrier
                    appointments, and Medicare/privacy disclosures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border-subtle bg-surface p-6 shadow-sm sm:p-8 lg:p-10">
              <h3
                id="consultation-form-heading"
                className="text-2xl font-bold tracking-tight text-ink"
              >
                Request a health coverage review
              </h3>
              <p className="mt-1.5 text-sm text-ink-muted">
                All fields are required. Preview form only: no details are
                transmitted from this demo.
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
                        Selected track:{" "}
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
                        to speak with David directly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmittedSummary(null)}
                        className="mt-4 inline-flex min-h-[44px] items-center rounded-full border border-border-subtle bg-surface px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                      Full name <span aria-hidden="true" className="text-accent">*</span>
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
                      className="form-control mt-1.5 w-full rounded-xl border border-border-subtle bg-canvas px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
                        Phone number <span aria-hidden="true" className="text-accent">*</span>
                      </label>
                      <span id="phone-hint" className="mt-0.5 block text-xs text-ink-muted">
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
                        className="form-control mt-1.5 w-full rounded-xl border border-border-subtle bg-canvas px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
                        Email address <span aria-hidden="true" className="text-accent">*</span>
                      </label>
                      <span id="email-hint" className="mt-0.5 block text-xs text-ink-muted">
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
                        className="form-control mt-1.5 w-full rounded-xl border border-border-subtle bg-canvas px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
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
                      Health coverage topic <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <select
                      id="coverage-topic"
                      name="coverageTopic"
                      required
                      aria-invalid="false"
                      data-error="coverage-topic-error"
                      value={selectedPlan}
                      onChange={(e) => onSelectedPlanChange(e.target.value)}
                      className="form-control mt-1.5 w-full rounded-xl border border-border-subtle bg-canvas px-4 py-3 text-ink focus:border-accent focus:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      <option value="">Choose a health plan category</option>
                      {CONSULTATION_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div id="coverage-topic-error" className="error-msg">
                      <WarningCircle size={16} weight="fill" aria-hidden="true" />
                      <span>Please choose a health coverage category.</span>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="coverage-details"
                      className="block text-sm font-semibold text-ink"
                    >
                      Doctors, timing, or questions <span aria-hidden="true" className="text-accent">*</span>
                    </label>
                    <span id="details-hint" className="mt-0.5 block text-xs text-ink-muted">
                      Share your preferred doctors, renewal date, or household size.
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
                      placeholder="Example: Looking to keep our Upland primary doctor while comparing Covered California Silver plans."
                      className="form-control mt-1.5 w-full resize-y rounded-xl border border-border-subtle bg-canvas px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-accent focus:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    />
                    <div id="coverage-details-error" className="error-msg">
                      <WarningCircle size={16} weight="fill" aria-hidden="true" />
                      <span>
                        Please include a short note (at least 8 characters) about
                        what you are comparing.
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    data-agent="consultation-submit"
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-150 hover:bg-accent-hover hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    Request a consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
