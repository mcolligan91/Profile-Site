import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';

import './App.css';

import particlesOptionsLanding from './particles-landing.json';
import particlesOptionsLandingInverted from './particles-landing-inverted.json';
import particlesOptionsContent from './particles-content.json';
import particlesOptionsContentInverted from './particles-content-inverted.json';

import MainContainer from './Components/MainContainer/MainContainer';

function App() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (!init) {
            initParticlesEngine(async (engine) => {
                await loadFull(engine);
            })
            .then(() => setInit(true))
            .catch((error) => console.error('Error loading particles engine:', error));
        }
    }, [init]);

    const renderParticles = (id, options) => init && <Particles id={id} className='particles-element' options={options} />;

    return (
        <div className='App'>
            <MainContainer 
                particlesLanding={renderParticles('tsparticles-landing', particlesOptionsLanding)} 
                particlesLandingInverted={renderParticles('tsparticles-landing-inverted', particlesOptionsLandingInverted)} 
                particlesContent={renderParticles('tsparticles-content', particlesOptionsContent)} 
                particlesContentInverted={renderParticles('tsparticles-content-inverted', particlesOptionsContentInverted)} 
            />
        </div>
    );
}

export default App;
