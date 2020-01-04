import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import ShowMoreText from 'react-show-more-text';
import StarRatings from 'react-star-ratings';
import config from '../config';
import '../css/tags.css';

import firebase from '../firebase';

const axios = require('axios');
const myEmail = localStorage.getItem('email');
const myName = localStorage.getItem('name');

export default function DetailTeacher() {

    const [info, setInfo] = useState({});
    const [introduction, setIntroduction] = useState('');
    const [tags, setTags] = useState([]);
    const [avatarStyle, setAvatarStyle] = useState(getStyleAvatar());
    const [commentHTML, setCommentHTML] = useState('');
    const [contractHTML, setContractHTML] = useState('');

    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [show2, setShow2] = useState(false);
    const [modalContent2, setModalContent2] = useState({});

    useEffect(() => {
        const address = window.location.href;
        if (address.indexOf('?email=') !== -1) {
            var emailParams = address.substr(address.indexOf('?email=') + '?email='.length);
            axios.get(config['server-domain'] + 'public/get', {
                params: {
                    email: emailParams
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setInfo(res.data);
                        setIntroduction(res.data.introduction || '');
                        setTags(res.data.tags);
                        if (res.data.avatar) {
                            setAvatarStyle(getStyleAvatar(res.data.avatar));
                        }

                        // if logged, then load comment
                        const token = localStorage.getItem('token');
                        if (token != null) {
                            axios.post(config['server-domain'] + 'profile/get-contracts-comments', {
                                teacherid: res.data.teacherid
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                                .then(ress => {
                                    if (ress.data && ress.data.comments) {
                                        setupComments(ress.data.comments);
                                    }
                                    if (ress.data && ress.data.contracts) {
                                        setupContracts(ress.data.contracts);
                                    }
                                })
                                .catch(errr => { });
                        }

                    }
                })
                .catch(err => {
                    window.location.href = '/';
                })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Card className="card-center">
                <Card.Header className="card-header">Thông tin</Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col xs={2}><br></br><div className="ratio img-responsive img-circle" style={avatarStyle}></div></Col>
                            <Col xs={4}>
                                <br></br>
                                <b className="b-name">{info.fullname}</b><br></br>
                                Tuổi: <b>{info.age}</b><br></br>
                                Bằng cấp: <b>{info.degree}</b><br></br>
                                Địa chỉ: <b>{info.address}</b><br></br><br></br>
                                <Button size="sm" onClick={() => handleAddFriend()}>Kết bạn</Button>
                                <Button size="sm" variant='danger' onClick={() => {
                                    setModalContent('Hãy chọn kỹ năng / môn học tương ứng mà bạn muốn học bên dưới');
                                    setShow(true);
                                }}>Đăng ký học</Button>
                            </Col>
                            <Col>
                                <center>
                                    <br></br>
                                    <b>ĐÁNH GIÁ TỔNG QUAN</b><br></br>
                                    <StarRatings
                                        rating={info.rate || 0}
                                        starDimension="27px"
                                        starSpacing="2px"
                                        starRatedColor={(info.rate && info.rate < 3) ? 'red' : 'green'}
                                    /><br></br>
                                    <h4>{info.rate || 0}/5</h4>
                                    <b>TỶ LỆ THÀNH CÔNG</b><br></br>
                                    <b>{info.successRate || 0}%</b>
                                </center>
                            </Col>
                        </Row>
                        <Row className="intro-container">
                            <Col>
                                <h3><b><u>TỰ GIỚI THIỆU</u></b></h3>
                                <p>
                                    <ShowMoreText
                                        lines={1}
                                        more=' - Xem thêm'
                                        less=' - Thu gọn'
                                        expanded={false}>
                                        {introduction.split('\n').map((line, i, arr) => {
                                            const lineHTML = <span key={i}>{line}</span>;
                                            if (i === arr.length - 1) {
                                                return lineHTML;
                                            } else {
                                                return [lineHTML, <br key={i + 'br'} />];
                                            }
                                        })}
                                    </ShowMoreText>
                                </p>
                            </Col>
                        </Row>
                        <Row className="intro-container">
                            <Col>
                                <b>{abbreviateNumber(info.price || 0)}</b><br></br>
                                Giá trên giờ
                        </Col>
                            <Col>
                                <b>{info.countContracts}</b><br></br>
                                Số hợp đồng
                        </Col>
                            <Col>
                                <b>{info.totalRevenue}</b><br></br>
                                Tổng thu nhập
                        </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            <Card className="card-center">
                <Card.Header className="card-header">Kỹ năng</Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <ReactTags tags={tags} readOnly={true} handleTagClick={(i) => {
                                    if (localStorage.getItem('token')) {
                                        const startdate = new Date();
                                        const enddate = new Date();
                                        setModalContent2({
                                            teacherid: info.teacherid,
                                            teacher: info.fullname,
                                            skillid: tags[i].id,
                                            skill: tags[i].text,
                                            daypweek: 3,
                                            hourpday: 3,
                                            startdate: startdate.toISOString().substr(0, 10),
                                            enddate: enddate.toISOString().substr(0, 10),
                                            revenue: calculateTotalPrice(info.price, null, null, 3, 3)
                                        })
                                        setShow2(true);
                                    }
                                }} />
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            {contractHTML}
            {commentHTML}
            <Modal show={show} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent}</Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={() => setShow(false)}>Thoát</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show2} style={{ opacity: 1 }}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng ký học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Người phụ trách:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    {modalContent2.teacher || 'John Smith'}<br></br>
                    <label>Môn học / kỹ năng:&nbsp;&nbsp;&nbsp;</label>
                    {modalContent2.skill || 'Math'}<br></br><hr></hr>
                    <label>Số ngày trong tuần:&nbsp;</label>&nbsp;&nbsp;
                        <select className='form-control-sm' defaultValue={modalContent2.daypweek}
                        onChange={(e) => setModalContent2({
                            ...modalContent2,
                            daypweek: e.target.value,
                            revenue: calculateTotalPrice(info.price, modalContent2.startdate, modalContent2.enddate, e.target.value, modalContent2.hourpday)
                        })}>
                        <option selected value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                    </select><br></br>
                    <label>Số giờ trong ngày:&nbsp;&nbsp;&nbsp;</label>&nbsp;&nbsp;
                        <select className='form-control-sm' defaultValue={modalContent2.hourpday}
                        onChange={(e) => setModalContent2({
                            ...modalContent2,
                            hourpday: e.target.value,
                            revenue: calculateTotalPrice(info.price, modalContent2.startdate, modalContent2.enddate, modalContent2.daypweek, e.target.value)
                        })}>
                        <option selected value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                    </select><br></br>
                    <label>Ngày bắt đầu:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>&nbsp;&nbsp;
                        <input type='date' className='form-control-sm' value={modalContent2.startdate}
                        onChange={(e) => setModalContent2({
                            ...modalContent2,
                            startdate: e.target.value,
                            revenue: calculateTotalPrice(info.price, e.target.value, modalContent2.enddate, modalContent2.daypweek, modalContent2.hourpday)
                        })}></input><br></br>
                    <label>Ngày kết thúc:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>&nbsp;&nbsp;
                        <input type='date' className='form-control-sm' value={modalContent2.enddate}
                        onChange={(e) => setModalContent2({
                            ...modalContent2,
                            enddate: e.target.value,
                            revenue: calculateTotalPrice(info.price, modalContent2.startdate, e.target.value, modalContent2.daypweek, modalContent2.hourpday)
                        })}></input><br></br><hr></hr>
                    <label>Thành tiền (đ):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>&nbsp;&nbsp;
                        <u><b>{modalContent2.revenue}</b></u>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => sendRequest()} variant='danger'>Xác nhận</Button>
                    <Button variant='primary' onClick={() => setShow2(false)}>Thoát</Button>
                </Modal.Footer>
            </Modal>
        </div >
    );

    function sendRequest() {
        const token = localStorage.getItem('token');
        if (token != null) {
            axios.post(config['server-domain'] + 'profile/create-request', {
                data: modalContent2
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(ress => {
                    if (ress.status === 200) {
                        setShow2(false);
                        setModalContent(ress.data.message);
                        setShow(true);
                    }
                })
                .catch(errr => {
                    setShow2(false);
                    setModalContent(errr.response.message);
                    setShow(true);
                });
        }
    }

    function getStyleAvatar(url) {
        if (url == null) {
            url = 'https://forum.waka.vn/assets/avatars/default.svg';
        }
        return {
            "background-image": "url('" + url + "')"
        }
    }

    function handleAddFriend() {

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
                if ((childNode.val().metadata.u1 === myEmail && childNode.val().metadata.u2 === info.email) ||
                    (childNode.val().metadata.u1 === info.email && childNode.val().metadata.u2 === myEmail)) {
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
                            u2: info.email,
                            u1Name: myName,
                            u2Name: info.fullname
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

    function setupComments(comments) {

        const commentRows = [];

        for (var i = 0; i < comments.length; i++) {
            commentRows.push(<Row>
                <Col xs={1}>
                    <div className="ratio img-responsive img-circle" style={getStyleAvatar(comments[i].avatar)}></div>
                </Col>
                <Col>
                    <b>{comments[i].fullname}</b>
                    <br></br>
                    <i>{comments[i].content}</i>
                </Col>
            </Row>);

            if (i !== comments.length - 1) {
                commentRows.push(<hr></hr>)
            }
        }

        if (comments.length === 0) {
            commentRows.push(<Row>Chưa có nhận xét nào cho người dạy</Row>);
        }

        const html = <Card className="card-center">
            <Card.Header className="card-header">Đánh giá từ người học</Card.Header>
            <Card.Body style={{ 'max-height': '250px', overflow: 'hidden', 'overflowY': 'scroll' }}>
                <Container>
                    {commentRows}
                </Container>
            </Card.Body>
        </Card>

        setCommentHTML(html);
    }

    function setupContracts(contracts) {
        const contractRows = [];

        for (var i = 0; i < contracts.length; i++) {
            contractRows.push(<Row>
                <Col xs={2}>
                    <StarRatings
                        rating={contracts[i].rate}
                        starDimension='18px'
                        starSpacing='0px'
                        starRatedColor={contracts[i].rate < 3 ? 'red' : 'green'}
                    /><br></br>Đánh giá: {contracts[i].rate}/5
                </Col>
                <Col style={{ 'margin-left': '-50px' }}>
                    <b>{contracts[i].description}</b>
                    <br></br>
                    Môn học: <i>{contracts[i].skill}</i> ({contracts[i].start} - {contracts[i].end})
                </Col>
                <Col>
                    Trạng thái: <b>{contracts[i].state === 0 ? 'Đang dạy' : contracts[i].state === 1 ? 'Đã hủy' : 'Đã hoàn thành'}</b>
                </Col>
            </Row>);

            if (i !== contracts.length - 1) {
                contractRows.push(<hr></hr>)
            }
        }

        if (contracts.length === 0) {
            contractRows.push(<Row>Chưa có lớp học nào</Row>);
        }

        const html = <Card className="card-center">
            <Card.Header className="card-header">Lịch sử dạy học</Card.Header>
            <Card.Body style={{ 'max-height': '215px', overflow: 'hidden', 'overflowY': 'scroll' }}>
                <Container>
                    {contractRows}
                </Container>
            </Card.Body>
        </Card>

        setContractHTML(html);
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
    var difference_ms = date2_ms - date1_ms;
    if (difference_ms < 0) difference_ms = 0;

    // Convert back to weeks and return hole weeks
    return Math.ceil(difference_ms / ONE_WEEK);
}

function abbreviateNumber(number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}