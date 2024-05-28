import React from 'react';

import './SiteLogo.scss';

const SiteLogo = ({classes}) => {
    return (
        <span className={`logo-text ${classes}`} onClick={classes.includes('clickable') ? () => window.location.reload() : null}>M</span>
    );
};

export default SiteLogo;