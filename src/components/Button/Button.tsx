import React from 'react';
import './Button.scss';
import { ButtonProps } from '@/types';

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', disabled = false, type = 'button' }) => {
    return (
        <button
            onClick={onClick}
            className={className}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;