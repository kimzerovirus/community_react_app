import { BackdropProps, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { createContext, useEffect, useState } from 'react';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import { theme } from 'src/styles/customTheme';
import GlobalStyle from 'src/styles/GlobalStyle';
import { WrappedComponent, Wrapper } from 'src/styles/WrapperStyle';

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

export default function MyApp({ Component, pageProps }: AppProps) {
	const [isDark, setIsDark] = useState(initialTheme);
	const value: ContextType = {
		isDark,
		setIsDark,
	};

	return (
		<ThemeContext.Provider value={value}>
			<ThemeProvider theme={theme}>
				{/* reset css */}
				<CssBaseline />
				<GlobalStyle />

				<Wrapper>
					<Header />
					<WrappedComponent>
						<Component {...pageProps} />
					</WrappedComponent>
					<Footer />
				</Wrapper>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}
