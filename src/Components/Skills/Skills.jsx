import React from 'react';
import { Container, Grid, Header, Label } from 'semantic-ui-react';
import { Flip } from 'react-reveal';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3Alt, faJs, faReact, faPython, faMicrosoft } from '@fortawesome/free-brands-svg-icons';

import './Skills.scss';

const Skills = (props) => {
	const {isInverted, isMobile} = props;

    const createSkillsIconList = () => {		
		let cols = [
			{icon: 'html5-plain', text: 'HTML5'},
			{icon: 'css3-plain', text: 'CSS3'},
			{icon: 'javascript-plain', text: 'JavaScript'},
			{icon: 'react-original', text: 'React'},		
			{icon: 'python-plain', text: 'Python'},
			{icon: 'microsoftsqlserver-plain', text: 'MS SQL Server'}
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

	// const skillsIconsSegmentContent = (
	// 	<Segment className={isMobile ? 'skills-segment-mobile' : `skills-segment${isInverted ? '-inverted' : ''}`} padded='very'>
	// 		<Grid className='skills-icons-grid'>
	// 			{skillsColumns.map((col, i) => {
	// 				const {group, icon, text} = col;
	// 				return (
	// 					<Grid.Column key={i} className={`skills-icon-${group}`} >
	// 						<Flip top duration={!isMobile ? 1750 : 500} spy={isInverted} appear>
	// 							<Grid.Row>
	// 								<i className={`devicon-${icon} skills-icon`}></i>
	// 							</Grid.Row>
	// 							<Grid.Row className='icon-label-row'>
	// 								<span>{text}</span>
	// 							</Grid.Row>
	// 						</Flip>
	// 					</Grid.Column>
	// 				)
	// 			})}
	// 		</Grid>
	// 	</Segment>
	// );

	// let skillsGridColumns = [
	// 	// {colClass: null, content: skillsSubHeader},
	// 	{colClass: 'skills-icons-container', content: skillsIconsSegmentContent}
	// ];

	return (
		<Container textAlign='center'>
			<Header as='h1' className={`section-header${isInverted ? '-inverted' : ''}`}>About</Header>
			<Grid className='skills-container' verticalAlign='middle' textAlign='center'>
				<Grid.Row>
					<Grid.Column computer={10} tablet={12} mobile={14} className={`bio-text ${isInverted ? 'bio-text-inverted' : ''}`}>
						<p>Hi, I'm <span className='bio-text-highlight'>Michael</span>. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					{/* <Label size='big'>
						<FontAwesomeIcon icon={faHtml5} />
						HTML5
					</Label> */}
					<div className='about-section-icons-container'>
						<div style={{ margin: '15px' }}>
							<div className='icon-label-row'>
								<i className='devicon-html5-plain skills-icon'></i>
							</div>
							<div className='icon-label-row'>
								HTML
							</div>
						</div>

						
						<div style={{ margin: '15px' }}>
							<div className='icon-label-row'>
								<i className='devicon-html5-plain skills-icon'></i>
							</div>
							<div className='icon-label-row'>
								HTML
							</div>
						</div>
						<div style={{ margin: '15px' }}>
							<div className='icon-label-row'>
								<i className='devicon-html5-plain skills-icon'></i>
							</div>
							<div className='icon-label-row'>
								HTML
							</div>
						</div>
						<div style={{ margin: '15px' }}>
							<div className='icon-label-row'>
								<i className='devicon-html5-plain skills-icon'></i>
							</div>
							<div className='icon-label-row'>
								HTML
							</div>
						</div>
						<div style={{ margin: '15px' }}>
							<div className='icon-label-row'>
								<i className='devicon-html5-plain skills-icon'></i>
							</div>
							<div className='icon-label-row'>
								HTML
							</div>
						</div>
						<div style={{ margin: '15px' }}>
							<div className='icon-label-row'>
								<i className='devicon-html5-plain skills-icon'></i>
							</div>
							<div className='icon-label-row'>
								HTML
							</div>
						</div>
						

						

					

					</div>
					
				</Grid.Row>

				{/* {skillsGridColumns.map((col, i) => {
					const {colClass, content} = col;
					return (
						<Grid.Column key={i} className={colClass} width={16}>
							{content}
						</Grid.Column>
					)
				})} */}
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