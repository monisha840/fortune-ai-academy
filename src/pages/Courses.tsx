import Navbar from "@/components/Navbar";
import CourseSection from "@/components/CourseSection";
import AISkillMap from "@/components/AISkillMap";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import JsonLd from "@/components/JsonLd";
import { COURSES, buildCourseSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

const Courses = () => {
    const courseSchemas = COURSES.map((c) =>
        buildCourseSchema(c.name, c.description, `${SITE_URL}/courses#${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`),
    );

    return (
        <div className="min-h-screen">
            <Seo path="/courses" />
            <JsonLd schema={courseSchemas} />
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
