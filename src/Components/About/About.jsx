import React from 'react';
import { Container, Grid, Label } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SectionHeader from '../Shared/SectionHeader/SectionHeader';

import './About.scss';

const About = ({isInverted, isMobile}) => {
	const skillsIconsInfo = [
		{iconClass: 'html5-plain', text: 'HTML5'},
		{iconClass: 'css3-plain', text: 'CSS3'},
		{iconClass: 'javascript-plain', text: 'JavaScript'},
		{iconClass: 'react-original', text: 'React'},	
		{iconClass: 'sass-original', text: 'Sass'},	
		{iconClass: 'jquery-plain', text: 'jQuery'},	
		{iconClass: 'python-plain', text: 'Python'},
		{iconClass: 'flask-original', text: 'Flask'},
		{iconClass: 'microsoftsqlserver-plain', text: 'SQL Server'},
		{iconClass: 'csharp-plain', text: 'C#'},
		{iconClass: 'dot-net-plain', text: '.NET'},
		{iconClass: 'git-plain', text: 'Git'},
		{iconClass: 'selenium-original', text: 'Selenium'},
		{iconClass: 'xd-plain', text: 'XD'},
		{iconClass: 'photoshop-plain', text: 'Photoshop'}
	];

	const bioParagraph = (
		<div className={`bio-text ${isInverted ? 'bio-text-inverted' : ''}`}>
			<p className='bio-text-paragraph'>
				<span className='bio-text-emphasized'>Hello, I'm <span className='bio-text-highlight'>Michael</span>.</span>
			</p>
			<p className='bio-text-paragraph'>
				As a versatile full-stack software engineer, I bring a unique blend of skills to the table, with extensive experience in developing dynamic websites, crafting ETL data pipelines, and writing scripts to automate data analysis processes.
			</p>
			<p className='bio-text-paragraph'>
				My academic background in sustainability and the built environment enriches my perspective, enabling me to approach technical challenges with a holistic, solution-oriented mindset. 
			</p>
			<p className='bio-text-paragraph'>
				Passionate about leveraging technology to drive efficiency and innovation, I am dedicated to creating impactful solutions that bring ideas to life and drive positive change.
			</p>
		</div>	
	);

	const renderSkillsIcons = (skillsIconsInfo) => {
		return skillsIconsInfo.map((info, i) => (
			<Fade key={i} bottom duration={1250} distance='100px'>
				<Label className='skills-icon-container' size={isMobile ? 'tiny' : 'medium'}>
					<i className={`icon skills-icon devicon-${info.iconClass}`} /> 
					{info.text}                                    
				</Label>
			</Fade>
		))
	};

	const skillsContentGrid = (
		<Grid className={`skills-container ${isInverted ? 'skills-container-inverted' : ''} ${isMobile ? 'skills-container-mobile' : ''}`} verticalAlign='middle' textAlign='center'>
			<Grid.Column computer={12} tablet={14} mobile={14}>
				<Fade bottom duration={1000} distance='50px'>
					{bioParagraph}
				</Fade>
				<Fade bottom duration={1000} distance='50px'>
					<div className='skills-icons-container'>
						{renderSkillsIcons(skillsIconsInfo)}
					</div>
				</Fade>
			</Grid.Column>
		</Grid>
	);

	return (
		<Container className='content-row-container' textAlign='center'>
			<SectionHeader content='About' />
			{skillsContentGrid}
		</Container>
	);
};

const mapStateToProps = (state) => {
    return {
        isInverted: state.IsInvertedReducer.isInverted,
		isMobile: state.IsMobileReducer.isMobile
    }
};

About.propTypes = {
	isInverted: PropTypes.bool.isRequired,
	isMobile: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(About);