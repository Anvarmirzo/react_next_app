import { TagProps } from './Tag.props';
import styles from './Tag.module.css';
import cn from 'classnames';

export const Tag = ({
	size = 'md',
	children,
	color = 'primary',
	className,
	href,
	...props
}: TagProps): JSX.Element => {
	return (
		<div
			className={cn(styles.tag, className, {
				[styles.sm]: size == 'sm',
				[styles.md]: size == 'md',
				[styles.red]: color == 'red',
				[styles.gray]: color == 'gray',
				[styles.green]: color == 'green',
				[styles.ghost]: color == 'ghost',
				[styles.primary]: color == 'primary',
			})}
			{...props}
		>
			{href ? <a href={href}> {children}</a> : <>{children}</>}
		</div>
	);
};
