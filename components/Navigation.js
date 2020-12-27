import Link from 'next/link';
import NavigationLink from './NavigationLink';

export default function Navigation({ name, profession }) {
    return (
        <header
            className={
                'sticky-nav bg-light dark:bg-dark bg-opacity-80 py-4 mb-6 md:mb-12 xl:mb-24'
            }>
            <nav className={'flex justify-between items-center'}>
                <Link href="/">
                    <a
                        className={
                            'hover:text-highlight dark:hover:text-highlight-dark'
                        }>
                        <div className={''}>{name}</div>
                        <div className={'text-sm opacity-60'}>{profession}</div>
                    </a>
                </Link>
                <ul className={'flex space-x-4'}>
                    <li>
                        <Link href="/ueber" passHref>
                            <NavigationLink>Über</NavigationLink>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
