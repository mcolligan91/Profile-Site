import React from 'react';
import { Container } from 'semantic-ui-react';
import Timeline from 'react-timeline-semantic-ui';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';

import './Experience.scss';

import JobAccordion from '../Shared/JobAccordion/JobAccordion';
import SectionHeader from '../Shared/SectionHeader/SectionHeader';

const Experience = ({isMobile, isInverted}) => {
	const jobInfo = [
		{
			jobHeader: 'D+R International',
			companyLink: 'https://drintl.com/',
			positions: [
				{
					positionTitle: 'Software Engineer',
					positionDates: 'March 2018 - February 2024',
					positionBullets: [
						'Developed Python scripts for automating internal data analysis processes and report generation, resulting in a 95% improvement in efficiency for analysts and project managers and heightened data quality and reliability.',
						'Achieved a 97% efficiency improvement as the lead developer on a Python data pipeline project. Implemented comprehensive SQL queries to conduct data validation checks at different pipeline stages, enhancing QA/QC for the processing of over 1 million new records.',
						'Contributed to the end-to-end development of two websites as a front-end developer using React, Semantic-UI-React, jQuery, and Bootstrap to ensure the implementation of dynamic and user-friendly interfaces for users from 150+ organizations.'
					]
				},
				{
					positionTitle: 'Senior Technical Analyst',
					positionDates: 'January 2017 - March 2018',
					positionBullets: [
						'Led weekly discussions with a group of 12 analysts as a review team leader, offering guidance and making decisions on nuanced situations encountered during the analysis process.',
						'Developed and implemented VBA scripts to streamline various data collection processes, contributing to the content of monthly reports for the client.',
						'Supervised two direct reports, conducted weekly meetings to offer guidance and optimize workload balance, and provided performance review information to HR.'
					]
				},
				{
					positionTitle: 'Technical Analyst',
					positionDates: 'August 2015 - January 2017',
					positionBullets: [
						'Reviewed and validated LED lighting performance test data to ensure accuracy and compliance with client qualification standards, contributing to the successful qualification of 17,500 products.',
						'Collaborated with cross-functional team members to enhance internal Excel data analysis tools, leveraging advanced formula writing techniques to improve accuracy and efficiency for a team of 35 analysts.',
						'Acted as team lead for logo compliance and brand integrity, collaborating with the client and their law firm to establish and enforce usage guidelines, and communicated reporting decisions to the analyst team.'
					]
				}
			]
		}
	];

	const renderJobAccordions = (jobInfo) => { 
		return jobInfo.map((job, i) => (
			<Fade key={i} bottom duration={1250} distance='50px'>
				<JobAccordion job={job} accordionIdx={i} />
			</Fade>
		))
	};

	return (		
		<Container className='content-row-container' textAlign='center'>
			<SectionHeader content='Experience' />
			<Container className='experience-container'>
				{renderJobAccordions(jobInfo)}
			</Container>
		</Container>
	);
}

const mapStateToProps = (state) => {
    return {
		isMobile: state.IsMobileReducer.isMobile,
        isInverted: state.IsInvertedReducer.isInverted
    };
}

export default connect(mapStateToProps)(Experience);