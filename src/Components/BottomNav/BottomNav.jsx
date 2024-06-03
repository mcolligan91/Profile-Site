import React from 'react';
import { Grid, Icon, List, Container } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SiteLogo from '../Shared/SiteLogo/SiteLogo';
import ExploreButton from '../Shared/ExploreButton/ExploreButton';

import './BottomNav.scss';

const BottomNav = ({isInverted, isMobile, scrollToTop}) => {	
	const contactIcons = [
		{text: 'Gmail', link: 'mailto:mcolligan91@gmail.com', icon: 'mail'},
		{text: 'LinkedIn', link: 'https://www.linkedin.com/in/michael-colligan-189aa196', icon: 'linkedin square'},
		{text: 'GitHub', link: 'https://github.com/mcolligan91', icon: 'github'}
	];

	const renderContactIcons = (contactIcons, isInverted) => {
		return contactIcons.map(({link, text, icon}, i) => (
			<List.Item key={i} as='a' className='contact-icons-list-item' href={link} target='_blank'>		
				<span>
					<Icon name={icon} className='contact-link-icon' />
				</span>
				<span className={`contact-link-span ${isInverted ? 'contact-link-text-inverted' : 'contact-link-text'}`}>
					{text}
				</span>
			</List.Item>
		));
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

	const exploreButtonFooter = (
		<Fade bottom distance='10%'>
			<ExploreButton buttonClass={isInverted ? `explore-button` : 'explore-button-inverted'} buttonClickFunction={scrollToTop} iconName='arrow up' />
		</Fade>
	);

	const gridClass = `bottom-nav-container ${isInverted ? 'bottom-nav-container-inverted' : ''}`

	return (
		<>
			<Grid id='contact-content' className={gridClass} textAlign='center' stackable>
				<Grid.Row className='contact-links-container'>
					{contactLinksContainer}
				</Grid.Row>
				<Grid.Row className={'copyright-text'}>
					<div>© 2024 - Michael Colligan</div>
				</Grid.Row>
			</Grid>
			<Grid className={gridClass} textAlign='center'>
				<Grid.Row className='explore-button-footer-row'>
					{exploreButtonFooter}
				</Grid.Row>
			</Grid>
		</>
	);
};

const mapStateToProps = ({IsInvertedReducer: {isInverted}, IsMobileReducer: {isMobile}}) => ({
	isInverted,
	isMobile
});

BottomNav.propTypes = {
	isInverted: PropTypes.bool.isRequired,
	isMobile: PropTypes.bool.isRequired,
	scrollToTop: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(BottomNav);