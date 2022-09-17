import { colors, createTheme } from '@mui/material';

export const theme = createTheme({
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
