import React from 'react';

import './SiteLogo.scss';

const SiteLogo = (props) => {
    const {classes} = props;

    const clickFunction = classes.includes('clickable') ? () => window.location.reload() : null;

    return (
        <span className={`logo-text ${classes}`} onClick={clickFunction}>M</span>
    );
};

export default SiteLogo;