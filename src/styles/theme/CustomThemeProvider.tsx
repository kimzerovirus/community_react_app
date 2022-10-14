import { ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { darkTheme, lightTheme } from 'src/styles/theme/customTheme';

interface PorpsType {
	children: React.ReactNode;
}

interface ContextType {
	mode: ColorMode.light | ColorMode.dark;
	toggleColorMode: () => void;
}

export enum ColorMode {
	light = 'light',
	dark = 'dark',
}

const initialTheme = (): ColorMode => {
	if (typeof window !== 'undefined') {
		const localTheme = window.localStorage.getItem('theme');

		if (localTheme === ColorMode.dark) {
			return ColorMode.dark;
		} else if (localTheme === ColorMode.light) {
			return ColorMode.light;
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return ColorMode.dark;
		}
	}

	return ColorMode.light;
};

export const ThemeContext = createContext({} as ContextType);

export default function CustomThemeProvider({ children }: PorpsType) {
	const [mode, setMode] = useState(initialTheme());
	const [loaded, setLoaded] = useState(false);
	useEffect(() => setLoaded(true), []); // https://stackoverflow.com/questions/55271855/react-material-ui-ssr-warning-prop-d-did-not-match-server-m-0-0-h-24-v-2

	const value = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode(prev => {
					const mode = prev === ColorMode.light ? ColorMode.dark : ColorMode.light;
					if (typeof window !== 'undefined') window.localStorage.setItem('theme', mode);

					return mode;
				});
			},
			mode,
		}),
		[mode],
	);

	return loaded ? (
		<ThemeContext.Provider value={value}>
			<ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	) : (
		<></>
	);
}

export const useTheme = (): ColorMode => {
	const { mode } = useContext(ThemeContext);
	const [theme, setTheme] = useState(mode);

	useMemo(() => {
		const pickedTheme = mode === ColorMode.light ? ColorMode.light : ColorMode.dark;
		setTheme(pickedTheme);
	}, [mode]);

	return theme;
};

export const useToggleTheme = () => {
	const { toggleColorMode } = useContext(ThemeContext);
	return toggleColorMode;
};
