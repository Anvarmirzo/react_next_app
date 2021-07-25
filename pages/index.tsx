import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { Input } from './../components/Input/Input';
import { Textarea } from './../components/Textarea/Textarea';
import { API } from '../helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag='h1'>Все компоненты:</Htag>
			<Htag className='mx-4' tag='h2'>
				Заголовки:
			</Htag>
			<Htag className='mx-4' tag='h1'>
				H1
			</Htag>
			<Htag className='mx-4' tag='h2'>
				H2
			</Htag>
			<Htag className='mx-4' tag='h3'>
				H3
			</Htag>

			<Htag className='mx-4' tag='h2'>
				Кнопки:
			</Htag>
			<Button className='me-2' appearance='primary' arrow='right'>
				Primary
			</Button>
			<Button appearance='ghost' arrow='down'>
				Ghost
			</Button>

			<Htag className='mx-4' tag='h2'>
				Тексты разного размера:
			</Htag>
			<P size='sm'>SM</P>
			<P size='md'>MD</P>
			<P size='lg'>LG</P>

			<Htag className='mx-4' tag='h2'>
				Тэги:
			</Htag>
			<Tag size='sm' href='/'>
				sm link
			</Tag>
			<Tag size='md' color='red'>
				md red text
			</Tag>
			<Tag size='md' color='green'>
				md green text
			</Tag>
			<Tag size='md' color='ghost'>
				md ghost text
			</Tag>
			<Tag size='md' color='gray'>
				md gray text
			</Tag>
			<Tag size='md' color='primary'>
				md primary text
			</Tag>

			<Htag className='mx-4' tag='h2'>
				Динамичный рейтинг:
			</Htag>
			<Rating rating={rating} isEditable setRating={setRating} />

			<Htag className='mx-4' tag='h2'>
				Текстовые поля:
			</Htag>
			<Input className='mx-4' placeholder='Тест' />
			<Textarea placeholder='Тест' />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory,
	});
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
