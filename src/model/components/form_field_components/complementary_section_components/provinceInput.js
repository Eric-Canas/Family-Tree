import React, { Component } from 'react';
import { Label, Input} from 'reactstrap';
import {stringToTittleCase, stringToID} from '../../../auxiliars'

class ProvinceInput extends Component {
    onSelectedProvince(event) {
        let province = event.target.value.trim();
        if (!this.props.availableProvices.includes(province)){
            province = stringToTittleCase(province);
        }
        event.target.value = province;
        this.props.saveProvince(province);
    }

    render() {
        return (
            <React.Fragment>
                    <Label for={stringToID(this.props.label)} className="form-label">{this.props.label}</Label>
                    <Input type="search" className="form-control" list={stringToID(this.props.label)+"-province-options"} id={stringToID(this.props.label)} placeholder={this.props.label}
                        onBlur={(event) => this.onSelectedProvince(event)} />
                    <datalist id={stringToID(this.props.label)+"-province-options"}>
                        {this.props.availableProvices.map(province => <option key={province}>{province}</option>)}
                    </datalist>
            </React.Fragment>);
    }
}

export default ProvinceInput;