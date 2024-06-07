import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { handleMenuItemHover } from '../../../utils';
import PropTypes from 'prop-types';

import './LightModeIconMenuItem.scss';

const LightModeIconMenuItem = ({isInverted, isMobile, index, className, handleUpdateIsInverted}) => {
    const handleMouseEvent = (removeAll) => {
        if (!isMobile) {
            handleMenuItemHover(index, className.split(' ')[1] || '', removeAll);
        }
    };
    
    return (
        <Menu.Item className={`light-mode-icon-menu-item ${className}`} onClick={() => handleUpdateIsInverted()} onMouseEnter={() => handleMouseEvent(false)} onMouseLeave={() => handleMouseEvent(true)}>
            <div className={`top-nav-link-text ${isInverted ? 'top-nav-link-text-inverted' : ''}`}>
                <FontAwesomeIcon className={isInverted ? 'light-mode-icon' : 'dark-mode-icon'} icon={faCircleHalfStroke} />
            </div>
        </Menu.Item>
    );
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleUpdateIsInverted: () => {
			dispatch({ type: 'UPDATE_ISINVERTED' })
		}
	};
};

const mapStateToProps = ({IsInvertedReducer: {isInverted}, IsMobileReducer: {isMobile}}) => ({
	isInverted,
    isMobile
});

LightModeIconMenuItem.propTypes = {
	isInverted: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    index: PropTypes.number,
	className: PropTypes.string.isRequired,
    handleUpdateIsInverted: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LightModeIconMenuItem);