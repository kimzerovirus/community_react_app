import 'src/styles/scss/style.scss';

import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config.js';
import GlobalStyle from 'src/styles/GlobalStyle';
import CustomThemeProvider from 'src/styles/theme/CustomThemeProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<DefaultSeo {...SEO} />
			<CustomThemeProvider>
				{/* reset css */}
				<CssBaseline />
				<GlobalStyle />

				<Component {...pageProps} />
			</CustomThemeProvider>
		</>
	);
}
