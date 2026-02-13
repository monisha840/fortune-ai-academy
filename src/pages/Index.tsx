import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import TransformSection from "@/components/TransformSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import PlacementDashboard from "@/components/PlacementDashboard";
import CourseSection from "@/components/CourseSection";
import AISkillMap from "@/components/AISkillMap";
import BranchSection from "@/components/BranchSection";
import FAQSection from "@/components/FAQSection";
import EmpowermentArena from "@/components/EmpowermentArena";
import TestimonialSection from "@/components/TestimonialSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <JourneySection />
      <TransformSection />
      <PlacementDashboard />
      <CourseSection />
      <AISkillMap />
      <WhyChooseUs />
      <BranchSection />
      <FAQSection />
      <EmpowermentArena />
      <TestimonialSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
