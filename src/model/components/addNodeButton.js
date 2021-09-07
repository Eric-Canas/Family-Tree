import React, { Component } from 'react';
import { NODE_RELATIONS } from '../constants';
import { Button, ButtonGroup, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

class AddNodeButton extends Component {

    render() {
        return (
            <ButtonGroup className="add-node-button" aria-label="Adds a new relative">
                {NODE_RELATIONS.map(relationship => <Button key={relationship} color="secondary" aria-label={"Adds a " + relationship}
                    onClick={() => this.props.showModal(relationship)}>{relationship}</Button>)}
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