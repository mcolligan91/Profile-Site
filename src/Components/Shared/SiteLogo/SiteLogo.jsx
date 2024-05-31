import React from 'react';
import PropTypes from 'prop-types';

import './SiteLogo.scss';

const SiteLogo = ({classes}) => {
    return (
        <span className={`logo-text ${classes}`} onClick={classes.includes('clickable') ? () => window.location.reload() : null}>M</span>
    );
};

SiteLogo.propTypes = {
	classes: PropTypes.string.isRequired
};

export default SiteLogo;