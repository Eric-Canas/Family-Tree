import React, { Component } from 'react';
import { Label, Input, Col,} from 'reactstrap';
import { COUNTRIES } from '../../../constants'
import CountryInput from './countryInput';
import ProvinceInput from './provinceInput';
import {stringToID,capitalize} from '../../../auxiliars'

class LocationDetails extends Component {
    // TODO: Disable the autocomplete because don't triggers onChange
    constructor(props) {
        super(props);
        this.state = { currentKnownCountry: this.props.getNodeInfo(this.props.situation.toLowerCase()+'Country') in COUNTRIES? this.props.getNodeInfo(this.props.situation.toLowerCase()+'Country') : null}
        this.currentCountryProvinces = () => this.state.currentKnownCountry !== null? COUNTRIES[this.state.currentKnownCountry].provinces : [];
    }

    setCity(event){
        const capitalized = capitalize(event.target.value)
        this.props.saveInfo(this.props.situation.toLowerCase()+'City', capitalized)
        event.target.value = capitalized;

    }

    render() {
        return (
            <React.Fragment>
                <Col md="4">
                    <CountryInput saveCountry = {(country) => this.props.saveInfo(this.props.situation.toLowerCase()+'Country', country)}
                     setSelectedCountry={(country) => this.setState({ currentKnownCountry: country })} selectedCountry={this.state.currentKnownCountry}
                     label = {this.props.situation+" Country"} defaultValue={this.props.getNodeInfo(this.props.situation.toLowerCase()+'Country')}/>
                </Col>
                <Col md="4">
                    <ProvinceInput label={this.props.situation+" Province/State"} availableProvices={this.currentCountryProvinces()} 
                                    saveProvince = {(province) => this.props.saveInfo(this.props.situation.toLowerCase()+'Province', province)}
                                    defaultValue={this.props.getNodeInfo(this.props.situation.toLowerCase()+'Province')}/>
                </Col>

                <Col md="4">
                    <Label for={stringToID(this.props.situation)+'-city'} className="form-label">{this.props.situation+" City"}</Label>
                    <Input type="text" id={stringToID(this.props.situation)+'-city'} placeholder={this.props.situation+" City"}
                    onBlur={(event) => this.setCity(event)} defaultValue={this.props.getNodeInfo(this.props.situation.toLowerCase()+'City')} />
                </Col>
            </React.Fragment>);
    }
}

export default LocationDetails;