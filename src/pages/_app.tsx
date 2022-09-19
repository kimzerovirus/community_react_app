import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import GlobalStyle from 'src/styles/GlobalStyle';
import { WrappedComponent, Wrapper } from 'src/styles/WrapperStyle';
import { theme } from 'src/utils/customTheme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
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
	);
}

export default MyApp;
