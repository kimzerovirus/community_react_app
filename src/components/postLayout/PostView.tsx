import styled from '@emotion/styled';
import { Home, LibraryBooksOutlined } from '@mui/icons-material';
import { Container, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import DefaultLayout from 'src/components/common/DefaultLayout';
import { GithubIcon } from 'src/components/common/Icons';
import markDownBlocks from 'src/components/markdownBlocks';
import Toc from 'src/components/markdownBlocks/Toc';
import Comment from 'src/components/postLayout/Comment';
import Tag from 'src/components/postLayout/Tag';
import { usePreventCopy } from 'src/utils/customHooks';
import { dateFormat } from 'src/utils/dateFormat';
import { StaticProps } from 'src/utils/staticDataUtils';

export default function PostView({ htmlstring, data, indexes, serieslist, prevnext }: StaticProps) {
	const path = window.location.pathname.split('/');
	const basepath = '/' + path[1] + '/' + path[2];
	usePreventCopy();

	return (
		<DefaultLayout maxWidth="xl" isBorder>
			<Container maxWidth="md">
				<TitleTypo>{data.title}</TitleTypo>
				<Typography
					variant="body2"
					noWrap
					component="p"
					mb={6}
					sx={{
						// color: 'rgba(128, 128, 128, 0.36)',
						opacity: 0.5,
						textAlign: 'center',
					}}
				>
					{dateFormat(data.date)}
				</Typography>
			</Container>

			<div style={{ position: 'relative', height: '100%', width: '100%' }}>
				<Toc indexes={indexes} />
				<Container maxWidth="md">
					{/* Sticky Table of Contents */}

					<ReactMarkdown
						className="markdown-style"
						remarkPlugins={[remarkGfm]} // TODO link, table, checklist - styling
						rehypePlugins={[[rehypeRaw, { passThrough: ['element'] }]]}
						components={markDownBlocks}
					>
						{htmlstring
							.replace(/\n\s\n\s/gi, '\n\n&nbsp;\n\n')
							.replace(/\*\*/gi, '@$_%!^')
							.replace(/@\$_%!\^/gi, '**')
							.replace(/<\/?u>/gi, '*')}
					</ReactMarkdown>
				</Container>
				<Container maxWidth="md" sx={{ marginTop: '12rem' }}>
					{/* 하단 아이콘 리스트 보류... */}
					<IconGroup>
						<IconButton href="https://github.com/kimzerovirus">
							<GithubIcon />
						</IconButton>
						<IconButton href="https://kimzerovirus.github.io/">
							<Home />
						</IconButton>
						<IconButton href={basepath}>
							<LibraryBooksOutlined />
						</IconButton>
					</IconGroup>
					{data.tags && data.tags?.length > 0 ? <TagList tags={data.tags} /> : <></>}
					<Comment />
				</Container>
			</div>
		</DefaultLayout>
	);
}

// const DesignedBox = styled.div`
// 	width: 100%;
// 	div {
// 		width: 1.5rem;
// 		height: 2px;
// 		background-color: #afafaf;
// 		margin: 1rem auto 3rem;
// 	}
// `;

const IconGroup = styled.div`
	display: flex;
	border-bottom: 1px solid rgba(128, 128, 128, 0.36);
	margin-bottom: 2rem;

	svg {
		color: rgba(128, 128, 128, 0.36);
		cursor: pointer;
		width: 2rem;
		height: 2rem;
	}
`;

const TitleTypo = styled.h1`
	color: #6868ac;
	font-weight: 700;
	text-align: center;
	width: 100%;
	display: block;
	font-size: 3rem;
	margin: 6rem 0 0;
	word-break: keep-all;

	@media (max-width: 760px) {
		//모바일
		margin: 3rem 0 0;
		font-size: 2rem;
	}
`;

interface TagListProps {
	tags: string[];
}

const TagList: FC<TagListProps> = ({ tags }) => {
	const path = window.location.pathname.split('/');
	const basepath = '/' + path[1] + '/' + path[2];

	return (
		<TagListWrapper>
			{tags.map((tag, key) => (
				<Tag key={key} query={{ tag }} tagname={tag} pathname={basepath} />
			))}
		</TagListWrapper>
	);
};

const TagListWrapper = styled.div`
	width: 100%;
`;
