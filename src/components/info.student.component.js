import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import config from '../config';

const axios = require('axios');

export default function InfoStudent() {

    const [info, setInfo] = useState({});
    const [birthday, setBirthday] = useState('');

    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token != null) {
            axios.get(config['server-domain'] + 'profile/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        if (res.data) {
                            if (res.data.role === 'student') {
                                setInfo(res.data);
                                var date = new Date(res.data.birthday);
                                if (date.getUTCDate() < date.getDate()) {
                                    date.setDate(date.getDate() + 1);
                                }
                                setBirthday(date.toISOString().slice(0, 10));
                            }
                            else {
                                window.location.href = '/';
                            }
                        }
                    }
                })
                .catch(err => {
                    window.location.href = '/';
                })
        }
        else {
            window.location.href = '/';
        }
    }, []);

    function setFullname(value) {
        if (info) {
            setInfo({ ...info, fullname: value });
        }
    }

    function setAddress(value) {
        if (info) {
            setInfo({ ...info, address: value });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        info.birthday = birthday;

        const token = localStorage.getItem('token');
        axios.post(config['server-domain'] + 'profile/update-info', {
            info: info
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.data) {
                    setShow(true);
                    setModalContent(res.data.message);
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
        <div>
            <center><h2><br></br><b>CẬP NHẬT THÔNG TIN</b></h2></center>
            <form onSubmit={handleSubmit}>
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <div className="form-group">
                                <label>Địa chỉ E-mail</label>
                                <input required type="email" className="form-control" placeholder="" value={info.email} disabled />
                            </div>
                            <div className="form-group">
                                <label>Họ tên</label>
                                <input required type="text" className="form-control" placeholder="" value={info.fullname} onChange={(e) => setFullname(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Ngày sinh</label>
                                <input required type="date" className="form-control" placeholder="" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Nơi ở</label>
                                <input required type="text" className="form-control" placeholder="" value={info.address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='center'>
                    <button type="submit" className="btn btn-primary btn-block">Lưu lại</button>
                </div>
            </form>
            <Modal show={show} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)}>Thoát</Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}