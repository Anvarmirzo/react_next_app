import React, { useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';
import { withLayout } from '../layout/Layout';

function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<div>
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
		</div>
	);
}

export default withLayout(Home);
