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
		{iconClass: 'git-plain', text: 'Git'}
	];

	const createIconRows = (array, chunkSize) => {
		let rows = [];
		for (let i = 0; i < array.length; i += chunkSize) {
			rows.push(array.slice(i, i + chunkSize));
		}
		return rows;
	}

	const skillsIcons = createIconRows(skillsIconsInfo, 6);

	return (
		<Container textAlign='center'>
			<SectionHeader content='About' />
			<Grid className={`skills-container ${isInverted ? 'skills-container-inverted' : ''}`} verticalAlign='middle' textAlign='center'>
				<Grid.Row>
					<Grid.Column computer={12} tablet={14} mobile={14}>
						<Fade bottom duration={1000} distance='50px'>
							<p className={`bio-text ${isInverted ? 'bio-text-inverted' : ''}`}>Hi, I'm <span className='bio-text-highlight'>Michael</span>. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						</Fade>
					</Grid.Column>
				</Grid.Row>
				<Fade bottom duration={1250} distance='50px'>
					{skillsIcons.map((row, rowIndex) => (
						<Grid.Row key={rowIndex}>
							<div className='about-section-icons-container'>
								{row.map((info, i) => {
									const {iconClass, text} = info;
									return (
										<Fade key={i} bottom duration={1000 + (rowIndex * 6 + i) * 100} distance='100px'>
											<div className='skills-icon-container'>
												<div className='icon-label-row-top'>
													<i className={`devicon-${iconClass} skills-icon`}></i>
												</div>
												<div className='icon-label-row icon-label-text'>
													{text}
												</div>
											</div>
										</Fade>
									)
								})}
							</div>
						</Grid.Row>
					))}
				</Fade>
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