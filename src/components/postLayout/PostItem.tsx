import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { dateFormat } from 'src/utils/dateFormat';
import { PostProps } from 'src/utils/staticDataUtils';

export default function PostItem({ folderPath, frontmatter, slug }: PostProps) {
	return (
		<PostIteWrapper>
			<a href={`/${folderPath}/${slug}`}>
				<Typography
					variant="h5"
					noWrap
					component="h2"
					color="primary"
					sx={{
						fontWeight: 700,
					}}
				>
					{frontmatter.title}
				</Typography>
				<Typography
					variant="body1"
					noWrap
					component="p"
					sx={{
						color: 'inherit',
					}}
				>
					{dateFormat(frontmatter.date)}
				</Typography>
				<TextWrapper>
					<p>{frontmatter.except}</p>
				</TextWrapper>

				{/* <Tag>#JAVA</Tag> */}
			</a>
		</PostIteWrapper>
	);
}

const PostIteWrapper = styled.li`
	a {
		text-decoration: none;
		color: inherit;
	}
	margin: 56px 0;
	text-decoration: none;
	display: block;
	/* border-bottom: 1px solid #afafaf; */
`;

const TextWrapper = styled.div`
	width: 100%;
	p {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}
`;

const Tag = styled.div`
	/* padding: 0 1rem; */
	margin: 0 0.875rem 0.875rem 0;
	/* border-radius: 1rem; */
	/* background: #afafaf; */
	display: inline-flex;
	font-size: 14px;
`;
