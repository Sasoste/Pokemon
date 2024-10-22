import { useState, useEffect } from 'react';
import ColorThief from 'color-thief-browser';
import { PokemonDetail, PokemonColors } from '@/types';

export const usePokemonColors = (pokemon: PokemonDetail | undefined) => {
    const [colors, setColors] = useState<PokemonColors>({
        primaryColor: '#FFFFFF',
        secondaryColor: '#FFFFFF',
    });

    useEffect(() => {
        if (pokemon) {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = pokemon.sprites.front_default;

            img.onload = () => {
                const colorThief = new ColorThief();
                try {
                    const dominantColor = colorThief.getColor(img);
                    const rgb = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                    setColors(prev => ({
                        ...prev,
                        secondaryColor: rgb,
                    }));
                } catch (error) {
                    console.error('Erreur lors de l\'extraction des couleurs:', error);
                }
            };

            img.onerror = () => {
                console.error('Erreur de chargement de l\'image pour l\'extraction des couleurs.');
            };
        }
    }, [pokemon]);

    return colors;
};
