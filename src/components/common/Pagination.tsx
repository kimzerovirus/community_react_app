import styled from '@emotion/styled';
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { PagingProps } from 'src/utils/staticDataUtils';

// /post/project?page=1

interface PaginationProps {
	paging: PagingProps;
}

const Pagination: FC<PaginationProps> = ({ paging }) => {
	const path = window.location.pathname;
	console.log(paging);

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Pageinate>
				{paging.pageCounts ? (
					<>
						<Link href={path}>
							<a className={paging.isFirst ? 'disable' : ''}>
								<FirstPage />
							</a>
						</Link>
						<Link href={path}>
							<a className={paging.isFirst ? 'disable' : ''}>
								<NavigateBefore />
							</a>
						</Link>

						{paging.pageCounts.map(pageNum => (
							<Link href={{ pathname: path, query: { page: pageNum } }} key={pageNum}>
								<a className={paging.currentPage === pageNum ? 'active' : ''}>{pageNum}</a>
							</Link>
						))}

						<Link href={path}>
							<a className={paging.isLast ? 'disable' : ''}>
								<NavigateNext />
							</a>
						</Link>
						<Link href={path}>
							<a className={paging.isLast ? 'disable' : ''}>
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
	margin: 20px 0 0;
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
			background-color: rgba(255, 255, 255, 0.16);
		}

		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
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
