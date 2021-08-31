import React, { Component } from 'react';
import { Label, Input, Col } from 'reactstrap';
import DefunctionPlace from './defunctionPlace.js';

class DefunctionDetails extends Component {

    render() {
        return (<React.Fragment>
                    <DefunctionPlace/>
                    <Col md="12">
                        <Label for="defunction-reason">Defunction Reason</Label>
                        <Input type="textarea" id="defunction-reason" rows="2" placeholder="Why he/she died"></Input>
                    </Col>
                </React.Fragment>
                )
    }
}

export default DefunctionDetails;