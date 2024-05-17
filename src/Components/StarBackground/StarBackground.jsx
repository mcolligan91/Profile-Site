import React, { useEffect } from 'react';
import './StarBackground.scss';

const StarBackground = () => {
    useEffect(() => {
        const numStars = 350; 
        const container = document.querySelector('.star-container');

        const createStar = ()  => {
            const star = document.createElement('div');
            star.className = 'star';

            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            star.style.left = `${x}px`;
            star.style.top = `${y}px`;

            const size = Math.random() * (3.5 - 1) + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            container.appendChild(star);
        }

        const createStars = () => {
            for (let i = 0; i < numStars; i++) {
                createStar();
            }
        }

        createStars();

        return () => {
            container.innerHTML = ''; 
        };
    }, []);

    return (
        <div className="star-container"></div>
    );
};

export default StarBackground;
