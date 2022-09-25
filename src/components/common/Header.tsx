import styled from '@emotion/styled';
import { DarkMode, LightMode, ModeNight, Nightlight } from '@mui/icons-material';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { animated, useTransition } from 'react-spring';

import { ColorMode, ThemeContext, useTheme, useToggleTheme } from '../CustomThemeProvider';
import SideBar from './SideBar';
const menuList = [
	{ name: 'home', link: '/' },
	// { name: '일상', link: '/' },
	{ name: 'projects', link: '/post/project' },
	{ name: 'til', link: '/post/til' },
];

const DarkToggleButton = () => (
	<IconButton color="inherit" sx={{ '&:hover': { color: '#e66b27' } }}>
		<LightMode />
	</IconButton>
);

const LightToggleButton = () => (
	<IconButton color="inherit" sx={{ '&:hover': { color: '#FFD500' } }}>
		<Nightlight sx={{ transform: 'rotate(-45deg)' }} />
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

export const ButtonGroup = () => {
	return (
		<>
			<ThemeToggleButton />
			<IconButton href="/search" color="inherit">
				<SearchIcon />
			</IconButton>
		</>
	);
};

/* TODO 모바일 사이즈에서는 돋보기가 없어지고 햄버거 메뉴로 통합 */
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
				<Grid
					container
					// justifyContent="flex-end"
					sx={{ display: { xs: 'none', sm: 'flex' } }}
				>
					{menuList.map(({ name, link }) => (
						<Grid item key={name}>
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

				<Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
					<Group>
						<ButtonGroup />
					</Group>
				</Box>
				<Box
					sx={{ display: { xs: 'flex', sm: 'none' }, width: '100%', justifyContent: 'flex-end' }}
				>
					<SideBar menuList={menuList} />
				</Box>
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
	width: 100%;
	display: flex;
	justify-content: flex-end;

	/* background-color: #6868ac;
	border-radius: 1rem;
	color: #fff; */
`;
