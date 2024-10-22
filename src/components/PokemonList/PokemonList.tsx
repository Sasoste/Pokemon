import { useState } from 'react';
import { usePokemonList } from '@hooks/usePokemon';
import { PokemonSummary } from '@/types';
import PokemonListItem from '@components/PokemonListItem/PokemonListItem';
import Button from '@components/Button/Button';
import './PokemonList.scss';

const PokemonList = () => {
    const [page, setPage] = useState(0);
    const [clickedPokemon, setClickedPokemon] = useState<string | null>(null)
    const { data, isLoading, error, isFetching } = usePokemonList(page);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <ul className="pokemon-list">
                {data?.results.map((pokemon: PokemonSummary) => (
                    <PokemonListItem
                        key={pokemon.name}
                        pokemon={pokemon}
                        clickedPokemon={clickedPokemon}
                        setClickedPokemon={setClickedPokemon}
                    />
                ))}
            </ul>

            <div className="pagination-controls">
                <Button
                    onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
                    className="pagination-button"
                    disabled={page === 0}
                >
                    Previous
                </Button>

                <Button
                    onClick={() => setPage((prevPage) => prevPage + 1)}
                    className="pagination-button"
                    disabled={isFetching || !data?.next}
                >
                    Next
                </Button>
            </div>

            {isFetching && <div>Loading more Pokémon...</div>}
        </>
    );
};

export default PokemonList;
