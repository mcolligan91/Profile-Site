import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LightModeIconMenuItem = ({isInverted, className, clickFunction, mouseEnterFunction, mouseLeaveFunction, icon}) => {
    return (
        <Menu.Item className={`light-mode-icon-menu-item ${className}`} onClick={clickFunction} onMouseEnter={mouseEnterFunction} onMouseLeave={mouseLeaveFunction}>
            <div className={`top-nav-link-text ${isInverted ? 'top-nav-link-text-inverted' : ''}`}>
                {icon}
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
    icon: PropTypes.element.isRequired
};

export default connect(mapStateToProps)(LightModeIconMenuItem);