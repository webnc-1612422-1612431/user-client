import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import config from '../config';

const axios = require('axios');

export default function ForgotPass() {
    const firstStep = window.location.href.indexOf('email') === -1 && window.location.href.indexOf('token') === -1;
    const forgotPassContent = () => {
        if (firstStep) {
            return <div className='form-group'>
                <label>Địa chỉ E-mail</label>
                <input required type='email' className='form-control' placeholder='' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
        }
        return <div>
            <div className='form-group'>
                <label>Mật khẩu mới</label>
                <input required type='password' className='form-control' placeholder='' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>Nhập lại mật khẩu</label>
                <input required type='password' className='form-control' placeholder='' value={repassword} onChange={(e) => setRepassword(e.target.value)} />
            </div>
        </div>
    }

    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    // for dialog modal
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false)
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        const url = window.location.href;
        if (url.indexOf('email=') !== -1 && url.indexOf('token=')) {
            var start = url.indexOf('email=') + 6;
            var emaiL = url.substr(start, url.indexOf('&token') - start);
            setEmail(emaiL);
            start = url.indexOf('token=') + 6;
            var tokeN = url.substr(start);
            if (url.indexOf('#') !== -1) {
                tokeN = url.substr(start, url.indexOf('#') - start);
            }
            setToken(tokeN);
        }
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        if (password !== repassword) {
            setModalContent('Mật khẩu không trùng khớp với nhau');
            setShow(true);
            return false;
        }

        if (password.length > 1 && password.length < 6) {
            setModalContent('Mật khẩu chứa ít nhất 6 ký tự');
            setShow(true);
            return false;
        }

        // if first step, send only email
        axios.post(config['server-domain'] + (firstStep ? 'users/forgot-pass' : 'users/restore-pass'), {
            email: email,
            password: password,
            token: token
        })
            .then(res => {
                if (res.data && res.data.message) {
                    setModalContent(res.data.message);
                    setShow(true);
                    setSuccess(true);
                }
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    setModalContent(err.response.data.message);
                    setShow(true);
                }
            });
    }

    return (
        <div className='center'>
            <form onSubmit={handleSubmit}>
                <center><h3><b><br></br>PHỤC HỒI MẬT KHẨU</b></h3></center>
                {forgotPassContent()}
                <div className='center'>
                    <button type='submit' className='btn btn-primary btn-block'>Xác nhận</button>
                </div>
                <p className="forgot-password text-right">
                    Đã có tài khoản? <a href="login">Đăng nhập?</a>
                </p>
                <br></br><br></br><br></br><br></br><br></br><br></br>
            </form>
            <Modal show={show} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => {
                        if (success) {
                            window.location.href = '/';
                        } else {
                            setShow(false);
                        }
                    }}>Thoát</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}