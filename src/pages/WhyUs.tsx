import Navbar from "@/components/Navbar";
import WhyChooseUs from "@/components/WhyChooseUs";
import TransformSection from "@/components/TransformSection";
import MiddleCTA from "@/components/MiddleCTA";
import JourneySection from "@/components/JourneySection";
import Footer from "@/components/Footer";

const WhyUs = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-20">
                <WhyChooseUs />
                <TransformSection />
                <MiddleCTA />
                <JourneySection />
            </div>
            <Footer />
        </div>
    );
};

export default WhyUs;
