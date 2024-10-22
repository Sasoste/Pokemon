import './PokemonDetailNavigation.scss';
import { PokemonDetailNavigationProps } from '@/types';
import Button from '@components/Button/Button';

const PokemonDetailNavigation: React.FC<PokemonDetailNavigationProps> = ({ activeSection, setActiveSection }) => {
    const isActive = (section: string) => (activeSection === section ? 'active' : '');

    return (
        <nav className="pokemon-nav">
            <Button className={`pokemon-list-button ${isActive('description')}`} onClick={() => setActiveSection('description')}>
                Description
            </Button>
            <Button className={`pokemon-list-button ${isActive('info')}`} onClick={() => setActiveSection('info')}>
                Info
            </Button>
            <Button className={`pokemon-list-button ${isActive('stats')}`} onClick={() => setActiveSection('stats')}>
                Stats
            </Button>
            <Button className={`pokemon-list-button ${isActive('capture')}`} onClick={() => setActiveSection('capture')}>
                Capture Rate
            </Button>
            <Button className={`pokemon-list-button ${isActive('egg_groups')}`} onClick={() => setActiveSection('egg_groups')}>
                Egg Groups
            </Button>
            <Button className={`pokemon-list-button ${isActive('moves')}`} onClick={() => setActiveSection('moves')}>
                Moves
            </Button>
            <Button className={`pokemon-list-button ${isActive('evolution')}`} onClick={() => setActiveSection('evolution')}>
                Evolution
            </Button>
            <Button className={`pokemon-list-button ${isActive('locations')}`} onClick={() => setActiveSection('locations')}>
                Locations
            </Button>
        </nav>
    );
};

export default PokemonDetailNavigation;