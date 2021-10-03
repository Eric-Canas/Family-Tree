import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AboutOffspring from './aboutOffspring';

class Curiosities extends Component {

    render() {
        return (<article className="chart-collection" style={{zIndex : 2}}>
                    <div className="statistics-header">
                        <h2> Curiosities </h2>
                    </div>
                    <Container>
                        <AboutOffspring graph = {this.props.graph}/>
                    </Container>
                </article>
                )
    };
}
export default Curiosities;