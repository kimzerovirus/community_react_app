import styled from '@emotion/styled';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { breakpoints } from 'src/styles/theme/customTheme';
import { PagingProps, PostProps } from 'src/utils/staticDataUtils';

import Pagination from '../common/Pagination';
import Post from './PostItem';

interface PostListProps {
	posts: PostProps[];
	paging?: PagingProps;
	selected?: string;
}

const PostList: FC<PostListProps> = ({ posts, paging, selected }) => {
	return (
		<CustomWrapper maxWidth={breakpoints.values.md}>
			{selected ? (
				<Typography
					variant="h5"
					noWrap
					component="div"
					sx={{
						color: 'inherit',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexWrap: 'wrap',
						margin: '3rem 0',
					}}
				>
					<LibraryBooksOutlinedIcon sx={{ width: '24px', marginRight: '4px' }} />
					<p>{selected}</p>
				</Typography>
			) : (
				<></>
			)}
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
		</CustomWrapper>
	);
};

interface WrapperProps {
	maxWidth: number;
}

const CustomWrapper = styled.div<WrapperProps>`
	width: 100%;
	max-width: ${props => props.maxWidth + 'px'};
	margin: 0 auto;
`;

const PostListWrapper = styled.ul`
	list-style: none;
	padding: 0;
`;

export default PostList;
