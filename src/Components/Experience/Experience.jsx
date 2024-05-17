import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import Timeline from 'react-timeline-semantic-ui';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';

import './Experience.scss';

const Experience = (props) => {
	const {isMobile, isInverted} = props;

	let timelineCards = [
		{
			containerClass: 'timeline-present', 
			title: 'Software Engineer', 
			time: 'March 2018 - February 2024'
		},
		{
			containerClass: 'timeline-middle', 
			title: 'Senior Technical Analyst', 
			time: 'January 2017 - March 2018'
		},
		{
			containerClass: 'timeline-start', 
			title: 'Technical Analyst', 
			time: 'August 2015 - January 2017'
		}
	];

	const timelineDescription = (
		<>
			<span className='bold-text'>D+R International</span>
			<br></br>
			<span>Silver Spring, MD</span>
		</>
	);

	return (
		<Container textAlign='center'>
			<Header as='h1' className='experience-header'>Experience</Header>
			<Container className={`timeline-container${isMobile ? '-mobile' : ''}`}>
				{timelineCards.map((card, i) => {
					const {containerClass, title, time} = card;
					return (
						<div key={i} className={containerClass}>
							<Fade bottom duration={1250} spy={isInverted} appear>
								<Timeline direction={isMobile ? 'right' : i % 2 === 0 ? 'left' : 'right'} title={title} time={time} description={timelineDescription} tags={[]} lineHeight={1} />
							</Fade>
						</div>
					)
				})}
			</Container>
		</Container>
	);
}

const mapStateToProps = (state) => {
    return {
		isMobile: state.IsMobileReducer.isMobile,
        isInverted: state.IsInvertedReducer.isInverted
    }
}

export default connect(mapStateToProps)(Experience);