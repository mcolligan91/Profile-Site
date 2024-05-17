import React from 'react';
import { Container, Grid, Header, Divider, Segment } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';

import './Education.scss';

const Education = (props) => {
    const {isMobile, isInverted} = props;

    let gridColumns = [
        {
            columnProps: {textAlign: isMobile ? 'center' : 'right'}, 
            revealProps: {left: isMobile ? false: true},
            headerText: [
                {spanClass: 'sub-header-highlighted college-text', content: 'University of Florida'},
                {spanClass: null, content: 'Gainesville, FL'},
                {spanClass: null, content: '2010 - 2015'}
            ]
        },
        {
            columnProps: {textAlign: isMobile ? 'center' : 'left'}, 
            revealProps: {right: isMobile ? false : true},
            headerText: [
                {spanClass: 'sub-header-highlighted', content: 'Bachelor of Science in'},
                {spanClass: 'sub-header-highlighted', content: 'Sustainability and the Built Environment'},
                {spanClass: 'honors-text', content: 'Summa Cum Laude'}
            ]
        }
    ];

    return (
        <Container textAlign='center'>
            <Header as='h1' className='education-header'>Education</Header>
            <Container className={!isMobile ? 'college-info-container' : null}>
                <Segment className='invisible-segment'>
                    <Grid textAlign='center' relaxed='very' verticalAlign='middle'>
                        {gridColumns.map((col, i) => {
                            const {columnProps, revealProps, headerText} = col;
                            return (
                                <Grid.Column key={i} {...columnProps} computer={8} tablet={8} mobile={16}>
                                    <Fade {...revealProps} spy={isInverted} appear>
                                        <Header className='header-label' as='h2'>
                                            {headerText.map((row, j) => {
                                                const {spanClass, content} = row;
                                                return (
                                                    <div key={j}>
                                                        <span className={spanClass}>{content}</span>
                                                        <br></br>
                                                    </div>
                                                )
                                            })}
                                        </Header>
                                    </Fade>
                                </Grid.Column>
                            )
                        })}
                    </Grid>
                    {!isMobile && <Divider vertical />}
                </Segment>
            </Container>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
		isMobile: state.IsMobileReducer.isMobile,
        isInverted: state.IsInvertedReducer.isInverted
    }
}

export default connect(mapStateToProps)(Education);