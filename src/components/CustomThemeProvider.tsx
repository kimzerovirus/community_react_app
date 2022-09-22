import { ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { darkTheme, lightTheme } from 'src/styles/theme/customTheme';

interface PorpsType {
	children: React.ReactNode;
}

interface ContextType {
	isDark: ColorMode.light | ColorMode.dark;
	toggleColorMode: () => void;
}

export enum ColorMode {
	light = 'light',
	dark = 'dark',
}

export const ThemeContext = createContext<ContextType>({} as ContextType);

const initialTheme = (): boolean => {
	if (typeof window !== 'undefined') {
		const localTheme = window.localStorage.getItem('theme');
		if (localTheme === ColorMode.dark) {
			return true;
		} else if (localTheme === ColorMode.light) {
			return false;
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	return false;
};

export default function CustomThemeProvider({ children }: PorpsType) {
	const [isDark, setIsDark] = useState(ColorMode.light);
	const value = useMemo(
		() => ({
			toggleColorMode: () => {
				setIsDark(prev => (prev === ColorMode.light ? ColorMode.dark : ColorMode.light));
			},
			isDark,
		}),
		[isDark],
	);

	return (
		<ThemeContext.Provider value={value}>
			<ThemeProvider theme={isDark === 'light' ? lightTheme : darkTheme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
}

export const useTheme = (): ColorMode => {
	const [theme, setTheme] = useState(ColorMode.light);
	const { isDark } = useContext(ThemeContext);

	useMemo(() => {
		const pickedTheme = isDark === ColorMode.light ? ColorMode.light : ColorMode.dark;
		setTheme(pickedTheme);
	}, [isDark]);

	return theme;
};

export const useToggleTheme = () => {
	const { toggleColorMode } = useContext(ThemeContext);
	return toggleColorMode;
};
