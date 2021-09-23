import React, { Component } from 'react';
import TagsFrequency from './charts/tagsFrequency';

//TODO: Start to subtract information depending on the name of siblings
class StatisticsFrame extends Component {

    render() {
        return (
            <div>
                <TagsFrequency graph={this.props.graph} property={"knownDiseases"} chartTitle={"Chart Title"}/>
            </div>
        )
    };
}
export default StatisticsFrame;