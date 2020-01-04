import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Container, Modal } from 'react-bootstrap';
import config from '../config';
import '../css/tags.css';

import firebase from '../firebase';

const axios = require('axios');
const myEmail = localStorage.getItem('email');
const myName = localStorage.getItem('name');
var isTeacherView;
var requestsArray;
var flagArray;

export default function ListRequest(pops) {

    const [requestHTML, setRequestHTML] = useState('');
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');

    // for filter
    const [state, setState] = useState('all');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token != null) {
            axios.post(config['server-domain'] + 'profile/get-requests', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(ress => {
                    if (ress.data && ress.data.requests) {
                        isTeacherView = ress.data.isteacherview;
                        requestsArray = ress.data.requests;
                        handleSubmit();
                    }
                })
                .catch(errr => { window.location.href = '/'; });
        }
        else {
            window.location.href = '/';
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalContent]);

    function handleSubmit(e) {
        if (e) e.preventDefault();

        flagArray = new Array(requestsArray.length).fill(1);
        for (let i = 0; i < flagArray.length; i++) {
            if (state !== 'all' && parseInt(state) !== requestsArray[i].isaccept) {
                flagArray[i] = 0;
                continue;
            }
        }

        setupRequests(requestsArray);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <center>
                    <br></br><br></br>
                    <label>Trạng thái:&ensp;</label>
                    <select className='form-control-sm' onChange={(e) => setState(e.target.value)}>
                        <option selected value='all'>Tất cả</option>
                        <option value='0'>Đang chờ duyệt</option>
                        <option value='1'>Đã chấp nhận</option>
                        <option value='2'>Đã từ chối</option>
                    </select>
                    &ensp;
                    &ensp;
                    <input type="submit" className='form-control-sm' style={{ width: '100px' }} value='Tìm kiếm'></input>
                </center>
            </form>
            {requestHTML}
            <Modal show={show} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => setShow(false)}>Thoát</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

    function getStyleAvatar(url) {
        if (url == null) {
            url = 'https://forum.waka.vn/assets/avatars/default.svg';
        }
        return {
            "background-image": "url('" + url + "')"
        }
    }

    function setupRequests(requests) {

        // filter
        requests = requests.filter((x, i) => flagArray[i] === 1);

        const requestRows = [];

        for (var i = 0; i < requests.length; i++) {
            const targetEmail = requests[i].email;
            const targetName = requests[i].fullname;
            const requestId = requests[i].id;
            requestRows.push(<Row>
                <Col xs={2}>
                    <div className="ratio img-responsive img-circle" style={getStyleAvatar(requests[i].avatar)}></div>
                </Col>
                <Col style={{ 'line-height': '20px' }}>
                    <b>Đối tác:</b> {requests[i].fullname}
                    <br></br>
                    <b>Môn học:</b> {requests[i].skill}
                    <br></br>
                    <b>Thời gian:</b> {requests[i].start} - {requests[i].end}
                    <br></br>
                    <b>Lịch học:</b> {requests[i].dayperweek} ngày/tuần {'&'} {requests[i].hourperday} giờ/ngày
                    <br></br>
                    <b>Giá toàn khóa:</b> {calculateTotalPrice(requests[i].price, requests[i].start, requests[i].end, requests[i].dayperweek, requests[i].hourperday)}
                    <br></br>
                    <b>Trạng thái:</b> {requests[i].isaccept === 0 ? 'Đang chờ duyệt' : requests[i].isaccept === 1 ? 'Đã chấp nhận' : 'Đã từ chối'}
                </Col>
                <Col>
                    <br></br><br></br><br></br>
                    {
                        isTeacherView ?
                            <div>
                                <Button size="sm" onClick={() => handleAddFriend(targetEmail, targetName)}>Kết bạn</Button>
                                <Button size="sm" variant='secondary' onClick={() => handleRequest(requestId, 1)} hidden={requests[i].isaccept > 0}>Chấp nhận</Button>
                                <Button size="sm" variant='danger' onClick={() => handleRequest(requestId, 2)} hidden={requests[i].isaccept > 0}>Từ chối</Button>
                            </div> :
                            <div>
                                <Button size="sm" onClick={() => { window.location.href = '/detail-teacher?email=' + targetEmail}}>Thông tin</Button>
                                <Button size="sm" variant='danger' onClick={() => handleRequest(requestId, -1)} hidden={requests[i].isaccept > 0}>Hủy yêu cầu</Button>
                            </div>
                    }
                </Col>
            </Row>);

            if (i !== requests.length - 1) {
                requestRows.push(<hr style={{ width: '93%' }}></hr>)
            }
        }

        if (requests.length === 0) {
            requestRows.push(<Row>Chưa có yêu cầu nào</Row>);
        }

        const html = <Card className="card-center">
            <Card.Header className="card-header">Danh sách yêu cầu</Card.Header>
            <Card.Body style={{ 'max-height': '333px', overflow: 'hidden', 'overflowY': 'scroll' }}>
                <Container>
                    {requestRows}
                </Container>
            </Card.Body>
        </Card>

        setRequestHTML(html);
    }

    function handleRequest(requestId, isAccept) {
        const token = localStorage.getItem('token');
        if (token != null) {
            axios.post(config['server-domain'] + 'profile/update-request', {
                requestid: requestId,
                isaccept: isAccept
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(ress => {
                setModalContent(Date.now());
                setModalContent(ress.data.message);
                setShow(true);
            }).catch(errr => {
                setModalContent(errr.response.data.message);
                setShow(true);
            });
        }
    }

    function handleAddFriend(targetEmail, targetName) {

        if (myEmail === null || myName === null) {
            setModalContent('Xin vui lòng đăng nhập để tiếp tục');
            setShow(true);
            return;
        }

        firebase.database().ref().on('value', snap => {

            var isExisted = false;
            snap.forEach(childNode => {
                if (!(childNode.val() && childNode.val().metadata && childNode.val().metadata.u1)) {
                    return;
                }
                if ((childNode.val().metadata.u1 === myEmail && childNode.val().metadata.u2 === targetEmail) ||
                    (childNode.val().metadata.u1 === targetEmail && childNode.val().metadata.u2 === myEmail)) {
                    isExisted = true;
                    return;
                }
            });

            if (isExisted) {
                setModalContent('Hai bạn đã kết bạn với nhau');
                setShow(true);
            }
            else {
                firebase.database().ref().push()
                    .set({
                        metadata: {
                            u1: myEmail,
                            u2: targetEmail,
                            u1Name: myName,
                            u2Name: targetName
                        }
                    })
                    .then(id => {
                        setModalContent('Thêm bạn thành công');
                        setShow(true);
                    })
                    .catch(err => {
                        setModalContent('Lỗi: ' + JSON.stringify(err));
                        setShow(true);
                    })
            }
        });
    }
}

function calculateTotalPrice(price, startdate, enddate, dayperweek, hourperday) {

    const priceperhour = price || 0;
    const numberOfWeek = calculateWeeksBetween(new Date(startdate), new Date(enddate));

    const hourperweek = hourperday * dayperweek;
    const numberOfHour = hourperweek * numberOfWeek;

    return abbreviateNumber(numberOfHour * priceperhour);
}

function calculateWeeksBetween(date1, date2) {

    // The number of milliseconds in one week
    var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms);

    // Convert back to weeks and return hole weeks
    return Math.ceil(difference_ms / ONE_WEEK);
}

function abbreviateNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}