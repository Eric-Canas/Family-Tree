import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { countFrequencies, buildChartData } from '../../auxiliars'
import { Chart } from 'chart.js';
import { Row, Col, Container } from 'reactstrap';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SharedTagsProgressBars from './sharedTagsProgressBars';
Chart.register(ChartDataLabels);

//TODO: Start to subtract information depending on the name of siblings
class TagsFrequency extends Component {
    constructor(props) {
        super(props);
        this.charOptions = {plugins:
                                { legend: {
                                                display: false 
                                            }
                                }
                            }
    }

    getDiseaseStatistics(geneticallyConnectedTo = 0) {
        const knownDiseases = this.props.graph.getSharingBloodlineProperties(this.props.property, geneticallyConnectedTo);
        const frequencies = countFrequencies(knownDiseases);
        const chartData = buildChartData(frequencies, this.props.chartTitle || 'Chart title not set');
        return chartData;
    }


    render() {
        return (<article className="chart-collection" style={{zIndex : 2}}>
                    <div className="statistics-header">
                        <h2> {this.props.chartTitle || 'Chart title not set'} </h2>
                    </div>
                    <Container>
                    <Row className="align-items-center">
                        <Col md = {6}>
                        <h4 className = "statistics-subtitle"> {this.props.chartTitle || 'Chart title not set'} </h4>
                            <Doughnut data={this.getDiseaseStatistics(0)} options={this.charOptions} />
                        </Col>
                        <Col md = {6}>
                        <h4 className = "statistics-subtitle">Heritage</h4>
                            <SharedTagsProgressBars graph={this.props.graph} property = {this.props.property}/>
                        </Col>
                    </Row>
                    </Container>
                </article>
                )
    };
}
export default TagsFrequency;