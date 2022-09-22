import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#6868ac',
		},
	},
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
});
