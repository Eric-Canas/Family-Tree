import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
         UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
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
                        <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    File
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this.props.uploadFunction}>
                                        Open
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={this.props.downloadFunction} disabled={this.props.isEmpty}>
                                        Download
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            {this.props.additionalOptions.map(option => (<NavItem key={stringToID(option)+'nav-item'}>
                                                                            <NavLink key={stringToID(option)} onClick={() => {this.props.selectOption(option); this.close();}} disabled={this.props.isEmpty}>
                                                                                {stringToTittleCase(option)}
                                                                            </NavLink>
                                                                        </NavItem>))}
                                                                        <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    View
                                </DropdownToggle>
                                <DropdownMenu right>
                                        <DropdownItem disabled={true}> 
                                            Visualization options coming soon...
                                        </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
        )
    };
}
export default MainMenu;