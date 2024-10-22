import React from 'react';
import { PokemonSummary } from '@/types';
import { usePokemonDetail } from '@hooks/usePokemon';
import { useNavigate } from 'react-router-dom';
import './PokemonListItem.scss';

interface PokemonListItemProps {
    pokemon: PokemonSummary;
    clickedPokemon: string | null;
    setClickedPokemon: React.Dispatch<React.SetStateAction<string | null>>;
}

const PokemonListItem: React.FC<PokemonListItemProps> = ({ pokemon, clickedPokemon, setClickedPokemon }) => {
    const { data: pokemonDetails, isLoading } = usePokemonDetail(pokemon.name);
    const navigate = useNavigate();

    const handleClick = () => {
        setClickedPokemon(pokemon.name);
        setTimeout(() => {
            navigate(`/pokemon/${pokemon.name}`);
        }, 500);
    };

    if (isLoading || !pokemonDetails) return <div>Loading...</div>;

    const types = pokemonDetails.types.map((type) => type.type.name);

    const typeClass = types.length === 1
        ? types[0]
        : `${types[0]}-${types[1]}`;

    return (
        <li className={`pokemon-list-item ${typeClass}`} onClick={handleClick}>
            <img
                src={pokemonDetails.sprites.front_default}
                alt={pokemon.name}
                className={`pokemon-list-item-img ${clickedPokemon === pokemon.name ? 'zoom-out' : ''}`}
            />
            <div className="pokemon-list-item-text">
                <p>{pokemon.name}</p>
                <p>#{pokemonDetails.id.toString().padStart(3, '0')}</p>
            </div>
        </li>
    );
};

export default PokemonListItem;