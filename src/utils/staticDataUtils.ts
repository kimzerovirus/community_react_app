import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

// export interface PostsProps {
// 	posts: PostProps[];
// 	paging: PagingProps;
// }

export interface PostProps {
	link: string;
	frontmatter: {
		title: string;
		date: string;
		except?: string;
		cover_image?: string;
	};
	filename: string;
}

export interface PagingProps {
	isFirst: boolean;
	isLast: boolean;
	currentPage: number;
	totalPages: number;
	pageCounts: number[];
}

export interface StaticProps {
	htmlstring: string;
	data: {
		title: string;
		date: string;
		except?: string;
		cover_image?: string;
	};
}

export interface PathProps {
	paths: ParamProps[];
	fallback: boolean;
}

export interface ParamProps {
	params: {
		sub: string;
		year: string;
		month: string;
		day: string;
		filename: string;
	};
}

export const getParsedMarkdown = ({ params: { sub, year, month, day, filename } }: ParamProps) => {
	const markdownWithMetaData = fs
		.readFileSync(
			path.join(
				process.env.NEXT_PUBLIC_ROOT_FOLDER as string,
				sub,
				year,
				year + '-' + month + '-' + day + '-' + filename + '.md',
			),
		)
		.toString();
	const parsedMarkdown = matter(markdownWithMetaData);

	return {
		props: {
			htmlstring: parsedMarkdown.content,
			data: parsedMarkdown.data,
		},
	};
};

/* 단일 연도 파일 찾기 */
export const readFile = (folderPath: string) => {
	// _post/[sub]/[year]
	const files = fs.readdirSync(path.join(folderPath));

	const posts = files.map(file => {
		const splitFile = file.split('-');
		const month = splitFile[1];
		const day = splitFile[2];
		const filename = splitFile[3].replace('.md', '');
		const markdownWithMeta = fs.readFileSync(path.join(folderPath, file), 'utf-8');
		const { data: frontmatter, content } = matter(markdownWithMeta);

		const reg = /[`~@#$%^&*()_|+\-='",<>\{\}\[\]\\\/]/gim;
		frontmatter.except = content.replace(reg, '').substring(0, 10);

		return {
			link: path
				.join(folderPath, month, day, filename)
				.replace(process.env.NEXT_PUBLIC_ROOT_FOLDER as string, '/post'),
			filename,
			frontmatter,
		};
	});

	return {
		props: {
			posts,
		},
	};
};

/* 해당 카테고리 전체 파일 찾기 */
export const readAllFiles = (sub: string) => {
	const posts: PostProps[] = [];
	const folders = fs.readdirSync(path.join(sub));

	folders.forEach(year => {
		posts.push(
			...fs.readdirSync(path.join(sub, year)).map(file => {
				const splitFile = file.split('-');
				const month = splitFile[1];
				const day = splitFile[2];
				const filename = splitFile[3].replace('.md', '');

				const markdownWithMeta = fs.readFileSync(path.join(path.join(sub, year), file), 'utf-8');
				const { data: frontmatter, content } = matter(markdownWithMeta);

				const reg = /[`~@#$%^&*()_|+\-='",<>\{\}\[\]\\\/]/gim;
				frontmatter.except = content.replace(reg, '').substring(0, 360);

				return {
					link: path
						.join(sub, year, month, day, filename)
						.replace(process.env.NEXT_PUBLIC_ROOT_FOLDER as string, '/post'),
					filename,
					frontmatter,
				} as PostProps;
			}),
		);
	});

	return {
		props: {
			posts: posts.reverse(),
		},
	};
};

/* 파일 경로 */
export const makePostPath = (
	rootFolder: string = process.env.NEXT_PUBLIC_ROOT_FOLDER as string,
) => {
	const paths: ParamProps[] = [];

	for (const sub of fs.readdirSync(path.join(rootFolder))) {
		for (const year of fs
			.readdirSync(path.join(rootFolder, sub), { withFileTypes: true })
			.filter(dirent => dirent.isDirectory())
			.map(dirent => dirent.name)) {
			fs.readdirSync(path.join(rootFolder, sub, year)).forEach(file => {
				const splitFile = file.split('-');
				const month = splitFile[1];
				const day = splitFile[2];
				const filename = splitFile[3].replace('.md', '');
				// 출력 예시_) http://localhost:3000/post/{sub}/{year}/{month}/{day}/{filename}
				paths.push({ params: { sub, year, month, day, filename } });
			});
		}
	}

	return {
		paths,
		fallback: false,
	};
};

/* 파일 리스트 경로 */
export const makeListPath = (
	rootFolder: string = process.env.NEXT_PUBLIC_ROOT_FOLDER as string,
) => {
	const subs = fs.readdirSync(path.join(rootFolder));

	const paths = subs.map(sub => ({
		params: {
			sub,
		},
	}));

	return {
		paths,
		fallback: false,
	};
};
