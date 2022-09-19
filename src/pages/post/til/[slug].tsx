import { makePath } from 'src/utils/staticDataUtils';

export default function TILPostPage() {
	return <div>[til]</div>;
}

export async function getStaticPaths() {
	return makePath(process.env.NEXT_PUBLIC_TIL_FOLDER_PATH as string);
}

export async function getStaticProps({ params: { slug } }: any) {
	// const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');

	return {
		props: {},
	};
}
