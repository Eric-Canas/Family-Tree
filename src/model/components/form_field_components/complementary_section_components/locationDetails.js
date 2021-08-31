import React, { Component } from 'react';
import { Label, Input, Col } from 'reactstrap';

class LocationDetails extends Component {

    render() {
        return (
            <React.Fragment>
                <Col md="4">
                    <Label for="born-country" className="form-label">Born Country</Label>
                    <Input type="text" id="born-country" placeholder="Born Country" />
                </Col>
                <Col md="4">
                    <Label for="born-state" className="form-label">Born State</Label>
                    <Input type="text" id="born-state" placeholder="Born State" />
                </Col>

                <Col md="4">
                    <Label for="born-city" className="form-label">Born City</Label>
                    <Input type="text" id="born-city" placeholder="Born City" />
                </Col>
            </React.Fragment>);
    }
}

export default LocationDetails;