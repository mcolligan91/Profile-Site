import React from 'react';
import { Container, Grid, Header, Label } from 'semantic-ui-react';
import { Flip, Fade } from 'react-reveal';
import { connect } from 'react-redux';

import SectionHeader from '../Shared/SectionHeader/SectionHeader';

import './Skills.scss';

const Skills = (props) => {
	const {isInverted, isMobile} = props;

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
		<p className={`bio-text ${isInverted ? 'bio-text-inverted' : ''}`}>
			Hi, I'm <span className='bio-text-highlight'>Michael</span>. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	);

	const renderSkillsIcons = () => (
		skillsIconsInfo.map((info, i) => (
			<Fade key={i} bottom duration={1250} distance='100px'>
				<Label className='skills-icon-container' size='large'>
					<i className={`icon skills-icon devicon-${info.iconClass}`} /> 
					{info.text}                                    
				</Label>
			</Fade>
		))
	);

	return (
		<Container textAlign='center'>
			<SectionHeader content='About' />
			<Grid className={`skills-container ${isInverted ? 'skills-container-inverted' : ''}`} verticalAlign='middle' textAlign='center'>
				<Grid.Row>
					<Grid.Column computer={12} tablet={14} mobile={14}>
						<Fade bottom duration={1000} distance='50px'>
							{bioParagraph}
						</Fade>
						<Fade bottom duration={1000} distance='50px'>
							<div className='skills-icons-container'>
								{renderSkillsIcons()}
							</div>
						</Fade>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
	);
}

const mapStateToProps = (state) => {
    return {
        isInverted: state.IsInvertedReducer.isInverted,
		isMobile: state.IsMobileReducer.isMobile
    }
}

export default connect(mapStateToProps)(Skills);