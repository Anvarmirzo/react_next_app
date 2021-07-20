import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import {
	ForwardedRef,
	forwardRef,
	KeyboardEvent,
	useEffect,
	useState,
} from 'react';

export const Rating = forwardRef(
	(
		{
			isEditable = false,
			rating,
			children,
			setRating,
			error,
			...props
		}: RatingProps,
		ref: ForwardedRef<HTMLDivElement>,
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>),
		);

		useEffect(() => {
			constructRating(rating);
		}, [rating]);

		const constructRating = (currentRating: number) => {
			const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
				return (
					<span
						className={cn(styles.star, {
							[styles.filled]: i < currentRating,
							[styles.editable]: isEditable,
						})}
						onMouseEnter={() => changeDisplay(i + 1)}
						onMouseLeave={() => changeDisplay(rating)}
						onClick={() => onClick(i + 1)}
						role={isEditable ? 'slider' : ''}
						aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг ' + rating}
						aria-invalid={error ? true : false}
						aria-valuenow={rating}
						aria-valuemax={5}
						aria-valuemin={1}
					>
						<StarIcon
							tabIndex={isEditable ? 0 : -1}
							onKeyDown={(e: KeyboardEvent<SVGElement>) =>
								isEditable && handleSpace(i + 1, e)
							}
						/>
					</span>
				);
			});
			setRatingArray(updatedArray);
		};
		const changeDisplay = (i: number) => {
			if (!isEditable) {
				return;
			}
			constructRating(i);
		};

		const onClick = (i: number) => {
			if (!isEditable || !setRating) {
				return;
			}
			setRating(i);
		};

		const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
			if (e.code != 'Space' || !setRating) {
				return;
			}
			setRating(i);
		};

		return (
			<div className={styles.ratingWrapper} ref={ref} {...props}>
				{ratingArray.map((r, i) => (
					<span
						className={cn({
							[styles.error]: error,
						})}
						key={i}
					>
						{r}
					</span>
				))}
				{error && (
					<span className={styles.errorMessage} role='alert'>
						{error.message}
					</span>
				)}
			</div>
		);
	},
);
