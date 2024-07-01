import React from 'react';
import { Menu, Icon} from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import { handleMenuItemHover } from '../../../utils';
import PropTypes from 'prop-types';

import LightModeIconMenuItem from '../LightModeIconMenuItem/LightModeIconMenuItem';

import './TopNavMenu.scss';

const TopNavMenu = ({isInverted, isMobile, visibleContent, allowTopNavFade, navType, scrollToContent, menuItems}) => {
    const menuItemTextProps = (i, id, type) => ({
        onMouseEnter: () => !isMobile && handleMenuItemHover(i, type, false),
        onMouseLeave: () => !isMobile && handleMenuItemHover(i, type, true),
        onClick: () => scrollToContent(id),
    });

    const renderMenuItems = (menuItems, type) => {
        return menuItems.map(({name, id}, i) => (
            <Fade key={i} delay={250} top duration={allowTopNavFade & type === 'top-nav-link-static' ? 1000 + i * 100 : 0} appear>
                <Menu.Item key={i} className={`top-nav-link ${type}`} {...menuItemTextProps(i, id, type)}>
                    <div className='item-text-container'>
                        <span className='item-number'>
                            <Icon name='chevron right' />
                        </span>
                        <span className={`top-nav-link-text ${isInverted ? 'top-nav-link-text-inverted' : ''} ${visibleContent === name ? 'active-top-nav-link-text' : 'non-active-top-nav-link-text'}`}>
                            {name}
                        </span>
                    </div>
                </Menu.Item>
            </Fade>
        ));
    };

    const lightModeMenuElement = (
        <Fade top delay={250} duration={navType === 'top-nav-link-static' & allowTopNavFade ? 1000 + menuItems.length * 100 : 0} appear>
            <LightModeIconMenuItem className={`top-nav-link ${navType}`} index={menuItems.length} />
        </Fade>
    );

    return (
        <Menu.Menu className='menu-item-container' position={navType === 'top-nav-link-static' ? 'right' : null}>
            {renderMenuItems(menuItems, navType)}
            {lightModeMenuElement}
        </Menu.Menu>
    );
};

const mapStateToProps = ({IsInvertedReducer: {isInverted}, VisibleContentReducer: {visibleContent}, IsMobileReducer: {isMobile}}) => ({
	isInverted,
    isMobile,
    visibleContent
});

TopNavMenu.propTypes = {
    isInverted: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    visibleContent: PropTypes.string.isRequired,
    navType: PropTypes.string.isRequired,
    menuItems: PropTypes.array.isRequired,
    scrollToContent: PropTypes.func.isRequired,
	allowTopNavFade:  PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
};

export default connect(mapStateToProps)(TopNavMenu);