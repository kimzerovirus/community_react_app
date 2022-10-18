import { FC } from 'react';
import PostView from 'src/components/postLayout/PostView';
import {
	getParsedMarkdown,
	makePostPath,
	ParamProps,
	StaticProps,
} from 'src/utils/staticDataUtils';

const ProjectPostPage: FC<StaticProps> = ({
	htmlstring,
	data,
	indexes,
	serieslist,
	prevnext,
	seo,
}) => {
	return (
		<>
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
	const data = getParsedMarkdown({ params });
	const reg = /[`~@#$%^&*()_|+\-='",<>\{\}\[\]\\\/]/gim;
	const title = `${data.props.data.title} | kimzerovirus.log`;
	const description = data.props.htmlstring.substring(0, 160).replace(reg, '') + '...';

	return {
		props: {
			...data.props,
			seo: {
				title,
				description,
				url: `https://kimzerovirus.github.io/post/${params.sub}/${params.year}/${params.month}/${params.day}/${params.filename}`,
			},
		},
	};
}

export default ProjectPostPage;
