import React from 'react';
import { Container, Grid, Header, Segment } from 'semantic-ui-react';
import { Flip } from 'react-reveal';
import { connect } from 'react-redux';

import './Skills.scss';

const Skills = (props) => {
	const {isInverted, isMobile} = props;

    const createSkillsIconList = () => {		
		let cols = [
			// {icon: 'javascript-plain', text: 'JavaScript'},
			// {icon: 'html5-plain', text: 'HTML5'},
			// {icon: 'css3-plain', text: 'CSS3'},
			{icon: 'sass-original', text: 'Sass'},	
			// {icon: 'react-original', text: 'React'},		
			{icon: 'jquery-plain', text: 'jQuery'},
		
			// {icon: 'python-plain', text: 'Python'},
			{icon: 'flask-original', text: 'Flask'},
			{icon: 'csharp-plain', text: 'C#'},
			{icon: 'dot-net-plain', text: '.NET'},
			// {icon: 'microsoftsqlserver-plain', text: 'MS SQL Server'},

			//maybe:
			{icon: 'sass-original', text: 'Sass'},	
			{icon: 'jquery-plain', text: 'jQuery'},
			{icon: 'flask-original', text: 'Flask'},
			{icon: 'csharp-plain', text: 'C#'},
			{icon: 'dot-net-plain', text: '.NET'},
			{icon: 'git-plain', text: 'Git'},

		
			{icon: 'nodejs-plain', text: 'Node.js'},
			{icon: 'selenium-original', text: 'Selenium'},
			{icon: 'pytest-plain', text: 'Pytest'},
			{icon: 'visualstudio-plain', text: 'Visual Studio'},
			{icon: 'jira-plain', text: 'Jira'},
			{icon: 'git-plain', text: 'Git'},
			{icon: 'bitbucket-original', text: 'Bitbucket'},
			{icon: 'github-original', text: 'GitHub'},
			{icon: 'sourcetree-original', text: 'Sourcetree'},
			{icon: 'xd-plain', text: 'XD'},
			{icon: 'photoshop-plain', text: 'Photoshop'}
		];

		let group = 0;
		for (let i = 0; i < cols.length; i++) {
			cols[i]['group'] = group;
			group++;
			group = group === 3 ? 0 : group;
		}
		return cols;
	}

	const skillsSubHeader = (
		<Header as='h2' className='technical-skills-subheader' content='Languages, Frameworks & Libraries, Other Software Proficiencies' />
	);

	let skillsColumns = createSkillsIconList();

	const skillsIconsSegmentContent = (
		<Segment className={isMobile ? 'skills-segment-mobile' : `skills-segment${isInverted ? '-inverted' : ''}`} padded='very'>
			<Grid className='skills-icons-grid'>
				{skillsColumns.map((col, i) => {
					const {group, icon, text} = col;
					return (
						<Grid.Column key={i} className={`skills-icon-${group}`} computer={2} tablet={2} mobile={4}>
							<Flip top duration={!isMobile ? 1750 : 500} spy={isInverted} appear>
								<Grid.Row>
									<i className={`devicon-${icon} skills-icon`}></i>
								</Grid.Row>
								<Grid.Row className='icon-label-row'>
									<span>{text}</span>
								</Grid.Row>
							</Flip>
						</Grid.Column>
					)
				})}
			</Grid>
		</Segment>
	);

	let skillsGridColumns = [
		{colClass: null, content: skillsSubHeader},
		{colClass: 'skills-icons-container', content: skillsIconsSegmentContent}
	];

	return (
		<Container textAlign='center'>
			<Header as='h1' className='technical-skills-header'>Technical Skills</Header>
			<Grid className='skills-container' verticalAlign='middle' textAlign='center'>
				{skillsGridColumns.map((col, i) => {
					const {colClass, content} = col;
					return (
						<Grid.Column key={i} className={colClass} width={16}>
							{content}
						</Grid.Column>
					)
				})}
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