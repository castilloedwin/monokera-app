import { redirect } from 'next/navigation';

function CharactersPage() {
    // Decidí no hacer nada especial con esta página. Simplemente estoy haciendo una redirección
    // a page/[pageNumber] para que me muestre los primeros resultados de la respuesta de la API
    redirect('/characters/page/1');
};

export default CharactersPage;
