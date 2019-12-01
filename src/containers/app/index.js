import React from 'react';
import { Route } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../logo.svg';

import Login from '../../components/login.component';
import SignUpTeacher from '../../components/signup.teacher.component';
import SignUpStudent from '../../components/signup.student.component';

const App = () => (
    <div>
        <div className="App">
            
            {/* Header của mỗi trang phải có */}
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
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
                        <Button variant="outline-info">Tìm kiếm</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>

            <main>
                <Route exact path="/login" component={Login} />
                <Route exact path="/sign-up-teacher" component={SignUpTeacher} />
                <Route exact path="/sign-up-student" component={SignUpStudent} />
            </main>
        </div>
    </div>
);

export default App;