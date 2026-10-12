import { useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import JsonLd from "@/components/JsonLd";
import TestimonialSection from "@/components/TestimonialSection";
import { getCourseLanding } from "@/content/courses";
import { buildCourseSchema } from "@/lib/schema";
import { getSeoForPath } from "@/lib/seo";
import {
  applyLandingConfig,
  buildOffer,
  buildProof,
  useLandingConfig,
  useLandingReviews,
  usePortfolioItems,
} from "@/lib/landingConfig";
import StudentWorkSection from "@/components/course-landing/StudentWorkSection";
import ReviewsSection from "@/components/course-landing/ReviewsSection";
import PartnersMarquee from "@/components/course-landing/PartnersMarquee";
import LandingHeader from "@/components/course-landing/LandingHeader";
import HeroSection from "@/components/course-landing/HeroSection";
import StuckSection from "@/components/course-landing/StuckSection";
import DemandSection from "@/components/course-landing/DemandSection";
import WhySection from "@/components/course-landing/WhySection";
import CurriculumSection from "@/components/course-landing/CurriculumSection";
import FaqSection from "@/components/course-landing/FaqSection";
import FinalCta from "@/components/course-landing/FinalCta";
import LandingFooter from "@/components/course-landing/LandingFooter";
import StickyCta from "@/components/course-landing/StickyCta";
import NotFound from "./NotFound";

const CourseLanding = () => {
  const { slug } = useParams<{ slug: string }>();
  const base = getCourseLanding(slug);

  // CMS data. Hooks run before the NotFound return so their order never changes.
  const { data: config = null } = useLandingConfig(base?.slug);
  const { data: reviews = [] } = useLandingReviews(base?.slug);
  const { data: portfolio = [] } = usePortfolioItems(base?.courseTitle);

  if (!base) return <NotFound />;

  // Code defaults + whatever the CMS overrides (FAQ answers, modules, tools, stats).
  const course = applyLandingConfig(base, config);
  const offer = buildOffer(config);
  const proof = buildProof(config);

  const path = `/courses/${course.slug}`;
  const seo = getSeoForPath(path);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: course.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo path={path} />
      <JsonLd
        schema={[buildCourseSchema(course.courseTitle, seo.description, seo.canonical), faqSchema]}
      />

      <LandingHeader academyLabel={course.academyLabel} />
      <main>
        <HeroSection c={course} offer={offer} proof={proof} />
        <StuckSection c={course} />
        <DemandSection c={course} />
        <WhySection c={course} />
        <CurriculumSection c={course} />
        <StudentWorkSection items={portfolio} title={`${course.courseTitle} projects our students built`} />
        <ReviewsSection reviews={reviews} />
        {/* Real proof from the live site, in place of the Figma placeholder tiles */}
        <TestimonialSection />
        <PartnersMarquee />
        <FaqSection c={course} />
        <FinalCta c={course} />
      </main>
      <LandingFooter academyLabel={course.academyLabel} />
      <StickyCta label="Book Free Counselling" />
    </div>
  );
};

export default CourseLanding;
