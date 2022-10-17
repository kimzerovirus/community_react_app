import 'src/styles/scss/style.scss';

import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import SEO from 'src/components/SEO';
import GlobalStyle from 'src/styles/GlobalStyle';
import CustomThemeProvider from 'src/styles/theme/CustomThemeProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<SEO seo={pageProps.seo} />
			<CustomThemeProvider>
				{/* reset css */}
				<CssBaseline />
				<GlobalStyle />

				<Component {...pageProps} />
			</CustomThemeProvider>
		</>
	);
}

// MyApp.getStaticProps = async (context: any) => {
// 	const { ctx, Component } = context;
// 	let pageProps = {};

// 	if (Component.getStaticProps) {
// 		pageProps = (await Component.getStaticProps(ctx)) || {};
// 		console.log(pageProps);
// 		return { pageProps };
// 	}
// };
