import React, { Component } from 'react';
import {Label} from 'reactstrap';

class GenderSelector extends Component {
    state = {};
    //It could access to this.props
    render() {
        return (<div>
                    <Label for="gender" className="form-label">Gender</Label>
                    <select className="form-select" id="gender" defaultValue="Not tell">
                        <option>Not tell</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>)
    }
}
export default GenderSelector;