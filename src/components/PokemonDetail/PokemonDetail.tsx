import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import {
    usePokemonDetail,
    usePokemonSpecies,
    useEvolutionChain,
    usePokemonLocation,
    usePokemonEvolutionImages,
} from '@hooks/usePokemon';
import {
    PokemonMove,
    PokemonStat,
    LocationAreaEncounter
} from '@/types';
import Section from '@components/PokemonDetailSection/PokemonDetailSection';
import PokemonHeader from '@components/PokemonDetailHeader/PokemonDetailHeader';
import NavigationTabs from '@components/PokemonDetailNavigation/PokemonDetailNavigation';
import './PokemonDetail.scss';

const PokemonDetail = () => {
    const { pokemonNameOrId } = useParams<{ pokemonNameOrId: string }>();
    const { data: pokemon, isLoading: isPokemonLoading, error: pokemonError } = usePokemonDetail(pokemonNameOrId!);
    const { data: species, isLoading: isSpeciesLoading, error: speciesError } = usePokemonSpecies(pokemon?.id ?? 0);
    const { data: evolutionChain, isLoading: isEvolutionLoading } = useEvolutionChain(species?.evolution_chain.url ?? '');
    const { data: locations } = usePokemonLocation(pokemon?.id ?? 0);
    const { data: evolutionImages } = usePokemonEvolutionImages(species?.evolution_chain.url);

    const [selectedVersion, setSelectedVersion] = useState<string>('red');
    const [activeSection, setActiveSection] = useState('description');
    const [isFavorite, setIsFavorite] = useState<boolean>(false); useEffect(() => {
        const favoriteStatus = localStorage.getItem(`favorite-${pokemonNameOrId}`);
        if (favoriteStatus) {
            setIsFavorite(JSON.parse(favoriteStatus));
        }
    }, [pokemonNameOrId]);

    const toggleFavorite = () => {
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);
        localStorage.setItem(`favorite-${pokemonNameOrId}`, JSON.stringify(newFavoriteStatus));
    };

    if (isPokemonLoading || isSpeciesLoading) return <div>Loading...</div>;
    if (pokemonError || speciesError) return <div>Error: {pokemonError?.message || speciesError?.message}</div>;

    const description = species?.flavor_text_entries.find(
        (entry) => entry.language.name === 'en' && entry.version.name === selectedVersion
    )?.flavor_text?.replace(/\f/g, ' ') ?? 'No description available for this version.';

    const versions = Array.from(new Set(species?.flavor_text_entries.map(entry => entry.version.name)));
    const primaryColorName = species?.color.name || 'white';

    return (
        <div className="pokemon-detail-container">
            {pokemon && (
                <PokemonHeader id={pokemon.id} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
            )}
            <div
                className={classNames("pokemon-info", `color-${primaryColorName}`)}
            >
                <div className="pokemon-image-container">
                    <img
                        src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                        alt={pokemon.name}
                        className="pokemon-image"
                        onError={(e) => { e.currentTarget.src = '/default-sprite.png'; }}
                        loading="lazy"
                    />
                </div>
                <h1 className="pokemon-name">{pokemon.name}</h1>
                <ul className="pokemon-detail-types">
                    {pokemon?.types.map((type) => (
                        <li key={type.type.name} className={`${type.type.name} pokemon-detail-type`}>
                            <img src={`/icons/${type.type.name}.svg`} alt={`${type.type.name} type icon`} className={`${type.type.name} pokemon-detail-type-icon`} />
                            {type.type.name}
                        </li>
                    ))}
                </ul>
            </div>

            <NavigationTabs activeSection={activeSection} setActiveSection={setActiveSection} />

            {activeSection === 'description' && (
                <Section title="Description">
                    <label htmlFor="version-select">Select Game Version: </label>
                    <select
                        id="version-select"
                        value={selectedVersion}
                        onChange={(e) => setSelectedVersion(e.target.value)}
                    >
                        {versions.map(version => (
                            <option key={version} value={version}>
                                {version}
                            </option>
                        ))}
                    </select>
                    <p>{description}</p>
                </Section>
            )}

            {activeSection === 'info' && (
                <Section title="Info">
                    <p><strong>Height:</strong> {pokemon?.height / 10} m</p>
                    <p><strong>Weight:</strong> {pokemon?.weight / 10} kg</p>
                </Section>
            )}

            {activeSection === 'stats' && (
                <Section title="Base Stats">
                    <ul>
                        {pokemon?.stats.map((stat: PokemonStat) => (
                            <li key={stat.stat.name}>
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {activeSection === 'capture' && (
                <Section title="Capture Rate">
                    <p>{species?.capture_rate ?? 'Unknown'} (lower is harder)</p>
                </Section>
            )}

            {activeSection === 'egg_groups' && (
                <Section title="Egg Groups">
                    {species?.egg_groups.length ? (
                        <ul>
                            {species.egg_groups.map((group) => (
                                <li key={group.name}>{group.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No egg groups available.</p>
                    )}
                </Section>
            )}

            {activeSection === 'moves' && (
                <Section title="Moves">
                    <ul>
                        {pokemon?.moves.slice(0, 5).map((move: PokemonMove) => (
                            <li key={move.move.name}>{move.move.name}</li>
                        ))}
                    </ul>
                </Section>
            )}

            {activeSection === 'evolution' && (
                <Section title="Evolution Chain">
                    {isEvolutionLoading ? (
                        <p>Loading evolution chain...</p>
                    ) : evolutionChain && evolutionImages ? (
                        <div className="evolution-images">
                            {evolutionImages.map((evolution, index) => (
                                <div key={index} className="evolution-item">
                                    <img
                                        src={evolution.imageUrl}
                                        alt={evolution.name}
                                        onError={(e) => { e.currentTarget.src = '/default-sprite.png'; }}
                                        loading="lazy"
                                    />
                                    <p>{evolution.name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No evolution chain available.</p>
                    )}
                </Section>
            )}

            {activeSection === 'locations' && (
                <Section title="Locations (Encounters)">
                    {locations?.length ? (
                        <ul>
                            {locations.map((location: LocationAreaEncounter, index: number) => (
                                <li key={index}>{location.location_area.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No location data available.</p>
                    )}
                </Section>
            )}
        </div>
    );
};

export default PokemonDetail;