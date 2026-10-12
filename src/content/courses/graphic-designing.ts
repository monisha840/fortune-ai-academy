import type { CourseLandingContent } from "./types";
import { CHART_UNIT_LABEL, CONVERSION_NOTE, marketPoints } from "./currency";

// Source: Figma frame "graphic designing" — see content-source/courses/graphic-designing.md
//
// This Figma frame was cloned from the Digital Marketing page. Wording is
// verbatim where it is graphic-design copy. CORRECTED (digital-marketing
// leftovers, replaced with the graphic-design equivalent):
//   - header label "DIGITAL MARKETING ACADEMY"  ->  "GRAPHIC DESIGN ACADEMY"
//   - programme name "Digital Marketing Master Program"
//   - hero sub "hireable marketer with a real campaign portfolio"
//   - stuck section (ad spend, SEO, marketing interview, campaign-experience)
//   - tools list (Google Ads, GA4, SEMrush, Mailchimp, HubSpot); built from
//     the hero bullet "Photoshop, Illustrator & InDesign" plus Canva
//   - module "04 Analytics, Email & Automation" (marketing) is NOT shown
//   - module "03 Adobe creative &SUITE MASTERY" capitalisation fixed
// Figma-placeholder values (price, seats, rating, learner counts) are left out.
// FAQ answers are PROVISIONAL.

export const graphicDesigning: CourseLandingContent = {
  slug: "graphic-designing",
  // Matches the existing course title, so the hero facts come from the CMS.
  courseTitle: "Graphic Designing",
  academyLabel: "GRAPHIC DESIGN ACADEMY",
  visual: "brand",

  hero: {
    badges: ["Beginner-friendly", "Mentor-led", "Placement support"],
    lead: "Become a job-ready",
    role: "Branding & Graphic Designer",
    tail: ", even if you've never designed a logo or brand identity before.",
    sub: "A hands-on, mentor-led program that turns you into a hireable designer with a real portfolio recruiters respond to, not just certificates.",
    programName: "Branding & Graphic Design Master Program",
    highlights: [
      "Photoshop, Illustrator & InDesign mastery",
      "5+ live, portfolio-ready design projects",
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
        problem: "No real client projects, so no portfolio to show recruiters",
        fix: "Build real, portfolio-ready design projects on live briefs",
      },
      {
        problem: "Nobody reviews your work, so mistakes never get fixed",
        fix: "1:1 mentor feedback on every project you design",
      },
      {
        problem: "\"Certified\" but can't clear a single design interview",
        fix: "Mock interviews, resume & portfolio prep before you apply",
      },
      {
        problem: "Confused between logo, branding, print and digital design, and what companies actually want",
        fix: "Dedicated placement support until you land the role",
      },
    ],
  },

  demand: {
    title: "Branding & graphic design is one of the fastest-growing creative careers",
    sub: "You're not entering a shrinking field. Every brand needs visual identity, packaging, and content, and design demand is compounding across India and the world.",
    stats: [
      { value: "11.8%", label: "CAGR of the global graphic design & branding services market (2026 to 2033)" },
      { value: "300K+", label: "Graphic designers active on freelance platforms in India" },
      { value: "₹20L+", label: "Senior branding & graphic designer salary in India (per year)" },
      { value: "81%", label: "Of businesses rely on graphic design regularly to build their brand" },
    ],
    chart: {
      title: `Global graphic design & branding services market size (${CHART_UNIT_LABEL}, illustrative growth)`,
      caption:
        "The market is projected to grow at roughly 11.8% per year, with branding & identity design leading enterprise spend.",
      points: marketPoints([
        ["2026", 65.4],
        ["2028", 81.7],
        ["2030", 102.1],
        ["2032", 127.7],
      ]),
    },
    sources: `Sources: Global graphic design services market size, 11.8% CAGR & branding-led spend: OpenPR, Graphic Design Services Market Report; India freelance designer count & business reliance on design: Limelight Digital, Graphic Design Statistics 2026; India salary data: IDEA Worldwide, Graphic Design Salary in India 2026 and JD Institute. ${CONVERSION_NOTE} Figures are industry estimates; year-by-year bar values are illustrative of the cited growth rate.`,
  },

  why: {
    title: "Not another video course. A path to getting hired.",
    sub: "Everything here is built around one outcome: you walk out with a portfolio and the confidence to clear real interviews.",
    cards: [
      {
        icon: "mentor",
        title: "Learn from working designers",
        body: "Mentors who deliver real client branding work, not just theory. Get feedback that mirrors what happens on the job.",
      },
      {
        icon: "projects",
        title: "Real projects, real portfolio",
        body: "Work on live briefs and case studies you can show recruiters, the #1 thing that gets you shortlisted.",
      },
      {
        icon: "feedback",
        title: "1:1 feedback on everything",
        body: "Every project you design gets personal review, so you actually improve instead of repeating mistakes.",
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
    title: "A complete branding & graphic design syllabus, from foundations to placement",
    sub: "Structured modules that take you from \"what is Graphic Design?\" to a job-ready portfolio.",
    // The Figma frame's module 04 ("Analytics, Email & Automation") is a
    // digital-marketing module and is intentionally left out.
    modules: [
      { title: "Foundations of Graphic Design" },
      { title: "Branding & Visual identity" },
      { title: "Adobe Creative Suite Mastery" },
      { title: "Portfolio & Live Campaigns" },
      { title: "Career & Placement Prep" },
    ],
    tools: ["Photoshop", "Illustrator", "InDesign", "Canva"],
    ctaLabel: "Get the Full Syllabus + Fee Details",
  },

  // PROVISIONAL: Figma has the questions but not the answers.
  faq: [
    {
      q: "Do I need a design or art background?",
      a: "No. The program is beginner-friendly and no design or art background is needed. We start from absolute basics and build up, step by step.",
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
    title: "Your branding & graphic design career can start with the next batch.",
    sub: "Seats for the next batch are limited. Talk to a counsellor today. It's free and there's no obligation.",
  },
};
