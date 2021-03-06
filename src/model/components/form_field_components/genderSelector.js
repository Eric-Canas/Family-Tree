import React, { Component } from 'react';
import { Label, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGenderless, faMars, faVenus, faQuestion, faNeuter, faUser, faTransgenderAlt} from '@fortawesome/free-solid-svg-icons'

class GenderSelector extends Component {
    constructor(props){
        super(props);
        this.state = {selectedGender : this.props.getNodeInfo("gender") || "Unknown"};
        this.genderIcon = {"Unknown": faQuestion, "Female": faVenus, "Male" : faMars, "Non-Binary": faNeuter, "Transgender" : faTransgenderAlt, "Genderless" : faGenderless, "Other" : faUser}
    }

    onSelectGender(event){
        this.setState({selectedGender : event.target.value})
        this.props.saveInfo("gender", event.target.value);
    }
    //It could access to this.props
    render() {
        return (<div>
            <Label for="gender" className="form-label">Gender</Label><InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText> <FontAwesomeIcon icon={this.genderIcon[this.state.selectedGender]} className="input-icon" /> </InputGroupText>
                </InputGroupAddon>
                <select className="form-select" id="gender" defaultValue={this.state.selectedGender} onChange={(event) => this.onSelectGender(event)}>
                    {Object.keys(this.genderIcon).map( gender => <option key={gender}>{gender}</option>)}
                </select>
            </InputGroup>
        </div>)
    }
}
export default GenderSelector;