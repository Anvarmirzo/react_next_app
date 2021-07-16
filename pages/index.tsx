import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { Input } from './../components/Input/Input';
import { Textarea } from './../components/Textarea/Textarea';

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag='h1'>Hello</Htag>
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
			<Rating rating={rating} isEditable setRating={setRating} />
			<ul>
				{menu.map((m) => (
					<li key={m._id.secondCategory}>{m._id.secondCategory}</li>
				))}
			</ul>
			<Input placeholder='Тест' />
			<Textarea placeholder='Тест' />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
		{ firstCategory },
	);
	return {
		props: {
			menu,
			firstCategory,
		},
	};
};
interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
