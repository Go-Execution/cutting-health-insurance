"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

type FormStatus = "idle" | "submitting" | "sent";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    timerRef.current = setTimeout(() => setStatus("sent"), 650);
  }

  if (status === "sent") {
    return (
      <div className="form-success" role="status">
        <CheckCircle size={34} weight="regular" aria-hidden="true" />
        <p className="eyebrow">Form preview complete</p>
        <h3>Demo only — your request was not sent.</h3>
        <p>
          This interaction is ready to connect to a live inbox. For immediate help, call David at{" "}
          <a href="tel:+19099858098">(909) 985-8098</a>.
        </p>
        <button type="button" className="text-button" onClick={() => setStatus("idle")}>
          Start another request
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <p className="eyebrow">Tell us what needs protecting</p>
        <p className="form-note" id="form-helper">
          All fields are required. Demo only — nothing is sent.
        </p>
      </div>

      <div className="field-grid">
        <label>
          <span>Your name <b aria-hidden="true">*</b></span>
          <input name="name" type="text" autoComplete="name" aria-describedby="form-helper" required />
        </label>
        <label>
          <span>Phone number <b aria-hidden="true">*</b></span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" aria-describedby="form-helper" required />
        </label>
      </div>

      <label>
        <span>Email address <b aria-hidden="true">*</b></span>
        <input name="email" type="email" autoComplete="email" aria-describedby="form-helper" required />
      </label>

      <label>
        <span>What would you like help with? <b aria-hidden="true">*</b></span>
        <select name="coverage" defaultValue="" aria-describedby="form-helper" required>
          <option value="" disabled>
            Choose a coverage type
          </option>
          <option value="life">Life insurance</option>
          <option value="auto">Auto insurance</option>
          <option value="home">Home insurance</option>
          <option value="business">Business insurance</option>
          <option value="other">I am not sure yet</option>
        </select>
      </label>

      <label>
        <span>A few details <b aria-hidden="true">*</b></span>
        <textarea
          name="message"
          rows={4}
          placeholder="What changed, what are you comparing, or what question can we answer?"
          aria-describedby="form-helper"
          required
        />
      </label>

      <button className="button button-dark submit-button" type="submit" disabled={status === "submitting"}>
        <span>{status === "submitting" ? "Preparing request" : "Request a consultation"}</span>
        <ArrowRight size={19} weight="regular" aria-hidden="true" />
      </button>
    </form>
  );
}
