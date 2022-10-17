import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';
import Tag from 'src/components/postLayout/Tag';
import { ArchiveInfoProps, ArchiveProps } from 'src/utils/staticDataUtils';

interface ArchiveListProps {
	archive: ArchiveProps;
	selected: string;
}

const ArchiveList: FC<ArchiveListProps> = ({ archive, selected }) => {
	return (
		<ArchiveBox>
			<div className="sticky">
				<TitleTypo title="archive" />
				<ArchiveYearList archiveInfo={archive.yearList} selected={selected} />

				<TitleTypo title="tag" />
				<TagList tagList={archive.tagList} selected={selected} />

				<TitleTypo title="series" />
				<ArchiveSeriesList archiveInfo={archive.seriesList} selected={selected} />
			</div>
		</ArchiveBox>
	);
};

const ArchiveBox = styled.div`
	display: none;
	@media (min-width: 1280px) {
		display: block;
		width: 100%;
		height: inherit;
		max-width: 300px;
		min-height: calc(100vh - 80px);
		border-right: 1px solid rgba(128, 128, 128, 0.36);
		overflow: visible;

		.sticky {
			max-height: 100vh;
			min-height: calc(100vh - 80px);
			height: auto;
			overflow: auto;

			/* position: fixed; */
			@supports (position: sticky) or (position: -webkit-sticky) {
				position: sticky;
				position: -webkit-sticky;
				top: 0px;
			}
		}

		.active {
			background-color: #6868ac;
			color: #fff;
		}
	}
`;

interface ArchiveInfoListProps {
	archiveInfo: ArchiveInfoProps[];
	selected: string;
}

const ArchiveYearList: FC<ArchiveInfoListProps> = ({ archiveInfo, selected }) => {
	const basepath = window.location.pathname;

	return (
		<ArchiveInfoListWrapper>
			{archiveInfo.map(({ title, total }, key) => (
				<li key={key} className={title === selected ? 'active' : ''}>
					{key > 0 ? (
						<Link href={{ pathname: basepath, query: { year: title } }}>
							<a>
								<span>{title}년</span>
								<span>{total}</span>
							</a>
						</Link>
					) : (
						<Link href={{ pathname: basepath }}>
							{/* key 가 0이면 모든글이다. */}
							<a>
								<span>{title}</span>
								<span>{total}</span>
							</a>
						</Link>
					)}
				</li>
			))}
		</ArchiveInfoListWrapper>
	);
};

const ArchiveSeriesList: FC<ArchiveInfoListProps> = ({ archiveInfo, selected }) => {
	const basepath = window.location.pathname;

	return (
		<ArchiveInfoListWrapper>
			{archiveInfo.map(({ title, total }, key) => (
				<li key={key} className={title === selected ? 'active' : ''}>
					<Link href={{ pathname: basepath, query: { series: title } }}>
						<a>
							<span>{title}</span>
							<span>{total}</span>
						</a>
					</Link>
				</li>
			))}
		</ArchiveInfoListWrapper>
	);
};

const ArchiveInfoListWrapper = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	li {
		padding: 0.5rem;
		width: 100%;
		a {
			width: 100%;
			display: block;
			display: flex;
			padding: 0 4px;
			justify-content: space-between;
			span {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				&:first-of-type {
					width: calc(100% - 20px);
				}
			}
		}
	}
`;

interface TagListProps {
	tagList: string[];
	selected: string;
}

const TagList: FC<TagListProps> = ({ tagList, selected }) => {
	const basepath = window.location.pathname;

	return (
		<>
			{tagList.map((tag, key) => (
				<Tag key={key} query={{ tag }} selected={selected} tagname={tag} pathname={basepath} />
			))}
		</>
	);
};

interface TitleTypoProps {
	title: string;
}

const TitleTypo: FC<TitleTypoProps> = ({ title }) => (
	<Typography
		variant="body2"
		noWrap
		component="p"
		mt={1}
		mb={1}
		sx={{
			// color: 'rgba(128, 128, 128, 0.36)',
			opacity: 0.5,
		}}
	>
		{title.toLocaleUpperCase()}
	</Typography>
);

export default ArchiveList;
