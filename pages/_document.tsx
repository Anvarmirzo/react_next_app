import Document, { Html } from 'next/document';
import Head from 'next/head';
class MyDocument extends Document {
	render() {
		return (
			<Html lang='ru'>
				<Head />
				<body></body>
			</Html>
		);
	}
}
