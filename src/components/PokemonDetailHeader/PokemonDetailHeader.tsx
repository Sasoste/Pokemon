// src/components/PokemonHeader/PokemonHeader.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import './PokemonDetailHeader.scss';

interface PokemonDetailHeaderProps {
    id: number;
    isFavorite: boolean;
    toggleFavorite: () => void;
}

const PokemonDetailHeader: React.FC<PokemonDetailHeaderProps> = ({ id, isFavorite, toggleFavorite }) => {
    const navigate = useNavigate();

    return (
        <div className="pokemon-header">
            <FontAwesomeIcon
                icon={faArrowLeft}
                className="back-icon"
                onClick={() => navigate(-1)}
            />
            <p className="pokemon-id">#{id.toString().padStart(3, '0')}</p>
            <FontAwesomeIcon
                icon={isFavorite ? solidHeart : regularHeart}
                className="favorite-icon"
                onClick={toggleFavorite}
            />
        </div>
    );
};

export default PokemonDetailHeader;