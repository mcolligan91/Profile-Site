import React, { useState } from 'react';
import { Container, Grid, Header, Divider, Segment, Card, Icon, Image } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';

import SectionHeader from '../Shared/SectionHeader/SectionHeader';

import './Education.scss';

const Education = (props) => {
    const {isMobile, isInverted} = props;
    const [isImageToggled, setIsImageToggled] = useState(false);

    const handleImageClick = () => {
        if (isMobile) {
            console.log('Image clicked, toggling state');
            setIsImageToggled(!isImageToggled);
        }
    };

    return (
        <Container className='content-row-container'>
            <SectionHeader content='Education' />
            <div className='college-info-container'>
                <Card className='school-card'>
                    <div className={`school-image-container ${isImageToggled ? 'toggled' : ''}`} onClick={handleImageClick}>
                        <img src='./UF.jpg' alt='University of Florida Campus' className='school-image' />
                    </div>
                    <Card.Content>
                        <Card.Header>University of Florida</Card.Header>
                        <Card.Meta>
                            <span className='date'>Summer 2010 - Spring 2015</span>
                        </Card.Meta>
                        <Card.Description>
                            <span>I graduated Summa Cum Laude from the University of Florida in 2015 with a B.S in <a href='https://catalog.ufl.edu/UGRD/colleges-schools/UGDCP/SUB_BSUB_BSUB01/'>Sustainability and the Built Environment</a>.</span>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
		isMobile: state.IsMobileReducer.isMobile,
        isInverted: state.IsInvertedReducer.isInverted
    };
}

export default connect(mapStateToProps)(Education);