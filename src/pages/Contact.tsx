import Navbar from "@/components/Navbar";
import BranchSection from "@/components/BranchSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Contact = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-20">
                <BranchSection />
                <FinalCTA />
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
