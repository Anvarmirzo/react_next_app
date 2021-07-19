import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from './../Rating/Rating';
import { Tag } from './../Tag/Tag';
import { Button } from './../Button/Button';
import { declOfNumber, priceRU } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(
	forwardRef(
		(
			{ product, className, ...props }: ProductProps,
			ref: ForwardedRef<HTMLDivElement>,
		): JSX.Element => {
			const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
			const reviewRef = useRef<HTMLDivElement>(null);
			const scrollToReview = () => {
				setIsReviewOpened(true);
				reviewRef.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			};
			const reviewVariants = {
				visible: {
					opacity: 1,
					height: 'auto',
				},
				hidden: {
					opacity: 0,
					height: 0,
				},
			};
			return (
				<div className={className} ref={ref} {...props}>
					<Card
						className={cn(styles.product, {
							[styles.unRoundedBottom]: isReviewOpened,
						})}
					>
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
							{priceRU(product.credit)}/
							<span className={styles.month}>мес</span>
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
							<a href='#ref' onClick={scrollToReview}>
								{product.reviewCount}
								{declOfNumber(product.reviewCount, [
									' отзыв',
									' отзыва',
									' отзывов',
								])}
							</a>
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
						<Divider className={cn(styles.hr, styles.hr2)} />
						<div className={styles.actions}>
							<Button appearance='primary'>Узнать подробнее</Button>
							<Button
								className={styles.review}
								appearance='ghost'
								arrow={isReviewOpened ? 'down' : 'right'}
								onClick={() => setIsReviewOpened(!isReviewOpened)}
							>
								Читать отзывы
							</Button>
						</div>
					</Card>
					<motion.div
						layout
						variants={reviewVariants}
						initial='hidden'
						animate={isReviewOpened ? 'visible' : 'hidden'}
					>
						<Card color='blue' className={cn(styles.reviews)} ref={reviewRef}>
							{product.reviews.map((r) => (
								<div key={r._id}>
									<Review review={r} />
									<Divider />
								</div>
							))}
							<ReviewForm productId={product._id} />
						</Card>
					</motion.div>
				</div>
			);
		},
	),
);
