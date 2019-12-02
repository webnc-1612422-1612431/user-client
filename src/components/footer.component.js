import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';

export default class Footer extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        <Navbar.Brand href="home"><img src={logo} width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" />{' '}Facebook</Navbar.Brand>
                        <Navbar.Brand href="home"><img src={logo} width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" />{' '}Google</Navbar.Brand>
                        <Navbar.Brand href="home"><img src={logo} width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" />{' '}Twitter</Navbar.Brand>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}