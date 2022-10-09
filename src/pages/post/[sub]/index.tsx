import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
	const paging = {} as PagingProps;
	const slicedPosts = [] as PostProps[];

	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			const { page }: any = router.query;
			const currentPage = page === undefined ? 1 : page > posts.length ? posts.length : page;
			const start = (currentPage - 1) * PER_PAGE;
			const end = currentPage * PER_PAGE;
			const totalPage =
				posts.length % PER_PAGE === 0
					? posts.length / PER_PAGE
					: Math.floor(posts.length / PER_PAGE) + 1;

			paging.isFirst = currentPage === 1 ? true : false;
			paging.isLast = currentPage === totalPage ? true : false;
			paging.cPage = currentPage;
			paging.totalPage = totalPage;
			slicedPosts.push(...posts.slice(start, end));
		}
	}, [router.isReady]);

	return <PostList posts={slicedPosts} />;
}

export async function getStaticPaths() {
	return makeListPath();
}

export async function getStaticProps({ params: { sub } }: ParamProps) {
	return readAllFiles((process.env.NEXT_PUBLIC_ROOT_FOLDER + '/' + sub) as string);
}
