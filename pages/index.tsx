import React from 'react';
import { Button, Htag, P } from '../components';

export default function Home(): JSX.Element {
	return (
		<div>
			<Htag tag='h1'>s</Htag>
			<Button appearance='primary' arrow='right'>
				Кнопка
			</Button>
			<Button appearance='ghost' arrow='down'>
				Кнопка
			</Button>
			<P size='lg'>Hello</P>
		</div>
	);
}
