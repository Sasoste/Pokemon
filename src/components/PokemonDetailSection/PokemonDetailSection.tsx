import React from 'react';
import './PokemonDetailSection.scss';

interface PokemonDetailSectionProps {
    title: string;
    children: React.ReactNode;
}

const PokemonDetailSection: React.FC<PokemonDetailSectionProps> = ({ title, children }) => {
    return (
        <div className="card-section">
            <h2>{title}</h2>
            <div>{children}</div>
        </div>
    );
};

export default PokemonDetailSection;
