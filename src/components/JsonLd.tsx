import { Helmet } from "react-helmet-async";

interface JsonLdProps {
    /** A JSON-LD schema object (or an array of them) to inject as <script type="application/ld+json">. */
    schema: object | object[];
}

/**
 * Renders a JSON-LD <script> tag in the document <head>.
 *
 * Uses react-helmet-async so the tag is properly placed in <head> and
 * deduplicated across route changes. JSON.stringify is escaped per Google's
 * structured-data guidelines.
 */
const JsonLd = ({ schema }: JsonLdProps) => {
    const json = JSON.stringify(schema)
        // Defensive escape: avoid </script> sequences in payload values.
        .replace(/</g, "\\u003c");

    return (
        <Helmet>
            <script type="application/ld+json">{json}</script>
        </Helmet>
    );
};

export default JsonLd;
