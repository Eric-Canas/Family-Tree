import React, { Component } from 'react';
import { Label, Input, Col } from 'reactstrap';

class ByographycDetails extends Component {

    render() {
        return (<React.Fragment>
                    <Col md="9">
                        <Label for="profession" className="form-label">Profession</Label>
                        <Input type="text" id="profession" placeholder="Profession (Separated with colos if multiple: Teacher, Carpenter...)" />
                    </Col>
                    <Col md="3">
                        <Label htmlFor="alias" className="form-label">Alias</Label>
                        <Input type="text" id="alias" placeholder="Alias" />
                    </Col>
                    <Col md="12">
                        <Label htmlFor="biography">Biography</Label>
                        <Input type="textarea" id="biography" rows="3" placeholder="He/She had a difficult relation with his/her parents..."></Input>
                    </Col>
                </React.Fragment>
                )
    }
}

export default ByographycDetails;