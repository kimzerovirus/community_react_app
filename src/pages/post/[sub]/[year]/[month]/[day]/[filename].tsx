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
	const tempdata = getParsedMarkdown({ params });
	const reg = /[`~@#$%^&*()_|+\-='",<>\{\}\[\]\\\/]/gim;
	const title = `${tempdata.props.data.title} | kimzerovirus.log`;
	const description = tempdata.props.htmlstring.substring(0, 200).replace(reg, '');

	const data = {
		props: {
			...tempdata.props,
			seo: {
				title,
				description,
			},
		},
	};

	return data;
}

export default ProjectPostPage;
