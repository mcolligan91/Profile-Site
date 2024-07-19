import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { InView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import AnimatedCursor from 'react-animated-cursor';

import Intro from '../Intro/Intro';
import About from '../About/About';
import Experience from '../Experience/Experience';
import Education from '../Education/Education';
import BottomNav from '../BottomNav/BottomNav';
import TopNavLanding from '../TopNavLanding/TopNavLanding';
import TopNavFixed from '../TopNavFixed/TopNavFixed';

import './MainContainer.scss';

const MainContainer = ({visibleContent, isInverted, isMobile, handleUpdateVisibleContent, handleUpdateIsMobile, particlesLanding, particlesLandingInverted, particlesContent, particlesContentInverted, particlesLandingMobile, particlesLandingMobileInverted}) => {
  	useEffect(() => {
	  	window.addEventListener('resize', handleUpdateIsMobile);
	  	handleUpdateIsMobile();

		return () => {
			window.removeEventListener('resize', handleUpdateIsMobile);
		};		
	}, [handleUpdateIsMobile]);
  
	const scrollToContent = (elemId) => {
		if (elemId === 'intro-content') {
			scrollToTop();
		} else{
			const element = document.getElementById(elemId);
			element.scrollIntoView({ behavior: 'smooth', block: elemId === 'contact-content' ? 'end' : 'start' });
		}
	};
  
	const scrollToTop = () => {
	  	window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};

	const inViewThresholds = {
		'Intro': .5,
		'About': .5,
		'Experience': .5,
		'Education': .7,
		'Contact': .9
	};

	const contentRowClass = `${isInverted ? 'content-row-inverted' : ''} ${isMobile ? 'content-row-mobile' : ''}`
  
	const contentContainers = [
		{
			content: <About />,
			contentId: 'skills-content',
			contentClass: `skills-row content-row ${contentRowClass}`,
			contentName: 'About',
			visibilityThreshold: inViewThresholds['About']
		},
		{
			content: <Experience />,
			contentId: 'experience-content',
			contentClass: `experience-row content-row ${contentRowClass}`,
			contentName: 'Experience',
			visibilityThreshold: inViewThresholds['Experience']
		},
		{
			content: <Education />,
			contentId: 'education-content',
			contentClass: `education-row content-row ${contentRowClass}`,
			contentName: 'Education',
			visibilityThreshold: inViewThresholds['Education']
		}
	];

	const animatedCursor = !isMobile && (
		<AnimatedCursor innerSize={8} outerSize={35} innerScale={1} outerScale={2} outerAlpha={0} hasBlendMode={true} trailingSpeed={5} innerStyle={{backgroundColor: 'var(--cursor-color)'}} outerStyle={{border: '3px solid var(--cursor-color)'}} clickables={['a', 'button', '.top-nav-link-text', '.logo-text-clickable', '.accordion .title']}  />
	);

	const topNavMenuItems = [
        { name: 'Home', id: 'intro-content' },
        { name: 'About', id: 'skills-content' }, 
        { name: 'Experience', id: 'experience-content' },
        { name: 'Education', id: 'education-content' },
        { name: 'Contact', id: 'contact-content' }
    ];

	const topNavProps = {
		isInverted: isInverted,
		visibleContent: visibleContent,
		scrollToContent: scrollToContent,
		menuItems: topNavMenuItems
	}

	const introContainer = (
		<Grid>
			<Grid.Row className={`intro-main-container ${isMobile ? 'intro-main-container-mobile' : ''}`} centered>
				<InView threshold={inViewThresholds['Intro']} onChange={(inView) => inView && handleUpdateVisibleContent('Home')}>
					<Intro scrollToContent={scrollToContent} scrollToTop={scrollToTop} />
				</InView>
			</Grid.Row>
		</Grid>
	);

	const landingContainer = (
		<div className='landing-container'>
			<div className={`particles-container ${isInverted ? 'particles-hidden' : 'particles-visible'}`}>
				{isMobile ? particlesLandingMobile : particlesLanding}
			</div>
			<div className={`particles-container ${isInverted ? 'particles-visible' : 'particles-hidden'}`}>
				{isMobile ? particlesLandingMobileInverted : particlesLandingInverted}
			</div>
			<TopNavLanding {...topNavProps} />
			<TopNavFixed {...topNavProps} />
			{introContainer}
		</div>
	);

	const bottomNav = (
		<InView threshold={inViewThresholds['Education']} onChange={(inView) => {if (inView) {handleUpdateVisibleContent('Contact');}}}>
			<BottomNav scrollToTop={scrollToTop} isInverted={isInverted} />
		</InView>
	);

	const particlesContainers = (
		<>
			<div className={`particles-container ${isInverted ? 'particles-hidden' : 'particles-visible'}`}>
				{particlesContent}
			</div>
			<div className={`particles-container ${isInverted ? 'particles-visible' : 'particles-hidden'}`}>
				{particlesContentInverted}
			</div>
		</>
	);

	const renderContentContainers = (contentContainers) => {
		return contentContainers.map(({content, contentId, contentClass, contentName, visibilityThreshold}, i) => (
			<Grid.Row key={i} id={contentId} className={`${contentClass === 'intro-main-container' ? contentClass : `sub-row ${contentClass}`}${isInverted ? '-inverted' : ''}`} centered>
				<InView key={i} threshold={visibilityThreshold} onChange={(inView) => inView && handleUpdateVisibleContent(contentName)}>
					{content}
				</InView>
			</Grid.Row>
		));
	};
  
	return (
		<div id='app' className={isMobile ? 'show-sustem-cursor' : ''}>
			{animatedCursor}
			{landingContainer}
			<Grid className='content-rows-container'>
				{particlesContainers}
				{renderContentContainers(contentContainers)}
			</Grid>
			{bottomNav}
		</div>
	);
};
  
const mapStateToProps = ({IsInvertedReducer: {isInverted}, IsMobileReducer: {isMobile}, VisibleContentReducer: {visibleContent}}) => ({
	isInverted,
	isMobile,
    visibleContent
});
  
const mapDispatchToProps = (dispatch) => {
	return {
		handleUpdateIsMobile: () => {
			dispatch({ type: 'UPDATE_ISMOBILE' })
		},
		handleUpdateVisibleContent: (content) => {
			dispatch({ type: 'UPDATE_VISIBLECONTENT', content: content })
		}
	};
};

MainContainer.propTypes = {
	visibleContent: PropTypes.string.isRequired,
	isInverted: PropTypes.bool.isRequired,
	isMobile: PropTypes.bool.isRequired,
	handleUpdateVisibleContent: PropTypes.func.isRequired,
	handleUpdateIsMobile: PropTypes.func.isRequired,
	particlesLanding: PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.element.isRequired]),
	particlesLandingInverted: PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.element.isRequired]),
	particlesContent: PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.element.isRequired]),
	particlesContentInverted: PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.element.isRequired]),
	particlesLandingMobile: PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.element.isRequired]),
	particlesLandingMobileInverted: PropTypes.oneOfType([PropTypes.bool.isRequired, PropTypes.element.isRequired])
};
  
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);