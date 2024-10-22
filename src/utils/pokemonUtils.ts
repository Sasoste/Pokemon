export const formatPokemonNameForUrl = (name: string): string => {
    return name.toLowerCase()
        .replace('♀', '-f')
        .replace('♂', '-m')
        .replace(' ', '-')
        .replace('.', '')
        .replace("'", '')
        .replace('é', 'e')
};