import type { CourseLandingContent } from "./types";
import { CHART_UNIT_LABEL, CONVERSION_NOTE, marketPoints } from "./currency";

// Source: Figma frame "video editing" — see content-source/courses/video-editing.md
//
// This Figma frame was cloned from the Graphic Design / Digital Marketing
// pages. Wording is verbatim where it is video-editing copy. CORRECTED
// (leftovers replaced with the video-editing equivalent):
//   - header label "DIGITAL MARKETING ACADEMY"  ->  "VIDEO EDITING ACADEMY"
//   - programme name "Digital Marketing Master Program"
//   - hero tail "never designed a logo or brand identity before"
//   - hero sub "hireable marketer with a real campaign portfolio"
//   - stuck section (ad spend, SEO, marketing interview, campaign-experience)
//   - curriculum title/sub ("branding & graphic design", "Graphic Design?")
//   - chart caption "11.8% ... branding & identity design leading" -> 15.8%
//   - sources (graphic-design citations do not support these numbers; none shown)
//   - stray text "Paste from divriots"
// NO MODULE LIST: Figma only has another course's modules, so none are shown
// (decision confirmed by the client). Tools and the syllabus CTA are shown.
// Tools come from the hero bullet "Premiere Pro, After Effects & DaVinci Resolve".
// Figma-placeholder values (price, seats, rating, learner counts) are left out.
// FAQ answers are PROVISIONAL.

export const videoEditing: CourseLandingContent = {
  slug: "video-editing",
  // Matches the existing course title, so the hero facts come from the CMS.
  courseTitle: "Video Editing",
  academyLabel: "VIDEO EDITING ACADEMY",
  visual: "timeline",

  hero: {
    badges: ["Beginner-friendly", "Mentor-led", "Placement support"],
    lead: "Become a job-ready",
    role: "Video Editor",
    tail: ", even if you've never edited a video before.",
    sub: "A hands-on, mentor-led program that turns you into a hireable video editor with a real showreel recruiters respond to, not just certificates.",
    programName: "Video Editing Master Program",
    highlights: [
      "Premiere Pro, After Effects & DaVinci Resolve mastery",
      "5+ live, portfolio-ready edits",
      "Mentor feedback on every edit",
      "Resume + interview + placement support",
      "Certificate on completion",
    ],
    chips: ["Live projects", "1:1 mentorship", "Interview prep", "Portfolio review"],
  },

  stuck: {
    title: "Watching free tutorials for months, but still not job-ready?",
    sub: "You don't have a knowledge problem. You have a direction, feedback, and showreel problem. Here's the gap, and how we close it.",
    rows: [
      {
        problem: "Endless YouTube tutorials with no clear path or structure",
        fix: "A structured, step-by-step path from zero to hireable",
      },
      {
        problem: "No real client footage or edits, so no showreel to show recruiters",
        fix: "Edit real, portfolio-ready client-style projects on live footage and briefs",
      },
      {
        problem: "Nobody reviews your edits, so mistakes never get fixed",
        fix: "1:1 mentor feedback on every video you edit",
      },
      {
        problem: "\"Certified\" but can't clear a single editing interview",
        fix: "Mock interviews, resume & showreel prep before you apply",
      },
      {
        problem: "Confused between Premiere Pro, After Effects, DaVinci Resolve, and what studios actually want",
        fix: "Dedicated placement support until you land the role",
      },
    ],
  },

  demand: {
    title: "Video editing is one of the fastest-growing creative careers",
    sub: "You're not entering a shrinking field. Every brand, creator, and studio needs edited video, and demand is compounding across India and the world.",
    stats: [
      { value: "15.8%", label: "CAGR of the global video editing software market (2026 to 2033)" },
      { value: "7M+", label: "Freelance & independent video editors working worldwide" },
      { value: "₹22L+", label: "Senior video editor salary in India (per year)" },
      { value: "91%", label: "Of companies treat video as a core marketing channel" },
    ],
    chart: {
      title: `Global video editing software market size (${CHART_UNIT_LABEL}, illustrative growth)`,
      caption: "The market is projected to grow at roughly 15.8% per year.",
      points: marketPoints([
        ["2026", 5.2],
        ["2028", 7.0],
        ["2030", 9.4],
        ["2032", 12.6],
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
        title: "Learn from working editors",
        body: "Mentors who cut real client and studio work, not just theory. Get feedback that mirrors what happens on the job.",
      },
      {
        icon: "projects",
        title: "Real edits, real showreel",
        body: "Work on live client-style footage you can show recruiters, the #1 thing that gets you shortlisted.",
      },
      {
        icon: "feedback",
        title: "1:1 feedback on everything",
        body: "Every video you edit gets personal review, so you actually improve instead of repeating mistakes.",
      },
      {
        icon: "placement",
        title: "Placement & interview support",
        body: "Resume building, mock interviews, and referrals to help you convert learning into a job offer.",
      },
      {
        icon: "beginner",
        title: "Beginner-friendly path",
        body: "No filmmaking or editing background needed. We start from absolute basics and build up, step by step.",
      },
      {
        icon: "certificate",
        title: "Recognised certificate",
        body: "Earn a course completion certificate you can add to LinkedIn and your resume.",
      },
    ],
  },

  curriculum: {
    title: "A complete video editing syllabus, from foundations to placement",
    // DECIDED: the Figma has no module list for this course (only another
    // course's modules), so none are shown: tools and the syllabus CTA only.
    // Add titles to `modules` later and the timeline appears.
    modules: [],
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    ctaLabel: "Get the Full Syllabus + Fee Details",
  },

  // PROVISIONAL: Figma has the questions but not the answers.
  faq: [
    {
      q: "Do I need a film making or editing background?",
      a: "No. The program is beginner-friendly and no filmmaking or editing background is needed. We start from absolute basics and build up, step by step.",
    },
    {
      q: "Will I get a job after the course?",
      a: "Everything in the program is built around getting you hired: a real showreel, 1:1 mentor feedback, mock interviews, resume building and referrals, with dedicated placement support until you land the role.",
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
    title: "Your video editing career can start with the next batch.",
    sub: "Seats for the next batch are limited. Talk to a counsellor today. It's free and there's no obligation.",
  },
};
