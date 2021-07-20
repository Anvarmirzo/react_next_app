import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import SortIcon from './sort.svg';

export const Sort = ({
	sort,
	setSort,
	className,
	...props
}: SortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<span className='d-none' id='sort'>
				Сортировка
			</span>
			<button
				type='button'
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort == SortEnum.Rating,
				})}
				id='rating'
				aria-selected={sort == SortEnum.Rating}
				aria-labelledby='sort rating'
			>
				<SortIcon className={styles.sortIcon} /> По рейтингу
			</button>
			<button
				type='button'
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort == SortEnum.Price,
				})}
				id='price'
				aria-labelledby='sort price'
			>
				<SortIcon
					className={styles.sortIcon}
					aria-selected={sort == SortEnum.Price}
				/>
				По цене
			</button>
		</div>
	);
};
