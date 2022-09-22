import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

export const lightTheme = createTheme({
	palette: {
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
