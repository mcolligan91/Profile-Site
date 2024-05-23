import React, { useEffect, useState } from 'react';
import { Menu, Icon, Grid, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

import LightModeIconMenuItem from '../Shared/LightModeIconMenuItem/LightModeIconmenuItem';

import './TopNavFixed.scss';

const TopNavFixed = (props) => {
    const {isInverted, visibleContent, scrollToContent, handleUpdateIsInverted} = props;

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [showFixedNav, setShowFixedNav] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setShowFixedNav(scrollTop > 450);
    };

    const menuItems = [
        {name: 'Home', id: 'intro-content'},
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

    const handleMenuItemHover = (index, removeAll=false) => {
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

    const lightModeIcon = <FontAwesomeIcon className={isInverted ? 'light-mode-icon' : 'dark-mode-icon'} icon={faCircleHalfStroke} />;

    return (
        <Grid className='header-row'>
            <Grid.Column className='nav-container'>
                <Responsive as={Menu} className={`top-nav-fixed ${showFixedNav ? 'visible' : 'hidden'} ${isInverted ? 'top-nav-fixed-inverted' : ''}`} size='massive' borderless inverted fixed='top'> 
                    <Menu.Menu className='menu-item-container'>
                        {menuItems.map((item, i) => {
                            const {name, id} = item;
                            return (
                                <Menu.Item key={i} className='top-nav-link top-nav-link-fixed' active={visibleContent === name}>
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
                        })}
                        <LightModeIconMenuItem 
                            className='top-nav-link top-nav-link-fixed' 
                            clickFunction={() => handleUpdateIsInverted()} 
                            mouseEnterFunction={() => handleMenuItemHover(menuItems.length)} 
                            mouseLeaveFunction={() => handleMenuItemHover(menuItems.length, true)} 
                            icon={lightModeIcon} 
                        />
                    </Menu.Menu>
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

export default connect(mapStateToProps)(TopNavFixed);