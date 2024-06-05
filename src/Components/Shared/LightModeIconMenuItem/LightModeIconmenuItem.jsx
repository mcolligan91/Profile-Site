import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import './LightModeIconMenuItem.scss';

const LightModeIconMenuItem = ({isInverted, className, clickFunction, mouseEnterFunction, mouseLeaveFunction}) => {
    return (
        <Menu.Item className={`light-mode-icon-menu-item ${className}`} onClick={clickFunction} onMouseEnter={mouseEnterFunction} onMouseLeave={mouseLeaveFunction}>
            <div className={`top-nav-link-text ${isInverted ? 'top-nav-link-text-inverted' : ''}`}>
                <FontAwesomeIcon className={isInverted ? 'light-mode-icon' : 'dark-mode-icon'} icon={faCircleHalfStroke} />
            </div>
        </Menu.Item>
    );
};

const mapStateToProps = ({IsInvertedReducer: {isInverted}}) => ({
	isInverted
});

LightModeIconMenuItem.propTypes = {
	isInverted: PropTypes.bool.isRequired,
	className: PropTypes.string.isRequired,
    clickFunction: PropTypes.func.isRequired,
    mouseEnterFunction: PropTypes.func.isRequired,
    mouseLeaveFunction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(LightModeIconMenuItem);