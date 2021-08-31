import React, { Component } from 'react';
import {Label, Input, Col} from 'reactstrap';

class BasicInformation extends Component {

    render() {
        return (<React.Fragment>
                    <Col md="12">
                        <Label for="name" className="form-label">Name</Label>
                        <Input type="text" id="name" placeholder="Name" required />
                    </Col>
                    <Col md="12">
                        <Label for="surname" className="form-label">Surname</Label>
                        <Input type="text" id="surname" placeholder="Surname (For multiple: Sur1, Sur2...)" />
                    </Col>
                    <Col md="12">
                        <Label htmlFor="born" className="form-label">Born at</Label>
                        <Input type="date" id="born" />
                    </Col>
                </React.Fragment>
                )
    }
}

export default BasicInformation;