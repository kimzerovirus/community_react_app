import { useEffect, useState } from 'react';
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

export default function PostListByTagPage({ posts }: PostListPageProps) {
	const [paging, setPaging] = useState({} as PagingProps);
	const [slicedPosts, setSlicedPosts] = useState([] as PostProps[]);

	usePaging(setSlicedPosts, setPaging, posts);

	return <PostList posts={slicedPosts} paging={paging} />;
}

export async function getStaticProps() {
	const project = readAllFiles((process.env.NEXT_PUBLIC_ROOT_FOLDER + '/project') as string);
	const til = readAllFiles((process.env.NEXT_PUBLIC_ROOT_FOLDER + '/til') as string);

	return {
		props: {
			posts: [...project.props.posts, ...til.props.posts],
		},
	};
}
