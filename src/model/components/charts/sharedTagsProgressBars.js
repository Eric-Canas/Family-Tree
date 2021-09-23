import React, { Component } from 'react';
import { Row, Col, Progress, UncontrolledTooltip } from 'reactstrap';
import { stringToID } from '../../auxiliars'
import {GENDER_COLORS} from './constants'
import {GENDERS} from '../../constants'

//TODO: Start to subtract information depending on the name of siblings
class SharedTagsProgressBars extends Component {
    constructor(props) {
        super(props);
    }

    genderFrequenciesFromNodes(nodes) {
        let genderFrequency = {};
        for (const node of nodes) {
            genderFrequency[node.gender] = node.gender in genderFrequency ? genderFrequency[node.gender] + 1 : 1;
        }
        return genderFrequency;
    }

    getSharedDiseasesWith(originID = 0) {
        const originDiseases = this.props.graph.nodes[originID].properties[this.props.property];
        const ancestors = this.props.graph.getSharingBloodlineProperties(null, originID);
        let diseasesOccurrences = {};
        const unitFrequency = 1 / ancestors.length;
        const genderFrequencies = this.genderFrequenciesFromNodes(ancestors);
        for (const disease of originDiseases) {
            diseasesOccurrences[disease] = { frequency: { total: 0, byGender: {} }, ancestors: [], ancestorsByGender: {} }
            for (const node of ancestors) {
                if (node[this.props.property].includes(disease)) {
                    diseasesOccurrences[disease].frequency.total += unitFrequency;
                    diseasesOccurrences[disease].ancestors.push(node.name + ' ' + node.surnames.join(' '));
                    if (node.gender in diseasesOccurrences[disease].ancestorsByGender) 
                        diseasesOccurrences[disease].ancestorsByGender[node.gender].push(node.name + ' ' + node.surnames.join(' '));
                    else 
                        diseasesOccurrences[disease].ancestorsByGender[node.gender] = [node.name + ' ' + node.surnames.join(' ')];

                    diseasesOccurrences[disease].frequency.byGender[node.gender] = node.gender in diseasesOccurrences[disease].frequency.byGender ?
                        diseasesOccurrences[disease].frequency.byGender[node.gender] + 1 / genderFrequencies[node.gender] :
                        1 / genderFrequencies[node.gender];
                }
            }

        }

        const emergent = Object.entries(diseasesOccurrences).filter(([name, value]) => value.frequency.total === 0).map(([name, value]) => name);
        const heritage = Object.entries(diseasesOccurrences).filter(([name, value]) => value.frequency.total > 0).map(([name, value]) => name);

        return [diseasesOccurrences, emergent, heritage, ancestors.length, genderFrequencies];
    }


    render() {

        const [diseasesOccurrences, emergent, heritage, ancestorsLength, genderFrequencies] = this.getSharedDiseasesWith(0);
        return (<React.Fragment>
            {heritage.map(disease => <ProgressBar disease={disease} diseaseInfo={diseasesOccurrences[disease]}
                                                    ancestorsLength={ancestorsLength} genderFrequencies={genderFrequencies} />)}

            {emergent.length > 0 ? <h4 className="statistics-subtitle no-detected-ancestors">No ancestors with: {emergent.join(', ')}</h4> : null}
        </React.Fragment>)
    };
}
export default SharedTagsProgressBars;

class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = { tooltipIsOpen: false };
        this.toggleTooltip = () => this.setState({ tooltipIsOpen: !this.state.tooltipIsOpen })
    }

    render() {
        const frequency = this.props.diseaseInfo.frequency.total;

        return (<Row key={stringToID(this.props.disease) + '-row'}>
            <Col md={3} key={stringToID(this.props.disease) + '-col-name'}>
                <h5 className="statistics-subtitle progress-bar-definition" key={stringToID(this.props.disease) + '-name'}>{this.props.disease}</h5>
            </Col>
            <Col md={9} key={stringToID(this.props.disease) + '-col-progress'}>
                <div key={stringToID(this.props.disease) + '-progress-bar-tooltip-div'} id={stringToID(this.props.disease) + '-progress-bar'}>
                    <div className="text-center statistics-subtitle" key={stringToID(this.props.disease) + '-percentage'}>
                        {`${Math.round(frequency * this.props.ancestorsLength)}/${this.props.ancestorsLength} (${Math.round(frequency * 100)}%)`}
                </div>
                <Progress value={frequency * 100} key={stringToID(this.props.disease) + '-progress-bar'} />
                </div>
                <Row>
                <ProgressBarByGender diseaseInfo={this.props.diseaseInfo} disease={this.props.disease} genderFrequencies={this.props.genderFrequencies}/>
            </Row>
                
            </Col>
            <UncontrolledTooltip key={stringToID(this.props.disease) + '-tooltip'} placement="bottom" isOpen={this.state.tooltipIsOpen}
                                 target={stringToID(this.props.disease) + '-progress-bar'} toggle={this.toggleTooltip}>
                {this.props.diseaseInfo.ancestors.map(ancestor => <p key={stringToID(this.props.disease) + '-progress-bar-' + stringToID(ancestor)}>
                                                                                                    {ancestor}
                                                                                                </p>)}
            </UncontrolledTooltip>

        </Row>)
    }

}

class ProgressBarByGender extends Component {
    constructor(props) {
        //TODO: Solve the double tooltip thing
        super(props);
        this.state = { genderTooltip : null};
        this.toggleTooltip = (gender) => this.setState({ genderTooltip: gender !== this.state.genderTooltip? gender : null })
    }

    render() {

        return (<React.Fragment>
                {Object.entries(this.props.diseaseInfo.frequency.byGender).map(([gender, genFreq]) =>
                    <React.Fragment>
                            <Col sm = {2} md = {3} xl = {2} key = {stringToID(this.props.disease) + '-' + stringToID(gender)+'-col'}>
                                <h5 className="statistics-subtitle progress-bar-definition" key={stringToID(this.props.disease) + '-' + stringToID(gender)}>{gender}</h5>
                            </Col>
                            <Col  sm = {Object.keys(this.props.diseaseInfo.frequency.byGender).length > 1? 4 :  10} 
                                  md = {Object.keys(this.props.diseaseInfo.frequency.byGender).length > 1? 3 :  9} 
                                  xl = {Object.keys(this.props.diseaseInfo.frequency.byGender).length > 1? 4 :  10}
                                  id = {stringToID(this.props.disease) + '-' + stringToID(gender) + '-tooltip-div'}
                                  key = {stringToID(this.props.disease) + '-' + stringToID(gender) + '-tooltip-div'}>
                            <div className="text-center statistics-subtitle" key={stringToID(this.props.disease) + '-percentage-'+ stringToID(gender)}>
                                {`${Math.round(genFreq * this.props.genderFrequencies[gender])}/${this.props.genderFrequencies[gender]}`}
                            </div>
                                <Progress value={genFreq * 100} key={stringToID(this.props.disease) + '-progress-' + stringToID(gender)} className = {gender.toLowerCase()} />
                            </Col>
                            <UncontrolledTooltip key={stringToID(this.props.disease) + '-tooltip'} placement="bottom" isOpen={this.state.genderTooltip === gender}
                                 target={stringToID(this.props.disease) + '-' + stringToID(gender) + '-tooltip-div'} toggle={() => this.toggleTooltip(gender)}>
                                        {this.props.diseaseInfo.ancestorsByGender[gender].map(ancestor => <p key={stringToID(this.props.disease) + '-progress-bar-' + stringToID(ancestor)}>
                                                                                                    {ancestor}
                                                                                                    </p>)}
                            </UncontrolledTooltip>
                    </React.Fragment>)}
                    </React.Fragment>)
    }

}