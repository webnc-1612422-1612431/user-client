import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import logo from '../logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';

export default class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="info" variant="dark" sticky="top" >
                <Navbar.Brand href="home"><img src={logo} width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" />{' '}Gia sư Online</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="home">Trang chủ</Nav.Link>
                        <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Cập nhật thông tin</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.2">Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="login">Đăng nhập</Nav.Link>
                        <NavDropdown title="Đăng ký" id="basic-nav-dropdown">
                            <NavDropdown.Item href="sign-up-teacher">Tài khoản người dạy</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="sign-up-student">Tài khoản người học</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link></Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Nhập tên môn học..." className="mr-sm-2" />
                        <Button variant="outline-dark">Tìm kiếm</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}