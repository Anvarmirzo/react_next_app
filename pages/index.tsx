import React from 'react';
import { Button, Htag, P, Tag } from '../components';

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
			<P size='sm'>Hello</P>
			<P size='md'>Hello</P>
			<P size='lg'>Hello</P>
			<Tag size='sm' href='/'>
				That's small link
			</Tag>
			<Tag size='md' color='red'>
				That's big text
			</Tag>
			<Tag size='md' color='green'>
				That's big text
			</Tag>
			<Tag size='md' color='ghost'>
				That's big text
			</Tag>
			<Tag size='md' color='gray'>
				That's big text
			</Tag>
			<Tag size='md' color='primary'>
				That's big text
			</Tag>
		</div>
	);
}
