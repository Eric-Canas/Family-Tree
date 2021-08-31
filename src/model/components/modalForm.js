import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import IndividualForm from './individualForm';

class ModalForm extends Component {

    //It could access to this.props
    render() {
        return (
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} className = "modalForm">
                    <ModalHeader toggle={this.props.toggle}>{this.props.relationship + " of " + this.props.kin}</ModalHeader>
                    <ModalBody>
                        <IndividualForm />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggle}>Save</Button>
                        <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                )
    }
}
export default ModalForm;