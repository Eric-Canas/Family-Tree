import React, { Component } from 'react';
import { Button, InputGroupAddon, Input, Col, Label, InputGroup } from 'reactstrap';
//TODO: Refactor this component to a separated one and share it with born date

class Defunction extends Component {

    constructor(props) {
        super(props);
        this.state = { warnings: { defunctionDay: false, defunctionMonth: false } }
        this.currentYear = new Date().getFullYear();
    }

    updateDefunctionDate(event, info) {
        switch (info) {
            case "day":
                if (event.target.value !== "" && (event.target.value > 31 || event.target.value < 1)) {
                    this.setState({ warnings: { defunctionDay: true, defunctionMonth: this.state.warnings.defunctionMonth, defunctionYear : this.state.warnings.defunctionYear } })
                    this.props.saveInfo("defunctionDay", null);
                } else {
                    if (this.state.warnings.defunctionDay) {
                        this.setState({ warnings: { defunctionDay: false, defunctionMonth: this.state.warnings.defunctionMonth, defunctionYear : this.state.warnings.defunctionYear } })
                    }
                    this.props.saveInfo("defunctionDay", event.target.value !== ""? Number(event.target.value) : null );
                }
                break;
            case "month":
                if (event.target.value !== "" && (event.target.value > 12 || event.target.value < 1)) {
                    this.setState({ warnings: { defunctionDay: this.state.warnings.defunctionDay, defunctionMonth: true, defunctionYear : this.state.warnings.defunctionYear } })
                    this.props.saveInfo("defunctionMonth", null);
                } else {
                    if (this.state.warnings.defunctionMonth) {
                        this.setState({ warnings: { defunctionDay: this.state.warnings.defunctionDay, defunctionMonth: false, defunctionYear : this.state.warnings.defunctionYear} })
                    }
                    this.props.saveInfo("defunctionMonth", event.target.value !== ""? Number(event.target.value) : null );
                }
                break;
            case "year":
                if (event.target.value !== "" && (event.target.value > this.currentYear)) {
                    this.setState({ warnings: { defunctionDay: this.state.warnings.defunctionDay, defunctionMonth: this.state.warnings.defunctionMonth, defunctionYear : true } })
                    this.props.saveInfo("defunctionYear", null);
                } else {
                    if (this.state.warnings.defunctionYear) {
                        this.setState({ warnings: { defunctionDay: this.state.warnings.defunctionDay, defunctionMonth: this.state.warnings.defunctionMonth, defunctionYear : false } })
                    }
                    this.props.saveInfo("defunctionYear", event.target.value !== ""? Number(event.target.value) : null );
                }
                break;
            default:
        }
    }

    render() {
        return (<Col lg={this.props.alive ? "auto" : "8"} sm={this.props.alive ? "auto" : "12"}>
                    <Label htmlFor="dead" className="form-label">{this.props.alive ? "Lives" : "Dead at"}</Label>
                        <InputGroup>
                                <InputGroupAddon addonType="prepend" aria-label="Is it alive or not">
                                    <Button color={this.props.alive ? "primary" : "secondary"} onClick={() => {this.props.setAlive(true); this.props.saveInfo("alive", true);}}>Alive</Button>
                                    <Button color={!this.props.alive ? "primary" : "secondary"} onClick={() => {this.props.setAlive(false); this.props.saveInfo("alive", false);}}>Deceased</Button>
                                </InputGroupAddon>

                            {!this.props.alive ? (
                                <React.Fragment>
                                    <Input type="number" min="1" max="31" id="defunction-=day" placeholder="day" onBlur={(event) => this.updateDefunctionDate(event, "day")}
                                           defaultValue={this.props.getSavedInfo("defunction-day")} invalid={this.state.warnings.defunctionDay} />

                                    <Input type="number" min="1" max="12" id="defunction-month" placeholder="month" onBlur={(event) => this.updateDefunctionDate(event, "month")}
                                           defaultValue={this.props.getSavedInfo("defunction-month")} invalid={this.state.warnings.defunctionMonth} />
                                           
                                    <Input type="number" id="defunction-year" placeholder="Year" max={this.currentYear} defaultValue={this.props.getSavedInfo("defunction-year")}
                                           onBlur={(event) => this.updateDefunctionDate(event, "year")} invalid={this.state.warnings.defunctionYear}/>
                                </React.Fragment>
                            ) : null}
                        </InputGroup>
                    
                </Col>)
    }
}
export default Defunction;