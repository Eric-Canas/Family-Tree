import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
         UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText} from 'reactstrap';
import {stringToTittleCase, stringToID} from '../auxiliars'

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false}
        this.toggleOpen = () => this.setState({open: !this.state.open })
        this.close = () => this.setState({open: false})
    }

    render() {
        return (
                <Navbar color="ligth" light expand="md" className="main-menu">
                    <NavbarBrand onClick={() => this.props.selectOption("tree")}>Family Tree</NavbarBrand>
                    <NavbarToggler onClick={this.toggleOpen} />
                    <Collapse isOpen={this.state.open} navbar>
                        <Nav tabs className="mr-auto" navbar>
                            {this.props.additionalOptions.map(option => (<NavItem>
                                                                            <NavLink key={stringToID(option)} onClick={() => {this.props.selectOption(option); this.close();}}>{stringToTittleCase(option)}</NavLink>
                                                                        </NavItem>))}
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    View
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Show Shit
                                    </DropdownItem>
                                    <DropdownItem>
                                        Show Shit2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Advanced Settings
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink onClick={this.props.downloadFunction}>Download</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.props.uploadFunction}>Open</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText>Navbar Text</NavbarText>
                    </Collapse>
                </Navbar>
        )
    };
}
export default MainMenu;