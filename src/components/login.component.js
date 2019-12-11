import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from '../config';

const axios = require('axios');

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // for dialog modal
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        checkUrl();
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(config['server-domain'] + 'users/login', {
            email: email,
            password: password
        })
            .then(res => {
                if (res.data && res.data.token) {
                    localStorage.setItem('token', res.data.token)
                }
                window.location.href = '/';
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    setModalContent(err.response.data.message);
                    setShow(true);
                }
                else {
                    setModalContent('Đăng nhập không thành công, xin vui lòng thử lại');
                    setShow(true);
                }
                localStorage.removeItem('token');
            });
    }

    return (
        <div className='center'>
            <center><h2><b>ĐĂNG NHẬP ĐỂ TIẾP TỤC</b></h2></center>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Địa chỉ E-mail</label>
                    <input required type='email' className='form-control' placeholder='' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Mật khẩu</label>
                    <input required type='password' className='form-control' placeholder='' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type='submit' className='btn btn-primary btn-block'>Đăng nhập</button>
                <p className='forgot-password text-right'>
                    <a href='forgot-pass'>Quên mật khẩu?</a>
                </p>
            </form>
            <center>
                <button className='social-button' onClick={() => { window.location.href = config['server-domain'] + 'users/login/facebook/' }}>
                    <img src='https://carlisletheacarlisletheatre.org/images/fb-icon-small-7.png' className='facebook-login-image' alt='facebook-img'></img>
                </button>
                <button className='social-button' onClick={() => { window.location.href = config['server-domain'] + 'users/login/google/' }}>
                    <img src='https://img.icons8.com/bubbles/2x/google-logo.png' className='google-login-image' alt='google-img'></img>
                </button>
                Đăng ký tài khoản {' '}
                <Link to='/sign-up-teacher'>người dạy</Link> hoặc {' '}
                <Link to='/sign-up-student'>người học</Link><br></br><br></br>
            </center>
            <Modal show={show} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)}>Thoát</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

    // for login facebook and google
    function checkUrl() {
        const address = window.location.href;

        if (address.indexOf('?message=') !== -1) {
            if (address.indexOf('not-verified') !== -1) {
                setModalContent('Tài khoản của bạn chưa được kích hoạt');
            }
            else if (address.indexOf('invalid-verified') !== -1) {
                setModalContent('Mã kích hoạt tài khoản không hợp lệ');
            }
            else if (address.indexOf('?message=verified') !== -1) {
                setModalContent('Kích hoạt tài khoản thành công');
            }
            else if (address.indexOf('?message=invalid-forgot-pass') !== -1) {
                setModalContent('Đường dẫn phục hồi tài khoản không hợp lệ');
            }
            setShow(true);
        }
        else if (address.indexOf('?token=') !== -1) {
            var token = address.substr(address.indexOf('?token=') + '?token='.length);
            if (token.indexOf('#nghiatq') !== -1) {
                token = token.substr(0, token.indexOf('#nghiatq'));
            }
            localStorage.setItem('token', token);
            window.location.href = '/';
        }
    }
}