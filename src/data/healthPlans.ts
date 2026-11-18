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
  subtitle: string;
  summary: string;
  formOption: string;
  image: string;
  imageAlt: string;
  highlights: string[];
}

export const HEALTH_PLAN_CATEGORIES: HealthPlanCategory[] = [
  {
    id: "individual",
    code: "01",
    shortLabel: "Individual & Family",
    title: "Individual & Family Health Plans",
    subtitle: "Covered California and direct carrier options",
    summary:
      "Compare Bronze, Silver, Gold, and Platinum medical plans side by side so your monthly premium and annual out-of-pocket limit fit how your household actually uses care.",
    formOption: "Individual & Family Health",
    image: "/images/hero-consultation.jpg",
    imageAlt:
      "Health insurance advisor reviewing individual medical plan comparisons with a California couple",
    highlights: [
      "Verify Inland Empire doctors and medical groups",
      "Check Covered California premium tax credits",
      "Compare HMO, EPO, PPO, and HSA-eligible tiers",
    ],
  },
  {
    id: "medicare",
    code: "02",
    shortLabel: "Medicare & Seniors",
    title: "Medicare, Medigap & Part D",
    subtitle: "Turning 65 and annual plan reviews",
    summary:
      "Understand Original Medicare, Medigap Supplement Plan G and N, and Medicare Advantage plans clearly so you avoid penalties and keep preferred doctors.",
    formOption: "Medicare & Senior Plans",
    image: "/images/california-couple.jpg",
    imageAlt:
      "Smiling couple in their 60s walking along a sunlit tree-lined sidewalk in Southern California",
    highlights: [
      "Compare Medigap open access vs. Advantage networks",
      "Check prescription drug formularies at your pharmacy",
      "Time Part B and employer transitions accurately",
    ],
  },
  {
    id: "group",
    code: "03",
    shortLabel: "Small Business",
    title: "Small Business Group Benefits",
    subtitle: "California employer teams of 1 to 100",
    summary:
      "Offer dependable medical, dental, and vision coverage that helps you attract local talent while keeping employer payroll contributions predictable.",
    formOption: "Small Business Group Health",
    image: "/images/guide-advisor-desk.jpg",
    imageAlt:
      "Advisor sitting at a modern desk reviewing small business employee health benefit choices",
    highlights: [
      "Structure employer contribution tiers cleanly",
      "Offer dual-option HMO and PPO employee choices",
      "Ongoing renewal reviews and staff onboarding help",
    ],
  },
  {
    id: "supplemental",
    code: "04",
    shortLabel: "Dental & Vision",
    title: "Dental, Vision & Supplemental Care",
    subtitle: "Everyday preventive care and deductible protection",
    summary:
      "Round out your medical coverage with PPO dental, routine vision, accident, and hospital indemnity plans built to keep surprise bills manageable.",
    formOption: "Dental, Vision & Supplemental",
    image: "/images/guide-family-group.jpg",
    imageAlt:
      "Multi-generational California family smiling together outdoors on a sunny patio",
    highlights: [
      "Check dentist networks and major-service waiting periods",
      "Predictable frame, lens, and annual eye exam benefits",
      "Cash-benefit coverage alongside Bronze or HSA plans",
    ],
  },
];

export const CONSULTATION_OPTIONS = [
  "Individual & Family Health",
  "Medicare & Senior Plans",
  "Small Business Group Health",
  "Dental, Vision & Supplemental",
  "I am not sure which plan fits yet",
] as const;

export interface ResourceGuide {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  readTime: string;
  keyTakeaways: string[];
  formOption: string;
}

export const RESOURCE_GUIDES: ResourceGuide[] = [
  {
    id: "five-checks",
    tag: "Plan Selection",
    title: "5 Things You Should Check Before Choosing Health Insurance",
    excerpt:
      "Choosing the right health plan starts before comparing monthly premiums. Check doctor networks, drug tiers, and annual caps first.",
    image: "/images/guide-advisor-desk.jpg",
    imageAlt:
      "Health insurance advisor discussing coverage documents with two clients at an office desk",
    readTime: "3 min read",
    formOption: "Individual & Family Health",
    keyTakeaways: [
      "Confirm both your primary physician and preferred medical group participate in the exact network ID, not just the carrier brand.",
      "Look up every ongoing prescription in the plan's drug formulary to spot tier 3 or specialty copays early.",
      "Compare the annual out-of-pocket maximum alongside twelve months of premiums to see your true worst-case cost.",
      "Verify whether your household income qualifies for Covered California monthly tax credits or Silver CSR savings.",
      "Check if a Qualifying Life Event gives you a 60-day Special Enrollment window outside November to January.",
    ],
  },
  {
    id: "family-budget",
    tag: "Family Coverage",
    title: "How To Protect Your Family's Health On Any Budget",
    excerpt:
      "Quality family coverage does not require overpaying for unused benefits. Learn how to balance monthly cost with real medical access.",
    image: "/images/guide-family-group.jpg",
    imageAlt:
      "Multi-generational family smiling together outdoors in bright California daylight",
    readTime: "4 min read",
    formOption: "Individual & Family Health",
    keyTakeaways: [
      "Separate routine preventive visits (covered at $0 in-network) from emergency and specialist scenarios when sizing deductibles.",
      "Compare HMO vs. PPO pricing carefully: an HMO tied to a strong local Inland Empire medical group can save thousands per year.",
      "Consider pairing an HSA-compatible Bronze plan with supplemental accident coverage if your family rarely visits specialists.",
      "Review household coverage every autumn during Open Enrollment before automatic renewals take effect.",
    ],
  },
  {
    id: "medicare-guide",
    tag: "Medicare Timing",
    title: "A Simple Guide To Medicare Timing And Plan Choices",
    excerpt:
      "Turning 65 or retiring off employer health insurance comes with strict windows. Follow clear steps to avoid penalties.",
    image: "/images/california-couple.jpg",
    imageAlt:
      "Active smiling senior couple walking together along a sunlit California street",
    readTime: "4 min read",
    formOption: "Medicare & Senior Plans",
    keyTakeaways: [
      "Mark your 7-month Initial Enrollment Period around your 65th birthday unless you have creditable active employer coverage.",
      "Weigh nationwide provider flexibility under Medigap Plan G against lower monthly premiums in local Medicare Advantage plans.",
      "Run your exact medication list each fall between October 15 and December 7 because Part D formularies update every year.",
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
    question: "Does it cost extra to work with David Cutting Insurance?",
    answer:
      "No. California health insurance rates are set by the carrier and state marketplace, so your monthly premium is identical whether you enroll on your own or with David's help. Consultations are free.",
  },
  {
    id: "outside-open-enrollment",
    question: "Can I enroll in a health plan outside Open Enrollment?",
    answer:
      "Yes, if you have a Qualifying Life Event such as losing job coverage, moving, getting married, or turning 26 (usually a 60-day window). Small business group health plans can start any month.",
  },
  {
    id: "in-person-upland",
    question: "Can we meet in person in Upland or review options by phone?",
    answer:
      "Both options are available Monday to Friday from 9:00 AM to 5:30 PM. Call (909) 985-8098 or visit 163 S Euclid Ave, Upland, CA 91786, with free parking and wheelchair-accessible entry.",
  },
];
