import MarkDownView from 'src/components/postLayout/MarkDownView';
import {
	getParsedMarkdown,
	makePostPath,
	ParamProps,
	StaticProps,
} from 'src/utils/staticDataUtils';

export default function ProjectPostPage({ htmlstring, data }: StaticProps) {
	return <MarkDownView htmlstring={htmlstring} data={data} />;
}

export async function getStaticPaths() {
	return makePostPath();
}

export async function getStaticProps({ params }: ParamProps) {
	return getParsedMarkdown({ params });
}
