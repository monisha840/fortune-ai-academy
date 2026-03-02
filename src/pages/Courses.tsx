import Navbar from "@/components/Navbar";
import CourseSection from "@/components/CourseSection";
import AISkillMap from "@/components/AISkillMap";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Courses = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="pt-20"> {/* Offset for Fixed Navbar */}
                <CourseSection />
                <AISkillMap />
                <FAQSection />
            </div>
            <Footer />
        </div>
    );
};

export default Courses;
