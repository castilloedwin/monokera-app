import List from '@/app/components/List';
import Pagination from '@/app/components/Pagination';
import { Params } from '@/app/types';
import { Character } from '@/app/interfaces';
import { CHARACTER_URL } from '@/app/constants';
import { TITLE } from './constants';
import styles from '../../styles.module.css';

async function Page({ params }: Params) {
    const { pageNumber } = await params; // Basado en la documentación, es importante poner un await antes de tomar los valores del params
    const response = await fetch(`${CHARACTER_URL}?page=${pageNumber}`);
    const { info, results }:Character = await response.json();
    return (
         <div className={styles.characterPage}>
            <div className={styles.wrap}>
                <h1 className={styles.title}>{TITLE}</h1>
                <List results={results} />
                <Pagination info={info} currentPage={pageNumber} />
            </div>
        </div>
    );
};

export default Page;
