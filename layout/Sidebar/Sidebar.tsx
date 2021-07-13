import { SidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<aside className={cn(className, styles.sidebar)} {...props}>
			<Menu />
		</aside>
	);
};
