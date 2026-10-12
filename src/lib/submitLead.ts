import { supabase, crmSupabase } from "@/lib/supabase";
import { isValidPhone, isValidEmail } from "@/lib/validation";

export interface LeadInput {
  name: string;
  phone: string;
  email: string;
  course: string;
  branch?: string;
  /** Where the lead came from, e.g. "Landing Page: ui-ux-design" */
  source: string;
}

const DEFAULT_BRANCH = "Tiruppur";
const BRANCH_IDS: Record<string, string> = {
  Tiruppur: "738587cc-6f2c-4f03-a386-4c3a376f4cc0",
};

/** Returns an error message for invalid input, or null when the lead is valid. */
export function validateLead(l: Pick<LeadInput, "name" | "phone" | "email">): string | null {
  const name = l.name.trim();
  if (!name || !l.phone || !l.email) return "Please fill in all fields before submitting.";
  if (name.length < 2 || name.length > 100) return "Please enter a valid name (2-100 characters).";
  if (!isValidPhone(l.phone)) return "Please enter a valid phone number (10-15 digits).";
  if (!isValidEmail(l.email)) return "Please enter a valid email address.";
  return null;
}

/**
 * Saves a lead using the same two-step flow as the /apply page: the website
 * `leads` table first (must succeed), then a non-blocking CRM sync.
 */
export async function submitLead(l: LeadInput): Promise<void> {
  const branch = l.branch ?? DEFAULT_BRANCH;
  const name = l.name.trim();
  const phone = l.phone.trim();
  const email = l.email.trim();

  const { error } = await supabase.from("leads").insert([
    { name, phone, email, course: l.course, branch, created_at: new Date().toISOString() },
  ]);
  if (error) throw error;

  if (crmSupabase) {
    const [firstName, ...rest] = name.split(" ");
    const now = new Date().toISOString();
    crmSupabase
      .from("leads")
      .insert([
        {
          id: crypto.randomUUID(),
          firstName,
          lastName: rest.join(" "),
          phone,
          email,
          interestedCourse: l.course,
          branchId: BRANCH_IDS[branch] ?? null,
          source: l.source,
          status: "NEW",
          createdAt: now,
          updatedAt: now,
        },
      ])
      .then(({ error: crmError }) => {
        if (crmError) console.error("CRM Sync Error:", crmError.message);
      });
  }
}
