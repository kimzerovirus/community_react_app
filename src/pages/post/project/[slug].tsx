import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import MarkDownView from 'src/components/postLayout/MarkDownView';
import { makePath } from 'src/utils/staticDataUtils';

export interface StaticProps {
	htmlstring: string;
	data: {
		title: string;
		date: string;
		except: string;
		cover_image: string;
	};
}

export default function ProjectPostPage({ htmlstring, data }: StaticProps) {
	return <MarkDownView htmlstring={htmlstring} data={data} />;
}

export async function getStaticPaths() {
	return makePath(process.env.NEXT_PUBLIC_PROJECT_FOLDER_PATH as string);
}

export async function getStaticProps({ params: { slug } }: any) {
	// const markdownWithMeta = fs.readFileSync(path.join('post', slug + '.md'), 'utf-8');
	const markdownWithMetaData = fs.readFileSync(path.join('post/project', slug + '.md')).toString();
	const parsedMarkdown = matter(markdownWithMetaData);
	return {
		props: {
			htmlstring: parsedMarkdown.content,
			data: parsedMarkdown.data,
		},
	};
}
