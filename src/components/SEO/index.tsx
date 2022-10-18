import { DefaultSeo, NextSeo } from 'next-seo';
import { FC } from 'react';
import { config } from 'src/components/SEO/meta';

interface SEOProps {
	seo: {
		title: string;
		description: string;
	};
}

const SEO: FC<SEOProps> = ({ seo }) => {
	console.log(seo);
	return (
		<>
			<DefaultSeo {...config} />
			{seo ? (
				<NextSeo
					title={seo.title}
					description={seo.description ? seo.description : config.openGraph.description}
					openGraph={config.openGraph}
				/>
			) : null}
		</>
	);
};

export default SEO;
