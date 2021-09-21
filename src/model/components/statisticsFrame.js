import React, { Component } from 'react';

//TODO: Start to subtract information depending on the name of siblings
class StatisticsFrame extends Component {
    constructor(props) {
        super(props);
        //It received this.props.graph
    }

    getDiseaseStatistics(geneticallyConnectedTo=0){
        const graph = this.props.graph;
        return graph.getSharingBloodlineProperties(geneticallyConnectedTo, "name")
    }

    render() {
        this.getDiseaseStatistics(0);
        return (
            <div>
            </div>
        )
    };
}
export default StatisticsFrame;