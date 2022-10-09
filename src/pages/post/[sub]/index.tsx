import { CatchingPokemonSharp } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import PostList from 'src/components/postLayout/PostList';
import {
	makeListPath,
	PagingProps,
	ParamProps,
	PostProps,
	PostsProps,
	readAllFiles,
} from 'src/utils/staticDataUtils';

export default function PostListPage({ posts }: PostsProps) {
	const PER_PAGE = 8;

	const router = useRouter();

	const [paging, setPaging] = useState({} as PagingProps);
	const [slicedPosts, setSlicedPosts] = useState([] as PostProps[]);

	useMemo(() => {
		if (router.isReady) {
			const { page } = router.query;
			const currentPage =
				page === undefined ? 1 : Number(page) > posts.length ? posts.length : Number(page);
			const start = (currentPage - 1) * PER_PAGE;
			const end = currentPage * PER_PAGE;
			const totalPages =
				posts.length % PER_PAGE === 0
					? posts.length / PER_PAGE
					: Math.floor(posts.length / PER_PAGE) + 1;

			const pageCounts: number[] = [];
			let startNum = 1,
				endNum = 1;

			if (totalPages <= 5) {
				startNum = 1;
				endNum = totalPages;
			} else {
				startNum = currentPage + 1 - (currentPage % 5);
				endNum = startNum + 4 > totalPages ? totalPages : startNum + 4;
			}

			for (let i = startNum; i <= endNum; i++) pageCounts.push(i);

			setSlicedPosts(posts.slice(start, end));
			setPaging({
				isFirst: currentPage === 1 ? true : false,
				isLast: currentPage === totalPages ? true : false,
				currentPage,
				totalPages,
				pageCounts,
			});
		}
	}, [router.isReady]);

	return <PostList posts={slicedPosts} paging={paging} />;
}

export async function getStaticPaths() {
	return makeListPath();
}

export async function getStaticProps({ params: { sub } }: ParamProps) {
	return readAllFiles((process.env.NEXT_PUBLIC_ROOT_FOLDER + '/' + sub) as string);
}
