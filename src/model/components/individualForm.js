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
        this.state = {alive: this.props.getNodeInfo("alive") !== ""? this.props.getNodeInfo("alive") : true};
        this.setAlive = (alive) => this.setState({alive : alive});
    }


    render() {
        return (
            <Form className="row individual-form">
                <Row>
                    <Col md="auto">
                        <AvatarPicture saveInfo={this.props.updateNode} currentImage={this.props.getNodeInfo("avatar")}/>
                    </Col>
                    <Col md="6" lg="7" xl="8" xxl="10" className="left-of-picture">
                        <BasicInformation saveInfo={this.props.updateNode} getNodeInfo={this.props.getNodeInfo}/>
                    </Col>
                </Row>

                <Row>
                    <Defunction alive={this.state.alive} setAlive={this.setAlive.bind(this)} saveInfo={this.props.updateNode} getNodeInfo={this.props.getNodeInfo}/>
                    <Col md="auto" sm={this.state.alive? "auto" : "12"}>
                        <GenderSelector saveInfo={this.props.updateNode} getNodeInfo={this.props.getNodeInfo}/>
                    </Col>
                </Row>

                <ComplementaryInfoNavBar alive={this.state.alive} saveInfo={this.props.updateNode} getNodeInfo={this.props.getNodeInfo}/>

                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="highlight" onChange={(event) => this.props.updateNode('highlight', event.target.checked)} />
                        <label className="form-check-label" htmlFor="highlight">
                            Highlight
                        </label>
                    </div>
                </div>
            </Form>
        )
    }
}
export default IndividualForm;