import Link from 'next/link';
import { Children } from '@/app/types';
import styles from './styles.module.css';

function CharactersLayout({ children }: Children) {
    return (
        <>
            <header className={styles.header}>
                <Link className={styles.link} href="/">Volver al inicio</Link>
            </header>
            { children }
        </>
    );
};

export default CharactersLayout;
