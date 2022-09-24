import 'src/styles/scss/style.scss';

import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import CustomThemeProvider from 'src/components/CustomThemeProvider';
import GlobalStyle from 'src/styles/GlobalStyle';
import { WrappedComponent, Wrapper } from 'src/styles/WrapperStyle';
import { usePreventCopy } from 'src/utils/usePreventCopy';

export default function MyApp({ Component, pageProps }: AppProps) {
	// usePreventCopy();

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
