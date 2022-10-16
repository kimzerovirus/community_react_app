import styled from '@emotion/styled';
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Box } from '@mui/material';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { PagingProps } from 'src/utils/staticDataUtils';

// /post/project?page=1

interface PaginationProps {
	paging: PagingProps;
}

// interface LinkIconWrapperProps {
// 	children: ReactNode;
// 	path: {
// 		pathname: string;
// 		query: { page: number };
// 	};
// 	isDisable: boolean;
// }

// const LinkIconWrapper: FC<LinkIconWrapperProps> = ({ children, path, isDisable }) => (
// 	<Link href={path}>
// 		<a className={isDisable ? 'disable' : ''}>{children}</a>
// 	</Link>
// );

const Pagination: FC<PaginationProps> = ({ paging }) => {
	const router = useRouter();
	const basepath = window.location.pathname;
	const isQuery = router.asPath.split('?')[1];

	const makePath = (page: number) => {
		if (isQuery) {
			const querystring = isQuery.split('&')[0].split('=');

			if (querystring[0] !== 'page') {
				return {
					pathname: basepath,
					query: {
						[querystring[0]]: querystring[1],
						page,
					},
				};
			}
		}

		return {
			pathname: basepath,
			query: {
				page,
			},
		};
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Pageinate>
				{paging.pageCounts ? (
					<>
						<Link href={makePath(1)}>
							<a>
								<FirstPage />
							</a>
						</Link>

						<Link href={paging.isPrev ? makePath(paging.pageCounts[0] - 1) : makePath(1)}>
							<a>
								<NavigateBefore />
							</a>
						</Link>

						{paging.pageCounts.map(pageNum => (
							<Link href={makePath(pageNum)} key={pageNum}>
								<a className={paging.currentPage === pageNum ? 'active' : ''}>{pageNum}</a>
							</Link>
						))}

						<Link
							href={
								paging.isNext ? makePath(paging.pageCounts[4] + 1) : makePath(paging.totalPages)
							}
						>
							<a>
								<NavigateNext />
							</a>
						</Link>
						<Link href={makePath(paging.totalPages)}>
							<a>
								<LastPage />
							</a>
						</Link>
					</>
				) : (
					<></>
				)}
			</Pageinate>
		</Box>
	);
};

const Pageinate = styled.div`
	margin-bottom: 3rem;
	clear: both;
	display: flex;

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 6px;
		box-sizing: border-box;
		min-width: 32px;
		line-height: 32px;
		width: 20px;
		height: 32px;
		margin: 0 3px;
		text-align: center;
		font-size: 0.875rem;
		font-family: Roboto, Helvetica, Arial, sans-serif;
		border-radius: 4px;
		vertical-align: middle;
		border: 0;

		&.active {
			background-color: rgba(128, 128, 128, 0.24);
		}

		&:hover {
			background-color: rgba(128, 128, 128, 0.1);
		}

		&.disable {
			&:hover {
				background-color: transparent;
			}
			opacity: 0.38;
			pointer-events: none;
		}

		svg {
			width: 20px;
			height: 20px;
		}
	}
`;

export default Pagination;
