import React, { useEffect, useState } from 'react';
import { Grid, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Flip } from 'react-reveal';
import AnimatedCursor from 'react-animated-cursor';

import Intro from '../Intro/Intro';
import Skills from '../Skills/Skills';
import Experience from '../Experience/Experience';
import Education from '../Education/Education';
import BottomNav from '../BottomNav/BottomNav';
import TopNav from '../TopNav/TopNav';

import './MainContainer.scss';

const MainContainer = (props) => {

	const [allowTopNavFade, setAllowTopNavFade] = useState(true);
  
	useEffect(() => {
		setTimeout(() => {
			setAllowTopNavFade(false);
		}, 2000)
	  	const {resize} = props;
	  	window.addEventListener('resize', resize);
	  	resize();
		return () => {
			window.removeEventListener('resize', resize);
		};		
	}, [props]);
  
	const scrollToContent = (elemId) => {
		if (elemId === 'intro-content') {
			scrollToTop();
		} else{
			const element = document.getElementById(elemId);
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};
  
	const scrollToTop = () => {
	  	window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};
  
	const {isInverted, isMobile, handleUpdateIsInverted, particlesLanding, particlesLandingInverted, particlesContent, particlesContentInverted} = props;
  
	const contentContainers = [
		{
			content: <Skills />,
			contentId: 'skills-content',
			contentClass: 'skills-row content-row',
			contentName: 'About'
		},
		{
			content: <Experience />,
			contentId: 'experience-content',
			contentClass: 'experience-row content-row',
			contentName: 'Experience'
		},
		{
			content: <Education />,
			contentId: 'education-content',
			contentClass: 'education-row content-row',
			contentName: 'Education'
		}
	];

	const logoContent = (
		<span className='logo-text' onClick={() => window.location.reload()}>MC</span>
	);

	const topNavBar = (
		<Responsive as={Grid} minWidth={865} className='header-row' columns={2}>
			<Grid.Column className='logo-container' textAlign='left' verticalAlign='middle' computer={4} tablet={3}>
				{logoContent}
			</Grid.Column>
			<Grid.Column className='nav-container' textAlign='right' computer={12} tablet={13}>
				<TopNav scrollToTop={scrollToTop} scrollToContent={scrollToContent} handleUpdateIsInverted={handleUpdateIsInverted} allowTopNavFade={allowTopNavFade} />
			</Grid.Column>
		</Responsive>
	);

	const topNavBarMobile = (
		<Responsive as={Grid} maxWidth={864} className='header-row' columns={2}>
			<Grid.Column className='logo-container' textAlign='left' verticalAlign='middle'>
				{logoContent}
			</Grid.Column>
			<Grid.Column className='nav-container' textAlign='right'>
				<div style={{ height: '75px' }}>

				</div>
				
			</Grid.Column>
		</Responsive>
	);
  
	return (
	  <div id='app'>
		<AnimatedCursor innerSize={8} outerSize={35} innerScale={1} outerScale={2} outerAlpha={0} hasBlendMode={true} innerStyle={{backgroundColor: 'var(--cursor-color)'}} outerStyle={{border: '3px solid var(--cursor-color)'}} clickables={['button', '.top-nav-link-text', '.logo-text', '.accordion .title']} />
		<div className='landing-container'>
			{!isInverted ? particlesLanding : particlesLandingInverted}
			{topNavBar}
			{topNavBarMobile}
			<Grid>
				<Grid.Row className='intro-main-container' centered>
					<Intro scrollToContent={scrollToContent} scrollToTop={scrollToTop} handleUpdateIsInverted={handleUpdateIsInverted} />
				</Grid.Row>
			</Grid>
		</div>
		<Grid className='content-rows-container'>
			{!isInverted ? particlesContent : particlesContentInverted}
			{contentContainers.map((container, i) => {
				const {content, contentId, contentClass, contentName, visibilityThreshold} = container;
				let c = contentClass === 'intro-main-container' ? contentClass : `sub-row ${contentClass}`;
				return (
				<Grid.Row key={i} id={contentId} className={`${c}${isInverted ? '-inverted' : ''}`} centered>
					{content}
				</Grid.Row>
				);
			})}
		</Grid>
		<BottomNav scrollToTop={scrollToTop} />
	  </div>
	);
  }
  
const mapStateToProps = (state) => {
	return {
		isInverted: state.IsInvertedReducer.isInverted,
		isMobile: state.IsMobileReducer.isMobile,
	};
};
  
const mapDispatchToProps = (dispatch) => {
	return {
		handleUpdateIsInverted: () => {
			dispatch({ type: 'UPDATE_ISINVERTED' });
		},
		resize: () => {
			dispatch({ type: 'UPDATE_ISMOBILE' });
		}
	};
};
  
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);