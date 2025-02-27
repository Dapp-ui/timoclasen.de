import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'react-feather';

import { CenteredColumn } from '../CenteredColumn';
import { NavigationLink } from '../NavigationLink';
import { SwitchMode } from '../SwitchMode';
import styles from './Navigation.module.css';

interface Props {
  name: string;
}

export function Navigation({ name }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={clsx(
        'xl:mb-22 mb-8 bg-light bg-opacity-80 py-4 dark:bg-dark dark:bg-opacity-80 md:mb-20 md:py-6',
        styles.stickyNav
      )}
    >
      <CenteredColumn>
        <nav
          role="navigation"
          data-cy="navigation"
          className="flex items-start justify-between sm:items-center"
        >
          <a href="#skip" className="sr-only">
            Zu Inhalt springen
          </a>
          <div className="flex flex-1 items-center space-x-2 sm:flex-initial md:space-x-4">
            <Link href="/">
              <a title="Home" className="whitespace-nowrap">
                <h1 className={styles.name}>{name}</h1>
              </a>
            </Link>
            <SwitchMode />
          </div>
          <ul
            className={`${
              menuOpen ? 'flex' : 'hidden'
            } mt-16 flex-1 flex-col items-center space-y-8 pb-8 sm:mt-0 sm:flex sm:flex-initial sm:flex-row sm:space-y-0 sm:space-x-4 sm:pb-0 md:space-x-8`}
          >
            <li>
              <Link href="/ueber" passHref>
                <NavigationLink>Über</NavigationLink>
              </Link>
            </li>
            <li>
              <Link href="/blog" passHref>
                <NavigationLink>Blog</NavigationLink>
              </Link>
            </li>
            <li>
              <Link href="/podcasts" passHref>
                <NavigationLink>Podcasts</NavigationLink>
              </Link>
            </li>
            <li>
              <Link href="/musik" passHref>
                <NavigationLink>Musik</NavigationLink>
              </Link>
            </li>
          </ul>
          <div className="flex flex-1 justify-end sm:hidden sm:flex-initial">
            <button
              type="button"
              className={clsx('h-8 w-8 focus:outline-none', styles.menuIcon)}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen ? 'true' : 'false'}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="sr-only">
                {menuOpen ? 'Menü schließen' : 'Menü öffnen'}
              </span>
              <Menu data-hide={menuOpen} />
              <X data-hide={!menuOpen} />
            </button>
          </div>
        </nav>
      </CenteredColumn>
    </header>
  );
}
