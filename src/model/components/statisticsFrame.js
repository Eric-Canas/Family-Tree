import React, { Component } from 'react';
import TagsFrequency from './charts/tagsFrequency';
import {Container} from 'reactstrap'
import LocationInformation from './charts/locationInformation';
import Curiosities from './charts/curiosities';


//TODO: Start to subtract information depending on the name of siblings
class StatisticsFrame extends Component {

    render() {
        return (
            <Container>
                <TagsFrequency graph={this.props.graph} property={"knownDiseases"} chartTitle={"About Diseases"} doughnutTitle={"Common Antecesors Diseases"} propertyToShow = {"Diseases"}/>
                <hr className='statistics-separator'/>
                <TagsFrequency graph={this.props.graph} property={"professions"} chartTitle={"About Professions"} doughnutTitle={"Common Antecesors Professions"} propertyToShow = {"Professions"}/>
                <hr className='statistics-separator'/>
                <LocationInformation graph={this.props.graph}/>
                <hr className='statistics-separator'/>
                <Curiosities graph={this.props.graph}/>
            </Container>
        )
    };
}
export default StatisticsFrame;