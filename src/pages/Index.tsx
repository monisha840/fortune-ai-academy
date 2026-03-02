import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import PlacementDashboard from "@/components/PlacementDashboard";
import TestimonialSection from "@/components/TestimonialSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TestimonialSection />
      <WhyChooseUs />
      <PlacementDashboard statsOnly={true} />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
