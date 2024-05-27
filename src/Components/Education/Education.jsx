import React, { useState } from 'react';
import { Container, Card } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';

import SectionHeader from '../Shared/SectionHeader/SectionHeader';

import './Education.scss';

const Education = (props) => {
    const { isMobile, isInverted } = props;

    const ufDescription = (
        <span>I graduated Summa Cum Laude from the University of Florida with a Bachelor of Science in <a className='school-description-link' href={'https://catalog.ufl.edu/UGRD/colleges-schools/UGDCP/SUB_BSUB_BSUB01/'} target='_blank' rel='noopener noreferrer'>Sustainability and the Built Environment</a>. My thesis was about converting biogas from organic waste into renewable electricity. In addition to my studies, I was an active member of the Chi Phi Fraterntiy.</span>
    )

    const educationData = [
        {
            school: 'University of Florida',
            date: 'June 2010 - May 2015',
            degree: 'B.S in Sustainability and the Built Environment',
            description: ufDescription,
            image: './UF.jpg'
        }
    ];

    const [imageToggles, setImageToggles] = useState(Array(educationData.length).fill(false));

    const handleImageClick = (index, event) => {
        event.stopPropagation(); 
        if (isMobile) {
            setImageToggles(prevState => {
                const newToggles = [...prevState];
                newToggles[index] = !newToggles[index];
                return newToggles;
            });
        }
    };

    const handleTouchStart = (index, event) => {
        if (isMobile) {
            setImageToggles(prevState => {
                const newToggles = [...prevState];
                newToggles[index] = !newToggles[index];
                return newToggles;
            });
        }
    };

    const handleOutsideClick = () => {
        setImageToggles(Array(educationData.length).fill(false));
    };
    
    const renderSchoolCards = () => (
        educationData.map((edu, i) => (
            <Fade bottom duration={1250} distance='50px' key={i}>
                    <div className='college-info-container'>
                        <Card className='school-card'>
                            <div className={`school-image-container ${imageToggles[i] ? 'toggled' : ''}`} onClick={(e) => handleImageClick(i, e)} onTouchStart={(e) => handleTouchStart(i, e)}>
                                <img src={edu.image} alt={`${edu.school} Campus`} className='school-image' />
                            </div>
                            <Card.Content>
                                <Card.Header content={edu.school} />
                                <Card.Meta content={edu.date} />
                                <Card.Description content={edu.description} />
                            </Card.Content>
                        </Card>
                    </div>
            </Fade>
        ))
    );

    return (
        <Container className='content-row-container' onClick={handleOutsideClick} onTouchStart={handleOutsideClick}>
            <SectionHeader content='Education' />
            {renderSchoolCards()}
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        isMobile: state.IsMobileReducer.isMobile,
        isInverted: state.IsInvertedReducer.isInverted
    };
};

export default connect(mapStateToProps)(Education);
