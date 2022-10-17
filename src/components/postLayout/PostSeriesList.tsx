import styled from '@emotion/styled';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC, useState } from 'react';

interface SeriesProps {
	serieslist?: { link: string; title: string }[];
	seriesname?: string;
	currentTitle: string;
}

const PostSeriesList: FC<SeriesProps> = ({ serieslist, seriesname, currentTitle }) => {
	const path = window.location.pathname.split('/');
	const basepath = '/' + path[1] + '/' + path[2];
	const [isToggle, setIsToggle] = useState(false);

	const toggleHandler = () => {
		setIsToggle(bool => !bool);
	};

	return serieslist && serieslist.length > 0 ? (
		<PostSeriesListWrapper>
			<SeriesMeta>
				<Typography variant="body2" sx={{ opacity: 0.5 }}>
					이 시리즈 더보기
				</Typography>
				<Typography variant="h6">
					<Link href={{ pathname: basepath, query: { series: seriesname } }}>
						<a>{seriesname}</a>
					</Link>
					{isToggle ? (
						<KeyboardArrowUpRounded onClick={toggleHandler} />
					) : (
						<KeyboardArrowDownRounded onClick={toggleHandler} />
					)}
				</Typography>
			</SeriesMeta>
			{isToggle ? (
				<SeriesBox>
					<ul>
						{serieslist.map((series, key) => (
							<li key={key} className={currentTitle === series.title ? 'active' : ''}>
								<span>{key + 1}.&nbsp;</span>
								<Link href={{ pathname: series.link }}>{series.title}</Link>
							</li>
						))}
					</ul>
				</SeriesBox>
			) : (
				<></>
			)}
		</PostSeriesListWrapper>
	) : (
		<></>
	);
};

const PostSeriesListWrapper = styled.div`
	width: 100%;
	padding-bottom: 2rem;
	margin-bottom: 2rem;
	border-bottom: 1px solid rgba(128, 128, 128, 0.36);
`;

const SeriesMeta = styled.div`
	width: 100%;
	h6 {
		display: flex;
		justify-content: space-between;
		/* a:hover {
			text-decoration: underline;
		} */
		svg {
			width: 20px;
			height: 32px;
			cursor: pointer;
		}
	}
`;

const SeriesBox = styled.div`
	ul,
	li {
		padding: 0;
		margin: 0;
		list-style: none;
	}

	ul {
		padding-left: 1rem;

		li {
			margin: 0.25rem 0;
			display: flex;

			a {
				width: 100%;
				display: block;
				&:hover {
					text-decoration: underline;
				}
			}
			&.active {
				/* background-color: #6868ac; */
				font-weight: 500;
			}
		}
	}
`;

export default PostSeriesList;
