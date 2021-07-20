import { IReviewSentResponse, ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({
	productId,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IReviewForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(
				API.review.createDemo,
				{ ...formData, productId },
			);
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError('Что-то пошло не так');
			}
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', {
						required: { value: true, message: 'Введите имя' },
					})}
					placeholder='Имя'
					error={errors.name}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', {
						required: { value: true, message: 'Введите заголовок' },
					})}
					className={styles.title}
					placeholder='Заголовок отзыва'
					error={errors.title}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оценка</span>
					<Controller
						control={control}
						rules={{
							required: { value: true, message: 'Укажите оценку' },
						}}
						name='rating'
						render={({ field }) => (
							<Rating
								isEditable
								rating={field.value}
								ref={field.ref}
								setRating={field.onChange}
								error={errors.rating}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description', {
						required: { value: true, message: 'Введите сообщение' },
					})}
					error={errors.description}
					className={styles.description}
					placeholder='Текст отзыва'
					aria-label='Текст отзыва'
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button
						appearance='primary'
						onClick={() => {
							clearErrors();
						}}
					>
						Отправить
					</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и
						проверку
					</span>
				</div>
			</div>
			{isSuccess && (
				<div className={cn(styles.panel, styles.success)} role='alert'>
					<div className={styles.successTitle}>Ваш отзыв отправлен</div>
					<div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
					<button
						className={styles.close}
						onClick={() => {
							setIsSuccess(false);
						}}
						aria-label='Закрыть оповещение'
					>
						<CloseIcon />
					</button>
				</div>
			)}
			{error && (
				<div className={cn(styles.panel, styles.error)} role='alert'>
					Что-то пошло не так, попробуйте перезагрузить страницу.
					<button
						className={styles.close}
						onClick={() => {
							setError(undefined);
						}}
						aria-label='Закрыть оповещение'
					>
						<CloseIcon />
					</button>
				</div>
			)}
		</form>
	);
};
