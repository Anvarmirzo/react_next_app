import styles from './Menu.module.css';
import cn from 'classnames';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();
	const openSecondLevel = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map((m) => {
					if (m._id.secondCategory == secondCategory) {
						m.isOpened = !m.isOpened;
					}
					return m;
				}),
			);
	};

	const buildFirstLevel = () => {
		return (
			<ul className={styles.firstBlock}>
				{firstLevelMenu.map((m) => (
					<li key={m.route}>
						<Link href={`/${m.route}`}>
							<a>
								<div
									className={cn(styles.firstLevel, {
										[styles.firstLevelActive]: m.id == firstCategory,
									})}
								>
									{m.icon}
									<span>{m.name}</span>
								</div>
							</a>
						</Link>
						{m.id == firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map((m) => {
					if (
						m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])
					) {
						m.isOpened = true;
					}
					return (
						<li key={m._id.secondCategory}>
							<div
								className={styles.secondLevel}
								onClick={() => {
									openSecondLevel(m._id.secondCategory);
								}}
							>
								{m._id.secondCategory}
							</div>
							<div
								className={cn(styles.secondLevelBlock, {
									[styles.secondLevelBlockOpened]: m.isOpened,
								})}
							>
								{buildThirdLevel(m.pages, menuItem.route)}
							</div>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return (
			<ul className={styles.thirdBlock}>
				<li>
					{pages.map((p) => (
						<Link href={`/${route}/${p.alias}`}>
							<a
								className={cn(styles.thirdLevel, {
									[styles.thirdLevelActive]:
										`/${route}/${p.alias}` == router.asPath,
								})}
							>
								{p.category}
							</a>
						</Link>
					))}
				</li>
			</ul>
		);
	};

	return <nav className={styles.menu}>{buildFirstLevel()}</nav>;
};
