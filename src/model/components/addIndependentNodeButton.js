import React, { Component } from 'react';
import ModalForm from './modalForm'
import { Button } from 'reactstrap';

class AddIndependentNodeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
        this.showHideForm = () => this.setState({showModal: !this.state.showModal});
        this.node = {}
    }

    render() {
        return (<React.Fragment>
                    <Button type="button" color="primary" aria-label="Adds an Independent Node"
                            onClick={this.showHideForm}>{this.props.text || "Independent Node"}</Button>

                    <ModalForm modal={this.state.showModal} close={this.showHideForm} relationship={"Independent"} save={this.props.save} node={this.node} header={this.props.text || "Independent Individual"}/>
                </React.Fragment>
                )
    }
}
export default AddIndependentNodeButton;