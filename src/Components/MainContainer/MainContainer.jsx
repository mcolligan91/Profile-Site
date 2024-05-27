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

import './MainContainer.scss';

const MainContainer = (props) => {
	const {visibleContent, isInverted, isMobile, handleUpdateVisibleContent, handleUpdateIsInverted, particlesLanding, particlesLandingInverted, particlesContent, particlesContentInverted} = props;

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

	const inViewThresholds = {
		'Intro': .5,
		'About': .5,
		'Experience': .5,
		'Education': .8,
		'Contact': .7
	};
  
	const contentContainers = [
		{
			content: <Skills />,
			contentId: 'skills-content',
			contentClass: `skills-row content-row ${isInverted ? 'content-row-inverted' : ''} ${isMobile ? 'content-row-mobile' : ''}`,
			contentName: 'About',
			visibilityThreshold: inViewThresholds['About']
		},
		{
			content: <Experience />,
			contentId: 'experience-content',
			contentClass: `experience-row content-row ${isInverted ? 'content-row-inverted' : ''} ${isMobile ? 'content-row-mobile' : ''}`,
			contentName: 'Experience',
			visibilityThreshold: inViewThresholds['Experience']
		},
		{
			content: <Education />,
			contentId: 'education-content',
			contentClass: `education-row content-row ${isInverted ? 'content-row-inverted' : ''} ${isMobile ? 'content-row-mobile' : ''}`,
			contentName: 'Education',
			visibilityThreshold: inViewThresholds['Education']
		}
	];

	const animatedCursor = !isMobile && (
		<AnimatedCursor innerSize={8} outerSize={35} innerScale={1} outerScale={2} outerAlpha={0} hasBlendMode={true} innerStyle={{backgroundColor: 'var(--cursor-color)'}} outerStyle={{border: '3px solid var(--cursor-color)'}} clickables={['a', 'button', '.top-nav-link-text', '.logo-text-clickable', '.accordion .title']}  />
	);

	const topNavProps = {
		isInverted: isInverted,
		allowTopNavFade: allowTopNavFade,
		visibleContent: visibleContent,
		handleUpdateIsInverted: handleUpdateIsInverted,
		scrollToContent: scrollToContent
	}

	const introContainer = (
		<Grid>
			<Grid.Row className={`intro-main-container ${isMobile ? 'intro-main-container-mobile' : ''}`} centered>
				<InView threshold={inViewThresholds['Intro']} onChange={(inView) => inView && handleUpdateVisibleContent('Home')}>
					<Intro scrollToContent={scrollToContent} scrollToTop={scrollToTop} handleUpdateIsInverted={handleUpdateIsInverted} />
				</InView>
			</Grid.Row>
		</Grid>
	);

	const bottomNav = (
		<InView threshold={inViewThresholds['Education']} onChange={(inView) => {
			if (inView) {
			  console.log(`${'Contact'} is now visible`);
			  handleUpdateVisibleContent('Contact');
			} else {
			  console.log(`${'Contact'} is no longer visible`);
			}
		  }}>
			<BottomNav scrollToTop={scrollToTop} isInverted={isInverted} />
		</InView>
	);
  
	return (
		<div id='app' className={isMobile ? 'show-sustem-cursor' : ''}>
			{animatedCursor}
			<div className='landing-container'>
				{!isInverted ? particlesLanding : particlesLandingInverted}
				<TopNav {...topNavProps} />
				{introContainer}
			</div>
			<Grid className='content-rows-container'>
				{!isInverted ? particlesContent : particlesContentInverted}
				{contentContainers.map((container, i) => {
					const {content, contentId, contentClass, contentName, visibilityThreshold} = container;
					return (
					<Grid.Row key={i} id={contentId} className={`${contentClass === 'intro-main-container' ? contentClass : `sub-row ${contentClass}`}${isInverted ? '-inverted' : ''}`} centered>
						<InView key={i} threshold={visibilityThreshold}   onChange={(inView) => {
    if (inView) {
      console.log(`${contentName} is now visible`);
      handleUpdateVisibleContent(contentName);
    } else {
      console.log(`${contentName} is no longer visible`);
    }
  }}>
							{content}
						</InView>
					</Grid.Row>
					);
				})}
			</Grid>
			{bottomNav}
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
	};
}

  
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);