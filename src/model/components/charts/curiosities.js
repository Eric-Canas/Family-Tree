import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AverageAgeToHaveChildren from './averageAgeToHaveChildren';

class Curiosities extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<article className="chart-collection" style={{zIndex : 2}}>
                    <div className="statistics-header">
                        <h2> Curiosities </h2>
                    </div>
                    <Container>
                        <AverageAgeToHaveChildren graph = {this.props.graph}/>
                    </Container>
                </article>
                )
    };
}
export default Curiosities;