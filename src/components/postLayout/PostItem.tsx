import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { dateFormat } from 'src/utils/dateFormat';
import { PostProps } from 'src/utils/staticDataUtils';

export default function PostItem({ link, frontmatter, filename }: PostProps) {
	return (
		<PostItemWrapper>
			<a href={link}>
				<Typography
					variant="h5"
					// noWrap // 한 줄 ...
					component="h2"
					color="primary"
					sx={{
						fontWeight: 700,
						wordBreak: 'keep-all',
					}}
				>
					{frontmatter.title}
				</Typography>
				<Typography
					variant="body2"
					noWrap
					component="p"
					sx={{
						// color: '#afafaf',
						opacity: 0.4,
					}}
				>
					{dateFormat(frontmatter.date)}
				</Typography>
				<TextWrapper>
					<p>{frontmatter.except}</p>
				</TextWrapper>

				{/* <Tag>#JAVA</Tag> */}
			</a>
		</PostItemWrapper>
	);
}

const PostItemWrapper = styled.li`
	a {
		text-decoration: none;
		color: inherit;
	}
	margin: 3rem 0;
	text-decoration: none;
	display: block;
	/* border-bottom: 1px solid #afafaf; */
	@media (max-width: 760px) {
		//모바일
		margin: 2rem 0;

		&:first-of-type {
			margin-top: 0;
		}
	}
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
