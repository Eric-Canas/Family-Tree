import React, { Component } from 'react';
import { Label, Input, Col } from 'reactstrap';
import LocationDetails from './locationDetails';
import TagsSelector from '../../auxiliars/tagsSelector';
import {DISEASES_LIST} from '../../../constants';

class DefunctionDetails extends Component {

    render() {
        return (<React.Fragment>
                    <LocationDetails saveInfo={this.props.saveInfo} getNodeInfo={this.props.getNodeInfo} situation="Defunction"/>
                    <TagsSelector label="Defuntion Disease" options={DISEASES_LIST} saveDefinedTags={(tagsList) => this.props.saveInfo("defunctionDisease", tagsList)}
                                    initialState = {this.props.getNodeInfo("defunctionDisease")}/>
                    <Col md="12">
                        <Label for="defunction-details">Defunction Details</Label>
                        <Input type="textarea" id="defunction-details" rows="2" placeholder="Defunction details"
                         onBlur={(event) => this.props.saveInfo('defunctionDetails', event.target.value)} defaultValue={this.props.getNodeInfo("defunctionDetails")}></Input>
                    </Col>
                </React.Fragment>
                )
    }
}

export default DefunctionDetails;