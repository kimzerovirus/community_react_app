import styled from '@emotion/styled';
import { LightMode, ModeNight } from '@mui/icons-material';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';
import { animated, useTransition } from 'react-spring';

import { ColorMode, ThemeContext, useTheme, useToggleTheme } from '../CustomThemeProvider';
const menuList = [
	{ name: 'HOME', link: '/' },
	// { name: '일상', link: '/' },
	{ name: 'PROJECT', link: '/post/project' },
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
	const isDark = useTheme() === ColorMode.dark;

	const transitions = useTransition(isDark, {
		initial: {
			transform: 'scale(1) rotate(0deg)',
			opacity: 1,
		},
		from: {
			transform: 'scale(0) rotate(-180deg)',
			opacity: 0,
		},
		enter: {
			transform: 'scale(1) rotate(0deg)',
			opacity: 1,
		},
		leave: {
			transform: 'scale(0) rotate(180deg)',
			opacity: 0,
		},

		reverse: true,
	});

	return (
		<div onClick={toggleColorMode}>
			{transitions((style, item) =>
				item ? (
					<Positioner>
						<animated.div style={style}>
							<LightToggleButton />
						</animated.div>
					</Positioner>
				) : (
					<Positioner>
						<animated.div style={style}>
							<DarkToggleButton />
						</animated.div>
					</Positioner>
				),
			)}
		</div>
	);
};

const ButtonGroup = () => {
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
				<Grid container>
					{menuList.map(({ name, link }, idx) => (
						<Grid item key={idx}>
							<Button
								component="a"
								href={link}
								sx={{
									color: 'inherit',
									fontSize: '1rem',
									textDecoration: 'none',
									minWidth: '0',
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

const Positioner = styled.div`
	position: relative;
	width: 40px;
	div {
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(-50%, -50%);
	}
`;

const Group = styled.div`
	display: flex;
	/* background-color: #6868ac;
	border-radius: 1rem;
	color: #fff; */
`;
