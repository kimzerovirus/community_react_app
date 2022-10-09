import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { FC, ReactNode } from 'react';
import { PostsProps } from 'src/utils/staticDataUtils';

import Pagination from '../common/Pagination';
import Post from './PostItem';

const PostList: FC<PostsProps> = ({ posts, paging }) => {
	return (
		<Container maxWidth="md">
			<PostListWrapper>
				{posts.map((post, index) => (
					<Post
						link={post.link}
						frontmatter={post.frontmatter}
						filename={post.filename}
						key={index}
					/>
				))}
			</PostListWrapper>
			<Pagination paging={paging} />
		</Container>
	);
};

const PostListWrapper = styled.ul`
	list-style: none;
	padding: 0;
`;

export default PostList;
