import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import { Card } from '../Card/Card';
import { Rating } from './../Rating/Rating';
import { Tag } from './../Tag/Tag';
import { Button } from './../Button/Button';
import { declOfNumber, priceRU } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';

export const Product = ({
	product,
	className,
	...props
}: ProductProps): JSX.Element => {
	return (
		<Card className={styles.product}>
			<div className={styles.logo}>
				<Image
					src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
					alt={product.title}
					width={70}
					height={70}
				/>
			</div>
			<div className={styles.title}>{product.title}</div>
			<div className={styles.price}>
				{priceRU(product.price)}
				{product.oldPrice && (
					<Tag className={styles.oldPrice} color='green'>
						{priceRU(product.price - product.oldPrice)}
					</Tag>
				)}
			</div>
			<div className={styles.credit}>
				{priceRU(product.credit)}/<span className={styles.month}>мес</span>
			</div>
			<div className={styles.rating}>
				<Rating rating={product.reviewAvg ?? product.initialRating} />
			</div>
			<div className={styles.tags}>
				{product.categories.map((c) => (
					<Tag className={styles.category} color='ghost' key={c}>
						{c}
					</Tag>
				))}
			</div>
			<div className={styles.priceTitle}>цена</div>
			<div className={styles.creditTitle}>кредит</div>
			<div className={styles.ratingTitle}>
				{product.reviewCount}{' '}
				{declOfNumber(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
			</div>
			<Divider className={styles.hr} />
			<div className={styles.description}>{product.description}</div>
			<div className={styles.feature}>
				{product.characteristics.map((c) => (
					<div className={styles.characteristics} key={c.name}>
						<span className={styles.characteristicsName}>{c.name}</span>
						<span className={styles.characteristicsDots}></span>
						<span className={styles.characteristicsValue}>{c.value}</span>
					</div>
				))}
			</div>
			<div className={styles.advBlock}>
				{' '}
				{product.advantages && (
					<div className={styles.advantages}>
						<div className={styles.advTitle}>Преимущества</div>
						<div>{product.advantages}</div>
					</div>
				)}
				{product.disadvantages && (
					<div className={styles.disadvantages}>
						<div>Недостатки</div>
						<div>{product.disadvantages}</div>
					</div>
				)}
			</div>
			<Divider className={styles.hr} />
			<div className={styles.actions}>
				<Button appearance='primary'>Узнать подробнее</Button>
				<Button className={styles.review} appearance='ghost' arrow='right'>
					Читать отзывы
				</Button>
			</div>
		</Card>
	);
};