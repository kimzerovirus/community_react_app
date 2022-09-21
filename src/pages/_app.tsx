import 'src/styles/style.scss';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import DarkModeProvider from 'src/components/DarkModeProvider';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import { theme } from 'src/styles/customTheme';
import GlobalStyle from 'src/styles/GlobalStyle';
import { WrappedComponent, Wrapper } from 'src/styles/WrapperStyle';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<DarkModeProvider>
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
		</DarkModeProvider>
	);
}
