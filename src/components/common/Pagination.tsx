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

interface LinkIconWrapperProps {
	children: ReactNode;
	path: {
		pathname: string;
		query: { page: number };
	};
	isDisable: boolean;
}

const LinkIconWrapper: FC<LinkIconWrapperProps> = ({ children, path, isDisable }) => (
	<Link href={path}>
		<a className={isDisable ? 'disable' : ''}>{children}</a>
	</Link>
);

const Pagination: FC<PaginationProps> = ({ paging }) => {
	const path = window.location.pathname;

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Pageinate>
				{paging.pageCounts ? (
					<>
						<LinkIconWrapper
							path={{ pathname: path, query: { page: 1 } }}
							isDisable={paging.isFirst}
						>
							<FirstPage />
						</LinkIconWrapper>
						<LinkIconWrapper
							path={{ pathname: path, query: { page: paging.pageCounts[0] - 1 } }}
							isDisable={paging.isFirst}
						>
							<NavigateBefore />
						</LinkIconWrapper>

						{paging.pageCounts.map(pageNum => (
							<Link href={{ pathname: path, query: { page: pageNum } }} key={pageNum}>
								<a className={paging.currentPage === pageNum ? 'active' : ''}>{pageNum}</a>
							</Link>
						))}

						<LinkIconWrapper
							path={{ pathname: path, query: { page: paging.pageCounts[4] + 1 } }}
							isDisable={paging.isLast}
						>
							<NavigateNext />
						</LinkIconWrapper>
						<LinkIconWrapper
							path={{ pathname: path, query: { page: paging.totalPages } }}
							isDisable={paging.isLast}
						>
							<LastPage />
						</LinkIconWrapper>
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
