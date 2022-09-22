import 'src/styles/scss/style.scss';

import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import CustomThemeProvider from 'src/components/CustomThemeProvider';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import GlobalStyle from 'src/styles/GlobalStyle';
import { WrappedComponent, Wrapper } from 'src/styles/WrapperStyle';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<CustomThemeProvider>
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
		</CustomThemeProvider>
	);
}
