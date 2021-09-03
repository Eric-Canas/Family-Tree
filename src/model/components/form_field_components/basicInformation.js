import React, { Component } from 'react';
import {Label, Input, Col, InputGroup, FormGroup, FormText} from 'reactstrap';
import TagsSelector from '../auxiliars/tagsSelector';
import {stringToTittleCase} from '../../auxiliars'

class BasicInformation extends Component {
    constructor(props){
        super(props);
        this.state = {warnings : {bornDay : false, bornMonth : false, bornYear : false}}
        this.possibleSurnames = ["Caca1", "Caca2"]//TODO: Update it with Family Tree information
        this.nextYear = new Date().getFullYear()+1;
    }

    updateName(event){
        const value = stringToTittleCase(event.target.value);
        this.props.saveInfo("name", value);
        event.target.value = value;
        value === ""? event.target.classList.add('border-warning') : event.target.classList.remove('border-warning');
    }

    updateBornDate(event, info){
        switch (info) {
            case "day":
                if (event.target.value !== "" && (event.target.value > 31 || event.target.value < 1)) {
                    this.setState({ warnings: { bornDay: true, bornMonth: this.state.warnings.bornMonth, bornYear : this.state.warnings.bornYear } })
                    this.props.saveInfo("bornDay",null);
                } else {
                    if (this.state.warnings.bornDay) {
                        this.setState({ warnings: { bornDay: false, bornMonth: this.state.warnings.bornMonth, bornYear : this.state.warnings.bornYear } })
                    }
                    this.props.saveInfo("bornDay", event.target.value !== ""? Number(event.target.value) : null );
                }
                break;
            case "month":
                if (event.target.value !== "" && (event.target.value > 12 || event.target.value < 1)) {
                    this.setState({ warnings: { bornDay: this.state.warnings.bornDay, bornMonth: true, bornYear : this.state.warnings.bornYear } })
                    this.props.saveInfo("bornMonth", null);
                } else {
                    if (this.state.warnings.bornMonth) {
                        this.setState({ warnings: { bornDay: this.state.warnings.bornDay, bornMonth: false, bornYear : this.state.warnings.bornYear} })
                    }
                    this.props.saveInfo("bornMonth", event.target.value !== ""? Number(event.target.value) : null );
                }
                break;
            case "year":
                if (event.target.value !== "" && (event.target.value > this.nextYear)) {
                    this.setState({ warnings: { bornnDay: this.state.warnings.bornDay, bornMonth: this.state.warnings.bornMonth, bornYear : true } })
                    this.props.saveInfo("bornYear", null);
                } else {
                    if (this.state.warnings.bornYear) {
                        this.setState({ warnings: { bornDay: this.state.warnings.bornDay, bornMonth: this.state.warnings.bornMonth, bornYear : false } })
                    }
                    this.props.saveInfo("bornYear", event.target.value !== ""? Number(event.target.value) : null );
                }
                break;
            default:
        }
    }

    render() {
        return (<React.Fragment>
                    <Col md="12">
                        <Label for="name" className="form-label">Name</Label>
                        <Input type="text" id="name" placeholder="Name" onBlur={(event) => this.updateName(event)} />
                    </Col>
                    <Col md="12">
                        <TagsSelector label="Surname" options={this.possibleSurnames} saveDefinedTags={(tagsList) => this.props.saveInfo("surnames", tagsList)} canRepeat={true}/>
                    </Col>
                    <Col md="12">
                        <Label htmlFor="born" className="form-label">Born at</Label>
                        <FormGroup>
                        <InputGroup>
                            <Input type="number" min="1" max="31" id="born-day" placeholder="day" onBlur={(event) => this.updateBornDate(event, "day")} invalid={this.state.warnings.bornDay}/>
                            <Input type="number" min="1" max="12" id="born-month" placeholder="month" onBlur={(event) => this.updateBornDate(event, "month")} invalid={this.state.warnings.bornMonth}/>
                            <Input type="number" id="born-year" placeholder="Year" max={this.nextYear} onBlur={(event) => this.updateBornDate(event, "year")} invalid={this.state.warnings.bornYear}/>
                        </InputGroup>
                        <FormText>You can let in blank any unknown data.</FormText>
                        </FormGroup>
                    </Col>

                </React.Fragment>
                )
    }
}

export default BasicInformation;