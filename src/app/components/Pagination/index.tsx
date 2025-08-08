import Link from 'next/link';
import { Info } from '@/app/interfaces';
import { FIRST_PAGE, LAST_PAGE } from './constants';
import styles from './styles.module.css';

function Pagination({ info, currentPage }: { info: Info, currentPage: string }) {
    const firstPage = 1;
    const lastPage = info.pages;

    const next = Number(currentPage) + 1;
    const prev = Number(currentPage) - 1;
    const nextAndLasrDeactivated = Number(currentPage) >= lastPage ? styles.deactivated : styles.normal;
    const prevAndFirstDeactivated = Number(currentPage) <= firstPage ? styles.deactivated : styles.normal;

    return (
        <ul className={styles.pagination}>
            <div className={prevAndFirstDeactivated}>
                <Link href={`/characters/page/${firstPage}`}><li className={styles.firstAndLast}>{FIRST_PAGE}</li></Link>
                <Link href={`/characters/page/${prev}`}><li className={styles.page}><span className={`${styles.arrow} ${styles.arrowLeft}`}></span></li></Link>
            </div>
            <span className={styles.status}>{currentPage} de {lastPage}</span>
            <div className={nextAndLasrDeactivated}>
                <Link href={`/characters/page/${next}`}><li className={styles.page}><span className={`${styles.arrow} ${styles.arrowRight}`}></span></li></Link>
                <Link href={`/characters/page/${lastPage}`}><li className={styles.firstAndLast}>{LAST_PAGE}</li></Link>
            </div>
        </ul>
    );
};

export default Pagination;
