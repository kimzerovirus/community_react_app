import PostList from 'src/components/postLayout/PostList';
import { PostsProps, readFile } from 'src/utils/staticDataUtils';

export default function TIL({ posts }: PostsProps) {
	return <PostList posts={posts} />;
}

export async function getStaticProps() {
	return readFile(process.env.NEXT_PUBLIC_TIL_FOLDER_PATH as string);
}
