import { colors, createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		primary: {
			main: 'rgb(0,0,0)',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: colors.red.A400,
		},
	},
});
