import type { NextPage } from 'next';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface PostsProps {
	posts: postProps[];
}

interface postProps {
	slug: string;
	frontmatter: {
		title: string;
		date: string;
		except?: string;
		cover_image?: string;
	};
}

export default function Home({ posts }: PostsProps) {
	return (
		<div>
			<Head>
				<title>kimzerovirus.log</title>
			</Head>

			<div className="posts">
				{posts.map((post, index) => (
					<div key={index}>
						<h3>{post.frontmatter.title}</h3>
						<img
							src={
								post.frontmatter.cover_image
									? post.frontmatter.cover_image
									: post.frontmatter.cover_image
							}
							alt="cover_image"
						/>
						<p>{post.frontmatter.date}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const files = fs.readdirSync(path.join('posts'));

	const posts = files.map(filename => {
		const slug = filename.replace('.md', '');
		const markdownWithMeta = fs.readFileSync(
			path.join('posts', filename),
			'utf-8',
		);

		const { data: frontmatter } = matter(markdownWithMeta);

		return {
			slug,
			frontmatter,
		};
	});

	console.log(posts);

	return {
		props: {
			posts,
		},
	};
}
