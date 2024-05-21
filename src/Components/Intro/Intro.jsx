import React from 'react';
import { Container, Header, Button, Icon } from 'semantic-ui-react';
import { Bounce } from 'react-reveal';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';

import './Intro.scss';

const Intro = (props) => {
	const {isInverted, isMobile, scrollToContent, scrollToTop, handleUpdateIsInverted} = props;

	const introHeaders = [
		{ 
			divType: !isMobile ? 'h1' : 'h3', 
			headerClass: 'intro-main-header',
			spanClass: `intro-main-text ${isInverted ? 'inverted-dark-text' : ''}`, 
			text: 'Michael Colligan',
			fadeProps: {left: true, distance: '100px'}
		},
		{ 
			divType: 'h3', 
			headerClass: 'intro-main-header',
			spanClass: `intro-sub-text${isMobile ? '-mobile' : ''} ${isInverted ? 'intro-sub-text-inverted' : ''}`, 
			text: 'Full-Stack Software Engineer',
			fadeProps: {right: true, distance: '100px'}
		}
	];

	return (
		<>
			<Container id='intro-content' className='intro-container' text textAlign='center'>
				{introHeaders.map((header, i) => {
					const {divType, headerClass, spanClass, text, fadeProps} = header;
					return (
						<Fade key={i} {...fadeProps} duration={500}>
							<Header as={divType} className={headerClass}>
								<span className={spanClass}>{text}</span>
							</Header>
						</Fade>
					);
				})}
				<Bounce bottom duration={1400} delay={500}>
					<Button className={`${!isInverted ? 'explore-button' : 'explore-button-inverted'} explore-button-intro`} circular icon size='huge' inverted type='submit' onClick={() => scrollToContent('skills-content')}>
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