import { DefaultSeo } from 'next-seo';
import { FC } from 'react';
import { config } from 'src/components/SEO/meta';

interface SEOProps {
	seo: {
		title: string;
		description: string;
	};
}

const SEO: FC<SEOProps> = ({ seo }) => {
	const meta: typeof config = { ...config };
	if (seo) {
		meta.openGraph.title = seo.title;
		meta.openGraph.description = seo.description;
	}

	return <DefaultSeo {...meta} />;
};

export default SEO;
