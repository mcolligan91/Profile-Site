import React, { useEffect, useState } from 'react';
import { Menu, Responsive, Grid } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SiteLogo from '../Shared/SiteLogo/SiteLogo';
import LightModeIconMenuItem from '../Shared/LightModeIconMenuItem/LightModeIconMenuItem';
import DropdownMenu from '../Shared/DropdownMenu/DropdownMenu';
import TopNavMenu from '../Shared/TopNavMenu/TopNavMenu';

import './TopNavLanding.scss';

const TopNavLanding = ({isInverted, isMobile, scrollToContent, menuItems}) => {
    const [allowTopNavFade, setAllowTopNavFade] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
			setAllowTopNavFade(false);
		}, 500);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [])

    const landingMenuItems = menuItems.filter(item => item.name !== 'Home');

    const siteLogoElement = (
        <Fade>
            <SiteLogo classes={`logo-text-clickable ${isInverted ? 'logo-text-clickable-inverted' : ''}`} />
        </Fade>
    );

    const computerTopNavElement = (
        <Responsive as={Menu} minWidth={767} className={`top-nav-static ${isInverted ? 'top-nav-static-inverted' : ''}`} size='massive' borderless inverted> 
            <TopNavMenu navType='top-nav-link-static' scrollToContent={scrollToContent} allowTopNavFade={allowTopNavFade} menuItems={landingMenuItems} />
        </Responsive>
    );

    const mobileTopNavElement = (
        <Responsive as={Menu} floated='right' maxWidth={767} className={`top-nav-static ${isInverted ? 'top-nav-static-inverted' : ''}`} borderless inverted size='massive'>
            <Menu.Item className='light-mode-menu-static-mobile-item'>
                <LightModeIconMenuItem className='top-nav-link top-nav-link-static-mobile' index={landingMenuItems.length} />
            </Menu.Item>
            <Menu.Item>
                <DropdownMenu menuItems={landingMenuItems} scrollToContent={scrollToContent} />
            </Menu.Item>
        </Responsive>
    );

    return (
        <Grid className='header-row header-row-landing' columns={2}>
            <Grid.Column className='logo-container' textAlign='left' verticalAlign='middle' computer={4} tablet={3} mobile={8}>
                {siteLogoElement}
            </Grid.Column>
            <Grid.Column className='nav-container' textAlign='right' computer={12} tablet={13} mobile={8}>
                {computerTopNavElement}
                {mobileTopNavElement}
            </Grid.Column>
        </Grid>
    );
};

const mapStateToProps = ({IsInvertedReducer: {isInverted}, IsMobileReducer: {isMobile}}) => ({
	isInverted,
	isMobile
});

TopNavLanding.propTypes = {
	isInverted: PropTypes.bool.isRequired,
	isMobile: PropTypes.bool.isRequired,
	scrollToContent: PropTypes.func.isRequired,
    menuItems: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(TopNavLanding);

