import React, { Component } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import ModalForm from '../modalForm';
import {adjustViewIfNeeded} from '../../auxiliars'

class MarriageLink extends Component {
    constructor(props){
        super(props);
        this.state = {showModal : false};
        this.showForm = () => this.setState({showModal : true});
        this.hideForm = () => this.setState({showModal : false});
    }
    render() {
        return (
                    <div key={`div-${this.props.sid}-to-${this.props.did}-link`} id = {`div-${this.props.sid}-to-${this.props.did}-link`}
                             className='relationship-link marriage-link' style={this.props.style} tabIndex={0} onClick={(event) => adjustViewIfNeeded(event)}>
                        <UncontrolledTooltip key={`${this.props.sid}-to-${this.props.did}-link-tooltip`} placement="bottom" className="add-node-tooltip" trigger="focus"
                                                hideArrow={false} target={`div-${this.props.sid}-to-${this.props.did}-link`}>
                                <Button key="add-child-tooltip" color="secondary" aria-label="Adds a child to the couple" onClick={this.showForm}>
                                    Add Child
                                </Button>
                        </UncontrolledTooltip>
                    <ModalForm modal={this.state.showModal} close={this.hideForm} relationship={"Child"} 
                            node={{relationship : [this.props.nodeID, "Child"]}} save={this.props.save} nodeName = {this.props.nodeName}/>
                    </div>
        )
    }
}
export default MarriageLink;