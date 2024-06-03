import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './ExploreButton.scss';

const ExploreButton = ({buttonClass, buttonClickFunction, iconName}) => {
    return (
        <Button className={buttonClass} circular icon size='huge' inverted onClick={buttonClickFunction}>
            <Icon name={iconName} />
        </Button>
    );
};

ExploreButton.propTypes = {
	buttonClass: PropTypes.string.isRequired,
	buttonClickFunction: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired
};

export default ExploreButton;