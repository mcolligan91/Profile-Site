import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Bounce, Fade } from 'react-reveal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExploreButton from '../Shared/ExploreButton/ExploreButton';

import './Intro.scss';

const Intro = ({isInverted, isMobile, scrollToContent}) => {
	const mainHeader = (
		<Fade left distance={'100px'} duration={1000} delay={750}>
			<Header as={!isMobile ? 'h1' : 'h3'} className='intro-main-header'>
				<span className={`intro-main-text ${isInverted ? 'inverted-dark-text' : ''} ${'intro-main-text-mobile'}`}>Michael Colligan</span>
			</Header>
		</Fade>
	);

	const mainSubHeader = (
		<Fade right distance={'100px'} duration={1000} delay={750}>
			<Header as='h3' className='intro-main-header intro-main-subheader'>
				<span className={`intro-sub-text${isMobile ? '-mobile' : ''} ${isInverted ? 'intro-sub-text-inverted' : ''}`}>Full-Stack Software Engineer</span>
			</Header>
		</Fade>
	);

	const exploreButtonLanding = (
		<Bounce bottom duration={1400} delay={1000}>
			<ExploreButton buttonClass={`${!isInverted ? 'explore-button' : 'explore-button-inverted'} explore-button-intro`} buttonClickFunction={() => scrollToContent('skills-content')} iconName='arrow down' />
		</Bounce>
	);

	return (
		<>
			<Container id='intro-content' className='intro-container' text textAlign='center'>
				{mainHeader}
				{mainSubHeader}
				{exploreButtonLanding}
			</Container>
		</>
	);
};

const mapStateToProps = ({IsInvertedReducer: {isInverted}, IsMobileReducer: {isMobile}}) => ({
	isInverted,
	isMobile
});

Intro.propTypes = {
	isInverted: PropTypes.bool.isRequired,
	isMobile: PropTypes.bool.isRequired,
	scrollToTop: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Intro);