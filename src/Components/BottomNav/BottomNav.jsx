import React from 'react';
import { Grid, Icon, List, Header, Container, Button } from 'semantic-ui-react';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';

import SiteLogo from '../Shared/SiteLogo/SiteLogo';

import './BottomNav.scss';

const BottomNav = (props) => {
	const {isInverted, isMobile, scrollToTop} = props;

	const contactIcons = [
		{text: 'Gmail', link: 'mailto:mcolligan91@gmail.com', icon: 'mail'},
		{text: 'LinkedIn', link: 'https://www.linkedin.com/in/michael-colligan-189aa196', icon: 'linkedin square'},
		{text: 'GitHub', link: 'https://github.com/mcolligan91', icon: 'github'}
	];

	const scrollToTopButton = (
		<Fade bottom distance={isMobile ? '10%' : '100%'}>
			<Button className={isInverted ? `explore-button` : 'explore-button-inverted'} circular icon size='huge' inverted onClick={scrollToTop}>
				<Icon name='arrow up' />
			</Button>
		</Fade>
	);

	return (
		<>
			<Grid id='contact-content' className={`bottom-nav-container ${isInverted ? 'bottom-nav-container-inverted' : ''}`} textAlign='center' stackable>
				<Grid.Row className='explore-button-footer-row'>
					<Fade bottom distance={isMobile ? '10%' : '100%'}>
						<Button className={isInverted ? `explore-button` : 'explore-button-inverted'} circular icon size='huge' inverted onClick={scrollToTop}>
							<Icon name='arrow up' />
						</Button>
					</Fade>
				</Grid.Row>
				<Grid.Row className='contact-links-container'>
					<Container>
						<SiteLogo classes={'logo-text-static footer-logo'} />
						<Grid textAlign='center'>
							<Grid.Row className='contact-icons-row'>
								<Container>
									<List className='contact-icons-list-container' horizontal relaxed size={isMobile ? 'large' : 'huge'}>
										{contactIcons.map((item, i) => {
											const {text, link, icon} = item;
											return (
												<List.Item key={i} as='a' className='contact-icons-list-item' href={link} target='_blank'>		
														<span>
															<Icon name={icon} className='contact-link-icon' />
														</span>
														<span className={`contact-link-span ${isInverted ? 'contact-link-text-inverted' : 'contact-link-text'}`}>
															{text}
														</span>
												</List.Item>
											);
										})}			
									</List>
								</Container>
							</Grid.Row>
						</Grid>
					</Container>
				</Grid.Row>
				<Grid.Row className={'copyright-text'}>
					<div>© 2024 - Michael Colligan</div>
				</Grid.Row>
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