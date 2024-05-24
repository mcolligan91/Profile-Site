import React from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';

const LightModeIconMenuItem = (props) => {
    const {isInverted, className, clickFunction, mouseEnterFunction, mouseLeaveFunction, icon} = props;

    return (
        <Menu.Item className={className}>
            <div className={`top-nav-link-text ${isInverted ? 'top-nav-link-text-inverted' : ''}`} onClick={clickFunction} onMouseEnter={mouseEnterFunction} onMouseLeave={mouseLeaveFunction}>
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