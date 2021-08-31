import React, { Component } from 'react';
import { NODE_RELATIONS } from '../constants';
import ModalForm from './modalForm'
import { Button } from 'reactstrap';

class AddNodeButton extends Component {
    constructor(props) {
        super(props);
        this.lastInspectedRelationship = null; //It is saved just for avoiding problems with the ModalHeader
        this.state = { showModal: false, relationship : null};
        this.showHideForm = (relationship) => { if (relationship !== null) {this.lastInspectedRelationship = relationship;}
                                                this.setState({ showModal: !this.state.showModal, relationship : this.lastInspectedRelationship})};
    }

    render() {
        return (<React.Fragment>
                    <div className="btn-group add-node-button" role="group" aria-label="Adds a new relative">
                        {NODE_RELATIONS.map(relationship => <Button key={relationship} type="button" className="btn btn-secondary" aria-label={"Adds a "+relationship}
                                                                    onClick={this.showHideForm.bind(this, relationship)}>{relationship}</Button>)}
                    </div>
                    <ModalForm modal={this.state.showModal} toggle={this.showHideForm.bind(this, null)} relationship={this.state.relationship} kin={this.props.kin}/>
                </React.Fragment>
        )
    }
}
export default AddNodeButton;