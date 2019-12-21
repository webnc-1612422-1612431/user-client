import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import config from '../config';

const axios = require('axios');

export default function ChangePass() {

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        
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

        const token = localStorage.getItem('token');
        axios.post(config['server-domain'] + 'profile/change-pass', {
            oldPassword: oldPassword,
            password: password
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.data) {
                    setShow(true);
                    setModalContent(res.data.message);
                    setPassword('');
                    setRepassword('');
                    setOldPassword('');
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    setShow(true);
                    setModalContent(err.response.data.message);
                }
            });
    }

    return (
        <div className='center'>
            <center><h2><br></br><b>ĐỔI MẬT KHẨU</b></h2></center>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Mật khẩu cũ</label>
                    <input required type='password' className='form-control' placeholder='' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Mật khẩu mới</label>
                    <input required type='password' className='form-control' placeholder='' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Xác nhận mật khẩu</label>
                    <input required type='password' className='form-control' placeholder='' value={repassword} onChange={(e) => setRepassword(e.target.value)} />
                </div>
                <div className='center'>
                    <button type='submit' className='btn btn-primary btn-block'>Lưu lại</button>
                </div>
            </form>
            <Modal show={show} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => setShow(false)}>Thoát</Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}