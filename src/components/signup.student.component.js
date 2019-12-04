import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import config from '../config';

const axios = require('axios');

export default function SignUpStudent() {

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    // for dialog modal
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        const url = window.location.href;
        if (url.indexOf('fullname=') !== -1 && url.indexOf('email=')) {
            var start = url.indexOf('fullname=') + 9;
            var fullnamE = url.substr(start, url.indexOf('&') - start);
            setFullname(decodeURI(fullnamE));
            start = url.indexOf('email=') + 6;
            var emaiL = url.substr(start);
            if (url.indexOf('#') !== -1) {
                emaiL = url.substr(start, url.indexOf('#') - start);
            }
            setEmail(emaiL);
        }
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        if (password !== repassword) {
            setModalContent('Mật khẩu không trùng khớp với nhau');
            setShow(true);
            return false;
        }

        if (password.length < 6) {
            setModalContent('Mật khẩu chứa ít nhất 6 ký tự');
            setShow(true);
            return false;
        }

        axios.post(config['server-domain'] + 'users/sign-up', {
            email: email,
            fullname: fullname,
            address: address,
            birthday: birthday,
            password: password,
            role: 'student',
        })
        .then(res => {
            setModalContent('Đăng ký thành công, vui lòng xác thực tài khoản với email đã đăng ký');
            setSuccess(true);
            setShow(true);
        })
        .catch(err => {
            if (err.response && err.response.data && err.response.data.message) {
                setModalContent(err.response.data.message);
                setShow(true);
            }
            else {
                setModalContent('Đăng ký không thành công, xin vui lòng thử lại');
                setShow(true);
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <center><h3><b>ĐĂNG KÝ TÀI KHOẢN NGƯỜI HỌC</b></h3></center>
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <div className="form-group">
                                <label>Họ tên</label>
                                <input required type="text" className="form-control" placeholder="" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ E-mail</label>
                                <input required type="email" className="form-control" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Ngày sinh</label>
                                <input required type="date" className="form-control" placeholder="" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                            </div>
                        </div>
                        <div class="col-sm">
                            <div className="form-group">
                                <label>Nơi ở</label>
                                <input required type="text" className="form-control" placeholder="" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <input required type="password" className="form-control" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Nhập lại mật khẩu</label>
                                <input required type="password" className="form-control" placeholder="" value={repassword} onChange={(e) => setRepassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='center'>
                    <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
                    <p className="forgot-password text-right">
                        Đã có tài khoản? <a href="login">Đăng nhập?</a>
                    </p>
                </div>
            </form>
            <Modal show={show} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        if (success) {
                            window.location.href = '/login';
                        }
                        else {
                            setShow(false);
                        }
                    }}>Thoát</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}