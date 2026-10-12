import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface CourseFact {
  label: string;
  value: string;
}

/**
 * Hero facts for a course landing page, read from the CMS `courses` table
 * (the same rows the admin panel edits). Nothing here is hardcoded: a fact is
 * only returned when its CMS field is filled in, and if the course row is
 * missing or the request fails the landing page simply shows no facts.
 */
export function useCourseFacts(courseTitle: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["course-facts", courseTitle],
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<CourseFact[]> => {
      const { data, error } = await supabase
        .from("courses")
        .select("duration, salary, roles")
        .eq("title", courseTitle)
        .maybeSingle();

      if (error || !data) return [];

      // CMS values are shown as entered, except long dashes in ranges
      // ("₹5–12 LPA") which read as "to" on the landing pages.
      const clean = (v?: string | null) => v?.trim().replace(/\s*[–—]\s*/g, " to ") ?? "";

      const facts: CourseFact[] = [];
      if (clean(data.duration)) facts.push({ label: "Duration", value: clean(data.duration) });
      if (clean(data.salary)) facts.push({ label: "Typical salary", value: clean(data.salary) });
      if (clean(data.roles)) facts.push({ label: "Career roles", value: clean(data.roles) });
      return facts;
    },
  });

  return { facts: data ?? [], isLoading };
}
