import Link from 'next/link';
import Image from 'next/image';

function RootPage() {
    return (
        <>
            <h1 className="main-title">Prueba Técnica - Edwin</h1>
            <p className="main-body">En este espacio verás un listado de los personajes de Rick and Morty</p>
            <div className="main-link-wrap">
                <Link className="main-link" href="/characters/page/1">Ver listado</Link>
            </div>
            <Image width={500} height={275} src="/welcome.gif" alt="" />
        </>
    );
};

export default RootPage;
