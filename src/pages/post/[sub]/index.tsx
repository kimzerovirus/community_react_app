import styled from '@emotion/styled';
import { NextSeo } from 'next-seo';
import SEO from 'next-seo.config';
import { useState } from 'react';
import DefaultLayout from 'src/components/common/DefaultLayout';
import ArchiveList from 'src/components/postLayout/ArchiveList';
import PostList from 'src/components/postLayout/PostList';
import { usePaging } from 'src/utils/customHooks';
import {
	ArchiveProps,
	makeListPath,
	PagingProps,
	ParamProps,
	PostProps,
	readAllFiles,
} from 'src/utils/staticDataUtils';

interface PostListPageProps {
	posts: PostProps[];
	archive: ArchiveProps;
}

export default function PostListPage({ posts, archive }: PostListPageProps) {
	const [paging, setPaging] = useState({} as PagingProps);
	const [slicedPosts, setSlicedPosts] = useState([] as PostProps[]);
	const [selected, setSelected] = useState<string>('모든글');

	usePaging(setSelected, setSlicedPosts, setPaging, posts);

	let SEO_TITLE;

	[
		{ en: 'project', ko: '프로젝트' },
		{ en: 'til', ko: '공부' },
	].forEach(name => {
		if (window.location.pathname.includes(name.en)) SEO_TITLE = name.ko;
	});

	return (
		<DefaultLayout maxWidth="xl" isBorder>
			<NextSeo title={`${SEO_TITLE} | kimzerovirus.log`} openGraph={SEO.openGraph} />
			<CustomGrid>
				<ArchiveList archive={archive} selected={selected} />
				<PostList posts={slicedPosts} paging={paging} selected={selected} />
			</CustomGrid>
		</DefaultLayout>
	);
}

const CustomGrid = styled.div`
	width: 100%;
	display: flex;
`;

export async function getStaticPaths() {
	return makeListPath();
}

export async function getStaticProps({ params: { sub } }: ParamProps) {
	return readAllFiles((process.env.NEXT_PUBLIC_ROOT_FOLDER + '/' + sub) as string);
}
