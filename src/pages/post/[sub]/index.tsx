import { useEffect, useState } from 'react';
import DefaultLayout from 'src/components/common/DefaultLayout';
import PostList from 'src/components/postLayout/PostList';
import { usePaging } from 'src/utils/customHooks';
import {
	makeListPath,
	PagingProps,
	ParamProps,
	PostProps,
	readAllFiles,
} from 'src/utils/staticDataUtils';

interface PostListPageProps {
	posts: PostProps[];
}

export default function PostListPage({ posts }: PostListPageProps) {
	const PER_PAGE = 8;

	const [paging, setPaging] = useState({} as PagingProps);
	const [slicedPosts, setSlicedPosts] = useState([] as PostProps[]);

	usePaging(setSlicedPosts, setPaging, posts, PER_PAGE);

	return (
		<DefaultLayout maxWidth="md" isBorder>
			<PostList posts={slicedPosts} paging={paging} />
		</DefaultLayout>
	);
}

export async function getStaticPaths() {
	return makeListPath();
}

export async function getStaticProps({ params: { sub } }: ParamProps) {
	return readAllFiles((process.env.NEXT_PUBLIC_ROOT_FOLDER + '/' + sub) as string);
}
