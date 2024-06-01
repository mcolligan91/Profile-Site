import React, { useState, useEffect, useMemo } from 'react';
import { Container, Card } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';

import SectionHeader from '../Shared/SectionHeader/SectionHeader';

import './Education.scss';

const Education = () => {
    const educationData = useMemo(() => [
        {
            school: 'University of Florida',
            date: 'June 2010 - May 2015',
            degree: 'B.S in Sustainability and the Built Environment',
            description: (
                <span>I graduated Summa Cum Laude from the University of Florida with a Bachelor of Science in <a className='school-description-link' href={'https://catalog.ufl.edu/UGRD/colleges-schools/UGDCP/SUB_BSUB_BSUB01/'} target='_blank' rel='noopener noreferrer'>Sustainability and the Built Environment</a>. My thesis was about converting biogas from organic waste into renewable electricity. In addition to my studies, I was an active member of the Chi Phi Fraternity.</span>
            ),
            images: ['UF_Campus_1.jpg', 'UF_Campus_2.jpg', 'UF_Campus_3.jpg', 'UF_Campus_4.jpg', 'UF_Campus_5.jpg', 'UF_Campus_6.jpg', 'UF_Campus_7.jpg', 'UF_Campus_9.jpg']
        }
    ], []);

    const [currentImageIdx, setCurrentImageIdx] = useState(Array(educationData.length).fill(0));

    useEffect(() => {
        const intervals = educationData.map((edu, i) => {
            return setInterval(() => {
                setCurrentImageIdx(prevIndexes => {
                    const newIndexes = [...prevIndexes];
                    newIndexes[i] = (newIndexes[i] + 1) % edu.images.length;
                    return newIndexes;
                });
            }, 5000);
        });

        return () => intervals.forEach(interval => clearInterval(interval));
    }, [educationData]);

    const renderSchoolCards = (educationData, currentImageIdx) => {
        return educationData.map((edu, i) => (
            <Fade bottom duration={1250} distance='50px' key={i}>
                <div className='college-info-container'>
                    <Card className='school-card'>
                        <div className='school-image-container'>
                            {edu.images.map((image, j) => (
                                <img key={j} src={image} alt={`${edu.school}_${j + 1}`} className={`school-image ${j === currentImageIdx[i] ? 'active' : ''}`}
                                />
                            ))}
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
    };

    return (
        <Container className='content-row-container'>
            <SectionHeader content='Education' />
            {renderSchoolCards(educationData, currentImageIdx)}
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
