import React, { Component } from 'react';
import { Label, Input, Col } from 'reactstrap';

class HealthDetails extends Component {

    render() {
        return (<React.Fragment>
                    <Col md="12">
                        <Label for="known-diseases">Known Diseases</Label>
                        <Input type="textarea" id="known-diseases" rows="2" placeholder="Known diseases (separated with colons: (Asperger, Myopia, Recurrent Stomachaches...)). After first point (.), include any additional information"></Input>
                    </Col>
                </React.Fragment>
                )
    }
}

export default HealthDetails;