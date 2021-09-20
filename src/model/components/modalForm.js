import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import IndividualForm from './individualForm';

class ModalForm extends Component {
    constructor(props){
        super(props);
        this.updateNode = (key, value) => this.props.node[key] = value;
        this.getNodeInfo = (key) => key in this.props.node? this.props.node[key] : "";
        this.saveNode = this.saveNode.bind(this);
    }

    saveNode(){
        console.log("SAVE NODE FROM MODAL FORM", this.props.node)
        if (this.props.relationship===null){
            this.props.update(this.props.node);
        } else {
            this.props.save(this.props.node);
        }
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
                        <Button color="primary" onClick={this.saveNode}>{this.props.relationship===null? "Update" : "Save"}</Button>
                        <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                )
    }
}
export default ModalForm;