import React, { Component } from 'react';
import { NODE_RELATIONS } from '../constants';
import { Button, ButtonGroup, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

class AddNodeButton extends Component {

    getTitle(relationship){
        if(relationship === "Couple" && this.props.haveCouple){
            return "Only one couple is allowed";
        } else if (relationship === "Parent"){
            if (this.props.haveBothParents){
                return "Already have two parents"
            } else if (this.props.haveSiblingCoupleWithParents){
                return "There is already a sibling couple with ancestors";
            } else {
                return "";
            }
        } else {
            return ""
        }
    }

    render() {
        return (
            <ButtonGroup className="add-node-button" aria-label="Adds a new relative">
                {NODE_RELATIONS.map(relationship => 
                    <Button key={relationship} color="secondary" aria-label={"Adds a " + relationship}
                        onClick={() => this.props.showModal(relationship)} 
                        disabled={(relationship === "Couple" && this.props.haveCouple) || (relationship === "Parent" && (this.props.haveBothParents || this.props.haveSiblingCoupleWithParents))}
                        title = {this.getTitle(relationship)}>
                            {relationship}
                    </Button>)}
                {this.props.editButtons ?
                    (<React.Fragment>
                        <Button type="button" color="primary" onClick={() => this.props.showModal(null)}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>
                        <Button type="button" color="danger" onClick={this.props.delete}>
                            <Label><FontAwesomeIcon icon={faTimes} /></Label>
                        </Button>
                    </React.Fragment>) : null}
            </ButtonGroup>
        )
    }
}
export default AddNodeButton;