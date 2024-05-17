import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';

const TopNavMenu = (props) => {
    const {isInverted, menuItems, menuProps, subMenuProps, menuItemClass, menuItemTextProps, iconContent, fadeIn} = props;

    const iconElement = fadeIn ? (
        <Fade top duration={1000 + menuItems.length * 100} appear>
            {iconContent}
        </Fade>
    ) : (
        iconContent
    );

    return (
        <Menu {...menuProps}> 
            <Menu.Menu {...subMenuProps}>
                {menuItems.map((item, i) => {
                    const {name, id} = item;
                    let duration = 1000 + i * 100;

                    const menuItemContent = (
                        <Menu.Item key={i} className={menuItemClass}>
                            <div className='item-text-container'>
                                <span className='item-number'>
                                    {`${i + 1}.`}
                                </span>
                                <span className={`top-nav-link-text ${isInverted ? 'top-nav-link-text-inverted' : ''}`} {...menuItemTextProps(i, id)}>
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
        </Menu>
    );
}

const mapStateToProps = (state) => {
    return {
		isInverted: state.IsInvertedReducer.isInverted,
        isMobile: state.IsMobileReducer.isMobile
    }
}

export default connect(mapStateToProps)(TopNavMenu);