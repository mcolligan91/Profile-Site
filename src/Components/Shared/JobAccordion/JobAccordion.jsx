import React, { Component } from 'react';
import { AccordionTitle, AccordionContent, Accordion, Icon, Header, Grid } from 'semantic-ui-react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';

import './JobAccordion.scss';

class JobAccordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
    }

    handleClick = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        this.setState({ activeIndex: activeIndex === index ? -1 : index });
    }

    render() {
        const {activeIndex} = this.state;
        const {isInverted} = this.props;

        return (
            <Grid textAlign='center'>
                <Grid.Row>
                    <Header as='h2' className='job-accordion-header' content='D+R International' />
                </Grid.Row>
                <Grid.Row className='job-accordion-row'>
                    <Accordion styled className={`job-accordion${isInverted ? '-inverted' : ''}`}>
                        <AccordionTitle active={activeIndex === 0} index={0} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            <span className='job-title-text'>Software Engineer</span>
                            &nbsp;
                            <i className='job-dates-text'>March 2018 - February 2024</i>
                        </AccordionTitle>
                        <AccordionContent active={activeIndex === 0}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </AccordionContent>
                    </Accordion>
                </Grid.Row>
            </Grid>
         
            
            
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
		isMobile: state.IsMobileReducer.isMobile,
        isInverted: state.IsInvertedReducer.isInverted
    }
}

export default connect(mapStateToProps)(JobAccordion);