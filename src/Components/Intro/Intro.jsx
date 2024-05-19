import React, { Component } from 'react';
import { Container, Header, Button, Icon } from 'semantic-ui-react';
import { Bounce } from 'react-reveal';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';

import './Intro.scss';

const Intro = (props) => {
	const {isInverted, isMobile, scrollToContent, scrollToTop, handleUpdateIsInverted} = props;

	let introHeaders = [
		{ 
			divType: !isMobile ? 'h1' : 'h3', 
			headerClass: null,
			spanClass: `intro-main-text ${isInverted ? 'inverted-dark-text' : ''}`, 
			text: 'Michael Colligan' 
		},
		{ 
			divType: 'h3', 
			headerClass: 'sub-header-container',
			spanClass: `intro-sub-text${isMobile ? '-mobile' : ''} ${isInverted ? 'intro-sub-text-inverted' : ''}`, 
			text: 'Full-Stack Software Engineer' 
		}
	];

	return (
		<>
			<Container id='intro-content' className='intro-container' text textAlign='center'>
				{introHeaders.map((header, i) => {
					const {divType, headerClass, spanClass, text} = header;
					return (
						<Header key={i} as={divType} className={headerClass}>
							<span className={spanClass}>{text}</span>
						</Header>
					);
				})}
				<Bounce bottom duration={1400} delay={500}>
					<Button className={!isInverted ? 'explore-button' : 'explore-button-inverted'} circular icon size='huge' inverted type='submit' onClick={() => scrollToContent('skills-content')}>
						<Icon name='arrow down' />
					</Button>
				</Bounce>
			</Container>
		</>
	);
}

const mapStateToProps = (state) => {
    return {
		isInverted: state.IsInvertedReducer.isInverted,
        isMobile: state.IsMobileReducer.isMobile
    }
}

export default connect(mapStateToProps)(Intro);