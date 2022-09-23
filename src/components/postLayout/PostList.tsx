import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { PostsProps } from 'src/utils/staticDataUtils';

import Post from './PostItem';

export default function PostList({ posts }: PostsProps) {
	return (
		<Container maxWidth="md">
			<PostListWrapper>
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
					<Post
						folderPath={post.folderPath}
						frontmatter={post.frontmatter}
						slug={post.slug}
						key={index}
					/>
				))}
			</PostListWrapper>
		</Container>
	);
}

const PostListWrapper = styled.ul`
	list-style: none;
	padding: 0;
`;
