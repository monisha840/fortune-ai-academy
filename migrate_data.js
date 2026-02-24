import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY; // Requires service role key for migration

if (!supabaseKey) {
    console.error("Please provide VITE_SUPABASE_SERVICE_ROLE_KEY in .env to run migration.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const courses = [
    { title: "UI/UX Design", short_title: "UI/UX", category: "Design", overview: "Design user-centered digital experiences from wireframes to high-fidelity prototypes.", tools: ["Figma", "Adobe XD", "Illustrator", "Principle", "Maze"], duration: "4 Months", roles: "UI Designer, UX Designer, Product Designer", salary: "₹5–12 LPA", featured: true, display_order: 1 },
    { title: "Full Stack Development", short_title: "Full Stack", category: "Development", overview: "Master front-end and back-end technologies to build complete web applications from scratch.", tools: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Git"], duration: "6 Months", roles: "Full Stack Developer, Frontend Developer, Backend Developer", salary: "₹6–14 LPA", featured: true, display_order: 2 },
    { title: "Graphic Designing", short_title: "Graphics", category: "Design", overview: "Create stunning visual content for brands, marketing campaigns, and digital media.", tools: ["Photoshop", "Illustrator", "InDesign", "CorelDRAW", "Canva"], duration: "4 Months", roles: "Graphic Designer, Brand Designer, Visual Designer", salary: "₹4–10 LPA", featured: false, display_order: 3 },
    { title: "Video Editing", short_title: "Video", category: "Design", overview: "Master professional video editing, motion graphics, and post-production workflows.", tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro"], duration: "4 Months", roles: "Video Editor, Motion Designer, Content Creator", salary: "₹4–10 LPA", featured: false, display_order: 4 },
    { title: "Textile & Garment Design", short_title: "Textile", category: "Design", overview: "Learn textile science, pattern making, and garment construction for the fashion industry.", tools: ["CAD Software", "Pattern Drafting", "Textile Testing", "Adobe Illustrator"], duration: "5 Months", roles: "Textile Designer, Garment Technologist, Fashion Designer", salary: "₹4–8 LPA", featured: false, display_order: 5 },
    { title: "Packaging Design", short_title: "Packaging", category: "Design", overview: "Design compelling packaging that stands out on shelves with structural and graphic expertise.", tools: ["ArtPro", "Illustrator", "Photoshop", "Esko Studio", "3D Mockups"], duration: "4 Months", roles: "Packaging Designer, Structural Designer, Print Specialist", salary: "₹4–9 LPA", featured: false, display_order: 6 },
    { title: "Fashion CADD", short_title: "CADD", category: "Design", overview: "Master computer-aided design for fashion with industry-standard tools and techniques.", tools: ["AutoCAD", "Richpeace", "Gerber", "Lectra", "CLO 3D"], duration: "4 Months", roles: "Fashion CAD Designer, Pattern Maker, Technical Designer", salary: "₹4–8 LPA", featured: false, display_order: 7 },
    { title: "Tally Prime", short_title: "Tally", category: "Commerce", overview: "Master Tally Prime for GST accounting, payroll, inventory, and financial reporting.", tools: ["Tally Prime", "GST Portal", "Excel", "Banking Software"], duration: "3 Months", roles: "Accountant, Tax Consultant, Finance Executive", salary: "₹3–7 LPA", featured: false, display_order: 8 }
];

const testimonials = [
    { name: "Nithyasri V", company: "Innovation LLP", location: "Chennai, India", image_url: "/students/student7.png", display_order: 1 },
    { name: "Geetha S", company: "Whistle", location: "Chennai, India", image_url: "/students/student8.png", display_order: 2 },
    { name: "Gayathri G", company: "My Bean Infotech", location: "Coimbatore, India", image_url: "/students/student9.png", display_order: 3 },
    { name: "Manikandan M", company: "The Coding Cult", location: "Hyderabad, India", image_url: "/students/student10.png", display_order: 4 },
    { name: "Suberiya M", company: "EPX Creatives", location: "Kangeyam, India", image_url: "/students/student11.png", display_order: 5 },
    { name: "Tamizharasan J", company: "Cloud and Clouds", location: "Singapore", image_url: "/students/student12.png", display_order: 6 }
];

const faqs = [
    { question: "Do you offer placement assistance after the course?", answer: "Yes, we provide 100% placement support. Our dedicated career cell works with top tech companies and design firms to ensure our students get placed in their dream roles.", display_order: 1 },
    { question: "Are these courses suitable for absolute beginners?", answer: "Absolutely. Our curriculum is designed to take you from zero to expert. We start with fundamental concepts and gradually move towards advanced, industry-level projects.", display_order: 2 },
    { question: "Do I get a certificate upon completion?", answer: "Yes, you will receive an industry-recognized certification from Fortune Academy, along with a portfolio of live projects that you can showcase to employers.", display_order: 3 },
    { question: "What is the mode of training?", answer: "We offer both classroom-based intensive training and interactive online sessions. Both modes involve hands-on projects and direct mentorship from industry experts.", display_order: 4 },
    { question: "Can I pay the course fee in installments?", answer: "Yes, we have flexible payment plans and EMI options to make our premium education accessible to everyone.", display_order: 5 }
];

async function migrate() {
    console.log("Starting migration...");

    const { error: coursesError } = await supabase.from('courses').insert(courses);
    if (coursesError) console.error("Error migrating courses:", coursesError);
    else console.log("Courses migrated successfully.");

    const { error: testimonialsError } = await supabase.from('testimonials').insert(testimonials);
    if (testimonialsError) console.error("Error migrating testimonials:", testimonialsError);
    else console.log("Testimonials migrated successfully.");

    const { error: faqsError } = await supabase.from('faqs').insert(faqs);
    if (faqsError) console.error("Error migrating faqs:", faqsError);
    else console.log("FAQs migrated successfully.");

    console.log("Migration complete.");
}

migrate();
