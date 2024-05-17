import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

import LightModeIconMenuItem from '../Shared/LightModeIconMenuItem/LightModeIconmenuItem';
import TopNavMenu from '../Shared/TopNavMenu/TopNavMenu';

import './TopNav.scss';

class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFixedNav: false
        }
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        this.setState({ showFixedNav: scrollTop > 450 ? true : false });
    }

    handleMenuItemHover = (index, removeAll=false) => {
        const {showFixedNav} = this.state;
        const items = document.querySelectorAll(showFixedNav ? '.top-nav-link-fixed' : '.top-nav-link-static');
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

    render() {
        const {showFixedNav} = this.state,
            {isInverted, scrollToContent, handleUpdateIsInverted} = this.props;

        const menuItems = [
            {name: 'Home', id: 'intro-content'},
            {name: 'About', id: 'skills-content'},
            {name: 'Experience', id: 'experience-content'},
            {name: 'Education', id: 'education-content'},
            {name: 'Contact', id: 'contact-content'}
        ];

        const lightModeIcon = <FontAwesomeIcon className={isInverted ? 'light-mode-icon' : 'dark-mode-icon'} icon={faCircleHalfStroke} />;

        const lightModeIconStatic = <LightModeIconMenuItem 
                                        className='top-nav-link top-nav-link-static' 
                                        clickFunction={() => handleUpdateIsInverted()} 
                                        mouseEnterFunction={() => this.handleMenuItemHover(menuItems.length)} 
                                        mouseLeaveFunction={() => this.handleMenuItemHover(menuItems.length, true)} 
                                        icon={lightModeIcon} 
                                    />;

        const lightModeIconFixed = <LightModeIconMenuItem 
                                        className='top-nav-link top-nav-link-fixed' 
                                        clickFunction={() => handleUpdateIsInverted()} 
                                        mouseEnterFunction={() => this.handleMenuItemHover(menuItems.length)} 
                                        mouseLeaveFunction={() => this.handleMenuItemHover(menuItems.length, true)} 
                                        icon={lightModeIcon} 
                                    />;

        const menuItemTextProps = (i, id) => ({
            onMouseEnter: () => this.handleMenuItemHover(i),
            onMouseLeave: () => this.handleMenuItemHover(i, true),
            onClick: () => scrollToContent(id),
        });

        const topNavPropsArray = [
            {
                menuItems: menuItems,
                menuProps: {className: `top-nav-static ${isInverted ? 'top-nav-static-inverted' : ''}` , size: 'massive', borderless: true, inverted: true},
                subMenuProps: {className: 'menu-item-container', position: 'right'},
                menuItemClass: 'top-nav-link top-nav-link-static',
                menuItemTextProps: menuItemTextProps,
                iconContent: lightModeIconStatic,
                fadeIn: true
            },
            {
                menuItems: menuItems,
                menuProps: {className: `top-nav-fixed ${showFixedNav ? 'visible' : 'hidden'} ${isInverted ? 'top-nav-fixed-inverted' : ''}`, size: 'massive', borderless: true, inverted: true, fixed: 'top' },
                subMenuProps: {className: 'menu-item-container'},
                menuItemClass: 'top-nav-link top-nav-link-fixed',
                menuItemTextProps: menuItemTextProps,
                iconContent: lightModeIconFixed,
                fadeIn: false
            }
        ];
        
        return (
            <>
                {topNavPropsArray.map((props, i) => (
                    <TopNavMenu key={i} {...props} />
                ))}
            </>
        );
        
    }
}

const mapStateToProps = (state) => {
    return {
        isInverted: state.IsInvertedReducer.isInverted,
        isMobile: state.IsMobileReducer.isMobile,
        visibleContent: state.VisibleContentReducer.visibleContent

    } 
}

export default connect(mapStateToProps)(TopNav);