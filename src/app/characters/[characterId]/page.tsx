import Image from 'next/image';
import Link from 'next/link';
import { Params } from '@/app/types';
import { Result } from '@/app/interfaces';
import styles from './styles.module.css';
import { CHARACTER_URL } from '@/app/constants';
import { ATTRIBUTE, TITLE, UNKNOWN, BACK, FAIL_URL } from './constants';

async function CharacterDetail({ params }: Params) {
    const { characterId } = await params; // Basado en la documentación, es importante poner un await antes de tomar los valores del params
    const response = await fetch(`${CHARACTER_URL}/${characterId}`);
    const result:Result = await response.json();

    // Noté que la URL a veces llega vacía, así que agregué esta validación
    if (!result.origin.url) return (
        <div className={styles.characterDetail}>
            <div className={styles.wrap}>
                <h1 className={styles.title}>{FAIL_URL}</h1>
                <Link className={styles.link} href="/characters/page/1">{BACK}</Link>
            </div>
        </div>
    );

    const originResponse = await fetch(result.origin.url);
    const originData = await originResponse.json();

    const locationResponse = await fetch(result.location.url);
    const locationData = await locationResponse.json();

    const type = result.type || UNKNOWN; // Puse el placeholder "Desconocido" en caso de que el type venga vacío

    return (
        <>
            <div className={styles.characterDetail}>
                <h1 className={styles.title}>{ TITLE }</h1>
                <div className={styles.wrap}>
                    <div className={styles.image}>
                        <Image width={300} height={300} src={result.image} alt={result.name} />
                    </div>
                    <div className={styles.name}>
                        { result.name }
                    </div>
                    <section className={styles.body}>
                        <ul>
                            <li><span className={styles.attr}>{ATTRIBUTE.STATUS}: {result.status}</span></li>
                            <li><span className={styles.attr}>{ATTRIBUTE.SPECIES}: {result.species}</span></li>
                            <li><span className={styles.attr}>{ATTRIBUTE.TYPE}: {type}</span></li>
                            <li><span className={styles.attr}>{ATTRIBUTE.GENDER}: {result.gender}</span></li>
                        </ul>
                    </section>
                    <hr />
                    <section className={styles.origin}>
                        <h4>Origen</h4>
                        <ul>
                            <li><span className={styles.attr}>{ATTRIBUTE.NAME}: {originData.name}</span></li>
                            <li><span className={styles.attr}>{ATTRIBUTE.TYPE}: {originData.type}</span></li>
                            <li><span className={styles.attr}>{ATTRIBUTE.DIMENSION}: {originData.dimension}</span></li>
                        </ul>
                    </section>
                    <hr />
                    <section className={styles.location}>
                        <h4>Ubicación</h4>
                        <ul>
                            <li><span className={styles.attr}>{ATTRIBUTE.NAME}: {locationData.name}</span></li>
                            <li><span className={styles.attr}>{ATTRIBUTE.TYPE}: {locationData.type}</span></li>
                            <li><span className={styles.attr}>{ATTRIBUTE.DIMENSION}: {locationData.dimension}</span></li>
                        </ul>
                    </section>
                </div>
            </div>
            <Link className={styles.link} href="/characters/page/1">{BACK}</Link>
        </>
    );
};

export default CharacterDetail;
