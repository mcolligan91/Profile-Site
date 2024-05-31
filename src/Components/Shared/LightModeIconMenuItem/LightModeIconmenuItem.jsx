import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';

const LightModeIconMenuItem = ({isInverted, className, clickFunction, mouseEnterFunction, mouseLeaveFunction, icon}) => {
    return (
        <Menu.Item className={`light-mode-icon-menu-item ${className}`} onClick={clickFunction}>
            <div className={`top-nav-link-text ${isInverted ? 'top-nav-link-text-inverted' : ''}`} onMouseEnter={mouseEnterFunction} onMouseLeave={mouseLeaveFunction}>
                {icon}
            </div>
        </Menu.Item>
    );
}

const mapStateToProps = (state) => {
    return {
		isInverted: state.IsInvertedReducer.isInverted,
    };
}

export default connect(mapStateToProps)(LightModeIconMenuItem);