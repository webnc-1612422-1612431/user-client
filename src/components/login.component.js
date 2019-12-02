import React, { Component } from "react";
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dialog from 'react-bootstrap-dialog'
import config from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';

const axios = require('axios');

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.checkUrl();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleSubmit(event) {
        if (event) {
            event.preventDefault();
        }

        if (this.state.email.length === 0 || this.state.password.length === 0) {
            this.dialog.showAlert("Xin vui lòng nhập đầy đủ thông tin");
            return;
        }

        axios.post(config['server-domain'] + 'users/login', {
            email: this.state.email || '',
            password: this.state.password || ''
        })
            .then(res => {
                if (res.data && res.data.token) {
                    localStorage.setItem('token', res.data.token)
                }
                window.location.href = '/';
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    this.dialog.showAlert(err.response.data.message);
                }
                else {
                    this.dialog.showAlert('Đăng nhập không thành công, xin vui lòng thử lại');
                }
            })
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div className='form-center'>
                <Dialog ref={el => this.dialog = el} />
                <center><br></br><h4>ĐĂNG NHẬP ĐỂ TIẾP TỤC</h4><br></br></center>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId='username'>
                        <FormControl
                            autoFocus
                            placeholder='Địa chỉ E-mail'
                            type='email'
                            value={this.state.email}
                            onChange={this.handleChangeEmail} />
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormControl
                            placeholder='Mật khẩu'
                            type='password'
                            value={this.state.password}
                            onChange={this.handleChangePassword} />
                    </FormGroup>
                    <Button block type='submit'>Đăng nhập</Button>
                </form>

                <center>
                    <button className='social-button' onClick={() => { window.location.href = config['server-domain'] + 'users/login/facebook/' }}>
                        <img src='https://carlisletheacarlisletheatre.org/images/fb-icon-small-7.png' className='facebook-login-image' alt='facebook-img'></img>
                    </button>
                    <button className='social-button' onClick={() => { window.location.href = config['server-domain'] + 'users/login/google/' }}>
                        <img src='https://img.icons8.com/bubbles/2x/google-logo.png' className='google-login-image' alt='google-img'></img>
                    </button>
                    <br></br>
                    Đăng ký tài khoản {' '}
                    <Link to='/sign-up-teacher'>người dạy</Link> hoặc {' '}
                    <Link to='/sign-up-student'>người học</Link><br></br><br></br>
                </center>
            </div>
        );
    }

    checkUrl() {
        const address = window.location.href;
        if (address.indexOf('?token=') !== -1) {
            var token = address.substr(address.indexOf('?token=') + '?token='.length);
            if (token.indexOf('#nghiatq') !== -1) {
                token = token.substr(0, token.indexOf('#nghiatq'));
            }
            localStorage.setItem('token', token);
            window.location.href = '/';
        }
    }

    componentDidMount() {
        //this.isMounted && this.handleTryingLogin();
    }

    componentDidUpdate(prevProps) {
        //if (this.props !== prevProps) {
        //
        //}
    }

    componentWillUnmount() {
        //this.isMounted = false
    }
}