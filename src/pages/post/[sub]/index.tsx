import PostList from 'src/components/postLayout/PostList';
import { makeListPath, ParamProps, PostsProps, readAllFiles } from 'src/utils/staticDataUtils';

export default function PostListPage({ posts }: PostsProps) {
	return <PostList posts={posts} />;
}

export async function getStaticPaths() {
	return makeListPath();
}

export async function getStaticProps({ params: { sub } }: ParamProps) {
	return readAllFiles((process.env.NEXT_PUBLIC_ROOT_FOLDER + '/' + sub) as string);
}
