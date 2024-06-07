import React, { useEffect, useState } from 'react';
import { Menu, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TopNavMenu from '../Shared/TopNavMenu/TopNavMenu';

import './TopNavFixed.scss';

const TopNavFixed = ({isInverted, isMobile, scrollToContent, menuItems}) => {
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

    const menuElement = (
        <Menu className={`top-nav-fixed ${showFixedNav ? 'visible' : 'hidden'} ${isInverted ? 'top-nav-fixed-inverted' : ''} ${isMobile ? 'top-nav-fixed-mobile' : ''} `} size={isMobile ? 'small' : 'massive'} borderless inverted fixed='top'> 
            <TopNavMenu navType='top-nav-link-fixed' scrollToContent={scrollToContent} menuItems={menuItems} />
        </Menu>
    );

    return (
        <Grid className='header-row header-row-fixed'>
            <Grid.Column className='nav-container'>
                {menuElement}
            </Grid.Column>
        </Grid>
    );
};

const mapStateToProps = ({IsInvertedReducer: {isInverted}, IsMobileReducer: {isMobile}}) => ({
	isInverted,
	isMobile
});

TopNavFixed.propTypes = {
	isInverted: PropTypes.bool.isRequired,
	isMobile: PropTypes.bool.isRequired,
	scrollToContent: PropTypes.func.isRequired,
    menuItems: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(TopNavFixed);

