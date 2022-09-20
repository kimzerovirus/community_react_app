import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface PostsProps {
	posts: PostProps[];
}

export interface PostProps {
	folderPath: string;
	slug: string;
	frontmatter: {
		title: string;
		date: string;
		except?: string;
		cover_image?: string;
	};
}

export interface PathProps {
	paths: ParamProps[];
	fallback: boolean;
}

interface ParamProps {
	params: {
		sub: string;
		slug: string;
	};
}

export const readFile = (folderPath: string) => {
	const files = fs.readdirSync(path.join(folderPath));

	const posts = files.map(filename => {
		const slug = filename.replace('.md', '');
		const markdownWithMeta = fs.readFileSync(path.join(folderPath, filename), 'utf-8');

		const { data: frontmatter } = matter(markdownWithMeta);

		return {
			folderPath,
			slug,
			frontmatter,
		};
	});

	return {
		props: {
			posts,
		},
	};
};

export const makePath = (folderPath: string) => {
	const files = fs.readdirSync(path.join(folderPath));
	const paths = files.map(filename => ({
		params: {
			sub: 'project',
			slug: filename.replace('.md', ''),
		},
	}));

	return {
		paths, // [ { params: { slug: 'project' } }, { params: { slug: 'til' } } ]
		fallback: false,
	};
};
