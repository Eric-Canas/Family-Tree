import React, { Component } from 'react';
import {Col, Label, Input} from "reactstrap"
class DefunctionPlace extends Component {
    render() {
        return (<React.Fragment>
                    <Col md="4">
                        <Label for="defunction-country" className="form-label">Defunction Country</Label>
                        <Input type="text" id="defunction-country" placeholder="Defunction Country" />
                    </Col>
                    <Col md="4">
                        <Label for="defunction-state" className="form-label">Defunction State</Label>
                        <Input type="text" id="defunction-state" placeholder="Defunction State" />
                    </Col>

                    <Col md="4">
                        <Label for="defunction-city" className="form-label">Defunction City</Label>
                        <Input type="text" id="defunction-city" placeholder="Defunction City" />
                    </Col>
                </React.Fragment>)
    }
}
export default DefunctionPlace;