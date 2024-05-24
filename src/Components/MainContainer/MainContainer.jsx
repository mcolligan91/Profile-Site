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
import TopNavLanding from '../TopNavLanding/TopNavLanding';
import TopNavFixed from '../TopNavFixed/TopNavFixed';

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
			element.scrollIntoView({ behavior: 'smooth', block: elemId === 'contact-content' ? 'end' : 'start' });
		}
	};
  
	const scrollToTop = () => {
	  	window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	};
  
	const {visibleContent, isInverted, isMobile, handleUpdateVisibleContent, handleUpdateIsInverted, particlesLanding, particlesLandingInverted, particlesContent, particlesContentInverted} = props;
  
	const contentContainers = [
		{
			content: <Skills />,
			contentId: 'skills-content',
			contentClass: `skills-row content-row ${isInverted ? 'content-row-inverted' : ''} ${isMobile ? 'content-row-mobile' : ''}`,
			contentName: 'About',
			visibilityThreshold: .5
		},
		{
			content: <Experience />,
			contentId: 'experience-content',
			contentClass: `experience-row content-row ${isInverted ? 'content-row-inverted' : ''} ${isMobile ? 'content-row-mobile' : ''}`,
			contentName: 'Experience',
			visibilityThreshold: .5
		},
		{
			content: <Education />,
			contentId: 'education-content',
			contentClass: `education-row content-row ${isInverted ? 'content-row-inverted' : ''} ${isMobile ? 'content-row-mobile' : ''}`,
			contentName: 'Education',
			visibilityThreshold: .5
		}
	];

	const animatedCursor = !isMobile && (
		<AnimatedCursor innerSize={8} outerSize={35} innerScale={1} outerScale={2} outerAlpha={0} hasBlendMode={true} innerStyle={{backgroundColor: 'var(--cursor-color)'}} outerStyle={{border: '3px solid var(--cursor-color)'}} clickables={['a', 'button', '.top-nav-link-text', '.logo-text-clickable', '.accordion .title']}  />
	);
  
	return (
	  <div id='app'>
		{animatedCursor}
		<div className='landing-container'>
			{!isInverted ? particlesLanding : particlesLandingInverted}
			<TopNavLanding isInverted={isInverted} allowTopNavFade={allowTopNavFade} visibleContent={visibleContent} handleUpdateIsInverted={handleUpdateIsInverted} scrollToContent={scrollToContent} />
			<TopNavFixed isInverted={isInverted} allowTopNavFade={allowTopNavFade} visibleContent={visibleContent} handleUpdateIsInverted={handleUpdateIsInverted} scrollToContent={scrollToContent} />
			<Grid>
				<Grid.Row className={`intro-main-container ${isMobile ? 'intro-main-container-mobile' : ''}`} centered>
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
		<InView threshold={.9} onChange={(inView) => inView && handleUpdateVisibleContent('Contact')}>
			<BottomNav scrollToTop={scrollToTop} isInverted={isInverted}  />
		</InView>
	  </div>
	);
  }
  
const mapStateToProps = (state) => {
	return {
		isInverted: state.IsInvertedReducer.isInverted,
		isMobile: state.IsMobileReducer.isMobile,
		visibleContent: state.VisibleContentReducer.visibleContent
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