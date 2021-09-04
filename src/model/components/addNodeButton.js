import React, { Component } from 'react';
import { NODE_RELATIONS } from '../constants';
import ModalForm from './modalForm'
import { Button, ButtonGroup, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

class AddNodeButton extends Component {
    constructor(props) {
        super(props);
        this.lastInspectedRelationship = null; //It is saved just for avoiding problems with the ModalHeader
        this.state = { showModal: false, relationship: null };
        this.showHideForm = (relationship) => {
            if (relationship !== null) { this.lastInspectedRelationship = relationship; }
            this.setState({ showModal: !this.state.showModal, relationship: this.lastInspectedRelationship })
        };
    }

    render() {
        return (<React.Fragment>
            <ButtonGroup className="add-node-button" aria-label="Adds a new relative">
                {NODE_RELATIONS.map(relationship => <Button key={relationship} type="button" className="btn btn-secondary" aria-label={"Adds a " + relationship}
                    onClick={this.showHideForm.bind(this, relationship)}>{relationship}</Button>)}
                {this.props.editButtons ?
                    (<React.Fragment>
                        <Button type="button" color="primary" onClick={(event)=> console.log(this.props.node.properties)}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>
                        <Button type="button" color="danger" onClick={(event) => console.log("DELETE THE NODE")}>
                            <Label><FontAwesomeIcon icon={faTimes} /></Label>
                        </Button>
                    </React.Fragment>) : null}
            </ButtonGroup>
            <ModalForm modal={this.state.showModal} close={this.showHideForm.bind(this, null)} relationship={this.state.relationship} kin={this.props.kin} save={this.props.save} />
        </React.Fragment>
        )
    }
}
export default AddNodeButton;