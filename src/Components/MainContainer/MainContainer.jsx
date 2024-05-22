import React, { useEffect, useState } from 'react';
import { Grid, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import { InView } from 'react-intersection-observer';
import AnimatedCursor from 'react-animated-cursor';

import Intro from '../Intro/Intro';
import Skills from '../Skills/Skills';
import Experience from '../Experience/Experience';
import Education from '../Education/Education';
import BottomNav from '../BottomNav/BottomNav';
import TopNav from '../TopNav/TopNav';
import SiteLogo from '../Shared/SiteLogo/SiteLogo';

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
  
	const {isInverted, isMobile, handleUpdateVisibleContent, handleUpdateIsInverted, particlesLanding, particlesLandingInverted, particlesContent, particlesContentInverted} = props;
  
	const contentContainers = [
		{
			content: <Skills />,
			contentId: 'skills-content',
			contentClass: 'skills-row content-row',
			contentName: 'About',
			visibilityThreshold: .25
		},
		{
			content: <Experience />,
			contentId: 'experience-content',
			contentClass: 'experience-row content-row',
			contentName: 'Experience',
			visibilityThreshold: .25
		},
		{
			content: <Education />,
			contentId: 'education-content',
			contentClass: 'education-row content-row',
			contentName: 'Education',
			visibilityThreshold: .25
		}
	];

	const topNavBar = (
		<Grid as={Grid} className='header-row' columns={2}>
			<Grid.Column className='logo-container' textAlign='left' verticalAlign='middle' computer={4} tablet={3}>
				<Fade>
					<SiteLogo classes={'logo-text-animated logo-text-clickable'} />
				</Fade>
			</Grid.Column>
			<Grid.Column className='nav-container' textAlign='right' computer={12} tablet={13}>
				<TopNav scrollToTop={scrollToTop} scrollToContent={scrollToContent} handleUpdateIsInverted={handleUpdateIsInverted} allowTopNavFade={allowTopNavFade} />
			</Grid.Column>
		</Grid>
	);
  
	return (
	  <div id='app'>
		<AnimatedCursor innerSize={8} outerSize={35} innerScale={1} outerScale={2} outerAlpha={0} hasBlendMode={true} innerStyle={{backgroundColor: 'var(--cursor-color)'}} outerStyle={{border: '3px solid var(--cursor-color)'}} clickables={['a', 'button', '.top-nav-link-text', '.logo-text-clickable', '.accordion .title']} />
		<div className='landing-container'>
			{!isInverted ? particlesLanding : particlesLandingInverted}
			{topNavBar}
			<Grid>
				<Grid.Row className='intro-main-container' centered>
					<InView threshold={.75} onChange={(inView) => inView && handleUpdateVisibleContent('Home')}>
						<Intro scrollToContent={scrollToContent} scrollToTop={scrollToTop} handleUpdateIsInverted={handleUpdateIsInverted} />
					</InView>
				
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
					<InView threshold={visibilityThreshold} onChange={(inView) => inView && handleUpdateVisibleContent(contentName)}>
						{content}
					</InView>
				</Grid.Row>
				);
			})}
		</Grid>
		<InView threshold={.25} onChange={(inView) => inView && handleUpdateVisibleContent('Contact')}>
			<BottomNav scrollToTop={scrollToTop} isInverted={isInverted}  />
		</InView>
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
			dispatch({ type: 'UPDATE_ISINVERTED' })
		},
		resize: () => {
			dispatch({ type: 'UPDATE_ISMOBILE' })
		},
		handleUpdateVisibleContent: (content) => {
			dispatch({ type: 'UPDATE_VISIBLECONTENT', content: content })
		}
	}
}

  
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);