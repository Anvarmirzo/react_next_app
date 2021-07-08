import Head from 'next/head';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>Magazine Rate</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
