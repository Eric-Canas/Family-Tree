import React, { Component } from 'react';
import { Row, Col, Progress, UncontrolledTooltip } from 'reactstrap';
import { stringToID } from '../../auxiliars'

class SharedTagsProgressBars extends Component {

    genderFrequenciesFromNodes(nodes) {
        let genderFrequency = {};
        for (const node of nodes) {
            genderFrequency[node.gender] = node.gender in genderFrequency ? genderFrequency[node.gender] + 1 : 1;
        }
        return genderFrequency;
    }

    getSharedTagsWith(originID = 0) {
        const originTags = this.props.graph.nodes[originID].properties[this.props.property];
        const ancestors = this.props.graph.getSharingBloodlineProperties(null, originID);
        let tagOccurrences = {};
        const unitFrequency = 1 / ancestors.length;
        const genderFrequencies = this.genderFrequenciesFromNodes(ancestors);
        for (const tag of originTags) {
            tagOccurrences[tag] = { frequency: { total: 0, byGender: {} }, ancestors: [], ancestorsByGender: {} }
            for (const node of ancestors) {
                if (node[this.props.property].includes(tag)) {
                    tagOccurrences[tag].frequency.total += unitFrequency;
                    tagOccurrences[tag].ancestors.push(node.name + ' ' + node.surnames.join(' '));
                    if (node.gender in tagOccurrences[tag].ancestorsByGender) 
                        tagOccurrences[tag].ancestorsByGender[node.gender].push(node.name + ' ' + node.surnames.join(' '));
                    else 
                        tagOccurrences[tag].ancestorsByGender[node.gender] = [node.name + ' ' + node.surnames.join(' ')];

                    tagOccurrences[tag].frequency.byGender[node.gender] = node.gender in tagOccurrences[tag].frequency.byGender ?
                        tagOccurrences[tag].frequency.byGender[node.gender] + 1 / genderFrequencies[node.gender] :
                        1 / genderFrequencies[node.gender];
                }
            }

        }

        const emergent = Object.entries(tagOccurrences).filter(([name, value]) => value.frequency.total === 0).map(([name, value]) => name);
        const heritage = Object.entries(tagOccurrences).filter(([name, value]) => value.frequency.total > 0).map(([name, value]) => name);

        return [tagOccurrences, emergent, heritage, ancestors.length, genderFrequencies];
    }


    render() {
        const [tagOccurrences, emergent, heritage, ancestorsLength, genderFrequencies] = this.getSharedTagsWith(this.props.selectedNode);
        return (<React.Fragment>
            {Object.keys(tagOccurrences).length === 0? <h5 className='statistics-subtitle'>
                                                                {this.props.graph.nodes[this.props.selectedNode].properties.name} has not known {this.props.propertyToShow.toLowerCase()}
                                                            </h5> : null}
            {heritage.map(tag => <ProgressBar key={`${tag}-progress-bars`} tag={tag} tagInfo={tagOccurrences[tag]}
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
        const frequency = this.props.tagInfo.frequency.total;

        return (<Row key={stringToID(this.props.tag) + '-row'}>
            <Col md={3} key={stringToID(this.props.tag) + '-col-name'}>
                <h5 className="statistics-subtitle progress-bar-definition" key={stringToID(this.props.tag) + '-name'}>{this.props.tag}</h5>
            </Col>
            <Col md={9} key={stringToID(this.props.tag) + '-col-progress'}>
                <div key={stringToID(this.props.tag) + '-progress-bar-tooltip-div'} id={stringToID(this.props.tag) + '-progress-bar'}>
                    <div className="text-center statistics-subtitle" key={stringToID(this.props.tag) + '-percentage'}>
                        {`${Math.round(frequency * this.props.ancestorsLength)}/${this.props.ancestorsLength} (${Math.round(frequency * 100)}%)`}
                </div>
                <Progress value={frequency * 100} key={stringToID(this.props.tag) + '-progress-bar'} />
                </div>
                <Row>
                <ProgressBarByGender tagInfo={this.props.tagInfo} tag={this.props.tag} genderFrequencies={this.props.genderFrequencies}/>
            </Row>
                
            </Col>
            <UncontrolledTooltip key={stringToID(this.props.tag) + '-tooltip'} placement="bottom" isOpen={this.state.tooltipIsOpen}
                                 target={stringToID(this.props.tag) + '-progress-bar'} toggle={this.toggleTooltip}>
                {this.props.tagInfo.ancestors.map(ancestor => <p key={stringToID(this.props.tag) + '-progress-bar-' + stringToID(ancestor)}>
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
                {Object.entries(this.props.tagInfo.frequency.byGender).map(([gender, genFreq]) =>
                    <React.Fragment key={`${stringToID(this.props.tag)}-${gender}-progress-fragment`}>
                            <Col key={`${stringToID(this.props.tag)}-${gender}-progress-col`} sm = {2} md = {3} xl = {2}>
                                <h5 key={stringToID(this.props.tag) + '-' + stringToID(gender)} className="statistics-subtitle progress-bar-definition">{gender}</h5>
                            </Col>
                            <Col  sm = {Object.keys(this.props.tagInfo.frequency.byGender).length > 1? 4 :  10} 
                                  md = {Object.keys(this.props.tagInfo.frequency.byGender).length > 1? 3 :  9} 
                                  xl = {Object.keys(this.props.tagInfo.frequency.byGender).length > 1? 4 :  10}
                                  id = {stringToID(this.props.tag) + '-' + stringToID(gender) + '-tooltip-div'}
                                  key = {stringToID(this.props.tag) + '-' + stringToID(gender) + '-tooltip-div'}>
                            <div className="text-center statistics-subtitle" key={stringToID(this.props.tag) + '-percentage-'+ stringToID(gender)}>
                                {`${Math.round(genFreq * this.props.genderFrequencies[gender])}/${this.props.genderFrequencies[gender]}`}
                            </div>
                                <Progress value={genFreq * 100} key={stringToID(this.props.tag) + '-progress-' + stringToID(gender)} className = {gender.toLowerCase()} />
                            </Col>
                            <UncontrolledTooltip key={stringToID(this.props.tag) + '-tooltip'} placement="bottom" isOpen={this.state.genderTooltip === gender}
                                                 target={stringToID(this.props.tag) + '-' + stringToID(gender) + '-tooltip-div'} toggle={() => this.toggleTooltip(gender)}>
                                        {this.props.tagInfo.ancestorsByGender[gender].map(ancestor => <p key={stringToID(this.props.tag) + '-progress-bar-' + stringToID(ancestor)}>
                                                                                                    {ancestor}
                                                                                                    </p>)}
                            </UncontrolledTooltip>
                    </React.Fragment>)}
                    </React.Fragment>)
    }

}