import { Helmet } from "react-helmet-async";
import { buildSeo, SeoData } from "@/lib/seo";

interface SeoProps {
    path: string;
    overrides?: Partial<SeoData>;
}

const Seo = ({ path, overrides }: SeoProps) => {
    const data = buildSeo(path, overrides);

    return (
        <Helmet>
            <title>{data.title}</title>
            <meta name="description" content={data.description} />
            <meta name="robots" content={data.robots} />
            <link rel="canonical" href={data.canonical} />

            {/* Open Graph */}
            <meta property="og:type" content={data.ogType} />
            <meta property="og:title" content={data.title} />
            <meta property="og:description" content={data.description} />
            <meta property="og:url" content={data.canonical} />
            <meta property="og:image" content={data.image} />
            <meta property="og:site_name" content="Fortune Innovatives" />

            {/* Twitter */}
            <meta name="twitter:card" content={data.twitterCard} />
            <meta name="twitter:title" content={data.title} />
            <meta name="twitter:description" content={data.description} />
            <meta name="twitter:image" content={data.image} />

            {/* Geo */}
            <meta name="geo.region" content={data.geo.region} />
            <meta name="geo.placename" content={data.geo.placename} />
            <meta name="geo.position" content={data.geo.position} />
            <meta name="ICBM" content={data.geo.icbm} />
        </Helmet>
    );
};

export default Seo;
