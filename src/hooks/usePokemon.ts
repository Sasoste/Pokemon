import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList, fetchPokemonDetail, fetchPokemonSpecies, fetchRegionalPokedex, fetchEvolutionChain, fetchPokemonLocation } from '../api/pokemonApi';
import { EvolutionImage } from '@/types';
import { formatPokemonNameForUrl } from '@utils/pokemonUtils';

export const usePokemonList = (page: number, limit: number = 20) => {
    return useQuery({
        queryKey: ['pokemonList', page],
        queryFn: () => fetchPokemonList(page, limit),
        staleTime: 1000 * 60 * 5,
    });
};

export const usePokemonDetail = (pokemonNameOrId: string) => {
    return useQuery({
        queryKey: ['pokemonDetail', pokemonNameOrId],
        queryFn: () => fetchPokemonDetail(pokemonNameOrId),
        staleTime: 1000 * 60 * 5,
    });
};

export const usePokemonSpecies = (pokemonId: number) => {
    return useQuery({
        queryKey: ['pokemonSpecies', pokemonId],
        queryFn: () => fetchPokemonSpecies(pokemonId),
        staleTime: 1000 * 60 * 5,
    });
};

export const useRegionalPokedex = (region: string) => {
    return useQuery({
        queryKey: ['regionalPokedex', region],
        queryFn: () => fetchRegionalPokedex(region),
        staleTime: 1000 * 60 * 5,
    });
};

export const useEvolutionChain = (url: string) => {
    return useQuery({
        queryKey: ['evolutionChain', url],
        queryFn: () => fetchEvolutionChain(url),
        staleTime: 1000 * 60 * 5,
    });
};

export const usePokemonLocation = (pokemonId: number) => {
    return useQuery({
        queryKey: ['pokemonLocation', pokemonId],
        queryFn: () => fetchPokemonLocation(pokemonId),
        staleTime: 1000 * 60 * 5,
    });
};

export const usePokemonEvolutionImages = (evolutionChainUrl: string | undefined) => {
    return useQuery<EvolutionImage[]>({
        queryKey: ['evolutionImages', evolutionChainUrl],
        queryFn: async () => {
            if (!evolutionChainUrl) return [];
            const evolutionChain = await fetchEvolutionChain(evolutionChainUrl);
            const evolutions: EvolutionImage[] = [];

            const firstEvolutionName = evolutionChain.chain.species.name;
            const formattedFirstName = formatPokemonNameForUrl(firstEvolutionName);
            const firstSpriteUrl = `https://img.pokemondb.net/sprites/home/normal/${formattedFirstName}.png`;
            evolutions.push({ name: firstEvolutionName, imageUrl: firstSpriteUrl });

            let currentEvolution = evolutionChain.chain;
            while (currentEvolution.evolves_to.length > 0) {
                const nextEvolution = currentEvolution.evolves_to[0];
                const nextEvolutionName = nextEvolution.species.name;
                const formattedNextName = formatPokemonNameForUrl(nextEvolutionName);
                const nextSpriteUrl = `https://img.pokemondb.net/sprites/home/normal/${formattedNextName}.png`;
                evolutions.push({ name: nextEvolutionName, imageUrl: nextSpriteUrl });
                currentEvolution = nextEvolution;
            }

            return evolutions;
        },
        enabled: !!evolutionChainUrl,
        staleTime: 1000 * 60 * 5,
    });
};
