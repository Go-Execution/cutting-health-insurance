"use client";

import { useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { CoverageShowcase } from "@/components/CoverageShowcase";
import { ResourcesSection } from "@/components/ResourcesSection";
import { ConsultationSection } from "@/components/ConsultationSection";
import { Footer } from "@/components/Footer";

export function HealthRedesignPage() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [prefilledNotes, setPrefilledNotes] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const jumpToConsultation = (formOption: string, contextNote?: string) => {
    setSelectedPlan(formOption);
    if (contextNote) {
      setPrefilledNotes(contextNote);
    }

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        nameInputRef.current?.focus({ preventScroll: true });
      }, 350);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <a
        href="#main-content"
        className="visually-hidden rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <HeroSection />
        <AboutSection />
        <CoverageShowcase onSelectPlanForConsultation={jumpToConsultation} />
        <ResourcesSection onSelectGuideTopic={jumpToConsultation} />
        <ConsultationSection
          selectedPlan={selectedPlan}
          onSelectedPlanChange={setSelectedPlan}
          prefilledNotes={prefilledNotes}
          onPrefilledNotesChange={setPrefilledNotes}
          nameInputRef={nameInputRef}
        />
      </main>

      <Footer />
    </div>
  );
}
