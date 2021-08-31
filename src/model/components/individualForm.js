import React, { Component } from 'react';
import { Col, Form, Row} from 'reactstrap';
import AvatarPicture from './form_field_components/avatarPicture';
import Defunction from './form_field_components/defunction';
import GenderSelector from './form_field_components/genderSelector';
import BasicInformation from './form_field_components/basicInformation';
import ComplementaryInfoNavBar from './form_field_components/complementaryInfoNavBar';



class IndividualForm extends Component {
    constructor(props) {
        super(props);
        this.state = {alive: true};
        this.setAlive = (alive) => this.setState({alive : alive});
    }


    render() {
        return (
            <Form className="row individual-form">
                <Row>
                    <Col md="auto">
                        <AvatarPicture />
                    </Col>
                    <Col md="6" lg="7" xl="8" xxl="10" className="left-of-picture">
                        <BasicInformation />
                    </Col>
                </Row>

                <Row>
                    <Defunction alive={this.state.alive} setAlive={this.setAlive.bind(this)}/>
                    <Col md="auto" sm={this.state.alive? "auto" : "12"}>
                        <GenderSelector />
                    </Col>
                </Row>

                <ComplementaryInfoNavBar alive={this.state.alive}/>

                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="relevant" />
                        <label className="form-check-label" htmlFor="relevant">
                            Highlight
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Save</button>
                </div>
            </Form>
        )
    }
}
export default IndividualForm;