import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import Timeline from 'react-timeline-semantic-ui';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';

import './Experience.scss';

import JobAccordion from '../Shared/JobAccordion/JobAccordion';
import SectionHeader from '../Shared/SectionHeader/SectionHeader';

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

	return (		
		<Container textAlign='center'>
			<SectionHeader content='Experience' />
			<Container className='experience-container'>
				<JobAccordion />
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