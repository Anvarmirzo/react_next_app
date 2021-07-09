import { PProps } from './P.props';
import styles from './P.module.css';
import cn from 'classnames';

export const P = ({ size, children }: PProps): JSX.Element => {
	return (
		<>
			<p
				className={cn(styles.p, {
					[styles.small]: size == 'sm',
					[styles.regular]: size == 'md',
					[styles.big]: size == 'lg',
				})}
			>
				{children}
			</p>
		</>
	);
};
