import React, { Component } from 'react';
import {Button, InputGroupAddon, Input, Col} from 'reactstrap';
class Defunction extends Component {
    render() {
        return (<Col md={this.props.alive? "auto" : "8"} sm={this.props.alive? "auto" : "12"}>
                    <label htmlFor="dead" className="form-label">{this.props.alive? "Lives" : "Dead at"}</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <InputGroupAddon addonType="prepend" aria-label="Is it alive or not">
                                <Button color={this.props.alive? "primary" : "secondary"} onClick={() => this.props.setAlive(true)}>Alive</Button>
                                <Button color={!this.props.alive? "primary" : "secondary"} onClick={() => this.props.setAlive(false)}>Defunct</Button>
                            </InputGroupAddon>
                        </div>
                        {!this.props.alive? <Input type="date"/> : null}
                    </div>
                </Col>)
    }
}
export default Defunction;