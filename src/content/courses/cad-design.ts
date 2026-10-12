import type { CourseLandingContent } from "./types";
import { CHART_UNIT_LABEL, CONVERSION_NOTE, marketPoints } from "./currency";

// Source: Figma frame "Cad" (the Fashion CADD course) — see content-source/courses/cad-design.md
// Wording is verbatim from Figma, except: long dashes were reworded and the
// Figma-placeholder values (price, seats, rating, learner counts, case-study
// count) are left out. Source citations are still [EDIT] in Figma, so no
// named sources are shown. FAQ answers are PROVISIONAL.

export const cadDesign: CourseLandingContent = {
  slug: "fashion-cadd",
  // Confirmed by the client: this Figma "Cad" frame is the Fashion CADD course.
  // Must match the CMS `courses` row ("Fashion CADD") for the hero facts and
  // for the course card / footer / apply links to resolve.
  courseTitle: "Fashion CADD",
  academyLabel: "CAD DESIGN ACADEMY",
  visual: "blueprint",

  hero: {
    badges: ["Beginner-friendly", "Mentor-led", "Placement support"],
    lead: "Become a job-ready",
    role: "CAD designer",
    tail: ", even if you've never opened AutoCAD before.",
    sub: "A hands-on, mentor-led program that turns you into a hireable CAD / mechanical designer with a real portfolio recruiters respond to, not just certificates.",
    programName: "CAD Design Master Program",
    highlights: [
      "AutoCAD, SolidWorks & Fusion 360",
      "Portfolio-ready case studies",
      "Mentor feedback on every drawing",
      "Resume + interview + placement support",
      "Certificate on completion",
    ],
    chips: ["Live projects", "1:1 mentorship", "Interview prep", "Portfolio review"],
  },

  stuck: {
    title: "Watching YouTube tutorials for months, but still can't land a drafting job?",
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
        problem: "Nobody reviews your drawings, so mistakes never get fixed",
        fix: "1:1 mentor feedback on every drawing you make",
      },
      {
        problem: "\"Certified\" but can't clear a single design interview",
        fix: "Mock interviews, resume & portfolio prep before you apply",
      },
      {
        problem: "Confused between AutoCAD, SolidWorks, and which tool actually matters",
        fix: "Dedicated placement support until you land the role",
      },
    ],
  },

  demand: {
    title: "CAD design is one of the most in-demand engineering skills",
    sub: "You're not entering a shrinking field. Global demand for CAD/CAM skills is compounding, and India is one of its biggest hiring markets.",
    stats: [
      { value: "12%", label: "CAGR of the global CAD software market (2026 to 2031)" },
      { value: "25,000+", label: "Active CAD / drafting jobs in India at any time" },
      { value: "₹15L+", label: "Senior CAD / mechanical designer salary in India (per year)" },
      { value: "78%", label: "Fewer manufacturing errors with proper CAD-driven design review" },
    ],
    chart: {
      title: `Global CAD software market size (${CHART_UNIT_LABEL}, illustrative growth)`,
      caption:
        "The market is projected to grow at roughly 12% per year, with steady, durable demand across manufacturing, construction & product design.",
      points: marketPoints([
        ["2026", 12.4],
        ["2028", 15.6],
        ["2030", 19.6],
        ["2031", 21.9],
      ]),
    },
    sources: `${CONVERSION_NOTE} Figures are industry estimates; year-by-year bar values are illustrative of the growth rate shown.`,
  },

  why: {
    title: "Not another tutorial playlist. A path to getting hired.",
    sub: "Everything here is built around one outcome: you walk out with a portfolio and the confidence to clear real design interviews.",
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
    title: "A complete CAD syllabus, from foundations to placement",
    sub: "Structured modules that take you from \"what is CAD?\" to a job-ready portfolio.",
    modules: [
      { title: "Foundations of 2D & 3D CAD" },
      { title: "AutoCAD Drafting & Documentation" },
      { title: "3D Modeling in SolidWorks / Fusion 360" },
      { title: "Assemblies, Tolerancing & GD&T" },
      { title: "Portfolio & Live Design Projects" },
      { title: "Career & Placement Prep" },
    ],
    tools: ["AutoCAD", "SolidWorks", "Fusion 360", "CATIA", "Revit", "SketchUp", "Civil 3D"],
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
      a: "Everything in the program is built around getting you hired: a real portfolio, 1:1 mentor feedback on every drawing, mock interviews, resume building and referrals, with dedicated placement support until you land the role.",
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
    title: "Your CAD design career can start with the next batch.",
    sub: "Seats for the next batch are limited. Talk to a counsellor today. It's free and there's no obligation.",
  },
};
