'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Result } from '@/app/interfaces';
import { INPUT_PLACEHOLDER, NO_RESULTS_TEXT } from './constants';
import styles from './styles.module.css';
import Recents from '../Recents';

function List({ results }: { results: Result[] }) {

    const [ characters, setCharacters ] = useState<Result[]>(results);
    const [ recents, setRecents ] = useState<Result[]>([]);

    useEffect(() => {
        setRecents(window.sessionStorage.getItem('characters') ? JSON.parse(window.sessionStorage.getItem('characters') || '') : []);
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        // No fue necesario aplicar la tecnica de Debounce ya que la busqueda se hace sobre
        // la data que está en el estado y no sobre la API
        const regex = new RegExp(e.target.value, 'i');
        setCharacters( results.filter((character) => regex.test(character.name)) );
    };

    const handleLastCharacterVisit = (character:Result): void => {
        const charactersInMemory:Result[] = window.sessionStorage.getItem('characters') ? JSON.parse(window.sessionStorage.getItem('characters') || '') : [];
        if (!charactersInMemory.length) {
            window.sessionStorage.setItem('characters', JSON.stringify([character]));
            return;
        }
        if (charactersInMemory.length >= 5) {
            charactersInMemory.shift();
            window.sessionStorage.setItem('characters', JSON.stringify([ ...charactersInMemory, character ]));
            return;
        }
        window.sessionStorage.setItem('characters', JSON.stringify([ ...charactersInMemory, character ]));
    };

    return (
        <>
            <input className={styles.input} type="text" name="name" placeholder={INPUT_PLACEHOLDER} onChange={handleInput} />
            <ul className={styles.list}>
                {
                    characters.map((character) => (
                        <Link onClick={() => handleLastCharacterVisit(character)} className={styles.linkContainer} key={character.id} href={`/characters/${character.id}`}>
                            <div className={styles.image}>
                                <Image width={300} height={300} src={character.image} alt={character.name} priority />
                            </div>
                            <article className={styles.imageBody}>
                                <p className={styles.name}>{ character.name }</p>
                            </article>
                        </Link>
                    ))
                }
            </ul>
            {
                !characters.length && (
                    <div className={styles.noResults}>
                        <p className={styles.noResultsText}>{NO_RESULTS_TEXT}</p>
                        <Image width={500} height={281} src="/notfound.gif" alt="" />
                    </div>
                )
            }
            {
                recents.length > 0 && <Recents recents={recents} />
            }
        </>
    );
};

export default List;
