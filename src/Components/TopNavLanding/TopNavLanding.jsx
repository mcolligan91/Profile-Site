import React from 'react';
import { Menu, Icon, Responsive, Grid } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

import SiteLogo from '../Shared/SiteLogo/SiteLogo';
import LightModeIconMenuItem from '../Shared/LightModeIconMenuItem/LightModeIconmenuItem';
import DropdownMenu from '../Shared/DropdownMenu/DropdownMenu';

import './TopNavLanding.scss';

const TopNavLanding = (props) => {
    const {isInverted, allowTopNavFade, visibleContent, scrollToContent, handleUpdateIsInverted} = props;

    const handleMenuItemHover = (index, removeAll=false) => {
        const items = document.querySelectorAll('.top-nav-link-static');
        if (removeAll) {
            items.forEach(item => {
                item.classList.remove('dimmed');
            });
        } else {
            items.forEach((item, i) => {
                if (i !== index) {
                    item.classList.add('dimmed');
                }
            });
        }
    };

    const menuItems = [
        {name: 'About', id: 'skills-content'},
        {name: 'Experience', id: 'experience-content'},
        {name: 'Education', id: 'education-content'},
        {name: 'Contact', id: 'contact-content'}
    ];

    const menuItemTextProps = (i, id) => ({
        onMouseEnter: () => handleMenuItemHover(i),
        onMouseLeave: () => handleMenuItemHover(i, true),
        onClick: () => scrollToContent(id),
    });

    const lightModeIcon = <FontAwesomeIcon className={isInverted ? 'light-mode-icon' : 'dark-mode-icon'} icon={faCircleHalfStroke} />;

    return (
        <Grid className='header-row' columns={2}>
            <Grid.Column className='logo-container' textAlign='left' verticalAlign='middle' computer={4} tablet={3} mobile={8}>
                <Fade>
                    <SiteLogo classes={`logo-text-clickable ${isInverted ? 'logo-text-clickable-inverted' : ''}`} />
                </Fade>
            </Grid.Column>
            <Grid.Column className='nav-container' textAlign='right' computer={12} tablet={13} mobile={8}>
                <Responsive as={Menu} minWidth={768} className={`top-nav-static ${isInverted ? 'top-nav-static-inverted' : ''}`} size='massive' borderless inverted> 
                    <Menu.Menu className='menu-item-container' position='right'>
                        {menuItems.map((item, i) => {
                            const {name, id} = item;
                            
                            const menuItemContent = (
                                <Menu.Item key={i} className='top-nav-link top-nav-link-static' active={visibleContent === name}>
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
                            return (
                                <Fade key={i} top duration={allowTopNavFade ? 1000 + i * 100 : 0} appear onComplete={() => console.log('test')}>
                                    {menuItemContent}
                                </Fade>
                            );
                        })}
                        <Fade top duration={allowTopNavFade ? 1000 + menuItems.length * 100 : 0} appear>
                            <LightModeIconMenuItem  
                                className='top-nav-link top-nav-link-static' 
                                clickFunction={() => handleUpdateIsInverted()} 
                                mouseEnterFunction={() => handleMenuItemHover(menuItems.length)} 
                                mouseLeaveFunction={() => handleMenuItemHover(menuItems.length, true)} 
                                icon={lightModeIcon} 
                            />
                        </Fade>
                    </Menu.Menu>
                </Responsive>
                <Responsive as={Menu} floated='right' maxWidth={767} className={`top-nav-static ${isInverted ? 'top-nav-static-inverted' : ''}`} borderless inverted size='massive'>
                    <Menu.Item>
                        <DropdownMenu menuItems={menuItems} scrollToContent={scrollToContent} />
                    </Menu.Item>
                </Responsive>
            </Grid.Column>
        </Grid>        
    )
}

const mapStateToProps = (state) => {
    return {
        isInverted: state.IsInvertedReducer.isInverted,
        isMobile: state.IsMobileReducer.isMobile,
        visibleContent: state.VisibleContentReducer.visibleContent

    } 
}

export default connect(mapStateToProps)(TopNavLanding);