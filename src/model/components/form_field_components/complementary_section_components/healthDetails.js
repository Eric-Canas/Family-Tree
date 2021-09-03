import React, { Component } from 'react';
import { Label, Input, Col } from 'reactstrap';
import { DISEASES_LIST } from '../../../constants';
import TagsSelector from '../../auxiliars/tagsSelector';

class HealthDetails extends Component {

    render() {
        return (<React.Fragment>
                    <Col md="12">
                        <TagsSelector label="Known Diseases" options={DISEASES_LIST} saveDefinedTags={(tagsList) => this.props.saveInfo("knownDiseases", tagsList)}/>
                        <Label for="health-details">Other Details</Label>
                        <Input type="textarea" id="health-details" rows="2" placeholder="Other Health Details" 
                                onBlur={(event) => this.props.saveInfo("healthDetails", event.target.value)}/>
                    </Col>
                </React.Fragment>
                )
    }
}

export default HealthDetails;