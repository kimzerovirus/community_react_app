import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import MarkDownView from 'src/components/postLayout/MarkDownView';
import { makePostPath, ParamProps, StaticProps } from 'src/utils/staticDataUtils';

export default function ProjectPostPage({ htmlstring, data }: StaticProps) {
	return <MarkDownView htmlstring={htmlstring} data={data} />;
}

export async function getStaticPaths() {
	return makePostPath();
}

export async function getStaticProps({ params: { sub, year, month, day, filename } }: ParamProps) {
	const markdownWithMetaData = fs
		.readFileSync(
			path.join(
				process.env.NEXT_PUBLIC_ROOT_FOLDER as string,
				sub,
				year,
				year + '-' + month + '-' + day + '-' + filename + '.md',
			),
		)
		.toString();
	const parsedMarkdown = matter(markdownWithMetaData);
	return {
		props: {
			htmlstring: parsedMarkdown.content,
			data: parsedMarkdown.data,
		},
	};
}
