import React, { Component } from 'react';
import { Nav, NavItem, Label, NavLink, Collapse, Row } from 'reactstrap';
import ByographycDetails from './complementary_section_components/byographycDetails';
import DefunctionDetails from './complementary_section_components/defunctionDetails';
import HealthDetails from './complementary_section_components/healthDetails';
import LocationDetails from './complementary_section_components/locationDetails';

class ComplementaryInfoNavBar extends Component {
    constructor(props) {
        super(props);
        this.COMPLEMENTARY_SECTIONS = {
                                        "Byography": <ByographycDetails saveInfo={this.props.saveInfo} getNodeInfo={this.props.getNodeInfo}/>,
                                        "Location": <LocationDetails saveInfo={this.props.saveInfo} situation="Birth" getNodeInfo={this.props.getNodeInfo}/>,
                                        "Health": <HealthDetails saveInfo={this.props.saveInfo} getNodeInfo={this.props.getNodeInfo}/>,
                                        "Defunction": <DefunctionDetails saveInfo={this.props.saveInfo} getNodeInfo={this.props.getNodeInfo}/>
                                       }
        this.state = { active: null };
        //Change context or close if same button is clicked twice
        this.setActive = (section => this.setState({ active: section !== this.state.active ? section : null }))
    }
    //It could access to this.props
    render() {
        return (
            <section>
                <Label for="complementary-info-nav" className="form-label">Complementary Information</Label>
                <Nav tabs className="complementary-info-nav">
                    {Object.keys(this.COMPLEMENTARY_SECTIONS).map(section => (
                        <NavItem key={section + "-nav-link"}>
                            <NavLink key={section + "-nav-link"} href="#" active={this.state.active === section} onClick={this.setActive.bind(this, section)}
                                disabled={section === "Defunction" && this.props.alive}>{section}</NavLink>
                        </NavItem>
                    ))}
                </Nav>

                {Object.entries(this.COMPLEMENTARY_SECTIONS).map(([section, element]) =>
                    <Collapse isOpen={this.state.active === section} key={section + "-collapse"}>
                        <Row key={section + "-collapse-row"}>
                            {element}
                        </Row>
                    </Collapse>)}
            </section>
        );
    }
}

export default ComplementaryInfoNavBar;