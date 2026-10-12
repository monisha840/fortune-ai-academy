import type { CourseLandingContent } from "@/content/courses";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "./SectionHeading";

const FaqSection = ({ c }: { c: CourseLandingContent }) => (
  <section id="faq" className="section-light py-20 md:py-28 scroll-mt-20">
    <div className="max-w-3xl mx-auto px-4 md:px-6">
      <SectionHeading eyebrow="Common questions" title="Everything you want to know" />

      <Accordion type="single" collapsible className="space-y-3">
        {c.faq.map((item, i) => (
          <AccordionItem
            key={item.q}
            value={`faq-${i}`}
            className="rounded-2xl border border-border bg-card px-5 data-[state=open]:border-accent/60 data-[state=open]:shadow-md transition"
          >
            <AccordionTrigger className="py-5 text-left font-display font-semibold text-base md:text-lg hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FaqSection;
