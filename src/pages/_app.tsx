import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';

import Footer from '../components/Footer';
import Header from '../components/Header';
import { theme } from '../utils/customTheme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			{/* reset css */}
			<CssBaseline />

			<Header />
			<Component {...pageProps} />
			<Footer />
		</ThemeProvider>
	);
}

export default MyApp;
