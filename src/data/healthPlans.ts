export type PlanCategoryId =
  | "individual"
  | "medicare"
  | "group"
  | "supplemental";

export interface HealthPlanCategory {
  id: PlanCategoryId;
  code: string;
  shortLabel: string;
  title: string;
  audience: string;
  summary: string;
  formOption: string;
  planStructures: string[];
  whatDavidChecks: string[];
  idealFor: string;
}

export const HEALTH_PLAN_CATEGORIES: HealthPlanCategory[] = [
  {
    id: "individual",
    code: "01",
    shortLabel: "Individual & Family",
    title: "Individual & Family Health",
    audience: "Covered California and off-exchange plans",
    summary:
      "Compare Bronze, Silver, Gold, and Platinum medical plans side by side so your monthly premium and out-of-pocket limit match how your household actually uses care.",
    formOption: "Individual & Family Health",
    planStructures: ["HMO", "PPO", "EPO", "HSA Eligible"],
    whatDavidChecks: [
      "Covered California premium tax credit and CSR silver savings eligibility",
      "Whether your Inland Empire primary doctor and specialists are in network",
      "Tier placement and annual cost for your family's current prescriptions",
      "Qualifying Life Event deadlines after a job change, move, or marriage",
    ],
    idealFor:
      "Self-employed Californians, households between employer plans, and families buying on or off the state marketplace.",
  },
  {
    id: "medicare",
    code: "02",
    shortLabel: "Medicare & Seniors",
    title: "Medicare & Senior Coverage",
    audience: "Turning 65, Advantage, Medigap, and Part D",
    summary:
      "Sort out Original Medicare, Medigap supplements, and Medicare Advantage plans without getting lost in mailers, hidden network rules, or late-enrollment penalties.",
    formOption: "Medicare & Senior Plans",
    planStructures: ["Medigap Plan G & N", "Medicare Advantage", "Part D Rx", "Part B Timing"],
    whatDavidChecks: [
      "Hospital and medical group access across San Bernardino and LA counties",
      "Total yearly prescription drug expense across preferred pharmacies",
      "Tradeoffs between lower-premium Advantage plans and open-network Medigap",
      "Initial Enrollment Period and Annual Enrollment Period dates",
    ],
    idealFor:
      "Adults approaching age 65, retirees leaving employer coverage, and current beneficiaries reviewing annual plan changes.",
  },
  {
    id: "group",
    code: "03",
    shortLabel: "Small Business",
    title: "Small Business Group Health",
    audience: "California employers with 1 to 100 team members",
    summary:
      "Offer competitive medical, dental, and vision benefits that help you hire and retain local staff while keeping your company contribution predictable.",
    formOption: "Small Business Group Health",
    planStructures: ["Small Group PPO & HMO", "Dual-Option Tiers", "Section 125", "Employee Onboarding"],
    whatDavidChecks: [
      "Employer contribution minimums and budget scenarios across tier levels",
      "Multi-plan options so staff can pick between lower premiums or wider PPO access",
      "Clean annual renewal comparisons before automatic rate increases lock in",
      "Direct support for employee enrollment, additions, and COBRA questions",
    ],
    idealFor:
      "Upland and Inland Empire small business owners, family practices, trades, and growing teams setting up or renewing group benefits.",
  },
  {
    id: "supplemental",
    code: "04",
    shortLabel: "Dental & Vision",
    title: "Dental, Vision & Supplemental",
    audience: "Standalone care and out-of-pocket protection",
    summary:
      "Pair your medical plan with affordable dental, vision, accident, or hospital indemnity protection so routine cleanings and surprise bills stay manageable.",
    formOption: "Dental, Vision & Supplemental",
    planStructures: ["PPO Dental", "Vision Care", "Hospital Indemnity", "Accident Cover"],
    whatDavidChecks: [
      "Waiting periods on crowns, root canals, and major dental procedures",
      "Annual maximums and local dentist participation before you enroll",
      "Frame, lens, and contact allowances tailored to your yearly eye exams",
      "Cash-benefit supplements that offset high Bronze or HSA deductibles",
    ],
    idealFor:
      "Individuals on Medicare Original, high-deductible medical policyholders, and families wanting predictable dental and eye care.",
  },
];

export const CONSULTATION_OPTIONS = [
  "Individual & Family Health",
  "Medicare & Senior Plans",
  "Small Business Group Health",
  "Dental, Vision & Supplemental",
  "I am not sure which plan fits yet",
] as const;

export interface ProcessStep {
  number: string;
  title: string;
  detail: string;
}

export const ADVISORY_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Start with your doctors and prescriptions",
    detail:
      "Before comparing prices, we list the clinics, specialists, and medications you rely on so we filter out plans that would force an unexpected switch.",
  },
  {
    number: "02",
    title: "Compare full-year cost, not just the monthly bill",
    detail:
      "A low monthly premium with a high deductible can cost more over twelve months. We walk through copays, deductibles, and out-of-pocket caps side by side.",
  },
  {
    number: "03",
    title: "Enroll accurately and keep a local point of contact",
    detail:
      "Get help submitting your application cleanly during Open Enrollment or a Qualifying Life Event, then call the Upland office whenever life or prescriptions change.",
  },
];

export interface EnrollmentWindow {
  label: string;
  dates: string;
  note: string;
}

export const ENROLLMENT_WINDOWS: EnrollmentWindow[] = [
  {
    label: "Covered California Open Enrollment",
    dates: "Nov 1 to Jan 31",
    note: "Enroll or switch individual and family plans for the coming year.",
  },
  {
    label: "Medicare Annual Enrollment",
    dates: "Oct 15 to Dec 7",
    note: "Review Advantage and Part D drug formularies for next year's changes.",
  },
  {
    label: "Special Enrollment Window",
    dates: "60 days from event",
    note: "Available year-round after losing job coverage, moving, or adding a dependent.",
  },
];

export interface PrepTrack {
  id: "individual" | "medicare" | "employer";
  label: string;
  headline: string;
  formOption: string;
  checklist: { id: string; text: string; reason: string }[];
}

export const PREP_TRACKS: PrepTrack[] = [
  {
    id: "individual",
    label: "Individual or Family",
    headline: "What helps us quote Covered California and off-exchange plans fast",
    formOption: "Individual & Family Health",
    checklist: [
      {
        id: "ind-zip",
        text: "ZIP code and household member ages",
        reason: "California pricing and clinic networks vary directly by county and age.",
      },
      {
        id: "ind-income",
        text: "Estimated household MAGI income for the year",
        reason: "Determines eligibility for monthly federal and state premium tax credits.",
      },
      {
        id: "ind-doctors",
        text: "Preferred doctors, medical group, or hospital",
        reason: "Lets us verify HMO vs. PPO participation before you commit.",
      },
      {
        id: "ind-rx",
        text: "Current prescription names and dosages",
        reason: "Prevents surprise drug-tier copays after your policy starts.",
      },
    ],
  },
  {
    id: "medicare",
    label: "Turning 65 or Medicare",
    headline: "What to gather before your Medicare or Medigap review",
    formOption: "Medicare & Senior Plans",
    checklist: [
      {
        id: "med-card",
        text: "Medicare Part A and Part B effective dates",
        reason: "Anchors your guaranteed-issue Medigap and Advantage enrollment windows.",
      },
      {
        id: "med-doctors",
        text: "Primary physician and specialist names",
        reason: "Confirms whether your Inland Empire doctors accept a specific Advantage network.",
      },
      {
        id: "med-rx",
        text: "Exact medication list and preferred pharmacy",
        reason: "Identifies which Part D or Advantage plan keeps annual drug costs lowest.",
      },
      {
        id: "med-employer",
        text: "Current employer or retiree plan summary",
        reason: "Helps avoid Part B or Part D late penalties when transitioning off work coverage.",
      },
    ],
  },
  {
    id: "employer",
    label: "Small Business Owner",
    headline: "What we use to build a small-group health quote",
    formOption: "Small Business Group Health",
    checklist: [
      {
        id: "emp-census",
        text: "Employee census (ages or birthdates and ZIP codes)",
        reason: "Required by California carriers to calculate accurate small-group composite rates.",
      },
      {
        id: "emp-budget",
        text: "Target monthly employer contribution per employee",
        reason: "Helps us balance employee affordability with predictable company payroll cost.",
      },
      {
        id: "emp-renewal",
        text: "Current group plan billing summary (if renewing)",
        reason: "Gives a clear baseline to test alternative carriers and benefit tiers.",
      },
      {
        id: "emp-lines",
        text: "Interest in adding dental, vision, or life riders",
        reason: "Bundled ancillary coverage often strengthens recruiting at low marginal cost.",
      },
    ],
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const HEALTH_FAQS: FaqItem[] = [
  {
    id: "cost-broker",
    question: "Does it cost extra to work with a local health insurance broker?",
    answer:
      "No. Health insurance premiums in California are standardized by law, meaning you pay the exact same monthly rate whether you enroll directly with a carrier, through Covered California, or with guidance from David Cutting. Your consultation is free.",
  },
  {
    id: "hmo-vs-ppo",
    question: "How do I decide between an HMO, EPO, and PPO health plan?",
    answer:
      "HMO plans usually offer lower premiums and predictable copays when you coordinate care through a primary care doctor in one medical group. EPO and PPO plans give more direct access to specialists without referrals, and PPO plans include partial coverage for out-of-network providers. During your consultation, we check where your actual doctors sit before recommending a structure.",
  },
  {
    id: "outside-open-enrollment",
    question: "Can I get health insurance outside Open Enrollment?",
    answer:
      "Yes, if you experience a Qualifying Life Event such as losing job-based insurance, turning 26, moving to a new ZIP code, getting married, or welcoming a child. Most Special Enrollment windows last 60 days. Small businesses can also start group coverage during any month of the year.",
  },
  {
    id: "medicare-supplement-vs-advantage",
    question: "What is the main difference between Medigap and Medicare Advantage?",
    answer:
      "Medigap (Medicare Supplement) pairs with Original Medicare so you can visit any provider nationwide who accepts Medicare, usually with a higher monthly premium and very few out-of-pocket medical bills. Medicare Advantage bundles Part A, Part B, and often Part D into a local network plan with low or zero monthly premiums and copays as you use care.",
  },
  {
    id: "in-person-upland",
    question: "Can we meet in person in Upland or review everything by phone?",
    answer:
      "Both options are available Monday through Friday from 9:00 AM to 5:30 PM. You can call (909) 985-8098 for a phone walkthrough or visit the office at 163 S Euclid Ave, Upland, CA 91786, which has parking and wheelchair-accessible entry.",
  },
];
