import Head from 'next/head';
import { FC } from 'react';
import { config } from 'src/components/SEO/meta';

interface SEOProps {
	seo: {
		title: string;
		description: string;
		url: string;
	};
}

const SEO: FC<SEOProps> = ({ seo }) => {
	return seo ? (
		<SEOComponent
			openGraph={{
				...config.openGraph,
				title: seo.title,
				url: seo.url || config.openGraph.url,
				description: seo.description || config.openGraph.description,
			}}
			twitter={config.twitter}
		/>
	) : (
		<SEOComponent {...config} />
	);
};

const SEOComponent: FC<typeof config> = ({ openGraph, twitter }) => (
	<Head>
		<title>{openGraph.title}</title>

		<meta name="keywords" content={openGraph.keywords} />
		<meta name="description" content={openGraph.description} />

		<meta name="application-name" content={openGraph.site_name} />
		<meta name="msapplication-tooltip" content={openGraph.site_name} />

		<meta property="og:type" content={openGraph.type} />
		<meta property="og:title" content={openGraph.title} />
		<meta property="og:description" content={openGraph.description} />
		<meta property="og:image" content={openGraph.images[0].url} />
		<meta property="og:url" content={openGraph.url} />

		<meta name="twitter:card" content={twitter.cardType} />
		<meta name="twitter:title" content={openGraph.title} />
		<meta name="twitter:description" content={openGraph.description} />
		<meta name="twitter:image" content={openGraph.images[0].url} />
		<meta name="twitter:domain" content={openGraph.site_name} />

		<meta name="google-site-verification" content="PHA3orDagDVbxiIM58MD1vk3YZu_rkeBBietFb3w48M" />
	</Head>
);

export default SEO;

/* <DefaultSeo {...config} />
{seo ? (
<NextSeo
	title={seo.title}
	description={seo.description ? seo.description : config.openGraph.description}
	openGraph={config.openGraph}
/>
) : null} */
