import { Container } from '@mui/material';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BlockquoteBlock from 'src/components/markdownBlocks/BlockquoteBlock';
import CodeBlock from 'src/components/markdownBlocks/CodeBlock';
import { makePath } from 'src/utils/staticDataUtils';

export default function ProjectPostPage({ htmlString, data }: any) {
	return (
		<Container maxWidth="xl">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]} // TODO link, table, checklist - styling
				components={{
					code: CodeBlock,
					blockquote: BlockquoteBlock, // >
					// img({ node, ...props }) {
					// 	return (
					// 		<img
					// 			style={{ maxWidth: '60vw' }}
					// 			src={props.src.replace('../../../../public/', '/')}
					// 			alt="MarkdownRenderer__Image"
					// 		/>
					// 	);
					// },
					em({ node, children, ...props }) {
						return (
							<span style={{ fontStyle: 'italic' }} {...props}>
								{children}
							</span>
						);
					},
					// table({ node, children, ...props }) {
					// 	return <table></table>;
					// },
				}}
			>
				{htmlString
					.replace(/\n\s\n\s/gi, '\n\n&nbsp;\n\n')
					.replace(/\*\*/gi, '@$_%!^')
					.replace(/@\$_%!\^/gi, '**')
					.replace(/<\/?u>/gi, '*')}
			</ReactMarkdown>
		</Container>
	);
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
			htmlString: parsedMarkdown.content,
			data: parsedMarkdown.data,
		},
	};
}
