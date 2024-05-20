import React from 'react';
import { Grid, Icon, List, Header, Container, Button } from 'semantic-ui-react';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';

// import TeslaLogo from './tesla-logo.svg';

import './BottomNav.scss';

const BottomNav = (props) => {
	const {isInverted, isMobile, scrollToTop, isSnapSet} = props;

	const contactIcons = [
		{link: 'https://github.com/mcolligan91', icon: 'devicon-github-original'},
		{link: 'https://www.linkedin.com/in/michael-colligan-189aa196', icon: 'devicon-linkedin-plain'},
	];

	const contactIconList = (
		<>
			<List className='contact-icons-list-container' horizontal size='large'>
				{contactIcons.map((item, i) => {
					const {link, icon} = item;
					return (
						<List.Item key={i} as='a' href={link} target='_blank'>
							<List.Content className='contact-link-content'>
								<i className={`${icon} contact-link`}></i>
							</List.Content>
						</List.Item>
					)
				})}
			</List>
		</>
	);

	const emailLink = (
		<>
			<a href='mailto:mcolligan91@gmail.com'>
				<span className='email-link'>mcolligan91@gmail.com</span>
			</a>
		</>
	);

	let contactLinkRows = [
		{rowClass: 'email-row', content: emailLink},
		{rowClass: 'contact-icons-row', content: contactIconList}
	];

	const contactLinksContent = (
		<Container>
			<Header className='footer-header' as='h3' content='Contact' />
			<Grid textAlign='center'>
				{contactLinkRows.map((row, i) => {
					const {rowClass, content} = row;
					return (
						<Grid.Row key={i} className={rowClass}>
							{content}
						</Grid.Row>
					)
				})}
			</Grid>
		</Container>
	);

	const scrollToTopButton = (
		<Fade bottom distance={isMobile ? '10%' : '100%'} spy={isInverted} appear>
			<Button circular icon size='huge' color={isInverted ? 'blue' : 'black'} onClick={scrollToTop}>
				<Icon name='arrow up' />
			</Button>
		</Fade>
	);

	let footerGridColumns = [
		{
			content: contactLinksContent, 
			columnClass: null
		},
		{
			content: <div>© 2024 - Michael Colligan</div>, 
			columnClass: 'copyright-text'
		},
		{
			content: scrollToTopButton, 
			columnClass: 'scroll-up-botton-container'
		}
	];

	return (
		<>
			<Grid id='contact-content' className={`bottom-nav-container ${isInverted ? 'bottom-nav-container-inverted' : ''} ${isSnapSet ? 'content-container' : ''}`} textAlign='center' stackable>
			<Grid.Row>
				</Grid.Row>
				{footerGridColumns.map((col, i) => {
					const {content, columnClass} = col;
					return (
						<Grid.Column key={i} className={columnClass} width={16}>
							{content}
						</Grid.Column>
					)
				})}

			</Grid>
		</>
	);
}

const mapStateToProps = (state) => {
    return {
        isInverted: state.IsInvertedReducer.isInverted,
		isMobile: state.IsMobileReducer.isMobile
    }
}

export default connect(mapStateToProps)(BottomNav);