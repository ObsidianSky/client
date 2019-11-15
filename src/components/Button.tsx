import React from 'react';

interface ButtonProps {
    type: 'submit' | 'reset' | 'button',
    text: string,
    className: string
}

const Button = ({type = 'button', text, className}: ButtonProps) => {
    return <button type={type} className={`btn ${className}`}>{text}</button>
};

export default Button;