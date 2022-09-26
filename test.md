import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

// const a = fs.readdirSync(path.join('post/')).map(sub => {
// 	return fs
// 		.readdirSync(path.join('post/' + sub), { withFileTypes: true })
// 		.filter(dirent => dirent.isDirectory())
// 		.map(dirent => dirent.name)
// 		.map(year => {
// 			return fs.readdirSync(path.join('post/' + sub + '/' + year)).map(item => ({ slug: item }));
// 		});
// });

// const result = [];

// for (let sub of fs.readdirSync(path.join('post/'))) {
// 	for (let year of fs
// 		.readdirSync(path.join('post/' + sub), { withFileTypes: true })
// 		.filter(dirent => dirent.isDirectory())
// 		.map(dirent => dirent.name)) {
// 		fs.readdirSync(path.join('post/' + sub + '/' + year)).forEach(slug =>
// 			result.push({ sub, year, slug: slug.replace('.md', '') }),
// 		);
// 	}
// }

// console.log(result);
const readAllFiles = sub => {
	const posts = [];
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
				frontmatter.except = content.replace(reg, '').substring(0, 10);

				return {
					folderPath: path.join(sub, year, month, day, filename),
					filename,
					frontmatter,
				};
			}),
		);
	});

	return {
		props: {
			posts: posts.reverse(),
		},
	};
};

// const readAllFiles = rootPath => {

// }
readAllFiles('_posts/project/');
