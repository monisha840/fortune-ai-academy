import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import WhyChooseUs from "@/components/WhyChooseUs";
import PlacementDashboard from "@/components/PlacementDashboard";
import CourseSection from "@/components/CourseSection";
import AISkillMap from "@/components/AISkillMap";
import BranchSection from "@/components/BranchSection";
import DemoSection from "@/components/DemoSection";
import TestimonialSection from "@/components/TestimonialSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <JourneySection />
      <WhyChooseUs />
      <PlacementDashboard />
      <CourseSection />
      <AISkillMap />
      <BranchSection />
      <DemoSection />
      <TestimonialSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
