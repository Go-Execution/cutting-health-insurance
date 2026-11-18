export type PlanCategoryId =
  | "auto-home"
  | "commercial"
  | "healthcare"
  | "umbrella-life";

export interface CoverageCategory {
  id: PlanCategoryId;
  priorityTag: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  formOption: string;
  image: string;
  imageAlt: string;
  highlights: string[];
}

export const COVERAGE_CATEGORIES: CoverageCategory[] = [
  {
    id: "auto-home",
    priorityTag: "Primary Focus",
    shortLabel: "Auto & Home",
    title: "Auto & Home Insurance",
    subtitle: "Personal auto, homeowners, condo, and bundle savings",
    summary:
      "As an independent broker, David Cutting shops multiple California carriers to align your auto liability, collision, dwelling replacement, and personal property limits without overpaying.",
    formOption: "Auto & Home Bundle",
    image: "/images/coverage-auto-home.jpg",
    imageAlt:
      "Smiling California couple standing in front of their sunlit home with a modern sedan in the driveway",
    highlights: [
      "Compare multi-carrier auto and homeowners bundles",
      "Match dwelling coverage to realistic California rebuild costs",
      "Review uninsured motorist, glass, and deductible tradeoffs",
    ],
  },
  {
    id: "commercial",
    priorityTag: "Commercial Focus",
    shortLabel: "Commercial Business",
    title: "Commercial Business Insurance",
    subtitle: "General liability, property, commercial auto, and workers' comp",
    summary:
      "Protect your Upland or Inland Empire business operations, vehicles, equipment, and employees with Business Owner Policies and commercial packages tailored to your industry.",
    formOption: "Commercial Business Insurance",
    image: "/images/coverage-commercial.jpg",
    imageAlt:
      "Independent insurance broker reviewing commercial business coverage documents with a local owner",
    highlights: [
      "General liability and Business Owner Policies (BOP)",
      "Commercial auto, tools, inventory, and premises coverage",
      "Certificates of insurance and contract compliance support",
    ],
  },
  {
    id: "healthcare",
    priorityTag: "Health Care",
    shortLabel: "Health Care",
    title: "Health Care & Medical Coverage",
    subtitle: "Covered California, Medicare, and small group health",
    summary:
      "Compare individual, family, Medicare, and small employer health plans across networks and prescription tiers so your doctors stay covered and annual costs remain predictable.",
    formOption: "Health Care & Medical Insurance",
    image: "/images/hero-consultation.jpg",
    imageAlt:
      "Insurance advisor reviewing health care plan comparisons with clients in a sunlit Upland office",
    highlights: [
      "Check Inland Empire doctors and prescription formularies",
      "Evaluate Covered California tax credits and HMO/PPO tiers",
      "Guide Turning 65 Medicare Advantage and Medigap transitions",
    ],
  },
  {
    id: "umbrella-life",
    priorityTag: "Additional Protection",
    shortLabel: "Umbrella & Life",
    title: "Umbrella & Life Insurance",
    subtitle: "Extra liability and family income protection",
    summary:
      "Extend your auto and homeowners liability limits with an affordable personal umbrella policy, and protect family obligations with straightforward term or permanent life coverage.",
    formOption: "Umbrella or Life Insurance",
    image: "/images/guide-family-group.jpg",
    imageAlt:
      "Multi-generational California family smiling together outdoors on a sunny patio",
    highlights: [
      "Excess liability protection above auto and home caps",
      "Term and whole life comparisons across vetted carriers",
      "Clean coordination with existing household policies",
    ],
  },
];

export const CONSULTATION_OPTIONS = [
  "Auto & Home Bundle",
  "Auto Insurance",
  "Homeowners / Renters Insurance",
  "Commercial Business Insurance",
  "Health Care & Medical Insurance",
  "Umbrella or Life Insurance",
  "Review all my current policies",
] as const;

export interface ResourceGuide {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  readTime: string;
  formOption: string;
  keyTakeaways: string[];
}

export const RESOURCE_GUIDES: ResourceGuide[] = [
  {
    id: "auto-home-bundle",
    tag: "Auto & Home",
    title: "5 Things To Check Before Renewing Auto And Home Insurance",
    excerpt:
      "California auto and property rates shift quickly. Learn how an independent broker compares multiple carriers before your renewal locks in.",
    image: "/images/coverage-auto-home.jpg",
    imageAlt:
      "California homeowners standing outside their home with a car parked in the driveway",
    readTime: "3 min read",
    formOption: "Auto & Home Bundle",
    keyTakeaways: [
      "Check whether your homeowners dwelling limit reflects current Inland Empire labor and material rebuild costs.",
      "Compare raising collision/comprehensive deductibles vs. lowering liability limits: keep strong bodily injury and property damage limits.",
      "Ask an independent broker to quote bundled and split-carrier options, since separate insurers sometimes beat a single-company discount.",
      "Verify uninsured/underinsured motorist coverage on your auto policy to protect your household on Southern California highways.",
      "Review multi-policy, safe-driver, and home security discounts at least 30 days ahead of renewal.",
    ],
  },
  {
    id: "commercial-coverage",
    tag: "Commercial Business",
    title: "How Local Businesses Structure Commercial Liability Without Gaps",
    excerpt:
      "From storefront premises and contractor equipment to commercial vehicles, see how to keep coverage clean as your company grows.",
    image: "/images/coverage-commercial.jpg",
    imageAlt:
      "Small business owner and insurance broker reviewing commercial coverage options over a counter",
    readTime: "4 min read",
    formOption: "Commercial Business Insurance",
    keyTakeaways: [
      "Separate personal auto from commercial vehicle exposure whenever staff or business-owned vehicles make deliveries or client visits.",
      "Bundle general liability and business property into a Business Owner Policy (BOP) when eligible for streamlined protection.",
      "Confirm landlord, vendor, and municipal additional-insured requirements before signing a new commercial lease or job contract.",
      "Update payroll and revenue estimates annually so workers' compensation and liability audits bring zero surprises.",
    ],
  },
  {
    id: "healthcare-choices",
    tag: "Health Care",
    title: "Comparing California Health Care, Medicare, And Group Plans",
    excerpt:
      "Whether enrolling through Covered California, turning 65, or offering team benefits, verify your doctors and prescriptions first.",
    image: "/images/guide-advisor-desk.jpg",
    imageAlt:
      "Insurance broker discussing health care coverage documents with two clients at an office desk",
    readTime: "4 min read",
    formOption: "Health Care & Medical Insurance",
    keyTakeaways: [
      "Confirm your primary physician and preferred local medical group sit inside the plan's exact network ID before comparing premiums.",
      "Look at twelve months of premiums plus out-of-pocket maximums rather than choosing solely on the lowest monthly bill.",
      "Prepare early for Medicare Initial Enrollment around age 65 or Special Enrollment windows after changing jobs.",
    ],
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const BROKER_FAQS: FaqItem[] = [
  {
    id: "broker-vs-company",
    question:
      "How is David Cutting Insurance Services different from an insurance company?",
    answer:
      "David Cutting Insurance Services is an independent insurance brokerage (CA License #0752131), not an insurance company itself. Instead of selling policies from just one carrier, David shops and compares multiple insurers on your behalf to find the right fit for your auto, home, commercial business, or health care needs.",
  },
  {
    id: "broker-fee",
    question: "What does it cost to get quotes through an independent broker?",
    answer:
      "Your consultation and policy comparison are free. You get side-by-side guidance across auto, home, commercial business, and health care options without pressure.",
  },
  {
    id: "in-person-upland",
    question: "Can we meet in person in Upland or handle everything by phone?",
    answer:
      "Both options are available Monday to Friday from 9:00 AM to 5:30 PM. Call (909) 985-8098 or visit 163 S Euclid Ave, Upland, CA 91786, with free parking and wheelchair-accessible entry.",
  },
];
