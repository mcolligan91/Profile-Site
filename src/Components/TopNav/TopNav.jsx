import React, { useEffect, useState } from 'react';
import { Menu, Icon, Responsive, Grid } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

import SiteLogo from '../Shared/SiteLogo/SiteLogo';
import LightModeIconMenuItem from '../Shared/LightModeIconMenuItem/LightModeIconmenuItem';
import DropdownMenu from '../Shared/DropdownMenu/DropdownMenu';

import './TopNav.scss';

const TopNav = ({isInverted, isMobile, allowTopNavFade, visibleContent, scrollToContent, handleUpdateIsInverted}) => {
    const [showFixedNav, setShowFixedNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            setShowFixedNav(scrollTop > 450);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMenuItemHover = (index, type, removeAll) => {
        if (isMobile) {
            return;
        }
        
        const selector = type === 'top-nav-link-static' ? '.top-nav-link-static' : '.top-nav-link-fixed';
        const items = document.querySelectorAll(selector);
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

    const fixedMenuItems = [
        { name: 'Home', id: 'intro-content' },
        { name: 'About', id: 'skills-content' }, 
        { name: 'Experience', id: 'experience-content' },
        { name: 'Education', id: 'education-content' },
        { name: 'Contact', id: 'contact-content' }
    ];

    const landingMenuItems = fixedMenuItems.filter(item => item.name !== 'Home');

    const menuItemTextProps = (i, id, type) => ({
        onMouseEnter: () => handleMenuItemHover(i, type, false),
        onMouseLeave: () => handleMenuItemHover(i, type, true),
        onClick: () => scrollToContent(id),
    });

    const renderMenuItems = (menuItems, type) => {
        return menuItems.map((item, i) => (
            <Fade key={i} top duration={allowTopNavFade & type === 'top-nav-link-static' ? 1000 + i * 100 : 0} appear>
                <Menu.Item key={i} className={`top-nav-link ${type}`} {...menuItemTextProps(i, item.id, type)}>
                    <div className='item-text-container'>
                        <span className='item-number'>
                            <Icon name='chevron right' />
                        </span>
                        <span className={`top-nav-link-text ${isInverted ? 'top-nav-link-text-inverted' : ''} ${visibleContent === item.name ? 'active-top-nav-link-text' : 'non-active-top-nav-link-text'}`}>
                            {item.name}
                        </span>
                    </div>
                </Menu.Item>
            </Fade>
        ))
    };

    const lightModeIcon = <FontAwesomeIcon className={isInverted ? 'light-mode-icon' : 'dark-mode-icon'} icon={faCircleHalfStroke} />;

    const lightModeMenuItem = (type) => (
        <LightModeIconMenuItem
            className={`top-nav-link ${type}`}
            clickFunction={() => handleUpdateIsInverted()}
            mouseEnterFunction={() => handleMenuItemHover(fixedMenuItems.length, type, false)}
            mouseLeaveFunction={() => handleMenuItemHover(fixedMenuItems.length, type, true)}
            icon={lightModeIcon}
        />
    );

    const landingContent = (
        <Grid className='header-row header-row-landing' columns={2}>
            <Grid.Column className='logo-container' textAlign='left' verticalAlign='middle' computer={4} tablet={3} mobile={8}>
                <Fade>
                    <SiteLogo classes={`logo-text-clickable ${isInverted ? 'logo-text-clickable-inverted' : ''}`} />
                </Fade>
            </Grid.Column>
            <Grid.Column className='nav-container' textAlign='right' computer={12} tablet={13} mobile={8}>
            <Responsive as={Menu} minWidth={768} className={`top-nav-static ${isInverted ? 'top-nav-static-inverted' : ''}`} size='massive' borderless inverted> 
                    <Menu.Menu className='menu-item-container' position='right'>
                        {renderMenuItems(landingMenuItems, 'top-nav-link-static')}
                        <Fade top duration={allowTopNavFade ? 1000 + landingMenuItems.length * 100 : 0} appear>
                            {lightModeMenuItem('top-nav-link-static')}
                        </Fade>
                    </Menu.Menu>
                </Responsive>
                <Responsive as={Menu} floated='right' maxWidth={767} className={`top-nav-static ${isInverted ? 'top-nav-static-inverted' : ''}`} borderless inverted size='massive'>
                    <Menu.Item className='light-mode-menu-static-mobile-item'>
                        {lightModeMenuItem('top-nav-link-static-mobile')}
                    </Menu.Item>
                    <Menu.Item>
                        <DropdownMenu menuItems={landingMenuItems} scrollToContent={scrollToContent} />
                    </Menu.Item>
                </Responsive>
            </Grid.Column>
        </Grid>     
    );

    const fixedContent = (
        <Grid className='header-row header-row-fixed'>
            <Grid.Column className='nav-container'>
                <Menu className={`top-nav-fixed ${showFixedNav ? 'visible' : 'hidden'} ${isInverted ? 'top-nav-fixed-inverted' : ''} ${isMobile ? 'top-nav-fixed-mobile' : ''} `} size={isMobile ? 'small' : 'massive'} borderless inverted fixed='top'> 
                    <Menu.Menu>
                        {renderMenuItems(fixedMenuItems, 'top-nav-link-fixed')}
                        {lightModeMenuItem('top-nav-link-fixed')}
                    </Menu.Menu>
                </Menu>
            </Grid.Column>
        </Grid>
    );

    return (
        <>
            {landingContent}
            {fixedContent}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isInverted: state.IsInvertedReducer.isInverted,
        isMobile: state.IsMobileReducer.isMobile,
        visibleContent: state.VisibleContentReducer.visibleContent
    };
}

export default connect(mapStateToProps)(TopNav);

