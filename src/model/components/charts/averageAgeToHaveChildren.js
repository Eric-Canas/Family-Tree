import React, { Component } from 'react';
import { std, mean } from 'mathjs'
import { Container, Table, Col, Row } from 'reactstrap';

class AverageAgeToHaveChildren extends Component {
    constructor(props) {
        super(props);
    }

    avgAgeToHaveChildrenByGender() {
        const generations = this.props.graph.getGenerationsInfo();
        const generationsInfo = {};
        for (const [generation, individuals] of Object.entries(generations)) {
            const firstChildYearByGender = {};
            const lastChildYearByGender = {};
            for (const [id, info] of Object.entries(individuals)) {
                const properties = this.props.graph.nodes[id].properties;
                const birthDate = this.props.graph.nodes[id].getBirthDateAsDate();
                if (birthDate !== null && info.children.length > 0) {
                    const gender = properties.gender;
                    const childrenBirthDates = info.children.map(id => this.props.graph.nodes[id].getBirthDateAsDate()).filter(date => date !== null);
                    if (childrenBirthDates.length > 0) {
                        const minChildDate = childrenBirthDates.reduce((a, b) => a < b ? a : b);
                        const maxChildDate = childrenBirthDates.reduce((a, b) => a > b ? a : b);
                        if (!(gender in firstChildYearByGender)) {
                            firstChildYearByGender[gender] = [];
                            lastChildYearByGender[gender] = [];
                        }
                        firstChildYearByGender[gender].push((minChildDate - birthDate) / (1000 * 60 * 60 * 24 * 365));
                        lastChildYearByGender[gender].push((maxChildDate - birthDate) / (1000 * 60 * 60 * 24 * 365));
                    }
                }
            }
            generationsInfo[generation] = {}
            for (const [gender, genderInfo] of Object.entries(firstChildYearByGender)) {
                generationsInfo[generation][gender] = { firstMean: mean(genderInfo), firstStd: std(genderInfo) }
            }
            for (const [gender, genderInfo] of Object.entries(lastChildYearByGender)) {
                generationsInfo[generation][gender]["lastMean"] = mean(genderInfo);
                generationsInfo[generation][gender]["lastStd"] = std(genderInfo);
            }
        }
        return generationsInfo;
    }

    render() {
        const avgGiveBirthAge = this.avgAgeToHaveChildrenByGender();
        return (<article>
            <h4 className="statistics-subtitle"> Average age to have children </h4>
            <Container>
                {Object.entries(avgGiveBirthAge).map(([generation, genders]) => Object.keys(genders).length > 0 ?
                    <Row className="align-items-center">
                        <Col md={2}>
                            <h5 className="statistics-subtitle"> Generation {generation}: </h5>
                        </Col>
                        <Col md={8}>
                                <Table className = "statistics-table" hover={true} dark>
                                    <thead>
                                        <tr>
                                            <th>Gender</th>
                                            <th>First Child</th>
                                            <th>Last Child</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(genders).map(([gender, info]) =>
                                        <tr scope="row">
                                            <td>{gender}s</td>
                                            <td>{info.firstMean.toFixed(1) + (info.firstStd !== 0? ` ± ${info.firstStd.toFixed(1)}` : '')}</td>
                                            <td>{info.lastMean.toFixed(1) + (info.lastStd !== 0? ` ± ${info.firstStd.toFixed(1)}` : '')}</td>
                                        </tr>)}
                                    </tbody>
                                </Table>
                        </Col>
                    </Row>
                    : null)}
            </Container>
        </article>
        )
    };
}
export default AverageAgeToHaveChildren;