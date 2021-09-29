import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { countFrequencies, buildChartData, stringToID } from '../../auxiliars'
import { Chart } from 'chart.js';
import { Row, Col, Container, Input } from 'reactstrap';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SharedTagsProgressBars from './sharedTagsProgressBars';
Chart.register(ChartDataLabels);

//TODO: Start to subtract information depending on the name of siblings
class TagsFrequency extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedNode: 0};
        this.setOption = (option) => this.setState({selectedNode : parseInt(option)}); 
        this.charOptions = {plugins:
                                { legend: {
                                                display: false 
                                            }
                                }
                            }
    }

    getChartData(geneticallyConnectedTo = 0) {
        const allAncestorsTags = this.props.graph.getSharingBloodlineProperties(this.props.property, geneticallyConnectedTo);
        if (allAncestorsTags === null) return null;
        else if (allAncestorsTags.length === 0) return {};
        const frequencies = countFrequencies(allAncestorsTags);
        const chartData = buildChartData(frequencies, this.props.chartTitle || 'Chart title not set');
        return chartData;
    }


    render() {
        const chartData = this.getChartData(this.state.selectedNode);
        const firstOfLevel = chartData === null;
        const isInformation = (!firstOfLevel && Object.keys(chartData).length > 0);
        const name = this.props.graph.nodes[this.state.selectedNode].properties.name
        return (<article className="chart-collection" style={{zIndex : 2}}>
                    <div className="statistics-header">
                        <h2> {this.props.chartTitle || 'Chart title not set'} </h2>
                    </div>

                    <Container>
                    <Row className="align-items-center">
                        <Col md = {isInformation? 6 : 12}>
                        {isInformation? <h4 className = "statistics-subtitle text-center"> {this.props.doughnutTitle || 'Chart title not set'} </h4> : null}
                            {firstOfLevel? <h4 className = "statistics-subtitle text-center">{name} has not known ancestors</h4> : 
                            Object.keys(chartData).length === 0? <h4 className = "statistics-subtitle">{name} antecesors has not known {this.props.propertyToShow.toLowerCase()}</h4> :
                            <Doughnut data={this.getChartData(this.state.selectedNode)} options={this.charOptions} />}
                        </Col>
                        {isInformation?
                        <Col md = {6}>
                        <h4 className = "statistics-subtitle">Heritage</h4>
                            <SharedTagsProgressBars graph={this.props.graph} property = {this.props.property} selectedNode = {this.state.selectedNode} propertyToShow={this.props.propertyToShow}/>
                        </Col> : null}
                    </Row>
                    </Container>
                    <h4 className = "statistic-selector-header"> Statistics for <Input type="select" className="individual-selector" onChange={(event) => this.setOption(event.target.value)}
                                                                                       defaultValue = {this.state.selectedNode}>
                                    {Object.values(this.props.graph.nodes).map(node => <option key={'option-'+stringToID(this.props.property)+'-'+node.id} value={node.id}>
                                                                                            {node.properties.name + ' '+ node.properties.surnames.join(' ')}
                                                                                        </option>)}
                                </Input>
                    </h4>
                </article>
                )
    };
}
export default TagsFrequency;