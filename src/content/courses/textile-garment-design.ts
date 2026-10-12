import type { CourseLandingContent } from "./types";
import { CHART_UNIT_LABEL, CONVERSION_NOTE, marketPoints } from "./currency";

// Source: Figma frame "Textile & garment designer" (screenshots + PDF) — see
// content-source/courses/textile-garment-design.md
//
// Wording is verbatim from Figma except: long dashes were reworded, and
// Figma-placeholder values (price, seats, rating, learner counts, case-study
// count) are left out. The following are NOT in Figma in textile form and are
// marked CORRECTED / MISSING:
//   - NO MODULE LIST: Figma only has the UI/UX modules, so none are shown
//     (decision confirmed by the client). Tools and the syllabus CTA are shown.
//   - CORRECTED: offer-card programme name and first highlight were UI/UX.
//   - Source citations are [EDIT] in Figma, so no named sources are shown.
// FAQ answers are PROVISIONAL.

export const textileGarmentDesign: CourseLandingContent = {
  slug: "textile-garment-design",
  // Matches the existing course title, so the hero facts come from the CMS.
  courseTitle: "Textile & Garment Design",
  // Shortened from "Textile & Garment Design Academy" so it fits the mobile header.
  academyLabel: "TEXTILE & GARMENT ACADEMY",
  visual: "garment",

  hero: {
    badges: ["Beginner-friendly", "Mentor-led", "Placement support"],
    lead: "Become a job-ready",
    role: "Textile & garment designer",
    tail: ", even if you can't sketch and have zero design background.",
    sub: "A hands-on, mentor-led program that turns you into a hireable designer with a real portfolio recruiters respond to, not just certificates.",
    // CORRECTED: Figma still said "UI/UX Design Master Program"
    programName: "Textile & Garment Design Master Program",
    highlights: [
      // CORRECTED: Figma still said "Figma, design systems & prototyping".
      // Built from the tools Figma lists for this course.
      "Illustrator, CLO 3D & pattern making",
      "Portfolio-ready case studies",
      "Mentor feedback on every project",
      "Resume + interview + placement support",
      "Certificate on completion",
    ],
    chips: ["Live projects", "1:1 mentorship", "Interview prep", "Portfolio review"],
  },

  stuck: {
    title: "Watching YouTube tutorials for months, but still can't land a design job?",
    sub: "You don't have a knowledge problem. You have a direction, feedback, and portfolio problem. Here's the gap, and how we close it.",
    rows: [
      {
        problem: "Endless YouTube tutorials with no clear path or structure",
        fix: "A structured, step-by-step path from zero to hireable",
      },
      {
        problem: "No real projects, so no portfolio to show recruiters",
        fix: "Build real, portfolio-ready case studies on live briefs",
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
        problem: "Confused between hand-sketching, CAD, and which skill actually matters",
        fix: "Dedicated placement support until you land the role",
      },
    ],
  },

  demand: {
    title: "Fashion & garment design is one of the fastest-growing creative careers",
    sub: "You're not entering a shrinking field. Global demand for textile & garment design is compounding, and India is one of the world's largest apparel hubs.",
    stats: [
      { value: "9.2%", label: "CAGR of the global fashion & apparel design market (2026 to 2031)" },
      { value: "45,000+", label: "Active textile & garment designer jobs in India at any time" },
      { value: "₹12L+", label: "Senior fashion & garment designer salary in India (per year)" },
      { value: "4.5M+", label: "People employed across India's textile & apparel industry" },
    ],
    chart: {
      title: `Global fashion & apparel design market size (${CHART_UNIT_LABEL}, illustrative growth)`,
      caption:
        "The market is projected to grow at roughly 9.2% per year, with steady, durable demand across fast fashion, sustainable apparel & export manufacturing.",
      points: marketPoints([
        ["2026", 180],
        ["2028", 214],
        ["2030", 255],
        ["2031", 279],
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
    title: "A complete fashion design syllabus, from foundations to placement",
    // DECIDED: the Figma has no module list for this course (only another
    // course's modules), so none are shown: tools and the syllabus CTA only.
    // Add titles to `modules` later and the timeline appears.
    modules: [],
    tools: ["Illustrator", "CLO 3D", "Photoshop", "Pattern Making", "Draping", "Procreate", "Excel (Tech Packs)"],
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
    title: "Your textile & garment design career can start with the next batch.",
    sub: "Seats for the next batch are limited. Talk to a counsellor today. It's free and there's no obligation.",
  },
};
