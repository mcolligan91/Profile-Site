import React from 'react';
import { Menu, Icon, Responsive } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';

const TopNavMenu = (props) => {
    const {visibleContent, isInverted, menuItems, menuProps, subMenuProps, menuItemClass, menuItemTextProps, iconContent, fadeIn} = props;

    const iconElement = fadeIn ? (
        <Fade top duration={1000 + menuItems.length * 100} appear>
            {iconContent}
        </Fade>
    ) : (
        iconContent
    );
    
    return (
        <>
            <Responsive as={Menu} minWidth={768} {...menuProps}> 
                <Menu.Menu {...subMenuProps}>
                    {menuItems.slice(menuItemClass.includes('static') ? 1 : 0, menuItems.length).map((item, i) => {
                        const {name, id} = item;
                        let duration = 1000 + i * 100;

                        const menuItemContent = (
                            <Menu.Item key={i} className={menuItemClass} active={visibleContent === name}>
                                <div className='item-text-container'>
                                    <span className='item-number'>
                                        <Icon name='chevron right' />
                                    </span>
                                    <span className={`top-nav-link-text ${isInverted ? 'top-nav-link-text-inverted' : ''} ${visibleContent === name ? 'active-top-nav-link-text' : 'non-active-top-nav-link-text'}`} {...menuItemTextProps(i, id)}>
                                        {name}
                                    </span>
                                </div>
                            </Menu.Item>
                        );
                        return fadeIn ? (
                            <Fade key={i} top duration={duration} appear onComplete={() => console.log('test')}>
                                {menuItemContent}
                            </Fade>
                        ) : (
                            menuItemContent
                        );
                    })}
                    {iconElement}
                </Menu.Menu>
            </Responsive>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
		isInverted: state.IsInvertedReducer.isInverted,
        isMobile: state.IsMobileReducer.isMobile
    }
}

export default connect(mapStateToProps)(TopNavMenu);