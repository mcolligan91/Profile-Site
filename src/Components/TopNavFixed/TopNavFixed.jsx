import React, { useEffect, useState } from 'react';
import { Menu, Icon, Grid, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

import LightModeIconMenuItem from '../Shared/LightModeIconMenuItem/LightModeIconmenuItem';

import './TopNavFixed.scss';

const TopNavFixed = (props) => {
    const {isInverted, isMobile, visibleContent, scrollToContent, handleUpdateIsInverted} = props;

    //fixed
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    //fixed
    const [showFixedNav, setShowFixedNav] = useState(false);

    //fixed
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setShowFixedNav(scrollTop > 450);
    };

    //fixed
    const menuItems = [
        {name: 'Home', id: 'intro-content'},
        {name: 'About', id: 'skills-content'},
        {name: 'Experience', id: 'experience-content'},
        {name: 'Education', id: 'education-content'},
        {name: 'Contact', id: 'contact-content'}
    ];

    //fixed
    const menuItemTextProps = (i, id) => ({
        onMouseEnter: () => handleMenuItemHover(i),
        onMouseLeave: () => handleMenuItemHover(i, true),
        onClick: () => scrollToContent(id),
    });

    //fixed
    const handleMenuItemHover = (index, removeAll=false) => {
        if (isMobile) {
            return;
        }
        
        const items = document.querySelectorAll('.top-nav-link-fixed');
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

    //fixed
    const renderMenuItems = () => (
        menuItems.map((item, i) => (
            <Menu.Item key={i} className='top-nav-link top-nav-link-fixed'>
                <div className='item-text-container'>
                    <span className='item-number'>
                        <Icon name='chevron right' />
                    </span>
                    <span className={`top-nav-link-text ${isInverted ? 'top-nav-link-text-inverted' : ''} ${visibleContent === item.name ? 'active-top-nav-link-text' : 'non-active-top-nav-link-text'}`} {...menuItemTextProps(i, item.id)}>
                        {item.name}
                    </span>
                </div>
            </Menu.Item>
        ))
    );

    //fixed
    const lightModeIcon = <FontAwesomeIcon className={isInverted ? 'light-mode-icon' : 'dark-mode-icon'} icon={faCircleHalfStroke} />;

    //fixed
    const lightModeMenuItem = (
        <LightModeIconMenuItem 
            className='top-nav-link top-nav-link-fixed' 
            clickFunction={() => handleUpdateIsInverted()} 
            mouseEnterFunction={() => handleMenuItemHover(menuItems.length)} 
            mouseLeaveFunction={() => handleMenuItemHover(menuItems.length, true)} 
            icon={lightModeIcon} 
        />
    );

    //fixed
    const fixedContent = (
        <Grid className='header-row'>
            <Grid.Column className='nav-container'>
                <Menu className={`top-nav-fixed ${showFixedNav ? 'visible' : 'hidden'} ${isInverted ? 'top-nav-fixed-inverted' : ''} ${isMobile ? 'top-nav-fixed-mobile' : ''} `} size={isMobile ? 'small' : 'massive'} borderless inverted fixed='top'> 
                    <Menu.Menu>
                        {renderMenuItems()}
                        {lightModeMenuItem}
                    </Menu.Menu>
                </Menu>
            </Grid.Column>
        </Grid>
    );

    return (
        <>
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

export default connect(mapStateToProps)(TopNavFixed);