import type { CourseLandingContent } from "./types";

// Source: Figma frame "ui/ux" — see content-source/courses/ui-ux-design.md
// Wording is verbatim from Figma except where marked PROVISIONAL.

export const uiUxDesign: CourseLandingContent = {
  slug: "ui-ux-design",
  courseTitle: "UI/UX Design",
  academyLabel: "UI / UX ACADEMY",
  visual: "wireframe",

  hero: {
    badges: ["Beginner-friendly", "Mentor-led", "Placement support"],
    lead: "Become a job-ready",
    role: "UI/UX designer",
    tail: ", even if you can't draw and have zero design background.",
    sub: "A hands-on, mentor-led program that turns you into a hireable designer with a real portfolio recruiters respond to, not just certificates.",
    programName: "UI/UX Design Master Program",
    highlights: [
      "Figma, design systems & prototyping",
      "Portfolio-ready case studies",
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
        problem: "Confused between UI, UX, tools, and what companies actually want",
        fix: "Dedicated placement support until you land the role",
      },
    ],
  },

  demand: {
    title: "UI/UX is one of the fastest-growing design careers",
    sub: "You're not entering a shrinking field. Global demand for UI/UX skills is compounding, and India is one of its biggest hiring markets.",
    stats: [
      { value: "32%", label: "CAGR of the UI/UX design market (2026 to 2031)" },
      { value: "15,000+", label: "Active UX designer jobs in India at any time" },
      { value: "₹20L+", label: "Senior UI/UX designer salary in India (per year)" },
      { value: "83%", label: "More conversions from every 10% more invested in UX" },
    ],
    chart: {
      title: "UI/UX design market size (₹ lakh, illustrative growth)",
      caption:
        "The market is projected to grow at roughly 32% per year, one of the steepest in tech design.",
      points: [
        { year: "2026", label: "₹25,500 L", value: 25500 },
        { year: "2028", label: "₹44,900 L", value: 44900 },
        { year: "2030", label: "₹78,300 L", value: 78300 },
        { year: "2031", label: "₹1,03,000 L", value: 103000 },
      ],
    },
    sources:
      "Sources: UI/UX market size & 32% CAGR: MindInventory, UI/UX Statistics 2026; India job & salary data: Product Leadership, UX Hiring in India; market outlook: Mordor Intelligence. L means lakh. Figures are industry estimates; year-by-year bar values are illustrative of the cited growth rate.",
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
        body: "No design or coding background needed. We start from absolute basics and build up, step by step.",
      },
      {
        icon: "certificate",
        title: "Recognised certificate",
        body: "Earn a course completion certificate you can add to LinkedIn and your resume.",
      },
    ],
  },

  curriculum: {
    title: "A complete UI/UX syllabus, from foundations to placement",
    sub: "Structured modules that take you from \"what is UX?\" to a job-ready portfolio.",
    modules: [
      { title: "Foundations of UI & UX Design" },
      { title: "UX Research & Strategy" },
      { title: "Wireframing & Prototyping in Figma" },
      { title: "Visual & Interaction Design" },
      { title: "Portfolio & Live Projects" },
      { title: "Career & Placement Prep" },
    ],
    tools: ["Figma", "FigJam", "Adobe XD", "Photoshop", "Illustrator", "Maze", "Notion"],
    ctaLabel: "Get the Full Syllabus + Fee Details",
  },

  // PROVISIONAL: Figma has the questions but not the answers. These answers
  // only restate facts already stated elsewhere on the page. Needs sign-off.
  faq: [
    {
      q: "Do I need a design or coding background?",
      a: "No. The program is beginner-friendly and no design or coding background is needed. We start from absolute basics and build up, step by step.",
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
    title: "Your UI/UX career can start with the next batch.",
    sub: "Seats for the next batch are limited. Talk to a counsellor today. It's free and there's no obligation.",
  },
};
