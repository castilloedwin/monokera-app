'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Result } from '@/app/interfaces';
import { RECENTLY_VIEWED } from './constants';
import styles from './styles.module.css';

function Recents({ recents }: { recents: Result[] }) {
    const recentCharacters = recents.toReversed();
    return (
        <>
            <h3 className={styles.title}>{RECENTLY_VIEWED}</h3>
            <ul className={styles.list}>
                {
                    recentCharacters.map((character) => (
                        <Link className={styles.linkContainer} key={character.id} href={`/characters/${character.id}`}>
                            <div className={styles.image}>
                                <Image width={150} height={150} src={character.image} alt={character.name} priority />
                            </div>
                            <article className={styles.imageBody}>
                                <p className={styles.name}>{ character.name }</p>
                            </article>
                        </Link>
                    ))
                }
            </ul>
        </>
    );
};

export default Recents;
