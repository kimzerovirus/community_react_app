import styled from '@emotion/styled';
import { LightMode, ModeNight } from '@mui/icons-material';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';

import { ColorMode, ThemeContext, useTheme, useToggleTheme } from '../CustomThemeProvider';
const menuList = [
	{ name: '홈', link: '/' },
	// { name: '일상', link: '/' },
	{ name: '프로젝트', link: '/post/project' },
	{ name: 'TIL', link: '/post/til' },
];

const DarkToggleButton = () => (
	<IconButton color="inherit" sx={{ '&:hover': { color: '#e66b27' } }}>
		<LightMode />
	</IconButton>
);

const LightToggleButton = () => (
	<IconButton color="inherit" sx={{ '&:hover': { color: '#FFD500' } }}>
		<ModeNight />
	</IconButton>
);

const ThemeToggleButton = () => {
	const { toggleColorMode } = useContext(ThemeContext);

	return (
		<div onClick={toggleColorMode}>
			{useTheme() === ColorMode.light ? <LightToggleButton /> : <DarkToggleButton />}
		</div>
	);
};

const ButtonGroup = () => {
	const Group = styled.div`
		display: flex;
		/* background-color: #6868ac;
		border-radius: 1rem;
		color: #fff; */
	`;

	return (
		<Group>
			<ThemeToggleButton />
			<IconButton href="/search" color="inherit">
				<SearchIcon />
			</IconButton>
		</Group>
	);
};

export default function Header() {
	return (
		<Container maxWidth="xl">
			<Toolbar disableGutters variant="dense" sx={{ maxHeight: '80px' }}>
				<h1>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="https://github.com/kimzerovirus"
						sx={{
							mr: 2,
							fontWeight: 700,
							color: 'inherit',
							textDecoration: 'none',
							lineHeight: '80px',
						}}
					>
						KIMZEROVIRUS
					</Typography>
				</h1>
				<Grid container justifyContent="flex-end">
					{menuList.map(({ name, link }, idx) => (
						<Grid item key={idx}>
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

				<ButtonGroup />
			</Toolbar>
		</Container>
	);
}
