import React, {useEffect, useState} from 'react';
import Particles, {initParticlesEngine} from '@tsparticles/react';
import {loadFull} from 'tsparticles';
import './App.css';

import particlesOptionsLanding from './particles-landing.json';
import particlesOptionsLandingInverted from './particles-landing-inverted.json';
import particlesOptionsContent from './particles-content.json';
import particlesOptionsContentInverted from './particles-content-inverted.json'

import MainContainer from './Components/MainContainer/MainContainer';

function App() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (init) {
            return;
        }

        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLanding = init && <Particles id='tsparticles-landing' className='particles-element' options={particlesOptionsLanding} />;

    const particlesLandingInverted = init && <Particles id='tsparticles-landing-inverted' className='particles-element' options={particlesOptionsLandingInverted} />;

    const particlesContent = init && <Particles id='tsparticles-content' className='particles-element' options={particlesOptionsContent} />;

    const particlesContentInverted = init && <Particles id='tsparticles-content-inverted' className='particles-element' options={particlesOptionsContentInverted} />;

    return (
        <div className='App'>
            <MainContainer particlesLanding={particlesLanding} particlesLandingInverted={particlesLandingInverted} particlesContent={particlesContent} particlesContentInverted={particlesContentInverted} />
        </div>
    );
}

export default App;
