import React from 'react';
import { Grid, Icon, List, Container, Button } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SiteLogo from '../Shared/SiteLogo/SiteLogo';

import './BottomNav.scss';

const BottomNav = ({isInverted, isMobile, scrollToTop}) => {
	const scrollToTopButton = (
		<Fade bottom distance={isMobile ? '10%' : '100%'}>
			<Button className={isInverted ? `explore-button` : 'explore-button-inverted'} circular icon size='huge' inverted onClick={scrollToTop}>
				<Icon name='arrow up' />
			</Button>
		</Fade>
	);
	
	const contactIcons = [
		{text: 'Gmail', link: 'mailto:mcolligan91@gmail.com', icon: 'mail'},
		{text: 'LinkedIn', link: 'https://www.linkedin.com/in/michael-colligan-189aa196', icon: 'linkedin square'},
		{text: 'GitHub', link: 'https://github.com/mcolligan91', icon: 'github'}
	];

	const renderContactIcons = (contactIcons, isInverted) => {
		return contactIcons.map((item, i) => (
			<List.Item key={i} as='a' className='contact-icons-list-item' href={item.link} target='_blank'>		
				<span>
					<Icon name={item.icon} className='contact-link-icon' />
				</span>
				<span className={`contact-link-span ${isInverted ? 'contact-link-text-inverted' : 'contact-link-text'}`}>
					{item.text}
				</span>
			</List.Item>
		))
	};

	const iconsGrid = (
		<Grid textAlign='center'>
			<Grid.Row className='contact-icons-row'>
				<Container>
					<List className='contact-icons-list-container' horizontal relaxed size={isMobile ? 'large' : 'huge'}>
						{renderContactIcons(contactIcons, isInverted)}
					</List>
				</Container>
			</Grid.Row>
		</Grid>
	);

	const contactLinksContainer = (
		<Container>
			<SiteLogo classes={'logo-text-static footer-logo'} />
			{iconsGrid}
		</Container>
	);

	return (
		<>
			<Grid id='contact-content' className={`bottom-nav-container ${isInverted ? 'bottom-nav-container-inverted' : ''}`} textAlign='center' stackable>
				<Grid.Row className='contact-links-container'>
					{contactLinksContainer}
				</Grid.Row>
				<Grid.Row className={'copyright-text'}>
					<div>© 2024 - Michael Colligan</div>
				</Grid.Row>
			</Grid>
			<Grid className={`bottom-nav-container ${isInverted ? 'bottom-nav-container-inverted' : ''}`} textAlign='center'>
				<Grid.Row className='explore-button-footer-row'>
					{scrollToTopButton}
				</Grid.Row>
			</Grid>
			<Grid className={`site-anchor bottom-nav-container ${isInverted ? 'bottom-nav-container-inverted' : ''}`}></Grid>
		</>
	);
}

const mapStateToProps = (state) => {
    return {
        isInverted: state.IsInvertedReducer.isInverted,
		isMobile: state.IsMobileReducer.isMobile
    }
}

BottomNav.propTypes = {
	isInverted: PropTypes.bool.isRequired,
	isMobile: PropTypes.bool.isRequired,
	scrollToTop: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(BottomNav);