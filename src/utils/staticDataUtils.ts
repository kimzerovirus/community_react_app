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
		year: string;
		except?: string;
		tags?: string[];
		coverImage?: string;
	};
	filename: string;
}

export interface ArchiveProps {
	tagList: string[];
	yearList: YearProps[];
}

export interface YearProps {
	year: string;
	total: number;
}

export interface PagingProps {
	isFirst: boolean;
	isLast: boolean;
	currentPage: number;
	totalPages: number;
	pageCounts: number[];
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

export interface StaticProps {
	htmlstring: string;
	data: {
		title: string;
		date: string;
		except?: string;
		tags?: string[];
		cover_image?: string;
	};
	indexes: IndexProps[];
}

export interface IndexProps {
	depth: number;
	title: string;
}

// 포스팅 데이터 가져오기
export const getParsedMarkdown = ({ params: { sub, year, month, day, filename } }: ParamProps) => {
	const INDENT_SIZE = 12;

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

	const titles = parsedMarkdown.content.split(`\n`).filter(title => title.includes('# '));
	const indexes = titles
		.filter(str => str[0] === '#')
		.map(title => {
			const depth =
				(title.match(/#/g)?.length as number) > 0
					? ((title.match(/#/g)?.length as number) - 1) * INDENT_SIZE
					: INDENT_SIZE;

			return { title: title.split('# ')[1].replace(/`/g, '').trim(), depth };
		});

	return {
		props: {
			htmlstring: parsedMarkdown.content,
			data: parsedMarkdown.data,
			indexes,
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
	const yearList: { year: string; total: number }[] = [];
	const tagList = new Set(); // 태그 중복제거 필요함

	const folders = fs.readdirSync(path.join(sub));

	folders.forEach(year => {
		const postsByYear = fs.readdirSync(path.join(sub, year)).map(file => {
			const splitFile = file.split('-');
			const month = splitFile[1];
			const day = splitFile[2];
			const filename = splitFile[3].replace('.md', '');

			const markdownWithMeta = fs.readFileSync(path.join(path.join(sub, year), file), 'utf-8');
			const { data: frontmatter, content } = matter(markdownWithMeta);

			const reg = /[`~@#$%^&*()_|+\-='",<>\{\}\[\]\\\/]/gim;
			frontmatter.except = content.replace(reg, '').substring(0, 360);
			frontmatter.year = year;

			return {
				link: path
					.join(sub, year, month, day, filename)
					.replace(process.env.NEXT_PUBLIC_ROOT_FOLDER as string, '/post'),
				filename,
				frontmatter,
			} as PostProps;
		});

		yearList.push({ year, total: postsByYear.length });
		posts.push(...postsByYear);
	});

	const list = yearList.reverse();
	list.unshift({ year: '모든글', total: posts.length });
	posts.forEach(post => post.frontmatter.tags?.forEach(tag => tagList.add(tag)));

	return {
		props: {
			posts: posts.reverse(),
			archive: {
				tagList: Array.from(tagList),
				yearList: list,
			},
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

/* 파일 리스트 경로 by year */
// export const makeListByYearPath = (
// 	rootFolder: string = process.env.NEXT_PUBLIC_ROOT_FOLDER as string,
// ) => {
// 	const subs = fs.readdirSync(path.join(rootFolder));

// 	const paths: {
// 		params: {
// 			sub: string;
// 			year: string;
// 		};
// 	}[] = [];

// 	for (const sub of subs) {
// 		for (const year of fs
// 			.readdirSync(path.join(rootFolder, sub), { withFileTypes: true })
// 			.filter(dirent => dirent.isDirectory())
// 			.map(dirent => dirent.name)) {
// 			paths.push({ params: { sub, year } });
// 		}
// 	}

// 	return {
// 		paths,
// 		fallback: false,
// 	};
// };
