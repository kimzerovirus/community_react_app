import PostList from 'src/components/PostList';
import { PostsProps, readFile } from 'src/utils/staticDataUtils';

export default function Projects({ posts }: PostsProps) {
	return <PostList posts={posts} />;
}

export async function getStaticProps() {
	return readFile(process.env.NEXT_PUBLIC_PROJECT_FOLDER_PATH as string);
}
