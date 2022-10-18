import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, TextField } from '@mui/material';
import Router, { useRouter } from 'next/router';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import DefaultLayout from 'src/components/common/DefaultLayout';
import PostList from 'src/components/postLayout/PostList';
import { PagingProps, PostProps, readAllFiles } from 'src/utils/staticDataUtils';

interface SearchPageProps {
	posts: PostProps[];
}

const Search: FC<SearchPageProps> = ({ posts }) => {
	// const [paging, setPaging] = useState({} as PagingProps);
	const [slicedPosts, setSlicedPosts] = useState([] as PostProps[]);
	const [searchValue, setSearchValue] = useState<string>('');
	const [noResult, setNoResult] = useState<string>('');

	const router = useRouter();

	Router.events.on('routeChangeComplete', () => {
		const { q } = router.query;
		const result = new Set();

		posts.forEach(post => {
			if (post.frontmatter.title.toLowerCase().includes(q as string)) result.add(post);
			if ((post.frontmatter.tags?.length as number) > 0) {
				post.frontmatter.tags?.forEach(tag => {
					if (tag.toLowerCase().includes(q as string)) result.add(post);
				});
			}
		});

		setSlicedPosts(Array.from(result) as unknown as PostProps[]);
		setNoResult(q as string);
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		// router.push('/post/search?q=' + (e.target as any).search.value);
		router.push({ pathname: '/post/search', query: { q: searchValue } });
		// window.location.href = '/post/search?q=' + searchValue;
	};

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

	return (
		<DefaultLayout maxWidth="md">
			<Box component="form" onSubmit={handleSubmit} mt={6}>
				<TextField
					margin="normal"
					// name="search"
					value={searchValue}
					onChange={handleInput}
					placeholder="검색어를 입력해주세요"
					fullWidth
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</Box>

			{slicedPosts.length > 0 ? (
				<PostList posts={slicedPosts} />
			) : noResult ? (
				<>"{noResult}"의 검색결과가 없습니다.</>
			) : (
				<></>
			)}
		</DefaultLayout>
	);
};

export async function getStaticProps() {
	const project = readAllFiles((process.env.NEXT_PUBLIC_ROOT_FOLDER + '/project') as string);
	const til = readAllFiles((process.env.NEXT_PUBLIC_ROOT_FOLDER + '/til') as string);
	const title = '검색 | kimzerovirus.log';

	return {
		props: {
			posts: [...project.props.posts, ...til.props.posts],
			seo: {
				title,
			},
		},
	};
}

export default Search;
