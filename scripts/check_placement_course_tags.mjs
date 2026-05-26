// Diagnostic: list every placement row in gallery_items and show its course_name.
// Run with:  node scripts/check_placement_course_tags.mjs
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
    console.error("Missing VITE_SUPABASE_URL or a key (service-role / anon) in .env");
    process.exit(1);
}

const supabase = createClient(url, key);

const { data, error } = await supabase
    .from("gallery_items")
    .select("id, type, position, company, course_name, created_at")
    .eq("type", "placement")
    .order("created_at", { ascending: false });

if (error) {
    console.error("Supabase error:", error.message);
    process.exit(1);
}

if (!data || data.length === 0) {
    console.log("No placement rows in gallery_items.");
    process.exit(0);
}

console.log(`\nFound ${data.length} placement rows.`);
console.log("course_name value summary:");
const counts = {};
for (const row of data) {
    const key = row.course_name === null ? "<null>" : `"${row.course_name}"`;
    counts[key] = (counts[key] || 0) + 1;
}
for (const [k, v] of Object.entries(counts)) {
    console.log(`  ${k.padEnd(40)} → ${v} row(s)`);
}

console.log("\n5 most recent placement rows:");
for (const row of data.slice(0, 5)) {
    console.log(`  ${row.created_at}  | course_name: ${JSON.stringify(row.course_name)}  | position: ${JSON.stringify(row.position)}  | company: ${JSON.stringify(row.company)}`);
}
