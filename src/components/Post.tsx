import { Card } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { PostProps } from 'src/utils/staticDataUtils';

interface PropsType {
	post: PostProps;
}

export default function Post({ post }: PropsType) {
	return (
		<Card>
			<Link href={`/${post.folderPath}/${post.slug}`}>{post.frontmatter.title}</Link>
		</Card>
	);
}
