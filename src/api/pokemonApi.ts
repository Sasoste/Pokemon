import { PokemonListResponse, PokemonDetail, PokemonSpecies } from '../types';
import { formatPokemonNameForUrl } from '@utils/pokemonUtils'

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (page: number = 0, limit: number = 20): Promise<PokemonListResponse> => {
    const offset = page * limit;
    const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon list');
    }
    return response.json();
};

export const fetchPokemonDetail = async (pokemonNameOrId: string): Promise<PokemonDetail> => {
    const response = await fetch(`${BASE_URL}/pokemon/${pokemonNameOrId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon details');
    }
    const data = await response.json();

    const formattedName = formatPokemonNameForUrl(data.name);
    const spriteUrl = `https://img.pokemondb.net/sprites/home/normal/${formattedName}.png`;

    return {
        ...data,
        sprites: {
            ...data.sprites,
            front_default: spriteUrl,
        },
    };
};

export const fetchPokemonSpecies = async (pokemonId: number): Promise<PokemonSpecies> => {
    const response = await fetch(`${BASE_URL}/pokemon-species/${pokemonId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon species');
    }
    return response.json();
};


export const fetchRegionalPokedex = async (region: string) => {
    const response = await fetch(`${BASE_URL}/pokedex/${region}`);
    if (!response.ok) {
        throw new Error('Failed to fetch regional Pokedex');
    }
    return response.json();
};

export const fetchEvolutionChain = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch evolution chain');
    }
    return response.json();
};

export const fetchPokemonLocation = async (pokemonId: number) => {
    const response = await fetch(`${BASE_URL}/pokemon/${pokemonId}/encounters`);
    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon location');
    }
    return response.json();
};