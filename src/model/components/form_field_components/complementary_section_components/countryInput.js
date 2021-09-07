import React, { Component } from 'react';
import { Label, Input, InputGroup, InputGroupAddon, InputGroupText, Media } from 'reactstrap';
import { COUNTRIES, COUNTRIES_NAMES, FLAGS_URL, FLAGS_FORMAT } from '../../../constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import {stringToID, stringToTittleCase} from '../../../auxiliars'

class CountryInput extends Component {
    constructor(props) {
        super(props);
        this.countryFlagURL = (countryName) => FLAGS_URL + COUNTRIES[countryName].code.toLowerCase() + FLAGS_FORMAT;
        this.includeNext = false;
    }

    onSelectedCountry(event) {
        let country = event.target.value.trim();
        if (!(country in COUNTRIES)){
            country = stringToTittleCase(country);
        }
        event.target.value = country;
        this.props.setSelectedCountry(country in COUNTRIES ? country : null);
        this.props.saveCountry(country)
    }

    render() {
        return (
            <React.Fragment>
                    <Label for={stringToID(this.props.label)} className="form-label">{this.props.label}</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>{this.props.selectedCountry === null ? <FontAwesomeIcon icon={faGlobe} className="country-flag" /> :
                                <Media className="country-flag" src={this.countryFlagURL(this.props.selectedCountry)} />}</InputGroupText>
                        </InputGroupAddon>
                        <Input type="search" className="form-control" list={stringToID(this.props.label)+"-country-options"} id={stringToID(this.props.label)} placeholder={this.props.label}
                            onBlur={(event) => this.onSelectedCountry(event)} onKeyDown={(event) => {if (event.key === "Unidentified") this.includeNext = true;}}
                            onInput={(event) => {if(this.includeNext){ this.onSelectedCountry(event); this.includeNext = false;}}} defaultValue={this.props.defaultValue}/>
                        <datalist id={stringToID(this.props.label)+"-country-options"}>
                            {COUNTRIES_NAMES.map(country => <option key={country}>{country}</option>)}
                        </datalist>
                    </InputGroup>
                </React.Fragment>);
    }
}

export default CountryInput;