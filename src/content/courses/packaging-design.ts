import type { CourseLandingContent } from "./types";
import { CHART_UNIT_LABEL, CONVERSION_NOTE, marketPoints } from "./currency";

// Source: Figma frame "Package designer" — see content-source/courses/packaging-design.md
//
// Wording is verbatim from Figma except: long dashes were reworded and
// Figma-placeholder values (price, seats, rating, learner counts, case-study
// count) are left out. CORRECTED against the Figma frame (all were leftovers
// from the UI/UX page or typos):
//   - header label "UI / UX ACADEMY"  ->  "PACKAGE DESIGN ACADEMY"
//   - chart title "UI/UX design market size"  ->  "Global packaging design market size"
//   - caption "grow at roughly 32% per year ... tech design"  ->  6.5% to match the stat
//   - typos "can't t sketch", "on ive briefs"
// Source citations are [EDIT] in Figma, so no named sources are shown.
// FAQ answers are PROVISIONAL.

export const packagingDesign: CourseLandingContent = {
  slug: "packaging-design",
  // Matches the existing course title, so the hero facts come from the CMS.
  courseTitle: "Packaging Design",
  academyLabel: "PACKAGE DESIGN ACADEMY",
  visual: "packaging",

  hero: {
    badges: ["Beginner-friendly", "Mentor-led", "Placement support"],
    lead: "Become a job-ready",
    role: "Package designer",
    tail: ", even if you can't sketch and have zero design background.",
    sub: "A hands-on, mentor-led program that turns you into a hireable package & brand designer with a real portfolio recruiters respond to, not just certificates.",
    programName: "Package Design Master Program",
    highlights: [
      "Illustrator, Photoshop & structural dielines",
      "Portfolio-ready packaging case studies",
      "Mentor feedback on every project",
      "Resume + interview + placement support",
      "Certificate on completion",
    ],
    chips: ["Live projects", "1:1 mentorship", "Interview prep", "Portfolio review"],
  },

  stuck: {
    title: "Watching free tutorials for months, but still not job-ready?",
    sub: "You don't have a knowledge problem. You have a direction, feedback, and portfolio problem. Here's the gap, and how we close it.",
    rows: [
      {
        problem: "Endless YouTube tutorials with no clear path or structure",
        fix: "A structured, step-by-step path from zero to hireable",
      },
      {
        problem: "No real projects, so no portfolio to show recruiters",
        fix: "Build real, portfolio-ready design projects on live briefs",
      },
      {
        problem: "Nobody reviews your work, so mistakes never get fixed",
        fix: "1:1 mentor feedback on every design you make",
      },
      {
        problem: "\"Certified\" but can't clear a single design interview",
        fix: "Mock interviews, resume & portfolio prep before you apply",
      },
      {
        problem: "Confused between Illustrator, Photoshop, and which tool actually matters",
        fix: "Dedicated placement support until you land the role",
      },
    ],
  },

  demand: {
    title: "Package design is one of the fastest-growing branding careers",
    sub: "You're not entering a shrinking field. Global demand for packaging & brand design is compounding, and India is one of its biggest hiring markets.",
    stats: [
      { value: "6.5%", label: "CAGR of the global packaging design market (2026 to 2031)" },
      { value: "18,000+", label: "Active package & brand designer jobs in India at any time" },
      { value: "₹14L+", label: "Senior package & brand designer salary in India (per year)" },
      { value: "67%", label: "Of purchase decisions influenced by packaging on the shelf" },
    ],
    chart: {
      title: `Global packaging design market size (${CHART_UNIT_LABEL}, illustrative growth)`,
      caption: "The market is projected to grow at roughly 6.5% per year.",
      points: marketPoints([
        ["2026", 25.1],
        ["2028", 28.6],
        ["2030", 32.9],
        ["2031", 35.2],
      ]),
    },
    sources: `${CONVERSION_NOTE} Figures are industry estimates; year-by-year bar values are illustrative of the growth rate shown.`,
  },

  why: {
    title: "Not another video course. A path to getting hired.",
    sub: "Everything here is built around one outcome: you walk out with a portfolio and the confidence to clear real interviews.",
    cards: [
      {
        icon: "mentor",
        title: "Learn from working designers",
        body: "Mentors who ship real packaging for real brands, not just theory. Get feedback that mirrors what happens on the job.",
      },
      {
        icon: "projects",
        title: "Real projects, real portfolio",
        body: "Work on live briefs and case studies you can show recruiters, the #1 thing that gets you shortlisted.",
      },
      {
        icon: "feedback",
        title: "1:1 feedback on everything",
        body: "Every design you make gets personal review, so you actually improve instead of repeating mistakes.",
      },
      {
        icon: "placement",
        title: "Placement & interview support",
        body: "Resume building, mock interviews, and referrals to help you convert learning into a job offer.",
      },
      {
        icon: "beginner",
        title: "Beginner-friendly path",
        body: "No design or engineering background needed. We start from absolute basics and build up, step by step.",
      },
      {
        icon: "certificate",
        title: "Recognised certificate",
        body: "Earn a course completion certificate you can add to LinkedIn and your resume.",
      },
    ],
  },

  curriculum: {
    title: "A complete package design syllabus, from foundations to placement",
    sub: "Structured modules that take you from \"what is package design?\" to a job-ready portfolio.",
    modules: [
      { title: "Foundations of Package & Brand Design" },
      { title: "Illustrator & Photoshop for Packaging" },
      { title: "Structural Design & Dielines" },
      { title: "Print Production & Materials" },
      { title: "Portfolio & Live Design Projects" },
      { title: "Career & Placement Prep" },
    ],
    tools: ["Illustrator", "Photoshop", "InDesign", "Dieline", "Figma", "KeyShot", "Procreate"],
    ctaLabel: "Get the Full Syllabus + Fee Details",
  },

  // PROVISIONAL: Figma has the questions but not the answers.
  faq: [
    {
      q: "Do I need an engineering or design background?",
      a: "No. The program is beginner-friendly and no design or engineering background is needed. We start from absolute basics and build up, step by step.",
    },
    {
      q: "Will I get a job after the course?",
      a: "Everything in the program is built around getting you hired: a real portfolio, 1:1 mentor feedback, mock interviews, resume building and referrals, with dedicated placement support until you land the role.",
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
    title: "Your package design career can start with the next batch.",
    sub: "Seats for the next batch are limited. Talk to a counsellor today. It's free and there's no obligation.",
  },
};
