import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import * as React from 'react';

export default function Header() {
	const menuList = [
		{ name: '홈', link: '/' },
		{ name: '일상', link: '/' },
		{ name: '프로젝트', link: '/' },
		{ name: 'TIL', link: '/' },
	];

	return (
		<Container maxWidth="xl">
			<Toolbar>
				<h1>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							fontWeight: 700,
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						KIMZEROVIRUS
					</Typography>
				</h1>
				<Grid container justifyContent="flex-end">
					{menuList.map(({ name, link }) => (
						<Grid item>
							<Button
								component="a"
								href={link}
								sx={{
									color: 'inherit',
									fontSize: '1rem',
									textDecoration: 'none',
								}}
							>
								{name}
							</Button>
						</Grid>
					))}
				</Grid>
				<IconButton>
					<SearchIcon />
				</IconButton>
			</Toolbar>
		</Container>
	);
}
