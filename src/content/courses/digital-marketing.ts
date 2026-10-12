import type { CourseLandingContent } from "./types";
import { CHART_UNIT_LABEL, CONVERSION_NOTE, marketPoints } from "./currency";

// Source: Figma frame "digital marketer" — see content-source/courses/digital-marketing.md
// Wording is verbatim from Figma, except: long dashes were reworded, the
// Figma-placeholder numbers (price, seats, rating, learner counts) are left
// out, and three "design" leftovers in the Why cards were changed to marketing
// wording (marked CORRECTED). FAQ answers are PROVISIONAL.

export const digitalMarketing: CourseLandingContent = {
  slug: "digital-marketing",
  // Must match a row in the CMS `courses` table for the hero facts to appear.
  courseTitle: "Digital Marketing",
  academyLabel: "DIGITAL MARKETING ACADEMY",
  visual: "campaign",

  hero: {
    badges: ["Beginner-friendly", "Mentor-led", "Placement support"],
    lead: "Become a job-ready",
    role: "digital marketer",
    tail: ", even if you've never run an ad or built a campaign before.",
    sub: "A hands-on, mentor-led program that turns you into a hireable marketer with a real campaign portfolio recruiters respond to, not just certificates.",
    programName: "Digital Marketing Master Program",
    highlights: [
      "SEO, Google Ads & Meta Ads mastery",
      "5+ live, portfolio-ready campaigns",
      "Mentor feedback on every campaign",
      "Resume + interview + placement support",
      "Certificate on completion",
    ],
    chips: ["Live campaigns", "1:1 mentorship", "Interview prep", "Portfolio review"],
  },

  stuck: {
    title: "Watching free tutorials for months, but still not job-ready?",
    sub: "You don't have a knowledge problem. You have a direction, feedback, and campaign-experience problem. Here's the gap, and how we close it.",
    rows: [
      {
        problem: "Endless YouTube tutorials with no clear path or structure",
        fix: "A structured, step-by-step path from zero to hireable",
      },
      {
        problem: "No real ad spend or campaigns, so no proof to show recruiters",
        fix: "Run real, portfolio-ready campaigns on live briefs and budgets",
      },
      {
        problem: "Nobody reviews your work, so mistakes never get fixed",
        fix: "1:1 mentor feedback on every campaign you run",
      },
      {
        problem: "\"Certified\" but can't clear a single marketing interview",
        fix: "Mock interviews, resume & portfolio prep before you apply",
      },
      {
        problem: "Confused between SEO, ads, content, and what companies actually want",
        fix: "Dedicated placement support until you land the role",
      },
    ],
  },

  demand: {
    title: "Digital marketing is one of India's fastest-growing careers",
    sub: "You're not entering a shrinking field. Businesses are shifting ad budgets online faster than ever, and India is one of the biggest digital marketing hiring markets in the world.",
    stats: [
      { value: "30%", label: "CAGR of the India digital marketing market (2026 to 2035)" },
      { value: "900M+", label: "Internet users in India, the audience you'll be marketing to" },
      { value: "₹20L+", label: "Senior digital marketer salary in India (per year)" },
      { value: "40%", label: "Higher pay for AI-skilled digital marketers vs. non-AI peers" },
    ],
    chart: {
      title: `India digital marketing market size (${CHART_UNIT_LABEL}, illustrative growth)`,
      caption:
        "The market is projected to grow at roughly 30% per year, among the steepest growth curves in Indian tech-enabled industries.",
      points: marketPoints([
        ["2026", 8.7],
        ["2028", 14.8],
        ["2030", 25.1],
        ["2032", 42.6],
      ]),
    },
    sources: `Sources: India digital marketing market size & 30.2% CAGR to 2035: Expert Market Research, India Digital Marketing Market; salary data: Kraftshala, Digital Marketing Salary in India 2026 and upGrad; AI-skills salary premium: SalaryInfo.in, citing Michael Page India 2025 to 26. ${CONVERSION_NOTE} Figures are industry estimates; year-by-year bar values are illustrative of the cited growth rate.`,
  },

  why: {
    title: "Not another video course. A path to getting hired.",
    sub: "Everything here is built around one outcome: you walk out with a portfolio and the confidence to clear real interviews.",
    cards: [
      {
        icon: "mentor",
        // CORRECTED: Figma said "Learn from working designers"
        title: "Learn from working marketers",
        body: "Mentors who ship real products, not just theory. Get feedback that mirrors what happens on the job.",
      },
      {
        icon: "projects",
        title: "Real projects, real portfolio",
        body: "Work on live briefs and case studies you can show recruiters, the #1 thing that gets you shortlisted.",
      },
      {
        icon: "feedback",
        title: "1:1 feedback on everything",
        // CORRECTED: Figma said "Every design you make"
        body: "Every campaign you run gets personal review, so you actually improve instead of repeating mistakes.",
      },
      {
        icon: "placement",
        title: "Placement & interview support",
        body: "Resume building, mock interviews, and referrals to help you convert learning into a job offer.",
      },
      {
        icon: "beginner",
        title: "Beginner-friendly path",
        // CORRECTED: Figma said "No design or coding background needed"
        body: "No marketing or technical background needed. We start from absolute basics and build up, step by step.",
      },
      {
        icon: "certificate",
        title: "Recognised certificate",
        body: "Earn a course completion certificate you can add to LinkedIn and your resume.",
      },
    ],
  },

  curriculum: {
    title: "A complete digital marketing syllabus, from foundations to placement",
    sub: "Structured modules that take you from \"what is digital marketing?\" to a job-ready campaign portfolio.",
    modules: [
      { title: "Foundations of Digital Marketing" },
      { title: "SEO & Content Marketing" },
      { title: "Social Media & Paid Advertising" },
      { title: "Analytics, Email & Automation" },
      { title: "Portfolio & Live Campaigns" },
      { title: "Career & Placement Prep" },
    ],
    tools: ["Google Ads", "Meta Ads Manager", "Google Analytics (GA4)", "SEMrush", "Canva", "Mailchimp", "HubSpot"],
    ctaLabel: "Get the Full Syllabus + Fee Details",
  },

  // PROVISIONAL: Figma has the questions but not the answers.
  faq: [
    {
      q: "Do I need a marketing or technical background?",
      a: "No. The program is beginner-friendly and no marketing or technical background is needed. We start from absolute basics and build up, step by step.",
    },
    {
      q: "Will I get a job after the course?",
      a: "Everything in the program is built around getting you hired: real campaigns for your portfolio, 1:1 mentor feedback, mock interviews, resume building and referrals, with dedicated placement support until you land the role.",
    },
    {
      q: "Is it online or classroom?",
      a: "Book a free counselling call and our team will confirm the format and timings of the next batch.",
    },
    {
      q: "What is the fee and are there EMI options?",
      a: "Fee details, including any EMI options, are shared during your free counselling call.",
    },
  ],

  finalCta: {
    title: "Your digital marketing career can start with the next batch.",
    sub: "Seats for the next batch are limited. Talk to a counsellor today. It's free and there's no obligation.",
  },
};
