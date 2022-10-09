import styled from '@emotion/styled';
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Box } from '@mui/material';
import Link from 'next/link';
// /post/project?page=1

export default function Pagination() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Pageinate>
				<Link href="/post/project" className="pre_end">
					<a className="disable">
						<FirstPage />
					</a>
				</Link>
				<Link href="/post/project" className="pre_end">
					<a>
						<NavigateBefore />
					</a>
				</Link>
				<Link href="/post/project">
					<a className="active">5</a>
				</Link>
				<Link href="/" className="pre_end">
					<a>
						<NavigateNext />
					</a>
				</Link>
				<Link href="/post/project" className="pre_end">
					<a>
						<LastPage />
					</a>
				</Link>
			</Pageinate>
		</Box>
	);
}

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
