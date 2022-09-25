import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const breakpoints = {
	values: {
		xs: 0,
		sm: 760,
		md: 900,
		lg: 1080,
		xl: 1320,
	},
};

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#6868ac',
		},
		background: {
			default: '#0d1117',
		},
	},
	breakpoints,
});

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#6868ac',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: colors.red.A400,
		},
	},
	breakpoints,
});
