import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';

import Footer from '../components/Footer';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';
import { WrappedComponent, Wrapper } from '../styles/WrapperStyle';
import { theme } from '../utils/customTheme';

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
