import { motion } from "framer-motion";

interface CourseFilterProps {
    /** Course names to render as filter pills. "All" is added automatically as the first pill. */
    courses: string[];
    /** Currently selected pill — either "All" or one of the course names. */
    selected: string;
    /** Fired when the user picks a different pill. */
    onChange: (value: string) => void;
    /** Optional accessible label. Defaults to "Filter by course". */
    label?: string;
}

export const ALL_FILTER = "All";

/**
 * Horizontal row of pill-shaped course filters.
 *
 * - Wraps on desktop, scrolls horizontally on narrow mobile.
 * - Active pill: filled accent gold.
 * - Inactive pill: ghost outline with a hover lift.
 * - Click the active pill again to reset to "All".
 */
const CourseFilter = ({ courses, selected, onChange, label = "Filter by course" }: CourseFilterProps) => {
    const options = [ALL_FILTER, ...courses];

    const handleClick = (option: string) => {
        // Toggle behaviour: clicking the active non-"All" pill resets to "All".
        if (option === selected && option !== ALL_FILTER) {
            onChange(ALL_FILTER);
        } else {
            onChange(option);
        }
    };

    return (
        <div
            role="group"
            aria-label={label}
            className="relative mb-6 md:mb-8 -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto md:overflow-visible no-scrollbar"
        >
            <div className="flex md:flex-wrap items-center gap-2 md:gap-2.5 w-max md:w-auto">
                {options.map((opt) => {
                    const isActive = selected === opt;
                    return (
                        <motion.button
                            key={opt}
                            type="button"
                            onClick={() => handleClick(opt)}
                            whileTap={{ scale: 0.96 }}
                            aria-pressed={isActive}
                            className={[
                                "shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 md:px-5 md:py-2",
                                "text-xs md:text-sm font-semibold tracking-wide",
                                "transition-all duration-300 border",
                                isActive
                                    ? "bg-accent text-primary border-accent shadow-[0_6px_20px_rgba(212,175,55,0.35)]"
                                    : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white hover:border-accent/40",
                            ].join(" ")}
                        >
                            {opt}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default CourseFilter;
