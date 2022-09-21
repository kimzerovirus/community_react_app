import { createContext, useContext, useEffect, useState } from 'react';
import { SyntaxType } from 'src/styles/syntaxTheme';

interface PorpsType {
	children: React.ReactNode;
}

interface ContextType {
	isDark: boolean;
	setIsDark: (value: boolean) => void;
}

export const ThemeContext = createContext<ContextType>({} as ContextType);

const initialTheme = (): boolean => {
	if (typeof window !== 'undefined') {
		const localTheme = window.localStorage.getItem('theme');
		if (localTheme === 'dark') {
			return true;
		} else if (localTheme === 'light') {
			return false;
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	return false;
};

export default function DarkModeProvider({ children }: PorpsType) {
	const [isDark, setIsDark] = useState(initialTheme);
	const value = { isDark, setIsDark };

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useDarkMode(dark: any, light: any) {
	const [theme, setTheme] = useState();
	const { isDark } = useContext(ThemeContext);

	useEffect(() => {
		const pickedTheme = isDark ? dark : light;
		setTheme(pickedTheme);
	}, [isDark]);

	return theme;
}
