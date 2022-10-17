import { NextSeo } from 'next-seo';
import SEO from 'next-seo.config';
import { FC } from 'react';
import PostView from 'src/components/postLayout/PostView';
import {
	getParsedMarkdown,
	makePostPath,
	ParamProps,
	StaticProps,
} from 'src/utils/staticDataUtils';

const ProjectPostPage: FC<StaticProps> = ({ htmlstring, data, indexes, serieslist, prevnext }) => {
	const reg = /[`~@#$%^&*()_|+\-='",<>\{\}\[\]\\\/]/gim;
	const SEO_DESCRIPTION = htmlstring.substring(0, 50).replace(reg, '');

	return (
		<>
			<NextSeo
				title={`${data.title} | kimzerovirus.log`}
				description={SEO_DESCRIPTION}
				// openGraph={SEO.openGraph}
			/>
			<PostView
				htmlstring={htmlstring}
				data={data}
				indexes={indexes}
				serieslist={serieslist}
				prevnext={prevnext}
			/>
		</>
	);
};

export async function getStaticPaths() {
	return makePostPath();
}

export async function getStaticProps({ params }: ParamProps) {
	return getParsedMarkdown({ params });
}

export default ProjectPostPage;
