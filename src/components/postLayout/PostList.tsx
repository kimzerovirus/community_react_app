import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { FC, ReactNode } from 'react';
import { PagingProps, PostProps } from 'src/utils/staticDataUtils';

import Pagination from '../common/Pagination';
import Post from './PostItem';

interface PostListProps {
	posts: PostProps[];
	paging?: PagingProps;
}

const PostList: FC<PostListProps> = ({ posts, paging }) => {
	return (
		<>
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

			{paging ? <Pagination paging={paging} /> : <></>}
		</>
	);
};

const PostListWrapper = styled.ul`
	list-style: none;
	padding: 0;
`;

export default PostList;
