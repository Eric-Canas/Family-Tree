import React, { Component } from 'react';
import { Label, Input, Col } from 'reactstrap';
import TagsSelector from '../../auxiliars/tagsSelector';
import { PROFESSIONS_LIST } from '../../../constants';
import { capitalize } from '../../../auxiliars'

class ByographycDetails extends Component {
    constructor(props) {
        super(props);
        this.updateAlias = this.updateAlias.bind(this);
    }

    updateAlias(event) {
        let value = event.target.value.trim();
        if (value !== "") {
            // First letter to UpperCase
            value = capitalize(value);
            event.target.value = value;
        }
        this.props.saveInfo("alias", value);
    }

    render() {
        return (<React.Fragment>
            <Col md="9">
                <TagsSelector label="Professions" options={PROFESSIONS_LIST} saveDefinedTags={(tagsList) => this.props.saveInfo("professions", tagsList)} initialState={this.props.getNodeInfo('professions')}/>
            </Col>
            <Col md="3">
                <Label htmlFor="alias" className="form-label">Alias</Label>
                <Input type="text" id="alias" placeholder="Alias" defaultValue={this.props.getNodeInfo('alias')} onBlur={(event) => this.updateAlias(event)} />
            </Col>
            <Col md="12">
                <Label htmlFor="biography">Biography</Label>
                <Input type="textarea" id="biography" rows="3" placeholder="He/She had a difficult relation with his/her parents..."
                    onBlur={(event) => this.props.saveInfo("biography", event.target.value)} defaultValue={this.props.getNodeInfo('biography')} />
            </Col>
        </React.Fragment>
        )
    }
}

export default ByographycDetails;