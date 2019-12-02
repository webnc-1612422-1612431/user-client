import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';

export default class Menu extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link href="home">Toán</Nav.Link>
                        <Nav.Link href="home">Vật Lý</Nav.Link>
                        <Nav.Link href="home">Hóa Học</Nav.Link>
                        <Nav.Link href="home">Tiếng Anh</Nav.Link>
                        <Nav.Link href="home">Tin Học</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}