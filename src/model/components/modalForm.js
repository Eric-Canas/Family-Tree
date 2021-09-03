import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import IndividualForm from './individualForm';

class ModalForm extends Component {
    constructor(props){
        super(props);
        this.node = {};
        this.updateNode = (key, value) => {this.node[key] = value; console.log(this.node)};
        this.getNodeInfo = (key) => key in this.node? this.node[key] : "";
        this.saveNode = this.saveNode.bind(this);
    }

    saveNode(){
        console.log("FROM FORM", this.node)
        this.props.save(this.node);
        this.props.close();
    }

    //It could access to this.props
    render() {
        return (
                <Modal isOpen={this.props.modal} toggle={this.props.close} className = "modal-form">
                    <ModalHeader toggle={this.props.close}>{this.props.header || this.props.relationship + " of " + this.props.kin}</ModalHeader>
                    <ModalBody>
                        <IndividualForm updateNode={this.updateNode} getNodeInfo={this.getNodeInfo}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.saveNode}>Save</Button>
                        <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                )
    }
}
export default ModalForm;