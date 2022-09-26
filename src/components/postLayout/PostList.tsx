import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { PostsProps } from 'src/utils/staticDataUtils';

import Pagination from '../common/Pagination';
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
						link={post.link}
						frontmatter={post.frontmatter}
						filename={post.filename}
						key={index}
					/>
				))}
			</PostListWrapper>
			<Pagination />
		</Container>
	);
}

const PostListWrapper = styled.ul`
	list-style: none;
	padding: 0;
`;
