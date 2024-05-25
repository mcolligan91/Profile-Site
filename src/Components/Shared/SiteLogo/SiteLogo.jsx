import React from 'react';

import './SiteLogo.scss';

const SiteLogo = (props) => {
    const {classes} = props;

    return (
        <span className={`logo-text ${classes}`} onClick={classes.includes('clickable') ? () => window.location.reload() : null}>M</span>
    );
};

export default SiteLogo;