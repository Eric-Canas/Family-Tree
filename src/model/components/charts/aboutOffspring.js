import React, { Component } from 'react';
import { std, mean } from 'mathjs'
import { Container, Table, Col, Row } from 'reactstrap';

class AboutOffspring extends Component {
    avgAgeToHaveChildrenByGender() {
        const generations = this.props.graph.getGenerationsInfo();
        const generationsInfo = {};
        const generationsInfoYears = {}
        for (const [generation, individuals] of Object.entries(generations)) {
            const firstChildYearByGender = {};
            const lastChildYearByGender = {};
            const averageChildrenByGender = {}
            const birthYears = Object.keys(individuals).map(id => this.props.graph.nodes[id].properties.bornYear).filter(year => year !== null);
            for (const [id, info] of Object.entries(individuals)) {
                const properties = this.props.graph.nodes[id].properties;
                const birthDate = this.props.graph.nodes[id].getBirthDateAsDate();
                if(info.children.length > 0){
                    const gender = properties.gender;
                    if (!(gender in averageChildrenByGender)) averageChildrenByGender[gender] = [];
                        averageChildrenByGender[gender].push(info.children.length);
                    if (birthDate !== null){
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
            }
            generationsInfo[generation] = {};
            generationsInfoYears[generation] = {minYear : Math.min(...birthYears), maxYear : Math.max(...birthYears)};
            for (const [gender, genderInfo] of Object.entries(firstChildYearByGender)) {
                generationsInfo[generation][gender] = { firstMean: mean(genderInfo), firstStd: std(genderInfo) }
            }
            for (const [gender, genderInfo] of Object.entries(lastChildYearByGender)) {
                generationsInfo[generation][gender]["lastMean"] = mean(genderInfo);
                generationsInfo[generation][gender]["lastStd"] = std(genderInfo);
            }
            for (const [gender, genderInfo] of Object.entries(averageChildrenByGender)) {
                if (!(gender in generationsInfo[generation])) 
                    generationsInfo[generation][gender] = { firstMean: null, firstStd: null, lastMean: null, lastStd: null};
                generationsInfo[generation][gender]["childrenMean"] = mean(genderInfo);
                generationsInfo[generation][gender]["childrenStd"] = std(genderInfo);
            }
        }
        return [generationsInfo, generationsInfoYears];
    }

    render() {
        const [gendersInfo, yearsInfo] = this.avgAgeToHaveChildrenByGender();
        return (<article>
            <h4 className="statistics-subtitle"> About Offspring </h4>
            <Container>
                {Object.entries(gendersInfo).map(([generation, genders]) => Object.keys(genders).length > 0 ?
                    <Row className="align-items-center">
                        <Col md={2}>
                            <h5 className="statistics-subtitle text-center"> Generation {generation} {yearsInfo[generation].minYear !== Infinity? <br/> : null}
                                {yearsInfo[generation].minYear !== Infinity? ' (Born around '+yearsInfo[generation].minYear + 
                                            (yearsInfo[generation].maxYear !== yearsInfo[generation].minYear? ' ~ '+yearsInfo[generation].maxYear+')' : ')') : ''} 
                            </h5>
                        </Col>
                        <Col md={10}>
                                <Table className = "statistics-table" hover={true} dark>
                                    <thead>
                                        <tr>
                                            <th>Gender</th>
                                            <th>First Child At</th>
                                            <th>Last Child At</th>
                                            <th>Average Children</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(genders).map(([gender, info]) =>
                                        <tr scope="row">
                                            <td>{gender}s</td>
                                            <td>
                                                {info.firstMean !== null? (info.firstMean.toFixed(1) + (info.firstStd !== 0? ` ± ${info.firstStd.toFixed(1)}` : ''))+' Years Old' : '-'}
                                            </td>
                                            <td>
                                                {info.lastMean !== null? (info.lastMean.toFixed(1) + (info.lastStd !== 0? ` ± ${info.lastStd.toFixed(1)}` : ''))+' Years Old' : '-'}
                                            </td>
                                            <td>{info.childrenMean.toFixed(info.childrenStd !== 0? 1 : 0) + (info.childrenStd !== 0? ` ± ${info.childrenStd.toFixed(1)}` : '')} Children</td>
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
export default AboutOffspring;