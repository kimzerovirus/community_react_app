import 'src/styles/scss/style.scss';

import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import CustomThemeProvider from 'src/components/CustomThemeProvider';
import GlobalStyle from 'src/styles/GlobalStyle';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<CustomThemeProvider>
			{/* reset css */}
			<CssBaseline />
			<GlobalStyle />

			<Component {...pageProps} />
		</CustomThemeProvider>
	);
}
