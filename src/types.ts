// src/types.ts

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonSummary[];
}

export interface PokemonSummary {
    name: string;
    url: string;
    sprites: PokemonSprites[];
}

export interface PokemonMove {
    move: {
        name: string;
        url: string;
    };
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    abilities: PokemonAbility[];
    types: PokemonType[];
    sprites: {
        front_default: string;
    };
    species: {
        name: string;
        url: string;
    };
    moves: PokemonMove[];
    stats: PokemonStat[];
}

export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
}

export interface PokemonType {
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonSprites {
    front_default: string;
}

export interface PokemonSpecies {
    color: {
        name: string;
        url: string;
    };
    flavor_text_entries: FlavorText[];
    evolution_chain: {
        url: string;
    };
    capture_rate: number;
    egg_groups: PokemonEggGroup[];
    gender_rate: number;
    hatch_counter: number;
}

export interface FlavorText {
    flavor_text: string;
    language: {
        name: string;
    };
    version: {
        name: string;
    };
}

export interface EvolutionChain {
    species: {
        name: string;
        url: string;
    };
    evolves_to: EvolutionChain[];
}


export interface LocationAreaEncounter {
    location_area: {
        name: string;
        url: string;
    };
}

export interface PokemonForm {
    form_name: string;
    is_default: boolean;
}

export interface PokemonEggGroup {
    name: string;
    url: string;
}


export interface PokemonListItemProps {
    pokemon: PokemonSummary;
    clickedPokemon: string | null;
    setClickedPokemon: (name: string) => void;
}

export interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    className?: string; // Permet d'ajouter des classes depuis le parent
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export interface PokemonDetailNavigationProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

export interface EvolutionImage {
    name: string;
    imageUrl: string;
}

export interface PokemonColors {
    primaryColor: string;   // Couleur principale (déjà obtenue via PokéAPI)
    secondaryColor: string; // Deuxième couleur extraite de l'image
}