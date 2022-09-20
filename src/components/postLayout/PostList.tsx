import { Container } from '@mui/material';
import React from 'react';
import { PostsProps } from 'src/utils/staticDataUtils';

import Post from './PostItem';

function PostList({ posts }: PostsProps) {
	return (
		<Container maxWidth="xl">
			<div className="posts">
				{posts.map((post, index) => (
					// <div key={index}>
					// 	<h3>{post.frontmatter.title}</h3>
					// 	<img
					// 		src={
					// 			post.frontmatter.cover_image
					// 				? post.frontmatter.cover_image
					// 				: post.frontmatter.cover_image
					// 		}
					// 		alt="cover_image"
					// 	/>
					// 	<p>{post.frontmatter.date}</p>
					// </div>
					<Post post={post} key={index} />
				))}
			</div>
		</Container>
	);
}

export default PostList;
